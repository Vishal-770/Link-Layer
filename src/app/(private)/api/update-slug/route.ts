import { dbConnect } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";
import ShortUrl from "@/database/models/shortUrlmodel";
import QRCode from "qrcode";
import { requireAuthenticatedRequestUser } from "@/lib/request-auth";
import { ensureLocalUser } from "@/lib/app-user";

export async function PATCH(request: NextRequest) {
  try {
    const { user: authUser, unauthorizedResponse } =
      await requireAuthenticatedRequestUser(request);

    if (unauthorizedResponse || !authUser) {
      return unauthorizedResponse;
    }

    await dbConnect();

    const data = await request.json();
    const { urlId, newSlug } = data;

    if (!urlId || !newSlug) {
      return NextResponse.json(
        { message: "urlId and newSlug are required", success: false },
        { status: 400 },
      );
    }

    const trimmedSlug = newSlug.trim();
    if (!/^[a-zA-Z0-9-]+$/.test(trimmedSlug)) {
      return NextResponse.json(
        { message: "Slug can only contain letters, numbers, and hyphens", success: false },
        { status: 400 },
      );
    }

    const user = await ensureLocalUser(authUser);

    // Find the URL and check ownership
    const shortUrl = await ShortUrl.findById(urlId);
    if (!shortUrl) {
      return NextResponse.json(
        { message: "URL not found", success: false },
        { status: 404 },
      );
    }

    // Check ownership: Compare Mongoose ObjectIds as strings
    if (shortUrl.userId.toString() !== user._id.toString()) {
      return NextResponse.json(
        { message: "Unauthorized: You do not own this URL", success: false },
        { status: 403 },
      );
    }

    // Check if the new slug is already taken by ANOTHER record
    const existingSlug = await ShortUrl.findOne({ slug: trimmedSlug, _id: { $ne: urlId } });
    if (existingSlug) {
      return NextResponse.json(
        { message: "Slug is already in use", success: false },
        { status: 400 },
      );
    }

    // Update slug and regenerate QR code
    shortUrl.slug = trimmedSlug;
    const fullShortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${trimmedSlug}`;
    shortUrl.qrCode = await QRCode.toDataURL(fullShortUrl);
    
    await shortUrl.save();

    return NextResponse.json({
      success: true,
      message: "Slug updated successfully",
      data: shortUrl.toObject(),
    });
  } catch (err) {
    console.error("Error updating slug:", err);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 },
    );
  }
}

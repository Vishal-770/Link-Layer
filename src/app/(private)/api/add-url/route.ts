import { dbConnect } from "@/database/connection";
import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import ShortUrl from "@/database/models/shortUrlmodel";
import QRCode from "qrcode";
import { requireAuthenticatedRequestUser } from "@/lib/request-auth";
import { ensureLocalUser } from "@/lib/app-user";

interface reqBody {
  originalUrl: string;
}

export async function POST(request: NextRequest) {
  try {
    const { user: authUser, unauthorizedResponse } =
      await requireAuthenticatedRequestUser(request);

    if (unauthorizedResponse || !authUser) {
      return unauthorizedResponse;
    }

    await dbConnect();

    const data: reqBody & { customSlug?: string } = await request.json();
    const { originalUrl, customSlug } = data;

    if (!originalUrl) {
      return NextResponse.json(
        { message: "originalUrl is required", success: false },
        { status: 400 },
      );
    }

    const user = await ensureLocalUser(authUser);

    let slug = customSlug?.trim();
    if (slug) {
      // Validate slug format (alphanumeric and hyphens only)
      if (!/^[a-zA-Z0-9-]+$/.test(slug)) {
        return NextResponse.json(
          { message: "Custom slug can only contain letters, numbers, and hyphens", success: false },
          { status: 400 },
        );
      }

      // Check if slug is already taken
      const existingSlug = await ShortUrl.findOne({ slug });
      if (existingSlug) {
        return NextResponse.json(
          { message: "Custom slug is already in use", success: false },
          { status: 400 },
        );
      }
    } else {
      slug = nanoid(8);
    }

    // Safety Check: Google Safe Browsing
    const { checkUrlSafety } = await import("@/lib/safety");
    const safetyResult = await checkUrlSafety(originalUrl);

    if (!safetyResult.isSafe) {
      return NextResponse.json(
        { 
          message: `Security Risk: This URL is flagged as unsafe (${safetyResult.threatType?.replace(/_/g, ' ')}) by Google Safe Browsing.`, 
          success: false 
        },
        { status: 400 },
      );
    }

    const userId = user._id;
    const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/r/${slug}`;
    const qrCode = await QRCode.toDataURL(shortUrl);

    const newUrl = await ShortUrl.create({
      originalUrl,
      slug,
      userId,
      qrCode: qrCode,
    });

    return NextResponse.json(
      { success: true, data: newUrl.toObject() },
      { status: 201 },
    );
  } catch (err) {
    console.error("Error occurred:", err);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 500 },
    );
  }
}

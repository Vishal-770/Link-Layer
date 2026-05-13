import { dbConnect } from "@/database/connection";
import User from "@/database/models/usermodel";
import type { AuthenticatedRequestUser } from "@/lib/request-auth";

function splitName(name?: string) {
  const trimmedName = (name || "").trim();

  if (!trimmedName) {
    return { firstName: "", lastName: "" };
  }

  const [firstName, ...rest] = trimmedName.split(/\s+/);
  return {
    firstName,
    lastName: rest.join(" "),
  };
}

export async function ensureLocalUser(authUser: AuthenticatedRequestUser) {
  await dbConnect();

  const { firstName, lastName } = splitName(authUser.name);

  const user = await User.findOneAndUpdate(
    { authUserId: String(authUser.id) },
    {
      $setOnInsert: {
        authUserId: String(authUser.id),
      },
      $set: {
        email: authUser.email || "",
        firstName,
        lastName,
      },
    },
    { upsert: true, new: true },
  );

  return user;
}

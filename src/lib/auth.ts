import { dbConnect } from "@/database/connection";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const connection = await dbConnect();
const database = connection.connection.db;

if (!database) {
  throw new Error("Mongo database connection not available for Better Auth");
}

export const auth = betterAuth({
  appName: "LinkShort",
  database: mongodbAdapter(database, {
    client: connection.connection.client,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  emailAndPassword: {
    enabled: false,
  },
  trustedOrigins: [process.env.BETTER_AUTH_URL || "http://localhost:3000"],
});

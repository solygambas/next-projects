import { AuthOptions, Profile, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ profile }: { profile?: Profile }) {
      await connectDB();
      const userExists = await User.findOne({ email: profile?.email });
      if (!userExists) {
        const username = profile?.name?.slice(0, 20);
        await User.create({
          email: profile?.email,
          username,
          image: profile?.image,
        });
      }
      return true;
    },
    async session({ session }: { session: Session }) {
      if (session.user) {
        await connectDB();
        const user = await User.findOne({ email: session.user.email });
        session.user.id = user?._id.toString() as string;
      }
      return session;
    },
  },
};

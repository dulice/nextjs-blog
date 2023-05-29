import User from "@/models/userSchema";
import bcrypt from "bcrypt";
import CredentialProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import { AuthToken } from "@/utlis/jwt";
import db from "@/utlis/connection";

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: "credentials",
      credentials: {
        name: { label: "name", type: "text", placeholder: "name" },
        password: { label: "Password",type: "password" },
      },
      async authorize(credentails) {
        const { email, password } = credentails;
        await db.connect();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Wrong Credential!");
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) {
          throw new Error("Wrong Credential!");
        }
        const accessToken = AuthToken(user);
        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token._id = user._id;
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };

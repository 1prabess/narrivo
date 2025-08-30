import NextAuth, { DefaultSession } from "next-auth";
import authConfig from "./auth.config";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./lib/db";
import { getUserByEmail } from "./lib/user";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      userId: string;
    } & DefaultSession["user"];
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async jwt({ token }) {
      if (!token.email) return token;
      const user = await getUserByEmail(token.email);

      if (!user) return token;

      token.role = user.role;
      token.userId = user.id;

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.userId = token.userId as string;
        session.user.role = token.role as "USER" | "ADMIN";
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
});

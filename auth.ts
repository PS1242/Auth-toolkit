import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "./lib/prismaclient";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      authorize: async (creds) => {
        let user = null;
        const validatedFields = LoginSchema.safeParse(creds);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          user = await prisma.user.findUnique({
            where: {
              email,
            },
          });

          /**
           * !user.password -> it can happen that a user has logged in through google sign in
           * or any other oauth but now trying to login through password with that email
           */
          if (!user || !user.password) {
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
});

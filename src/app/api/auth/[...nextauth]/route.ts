import NextAuth, {
  AuthOptions,
  ISODateString,
  getServerSession,
} from "next-auth";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prismadb";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";
import { redirect } from "next/navigation";
import { Prisma } from "@prisma/client";

export type CustomUserSession = {
  user?: CustomUser;
  expires: ISODateString;
};

export type CustomUser = {
  id?: string | null;
  name?: string | null;
  email?: string | null;
  username?: string | null;
  image?: string | null;
  bio?: string | null;
  hashPassword?: boolean | null;
};

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID! as string,
      clientSecret: process.env.GOOGLE_SECRET! as string,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        identifier: { label: "Email or Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const { identifier, password } = credentials;

        const isEmail = identifier.includes("@");
        const isUsername = !isEmail;
        const user = await prisma?.user.findUnique({
          where: <Prisma.UserWhereUniqueInput>{
            ...(isEmail
              ? { email: identifier }
              : isUsername
              ? { username: identifier }
              : {}),
          },
          select: {
            name: true,
            username: true,
            email: true,
            bio: true,
            image: true,
            hashPassword: true,
            id: true,
          },
        });

        if (!user || !user?.hashPassword) {
          throw new Error("Invalid credentials");
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashPassword
        );

        if (!isCorrectPassword) {
          throw new Error("Invalid credentials");
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as CustomUser;

        return {
          ...token,
          username: u.username,
          image: u.image,
          id: u.id,
          bio: u.bio,
          hashPassword: u.hashPassword,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: <CustomUser>{
          ...session.user,
          username: token.username,
          image: token.image,
          id: token.id,
          bio: token.bio,
          hashPassword: token.hashPassword,
        },
      };
    },
  },
  debug: process.env.NODE_ENV == "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function loginIsRequiredServer() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }
}

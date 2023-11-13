import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { formatSlugByUsername } from "@/lib/generateSlugs";

export default async function getCurrentUser() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return null;
    }

    const currentUser = await prisma?.user.findUnique({
      where: {
        email: session.user.email as string,
      },
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        hashPassword: true,
        image: true,
        bio: true,
      },
    });

    if (!currentUser) {
      return null;
    }

    // return {
    //   ...currentUser,
    //   createdAt: currentUser.createdAt.toISOString(),
    //   updatedAt: currentUser.updatedAt.toISOString(),
    //   emailVerified: currentUser.emailVerified?.toISOString || null,
    // };
    return currentUser;
  } catch (error) {
    return null;
  }
}

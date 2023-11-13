import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/components/currentUser/currentUser";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const currentUser = await getCurrentUser();
  const followUserId = params.slug;
  //   const body = await request.json();
  //   const { followUserId } = body;
  const user = await prisma?.user.findUnique({
    where: { id: currentUser?.id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const followedUser = await prisma?.user.findUnique({
    where: { id: followUserId },
  });

  if (!followedUser) {
    throw new Error("User to follow not found");
  }

  const alreadyFollowed = await prisma?.user.findUnique({
    where: { id: followUserId },
    select: {
      followingIDs: true,
      followedByIDs: true,
    },
  });

  const followingIDs = alreadyFollowed?.followedByIDs.includes(
    `${currentUser?.id}`
  );
  if (followingIDs) {
    await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        following: {
          disconnect: { id: followUserId },
        },
      },
    });

    return NextResponse.json({ message: "Follow" });
  } else {
    await prisma.user.update({
      where: { id: currentUser?.id },
      data: {
        following: {
          connect: { id: followUserId },
        },
      },
    });
    return NextResponse.json({ message: "Unfollow" });
  }
}

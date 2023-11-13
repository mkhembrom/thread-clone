import getCurrentUser from "@/components/currentUser/currentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function POST(
  request: Request,
  { params }: { params: { user: string } }
) {
  const userId = params.user;

  const body = await request.json();
  const { username, bio, url, instagram, twitter } = body;

  // const isExistingUser = await prisma?.user.findUnique({
  //   where: {
  //     username: usernames,
  //   },
  // });

  // if (isExistingUser) {
  //   return NextResponse.json({ message: "username already exit" });
  // }

  const usernameUpdate = await prisma?.user.update({
    where: {
      id: `${userId}`,
    },
    data: {
      username: username || "",
      bio: bio || "",
    },
  });

  if (usernameUpdate) {
    const updateSocial = await prisma?.socials.update({
      where: {
        userId: `${userId}`,
      },
      data: {
        url: url || "",
        instagram: instagram || "",
        twitter: twitter || "",
      },
    });
    return NextResponse.json({
      usernameUpdate,
      updateSocial,
    });
  }

  // if (Object.keys(body).length == 1) {
  //   const usernameUpdate = await prisma?.user.update({
  //     where: {
  //       id: `${userId}`,
  //     },
  //     data: {
  //       username: username,
  //     },
  //   });
  //   return NextResponse.json({
  //     usernameUpdate,
  //   });
  // }
  return NextResponse.json({
    message: "failed",
  });
}

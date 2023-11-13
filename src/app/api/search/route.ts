import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  const users = await prisma?.user.findMany({
    select: {
      id: true,
      image: true,
      username: true,
      name: true,
      posts: true,
      comments: true,
      likes: true,
      followedByIDs: true,
      followingIDs: true,
      following: true,
      followedBy: true,
    },
  });

  return NextResponse.json({ users });
}

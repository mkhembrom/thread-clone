import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  const posts = await prisma?.post.findMany({
    include: {
      user: true,
      image: true,
      likes: true,
      reposts: true,
      comments: {
        include: {
          user: true,
          images: true,
          likes: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const reposts = await prisma?.repost.findMany({
    select: {
      post: {
        include: {
          user: true,
          image: true,
          likes: true,
          reposts: true,
          comments: {
            include: {
              user: true,
              images: true,
              likes: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      createdAt: true,
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  function compareDates(a: any, b: any) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  const allPosts = [...reposts, ...posts].sort(compareDates);

  return NextResponse.json({
    allPosts: allPosts,
    message: "success",
  });
}

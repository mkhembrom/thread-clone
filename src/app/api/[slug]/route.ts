import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;
  const user = await prisma?.user.findUnique({
    where: {
      username: slug,
    },
    include: {
      following: true,
      followedBy: true,
      socials: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          image: {
            orderBy: {
              createdAt: "asc",
            },
          },
          likes: true,
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      comments: {
        include: {
          replies: true,
          parentComment: {
            include: {
              user: true,
              post: true,
              likes: true,
              images: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              user: true,
              image: true,
              likes: true,
            },
          },
          images: true,
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
      _count: true,
    },
  });

  return NextResponse.json({ user });
}

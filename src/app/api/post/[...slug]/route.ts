import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const username = params.slug[0];
  const postId = params.slug[2];

  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      image: true,
      comments: {
        select: {
          userId: true,
          reply: true,
          images: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  return NextResponse.json({ post });
}

export async function DELETE(
  request: Request,
  { params }: { params: { slug: string } }
) {
  const postId = params.slug[0];
  const postToDelete = await prisma?.post.delete({
    where: {
      id: postId,
    },
  });

  if (postToDelete) {
    return NextResponse.json({
      message: "Post deleted",
    });
  } else {
    return NextResponse.json({
      message: "Post not deleted",
    });
  }
}

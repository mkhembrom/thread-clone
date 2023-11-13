import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const body = await request.json();
  const { userId } = body;

  const postId = params.slug[0];
  const commentId = params.slug[1];

  if (postId && commentId) {
    const existingCommentLike = await prisma?.like.findFirst({
      where: {
        commentId: commentId,
        userId: userId,
      },
    });

    let likedUpdate;

    if (existingCommentLike) {
      // User already liked, so remove the like
      likedUpdate = await prisma?.like.delete({
        where: {
          id: existingCommentLike.id,
        },
      });
      return NextResponse.json({ message: "disliked!" });
    } else {
      // User didn't like, so add a like
      likedUpdate = await prisma?.like.create({
        data: {
          commentId,
          userId,
        },
      });

      const notify = await prisma?.notification.create({
        data: {
          userId: userId,
          commentId: commentId,
          body: "user liked a comment",
        },
      });
      return NextResponse.json({ message: "liked!", body: notify });
    }
  } else {
    const existingLike = await prisma?.like.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });

    let likedUpdate;

    if (existingLike) {
      // User already liked, so remove the like
      likedUpdate = await prisma?.like.delete({
        where: {
          id: existingLike.id,
        },
      });
      // const notify = await prisma?.notification.delete({
      //   where: {

      //     userId: userId,
      //     postId: postId,
      //   },
      // });
      return NextResponse.json({ message: "disliked!" });
    } else {
      // User didn't like, so add a like
      likedUpdate = await prisma?.like.create({
        data: {
          postId,
          userId,
        },
      });

      const notify = await prisma?.notification.create({
        data: {
          userId: userId,
          postId: postId,
          body: "user liked a post",
        },
      });
      return NextResponse.json({ message: "liked!", body: notify });
    }
  }
}

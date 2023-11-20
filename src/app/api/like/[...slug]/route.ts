import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/components/currentUser/currentUser";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  // const body = await request.json();
  const session = await getServerSession(authOptions);

  const currentUser = await prisma?.user.findFirst({
    where: {
      email: session?.user?.email,
    },
  });

  const userId = currentUser?.id;
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

      const commentID = await prisma?.comment.findUnique({
        where: {
          id: commentId,
        },
        include: {
          user: true,
        },
      });

      const notify = await prisma?.notification.create({
        data: {
          userId: userId,
          toUserId: commentID?.userId,
          body: `${currentUser?.username} liked a comment`,
          commentId: commentID?.id,
        },
        select: {
          comment: {
            select: {
              id: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          userId: true,
          toUserId: true,
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

      const postID = await prisma?.post.findUnique({
        where: {
          id: postId,
        },
      });

      const notify = await prisma?.notification.create({
        data: {
          userId: userId,
          toUserId: postID?.userId,
          body: `${currentUser?.username} liked a post`,
          postId: postID?.id,
        },
        select: {
          post: {
            select: {
              id: true,
              user: {
                select: {
                  username: true,
                },
              },
            },
          },
          userId: true,
          toUserId: true,
        },
      });
      return NextResponse.json({ message: "liked!", body: notify });
    }
  }
}

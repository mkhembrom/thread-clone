import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

import getCurrentUser from "@/components/currentUser/currentUser";

export async function GET(request: NextRequest) {
  const currentUser = await getCurrentUser();

  const notification = await prisma?.notification.findMany({
    where: {
      toUserId: currentUser?.id,
      NOT: {
        userId: currentUser?.id,
      },
    },
    include: {
      user: true,
      post: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comment: {
        select: {
          id: true,
          reply: true,
          postId: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return NextResponse.json({
    status: 200,
    notification,
  });
}

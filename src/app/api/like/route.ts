import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import getCurrentUser from "@/components/currentUser/currentUser";
export async function GET(request: NextRequest) {
  const session = await getCurrentUser();
  const likedComments = await prisma?.like.findMany({
    select: {
      post: {
        select: {
          likes: {
            select: {
              userId: true,
            },
          },
        },
      },
      comment: {
        select: {
          id: true,

          userId: true,
          reply: true,
        },
      },
    },
  });
  return NextResponse.json({ likedComments });
}

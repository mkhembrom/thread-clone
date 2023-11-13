import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: NextRequest) {
  const comments = await prisma?.comment.findMany({
    include: {
      user: true,
      images: true,
      replies: {
        include: {
          user: true,
          likes: true,
          images: true,
        },
      },
      likes: true,
    },
  });

  return NextResponse.json({ comments });
}

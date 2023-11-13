import getCurrentUser from "@/components/currentUser/currentUser";
import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  const user = await getCurrentUser();

  const social = await prisma?.socials.findUnique({
    where: {
      userId: `${user?.id}`,
    },
  });
  return NextResponse.json({
    user,
    social,
  });
}

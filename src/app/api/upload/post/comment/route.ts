import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import getCurrentUser from "@/components/currentUser/currentUser";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import prisma from "@/lib/prismadb";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  const formData = await request.formData();
  const reply = formData.get("reply");
  const postId = formData.get("postId");
  const imagefile = formData.get("image") as File as unknown;
  const userId = formData.get("userId");

  if (!imagefile && imagefile == null) {
    const comment = await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
      },
      include: {
        post: true,
      },
    });

    if (comment) {
      await prisma?.notification.create({
        data: {
          commentId: comment?.id,
          userId: currentUser?.id,
          toUserId: comment?.post?.userId,
          postId: `${postId}`,
          body: `${currentUser?.username} commented on your post`,
        },
      });
    }

    return NextResponse.json({
      message: "success",
      comment,
    });
  } else {
    const dataFile = await uploadToCloudinary(imagefile as any);

    const comment = await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
        images: {
          createMany: {
            data: {
              imageName: dataFile.original_filename,
              imageUrl: dataFile.secure_url,
            },
          },
        },
      },
      include: {
        post: true,
      },
    });

    if (comment) {
      await prisma?.notification.create({
        data: {
          commentId: comment?.id,
          userId: currentUser?.id,
          toUserId: comment?.post?.userId,
          postId: `${postId}`,
          body: `${currentUser?.username} commented on your post`,
        },
      });
    }

    return NextResponse.json({
      message: "success",
      comment,
    });
  }
}

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
  const imagefile = formData.get("file") as File as unknown;
  const userId = formData.get("userId");

  const files = [];
  const imagefiles = [];
  for (const entry of Array.from(formData.entries())) {
    const [name, value] = entry;
    if (value instanceof File) {
      files.push({ name, file: value });
    }
  }

  for (const file of files) {
    const data = await uploadToCloudinary(file.file as any);
    imagefiles.push(data);
  }

  const imagePost = imagefiles.map((img) => ({
    imageName: img.original_filename,
    imageUrl: img.secure_url,
  }));

  console.log(imagefile);

  if (imagePost.length == 0) {
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
    const comment = await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
        images: {
          createMany: {
            data: imagePost,
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

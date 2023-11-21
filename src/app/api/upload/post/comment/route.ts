import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { join } from "path";
import getCurrentUser from "@/components/currentUser/currentUser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const reply = formData.get("reply");
  const postId = formData.get("postId");
  const userId = formData.get("userId");
  const file = formData.get("file") as unknown as File;

  const currentUser = await getCurrentUser();
  if (!file) {
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

    await prisma?.notification.create({
      data: {
        commentId: comment?.id,
        userId: currentUser?.id,
        toUserId: comment?.post?.userId,
        postId: `${postId}`,
        body: `${currentUser?.username} commented on your post`,
      },
    });
  } else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // fs.writeFileSync(`public/${file.name}`, buffer);

    // const uploadedResponse = await cloudinary.uploader.upload(
    //   `public/${file.name}`,
    //   {
    //     folder: "threads/comment",
    //     upload_preset: "ml_default",
    //     resource_type: "image",
    //   }
    // );
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "threads/comment",
            upload_preset: "ml_default",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error(error);
              reject(new Error("Error uploading to Cloudinary"));
            } else {
              console.log(result);
              resolve(result);
            }
          }
        )
        .end(buffer);
    });
    const { secure_url, original_filename } = result;

    const comment = await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
        images: {
          create: {
            imageUrl: secure_url,
            imageName: original_filename,
          },
        },
      },
      include: {
        post: true,
      },
    });

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
  });
}

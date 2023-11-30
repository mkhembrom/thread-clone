import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import getCurrentUser from "@/components/currentUser/currentUser";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const reply = formData.get("reply");
  const postId = formData.get("postId");
  const imagefile = formData.get("file") as File;
  const userId = formData.get("userId");
  const currentUser = await getCurrentUser();

  console.log(imagefile);

  if (!imagefile) {
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

    return NextResponse.json({
      message: "success",
      comment,
    });
  } else {
    const imgdata = await uploadToCloudinary(imagefile);

    const comment = await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
        images: {
          create: {
            imageUrl: imgdata.secure_url as string,
            imageName: imgdata.original_filename as string,
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

    return NextResponse.json({
      message: "success",
      comment,
    });
  }
}

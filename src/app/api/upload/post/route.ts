import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { File } from "buffer";
import { ICloudinary, IPost } from "@/app/types";
import getCurrentUser from "@/components/currentUser/currentUser";
import { Image, Post } from "@prisma/client";
import { resolve } from "path";
import toast from "react-hot-toast";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const currentUser = await getCurrentUser();
  const content = formData.get("content");
  const file = formData.get("image");

  if (file) {
    const post = await prisma.post.create({
      data: <Post>{
        userId: currentUser?.id,
        content: content,
      },
    });

    const uploadedResponse = await cloudinary.uploader.upload(file as string, {
      folder: "threads/post",
      upload_preset: "ml_default",
      resource_type: "image",
    });
    const { secure_url, original_filename } = uploadedResponse;

    const Image = await prisma.image.createMany({
      data: <Image>{
        postId: post.id,
        imageUrl: secure_url,
        imageName: original_filename,
      },
    });

    return NextResponse.json({ content, message: "success" });
  } else {
    const post = await prisma.post.create({
      data: <Post>{
        userId: currentUser?.id,
        content: content,
      },
    });
    return NextResponse.json({ content, message: "success" });
  }
}

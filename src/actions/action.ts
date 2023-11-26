"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prismadb";
import { Image, Post } from "@prisma/client";
import getCurrentUser from "@/components/currentUser/currentUser";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function create(formData: FormData) {
  const currentUser = await getCurrentUser();
  const content = formData.get("content");
  const file = formData.get("image") as unknown as File;

  if (!file) {
    throw new Error("File Error");
  }

  const post = await prisma.post.create({
    data: <Post>{
      userId: currentUser?.id,
      content: content,
    },
  });

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const resultData = await new Promise<UploadApiResponse | undefined>(
    (resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "threads/post",
            upload_preset: "ml_default",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        )
        .end(buffer);
    }
  );

  if (resultData) {
    const { secure_url, original_filename } = resultData;

    await prisma.image.createMany({
      data: <Image>{
        postId: post.id,
        imageUrl: secure_url,
        imageName: original_filename,
      },
    });

    revalidatePath("/");
    return NextResponse.json({ message: "Posted" });
  }
  return NextResponse.json({ message: "Error" });
}

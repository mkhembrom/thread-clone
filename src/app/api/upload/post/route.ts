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

export async function POST(request: Request) {
  const formData = await request.formData();
  const content = formData.get("content");
  const currentUser = await getCurrentUser();
  const files: (FormDataEntryValue & Blob)[] = [];
  for (let [, value] of Array.from(formData.entries())) {
    if (value instanceof Blob) {
      files.push(value);
    }
  }

  const post = await prisma.post.create({
    data: <Post>{
      userId: currentUser?.id,
      content: content,
    },
  });

  for (const file of files) {
    if (!file) {
      throw new Error("No file uploaded");
    }
    const arrayBuffer = await file.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

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

      const Image = await prisma.image.createMany({
        data: <Image>{
          postId: post.id,
          imageUrl: secure_url,
          imageName: original_filename,
        },
      });

      if (Image) {
        toast.success("Posted", {
          style: {
            borderRadius: "8px",
            padding: "12px",
            width: "250px",
            backgroundColor: "black",
            color: "white",
          },
        });
      }
    }
  }

  return NextResponse.json({ content, message: "success" });
}

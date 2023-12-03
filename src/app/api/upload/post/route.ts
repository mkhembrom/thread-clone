import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { File } from "buffer";
import getCurrentUser from "@/components/currentUser/currentUser";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const currentUser = await getCurrentUser();
  const content = formData.get("content");
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

  const post = await prisma.post.create({
    data: {
      userId: currentUser?.id as string,
      content: content as string,
      image: {
        createMany: {
          data: imagePost,
        },
      },
    },
  });

  return NextResponse.json({ content, message: "success", post });
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { v2 as cloudinary } from "cloudinary";
import getCurrentUser from "@/components/currentUser/currentUser";
import { File } from "buffer";
import fs from "fs";

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const session = await getCurrentUser();
  const formData = await request.formData();
  const text = formData.get("text");
  const files = [];
  for (let [key, value] of Array.from(formData.entries())) {
    if (value instanceof File) {
      files.push(value);
    }
  }

  const newPost = await prisma?.post.create({
    data: {
      content: `${text}`,
      userId: `${session?.id}`,
    },
  });

  for (const file of files) {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(`public/${file.name}`, buffer);

    const uploadedResponse = await cloudinary.uploader.upload(
      `public/${file.name}`,
      {
        folder: "threads/post",
        upload_preset: "ml_default",
        resource_type: "image",
      }
    );

    const { secure_url, original_filename } = uploadedResponse;
    if (newPost) {
      await prisma?.image.create({
        data: {
          postId: newPost.id,

          imageUrl: secure_url,
          imageName: original_filename,
        },
      });
    }
  }

  return NextResponse.json({ message: "success" });
}

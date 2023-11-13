import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";
import { join } from "path";

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
  const formData = await request.formData();
  const reply = formData.get("reply");
  const postId = formData.get("postId");
  const userId = formData.get("userId");
  const file = formData.get("file") as unknown as File;

  if (!file) {
    await prisma?.comment.create({
      data: {
        userId: `${userId}`,
        reply: `${reply}`,
        postId: `${postId}`,
      },
    });
  } else {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    fs.writeFileSync(`public/${file.name}`, buffer);

    const uploadedResponse = await cloudinary.uploader.upload(
      `public/${file.name}`,
      {
        folder: "threads/comment",
        upload_preset: "ml_default",
        resource_type: "image",
      }
    );
    const { secure_url, original_filename } = uploadedResponse;

    await prisma?.comment.create({
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
    });
  }

  return NextResponse.json({
    message: "success",
  });
}

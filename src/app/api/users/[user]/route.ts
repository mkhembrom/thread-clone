import getCurrentUser from "@/components/currentUser/currentUser";
import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { join } from "path";
import fs from "fs";
import { Socials, User } from "@prisma/client";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(
  request: Request,
  { params }: { params: { user: string } }
) {
  const userId = params.user;

  const formData = await request.formData();
  const username = formData.get("username") || "";
  const bio = formData.get("bio") || "";
  const url = formData.get("url") || "";
  const instagram = formData.get("instagram") || "";
  const twitter = formData.get("twitter") || "";
  const file = formData.get("image") as unknown as File;

  if (file) {
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const path = join("public", file.name);
    fs.writeFileSync(path, buffer);

    const uploadedResponse = await cloudinary.uploader.upload(path, {
      folder: "threads",
      upload_preset: "ml_default",
      resource_type: "image",
    });
    const { secure_url } = uploadedResponse;

    const usernameUpdate = await prisma?.user.update({
      where: {
        id: `${userId}`,
      },
      data: <User>{
        username: username,
        bio: bio,
        image: secure_url,
      },
    });

    if (usernameUpdate) {
      const updateSocial = await prisma?.socials.update({
        where: {
          userId: `${userId}`,
        },
        data: <Socials>{
          url: url,
          instagram: instagram,
          twitter: twitter,
        },
      });
      return NextResponse.json({
        usernameUpdate,
        updateSocial,
      });
    }
  } else {
    const usernameUpdate = await prisma?.user.update({
      where: {
        id: `${userId}`,
      },
      data: <User>{
        username: username,
        bio: bio,
      },
    });

    if (usernameUpdate) {
      const updateSocial = await prisma?.socials.update({
        where: {
          userId: `${userId}`,
        },
        data: <Socials>{
          url: url,
          instagram: instagram,
          twitter: twitter,
        },
      });
      return NextResponse.json({
        usernameUpdate,
        updateSocial,
      });
    }
  }

  return NextResponse.json({
    message: "failed",
  });
}

export async function GET(
  request: Request,
  { params }: { params: { user: string } }
) {
  const userId = params.user;
  const social = await prisma?.socials.findUnique({
    where: {
      userId: userId,
    },
    select: {
      instagram: true,
      url: true,
      twitter: true,
    },
  });

  return NextResponse.json({
    social,
  });
}

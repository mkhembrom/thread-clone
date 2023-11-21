import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { join } from "path";
import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { Socials, User } from "@prisma/client";
import { fileToBase64 } from "@/lib/convertBase64";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = formData.get("name");
  const username = formData.get("username");
  const email = formData.get("email");
  const password: FormDataEntryValue | null = formData.get("password");
  // const file = formData.get("image") as unknown as File;
  const file = formData.get("image") as string;

  const hashedPassword = await bcrypt.hash(`${password}`, 12);

  if (!name || !email || !username) {
    return NextResponse.json({ file: true, message: "success " });
  }

  if (file) {
    // const bytes = await file.arrayBuffer();
    // const buffer = Buffer.from(bytes);
    // const path = join("public", file.name);
    // fs.writeFileSync(path, buffer);

    // const base64 = await fileToBase64(file);
    // console.log(base64);

    const uploadedResponse = await cloudinary.uploader.upload(file, {
      folder: "threads",
      upload_preset: "ml_default",
      resource_type: "image",
    });
    const { secure_url } = uploadedResponse;

    const userUpdate = await prisma?.user.create({
      data: <User>{
        name: name,
        email: email,
        username: username,
        hashPassword: hashedPassword,
        image: secure_url,
      },
    });

    await prisma?.socials.create({
      data: <Socials>{
        instagram: "",
        url: "",
        twitter: "",
        userId: userUpdate.id,
      },
    });
  } else {
    const userUpdate = await prisma?.user.create({
      data: <User>{
        name: name,
        email: email,
        username: username,
        hashPassword: hashedPassword,
      },
    });

    await prisma?.socials.create({
      data: <Socials>{
        instagram: "",
        url: "",
        twitter: "",
        userId: userUpdate.id,
      },
    });
  }

  return NextResponse.json({ message: "Account Created Successfully" });
}

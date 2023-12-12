"use server";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import prisma from "@/lib/prismadb";
import { Image, Post } from "@prisma/client";
import getCurrentUser from "@/components/currentUser/currentUser";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { signIn } from "next-auth/react";

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

export async function getProfile(slug: string) {
  const user = await prisma?.user.findUnique({
    where: {
      username: slug,
    },
    include: {
      following: true,
      followedBy: true,
      socials: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          image: {
            orderBy: {
              createdAt: "asc",
            },
          },
          likes: true,
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      comments: {
        include: {
          replies: true,
          parentComment: {
            include: {
              user: true,
              post: true,
              likes: true,
              images: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              user: true,
              image: true,
              likes: true,
            },
          },
          images: true,
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
      _count: true,
    },
  });

  return { user };
}

export async function getRepost() {
  const currentUser = await getCurrentUser();

  const repost = await prisma?.repost.findMany({
    where: {
      userId: currentUser?.id,
    },
    include: {
      post: {
        include: {
          user: true,
          image: true,
          reposts: true,
          comments: {
            select: {
              reply: true,
              images: true,
              user: true,
            },
          },

          likes: {
            select: {
              userId: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return { repost };
}

export async function getReplies() {
  const currentUser = await getCurrentUser();

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_DB_HOST}/api/${currentUser?.username}`,
  //   {
  //     method: "GET",
  //     cache: "no-cache",
  //   }
  // );

  // if (!res.ok) {
  //   throw new Error("fetch data failed");
  // }

  // return res.json();
  const user = await prisma?.user.findUnique({
    where: {
      username: currentUser?.username as string,
    },
    include: {
      following: true,
      followedBy: true,
      socials: true,
      posts: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          image: {
            orderBy: {
              createdAt: "asc",
            },
          },
          likes: true,
          user: true,
          comments: {
            include: {
              user: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      comments: {
        include: {
          replies: true,
          parentComment: {
            include: {
              user: true,
              post: true,
              likes: true,
              images: true,
            },
          },
          post: {
            select: {
              id: true,
              content: true,
              createdAt: true,
              user: true,
              image: true,
              likes: true,
            },
          },
          images: true,
          user: true,
          likes: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
      likes: true,
      _count: true,
    },
  });

  return { user };
}

export async function getPost(username: string, postId: string) {
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_DB_HOST}/api/post/${username}/post/${postId}`,
  //   {
  //     cache: "no-cache",
  //   }
  // );

  // if (!res.ok) {
  //   throw new Error("Failed to fetch data");
  // }
  // return res.json();

  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      image: true,
      comments: {
        select: {
          userId: true,
          reply: true,
          images: true,
        },
      },
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  return { post };
}

export async function commentSubmit(formData: FormData) {
  const reply = formData.get("reply");
  const postId = formData.get("postId");
  const imagefile = formData.get("image") as File as unknown;
  const userId = formData.get("userId");

  console.log(JSON.stringify({ reply, postId, imagefile, userId }));
}

export async function getAllPost() {
  const posts = await prisma?.post.findMany({
    include: {
      user: true,
      image: true,
      likes: true,
      reposts: true,
      comments: {
        include: {
          user: true,
          images: true,
          likes: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const reposts = await prisma?.repost.findMany({
    select: {
      post: {
        include: {
          user: true,
          image: true,
          likes: true,
          reposts: true,
          comments: {
            include: {
              user: true,
              images: true,
              likes: true,
            },
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      },
      createdAt: true,
      user: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  });

  function compareDates(a: any, b: any) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  }

  revalidatePath("/");

  const allPosts = [...reposts, ...posts].sort(compareDates);
  return { allPosts };
}

export async function getNotification() {
  const currentUser = await getCurrentUser();

  const notification = await prisma?.notification.findMany({
    where: {
      toUserId: currentUser?.id,
      NOT: {
        userId: currentUser?.id,
      },
    },
    include: {
      user: true,
      post: {
        select: {
          id: true,
          content: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
      comment: {
        select: {
          id: true,
          reply: true,
          postId: true,
          user: {
            select: {
              username: true,
            },
          },
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return {
    notification,
  };
}

export async function loginAction(formData: FormData) {
  const userinfo = formData.get("userinfo");
  const password = formData.get("password");

  console.log(userinfo, password);

  if (typeof window === "undefined") {
    await signIn("credentials", {
      identifier: userinfo,
      password: password,
      redirect: false,
    });
  }
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prismadb";
import { File } from "buffer";
import { v2 as cloudinary } from "cloudinary";
import getCurrentUser from "@/components/currentUser/currentUser";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const postId = params.slug;

  const comments = await prisma?.comment.findMany({
    where: {
      postId: `${postId}`,
    },

    include: {
      replies: {
        select: {
          id: true,
          reply: true,
          likes: true,
          user: true,
          images: true,
          postId: true,
          parentId: true,
        },
      },
      post: {
        select: {
          id: true,
          content: true,
        },
      },
      user: true,
      images: true,
      likes: true,
    },
  });

  // const commentReplies = await prisma?.comment.findMany({
  //   where: {
  //     postId: `${postId}`,
  //   },

  //   include: {
  //     replies: {
  //       select: {
  //         id: true,
  //         reply: true,
  //         likes: true,
  //         user: true,
  //         images: true,
  //         postId: true,
  //       },
  //     },
  //   },
  // });

  return NextResponse.json({ comments });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const currentUser = await getCurrentUser();

  const commentId = params.slug;
  const formData = await request.formData();
  const replyText = formData.get("replyText");
  const postId = formData.get("postId");
  const file = formData.get("file") as unknown as File;

  const parentComment = await prisma.comment.findUnique({
    where: { id: commentId },
    select: {
      userId: true,
    },
  });

  if (!parentComment) {
    return NextResponse.json({ error: "Parent comment not found" });
  }

  if (file) {
    const buffer = Buffer.from(await file.arrayBuffer());
    // fs.writeFileSync(`public/${file.name}`, buffer);

    // const uploadedResponse = await cloudinary.uploader.upload(
    //   `public/${file.name}`,
    //   {
    //     folder: "threads/comments",
    //     upload_preset: "ml_default",
    //     resource_type: "image",
    //   }
    // );
    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "threads/comment",
            upload_preset: "ml_default",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              console.error(error);
              reject(new Error("Error uploading to Cloudinary"));
            } else {
              console.log(result);
              resolve(result);
            }
          }
        )
        .end(buffer);
    });

    const { secure_url, original_filename } = result;

    const commentsOfComment = await prisma?.comment.create({
      data: <any>{
        reply: `${replyText}`,
        parentId: commentId,
        userId: currentUser?.id,
        postId: `${postId}`,
        images: {
          create: {
            imageUrl: secure_url,
            imageName: original_filename,
          },
        },
      },
    });

    const notify = await prisma?.notification.create({
      data: {
        commentId: commentId,
        userId: currentUser?.id,
        postId: `${postId}`,
        toUserId: parentComment.userId,
        body: `${currentUser?.username} commented on your post`,
      },
    });
    console.log(notify);
    return NextResponse.json({ commentsOfComment, notify });
  } else {
    const commentsOfComment = await prisma?.comment.create({
      data: <any>{
        reply: `${replyText}`,
        parentId: commentId,
        userId: currentUser?.id,
        postId: `${postId}`,
      },
    });

    const notify = await prisma?.notification.create({
      data: {
        commentId: commentId,
        userId: currentUser?.id,
        toUserId: parentComment.userId,
        postId: `${postId}`,
        body: `${currentUser?.username} commented on your reply`,
      },
    });
    return NextResponse.json({ commentsOfComment, notify });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const commentId = params.slug;

  await prisma?.comment.delete({
    where: {
      id: commentId,
    },
  });

  return NextResponse.json({ comments: "deleted" });
}

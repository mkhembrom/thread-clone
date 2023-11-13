import getCurrentUser from "@/components/currentUser/currentUser";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const userId = params.slug;

  const repost = await prisma?.repost.findMany({
    where: {
      userId: userId,
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

  return NextResponse.json({ repost });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const currentUser = await getCurrentUser();
  const body = await request.json();

  const { userId } = body;
  const postId = params.slug;

  const findPost = await prisma?.repost.findFirst({
    where: {
      postId: postId,
    },
  });

  if (findPost) {
    await prisma?.repost.delete({
      where: {
        id: findPost.id,
      },
    });
    return NextResponse.json({ message: "repost removed" });
  } else {
    const repost = await prisma?.repost.create({
      data: {
        postId: postId,
        userId: userId,
      },
    });

    return NextResponse.json({ repost });
  }
}

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { slug: string } }
// ) {
//   const repostId = params.slug;

//   const findPost = await prisma?.repost.findFirst({
//     where: {
//       postId: repostId,
//     },
//   });

//   if (findPost) {
//     await prisma?.repost.delete({
//       where: {
//         id: findPost.id,
//       },
//     });
//   }

//   return NextResponse.json({ message: "remove repost" });
// }

import Replies from "@/components/replies/replies";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostDropDown from "@/components/postDropDown/postDropDown";
import PostButtons from "@/components/postButtons/postButtons";
import { formatTimeAgo } from "@/lib/timeFormat";
import ImagePreview from "@/components/imagePreview/imagePreview";
import AvatarCn from "@/components/avatar/avatar";
import ReplyAndLike from "@/components/replyAndComment/replyAndLikes";
import { getPost } from "@/actions/action";
import { IPost } from "../types";
import ClientComponent from "@/lib/clientComponent";
import prisma from "@/lib/prismadb";

async function getPosts(postId: string) {
  const post = await prisma?.post.findUnique({
    where: {
      id: postId,
    },
    include: {
      user: true,
      image: true,
      comments: true,
      likes: {
        select: {
          userId: true,
        },
      },
    },
  });

  return post;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const username = params.slug[0];
  const postId = params.slug[2];
  const post = await getPosts(postId);

  const formattedDate = formatTimeAgo(`${post?.createdAt}`);

  return (
    <>
      <div className="mb-10">
        <div className="flex flex-col items-start w-full relative">
          <Link
            className="absolute top-0 left-0 right-0 bottom-0"
            href={`/${username as string}/post/${post?.id as string}`}
            replace
          ></Link>
          <div className="flex z-30 items-center justify-between w-full">
            <div className="flex items-center space-x-4">
              <ClientComponent>
                <AvatarCn source={post?.user?.image as string} />
              </ClientComponent>
              <Link
                href={`/${post?.user?.username as string}`}
                scroll={true}
                className={`text-md font-bold hover:underline`}
              >
                {post?.user.name}
              </Link>
            </div>

            <div className=" flex space-x-2 items-center">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm ">
                {formattedDate}
              </p>
              <Button
                asChild
                className="hover:bg-zinc-400 dark:hover:bg-zinc-300 text-zinc-600 dark:text-zinc-200 rounded-full focus:outline-none"
                variant={"ghost"}
                size={"icon"}
              >
                <ClientComponent>
                  <PostDropDown postId={post?.id} userId={post?.userId} />
                </ClientComponent>
              </Button>
            </div>
          </div>
          <p className={`text-md pt-1 py-2`}>{post?.content}</p>
          <ImagePreview imageData={post?.image as any} />

          <PostButtons postData={post as IPost | any} />

          <ClientComponent>
            <ReplyAndLike
              postData={post as any}
              replies={post?.comments as any}
            />
          </ClientComponent>
        </div>

        <Replies postId={postId} />
      </div>
    </>
  );
}

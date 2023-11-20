import Replies from "@/components/replies/replies";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PostDropDown from "@/components/postDropDown/postDropDown";
import ThreeDotsIcon from "@/components/ui/icons/threeDots";
import PostButtons from "@/components/postButtons/postButtons";
import { formatTimeAgo } from "@/lib/timeFormat";
import ImagePreview from "@/components/imagePreview/imagePreview";
import AvatarCn from "@/components/avatar/avatar";
import ReplyAndLike from "@/components/replyAndComment/replyAndLikes";
import getCurrentUser from "@/components/currentUser/currentUser";

async function getPost(username: string, postId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/post/${username}/post/${postId}`,
    {
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({ params }: { params: { slug: string } }) {
  const currentUser = await getCurrentUser();
  const username = params.slug[0];
  const postId = params.slug[2];
  const { post } = await getPost(username, postId);

  const formattedDate = formatTimeAgo(`${post?.createdAt}`);

  return (
    <div className="mb-10">
      <div className="flex flex-col items-start w-full relative">
        <Link
          className="absolute top-0 left-0 right-0 bottom-0"
          href={`/${username}/post/${post?.id}`}
          replace
        ></Link>
        <div className="flex z-30 items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <AvatarCn source={post?.user?.image} />
            <Link
              href={`/${post?.user?.username}`}
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
              <PostDropDown postId={post?.id} userId={post?.userId}>
                <ThreeDotsIcon />
              </PostDropDown>
            </Button>
          </div>
        </div>
        <p className={`text-md pt-1 py-2`}>{post?.content}</p>
        <ImagePreview imageData={post?.image} />

        <PostButtons postData={post} />

        <ReplyAndLike postData={post} replies={post.comments} />
      </div>

      <Replies postId={postId} />
    </div>
  );
}
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import PlusIcon from "../ui/icons/plus";
import ReplyAndComment from "../replyAndComment/replyAndLikes";
import PostDropDown from "../postDropDown/postDropDown";
import { IPost } from "@/app/types";
import ReplyUsers from "../replyUsers/replyUsers";
import PostButtons from "../postButtons/postButtons";
import { formatTimeAgo } from "@/lib/timeFormat";
import ImagePreview from "../imagePreview/imagePreview";
import AvatarCn from "../avatar/avatar";

interface PostProps {
  post: IPost;
}

export default async function Repost({ post }: PostProps) {
  const formattedDate = formatTimeAgo(`${post.createdAt}`);
  return (
    <div
      className={`w-full flex border-b pb-4 mb-4 dark:border-zinc-600 border-zinc-300 cursor-pointer`}
    >
      <div className="flex flex-row items-start space-x-2 w-full">
        <div className="flex flex-col items-center justify-between h-full space-y-4">
          <div className="relative z-30 ">
            <AvatarCn source={post?.user?.image!} />

            <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
              <PlusIcon />
            </div>
          </div>

          <div className="w-[2px] h-full max-h-full dark:bg-[#333638]  bg-zinc-300"></div>
          <ReplyUsers comments={post?.comments} />
        </div>

        <div className="flex flex-col justify-between items-start w-full relative">
          <Link
            className="absolute top-0 left-0 right-0 bottom-0"
            href={`/${post?.user?.username}/post/${post?.id}`}
          ></Link>

          <div className="flex z-30 justify-between w-full">
            <Link
              href={`/${post?.user?.username}`}
              className={`text-base font-bold hover:underline`}
            >
              {post?.user?.name}
            </Link>
            <div className="flex space-x-2 items-center">
              <p className="text-zinc-600 dark:text-zinc-400 text-sm ">
                {formattedDate}
              </p>
              <Button
                asChild
                className="hover:bg-zinc-400 dark:hover:bg-zinc-300 text-zinc-600 dark:text-zinc-200 rounded-full focus:outline-none"
                variant={"ghost"}
                size={"icon"}
              >
                <PostDropDown postId={post?.id as any} />
              </Button>
            </div>
          </div>
          <p className={`text-sm pt-1 pb-4`}>{post?.content}</p>
          <ImagePreview postData={post} imageData={post?.image} />

          <PostButtons postData={post} />

          <ReplyAndComment postData={post} replies={post?.comments} />
        </div>
      </div>
    </div>
  );
}

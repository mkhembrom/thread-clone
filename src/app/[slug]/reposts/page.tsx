import { getRepost } from "@/actions/action";
import { IPost } from "@/app/types";
import getCurrentUser from "@/components/currentUser/currentUser";
import Post from "@/components/post/post";
import Repost from "@/components/repost/repost";
import React from "react";

interface repostProps {
  params: {
    slug: string;
  };
}

export default async function Reposts({ params }: repostProps) {
  const currentUser = await getCurrentUser();
  const { repost } = await getRepost(currentUser?.id!);
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {repost?.map((item: IPost, index: number) => (
        <Repost key={index} post={item.post} />
      ))}
    </div>
  );
}

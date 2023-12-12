import { getRepost } from "@/actions/action";
import { IPost } from "@/app/types";
import Repost from "@/components/repost/repost";
import React from "react";

interface repostProps {}

export default async function Page({}: repostProps) {
  const { repost } = await getRepost();
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {repost.map((item: IPost | any, index: number) => (
        <Repost key={index} post={item.post} />
      ))}
    </div>
  );
}

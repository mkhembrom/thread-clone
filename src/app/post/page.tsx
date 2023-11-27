import React from "react";
import Post from "@/components/post/post";
import { getAllPost } from "@/actions/action";

type Props = {};

export default async function Page({}: Props) {
  const { allPosts } = await getAllPost();

  return (
    <div className={`justify-center flex flex-col items-center py-4`}>
      {allPosts.map((item: any, index: number) => (
        <Post key={index} post={item} />
      ))}
    </div>
  );
}

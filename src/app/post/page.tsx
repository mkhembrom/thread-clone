import React from "react";
import Post from "@/components/post/post";

type Props = {};

async function getAllPost() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/post/`, {
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

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

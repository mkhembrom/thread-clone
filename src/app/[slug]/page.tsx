import { IPost } from "@/app/types";
import Post from "@/components/post/post";
import { loginIsRequiredServer } from "@/lib/isLoginUser";
import React from "react";

async function getProfile(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page({
  params: { slug },
}: {
  params: { slug: string };
}) {
  const { user } = await getProfile(slug);
  await loginIsRequiredServer();

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {user ? (
        user?.posts?.map((item: IPost) => <Post key={item?.id} post={item} />)
      ) : (
        <p className="dark:text-zinc-600"> No threads</p>
      )}
    </div>
  );
}

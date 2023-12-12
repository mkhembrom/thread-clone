import { getProfile } from "@/actions/action";
import { IPost } from "@/app/types";
import Post from "@/components/post/post";
import { loginIsRequiredServer } from "@/lib/isLoginUser";
import React from "react";

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
        user?.posts?.map((item: IPost | any) => (
          <Post key={item?.id} post={item} />
        ))
      ) : (
        <p className="dark:text-zinc-600"> No threads</p>
      )}
    </div>
  );
}

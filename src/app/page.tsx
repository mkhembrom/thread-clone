"use server";

import PostCreation from "@/components/postCreation/postCreation";
import PostList from "@/components/postList/postList";
import { loginIsRequiredServer } from "@/lib/isLoginUser";

export async function getAllPost() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/post/`, {
    method: "GET",
    cache: "no-cache",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Page() {
  await loginIsRequiredServer();
  const { allPosts } = await getAllPost();
  return (
    <div className={`w-full h-full`}>
      <PostCreation />
      <div className="mb-10">
        <PostList allPosts={allPosts} />
      </div>
    </div>
  );
}

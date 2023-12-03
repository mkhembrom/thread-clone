"use server";

import { getAllPost } from "@/actions/action";
import PostCreation from "@/components/postCreation/postCreation";
import PostList from "@/components/postList/postList";
import { loginIsRequiredServer } from "@/lib/isLoginUser";

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

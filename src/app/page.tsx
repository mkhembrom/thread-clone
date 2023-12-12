"use server";

import PostCreation from "@/components/postCreation/postCreation";
import PostList from "@/components/postList/postList";
import { loginIsRequiredServer } from "@/lib/isLoginUser";

export default async function Page() {
  await loginIsRequiredServer();
  return (
    <div className="w-full h-full">
      <PostCreation />
      <div className="mb-10">
        <PostList />
      </div>
    </div>
  );
}

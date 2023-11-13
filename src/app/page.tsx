import PostCreation from "@/components/postCreation/postCreation";
import PostList from "@/components/postList/postList";

import { loginIsRequiredServer } from "./api/auth/[...nextauth]/route";

export default async function Home() {
  await loginIsRequiredServer();

  return (
    <div className={`w-full h-full`}>
      <PostCreation />
      <div className="mb-10">
        <PostList />
      </div>
    </div>
  );
}

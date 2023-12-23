import { IComment } from "@/app/types";

import RootComment from "../rootComment/rootComment";
interface repliesProps {
  postId: string;
}

async function getComment(postId: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/comment/${postId}`,
    {
      cache: "no-cache",
    }
  );
  if (!res.ok) {
    throw new Error("fetch data failed to load");
  }

  return res.json();
}

export default async function Replies({ postId }: repliesProps) {
  const { comments } = await getComment(postId);
  const postComments = comments.filter((item: any) => item.parentId === null);

  return (
    <div className="w-full flex flex-col my-4">
      {postComments.map((item: IComment | any) => (
        <div
          key={item.id}
          className="border-t dark:border-zinc-600 border-zinc-300 py-4 my-2"
        >
          <RootComment comment={item} />
        </div>
      ))}
    </div>
  );
}

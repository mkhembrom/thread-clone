import { IComment } from "@/app/types";
import getCurrentUser from "@/components/currentUser/currentUser";
import UserReplies from "@/components/userReplies/userReplies";
import React from "react";

type Props = {};

async function getReplies(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/${username}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );

  if (!res.ok) {
    throw new Error("fetch data failed");
  }

  return res.json();
}

export default async function Replies({}: Props) {
  const currentUser = await getCurrentUser();
  const { user: replies } = await getReplies(currentUser?.username!);
  return (
    <div className="flex mx-auto w-full">
      <div className="flex items-center justify-center flex-col w-full">
        {replies.comments?.map((item: IComment | any, index: number) => (
          <UserReplies key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

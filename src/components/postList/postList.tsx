"use server";

import React from "react";
import Post from "../post/post";
import { IPost } from "@/app/types";
import Repost from "../repost/repost";
import RetweetIcon from "../ui/icons/retweet";
import Link from "next/link";
import { formatTimeAgo } from "@/lib/timeFormat";

type Props = {
  allPosts: IPost[];
};

export default async function PostList({ allPosts }: Props) {
  const posts = allPosts;
  return (
    <div className=" justify-center flex flex-col items-center py-4">
      {posts.map((item: IPost) => {
        if (item.post) {
          return (
            <div key={item.post.id} className="rounded-3xl w-full">
              <p className="text-zinc-400 text-sm flex items-center pb-2 ">
                <span className="text-zinc-400 mr-2 w-4 h-4 flex items-center justify-center">
                  <RetweetIcon />
                </span>
                <Link
                  href={`/${item.user.username}`}
                  className="hover:underline mr-2"
                >
                  {item.user.username}
                </Link>
                reposted {formatTimeAgo(`${item.createdAt}`)}
              </p>

              <Repost post={item.post} />
            </div>
          );
        }
        return <Post key={item.id} post={item} />;
      })}
    </div>
  );
}

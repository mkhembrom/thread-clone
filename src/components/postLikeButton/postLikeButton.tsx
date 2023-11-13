"use client";

import { ILike, IPost, IUser } from "@/app/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import HeartLikeIcon from "../ui/icons/heartLike";
import HeartIcon from "../ui/icons/heart";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";

interface postLikeButtonProps {
  postData?: IPost;
  session?: IUser | any;
}
export default function PostLikeButton({
  postData,
  session,
}: postLikeButtonProps) {
  let isLiked;
  const [liked, setLiked] = useState<boolean | undefined>(isLiked);
  const route = useRouter();
  const handleLike = async (postId: string, userId: string) => {
    console.log(`${process.env.NEXT_PUBLIC_DB_HOST}/api/like/${postId}`);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/like/${postId}`,
      {
        method: "POST",
        body: JSON.stringify({ userId }),
        cache: "no-cache",
      }
    );

    if (res.ok) {
      setLiked(true);
      route.refresh();
    } else {
      throw new Error("Failed to fetch data");
    }
  };

  isLiked = postData?.likes?.some((item) => item?.userId === session?.id);

  return (
    <Button
      variant={"ghost"}
      className="rounded-full"
      size={"icon"}
      onClick={() => handleLike(postData?.id!, session?.id!)}
    >
      {isLiked ? <HeartLikeIcon /> : <HeartIcon />}
    </Button>
  );
}

"use client";

import { ILike, IPost, IUser } from "@/app/types";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import HeartLikeIcon from "../ui/icons/heartLike";
import HeartIcon from "../ui/icons/heart";
import { useRouter } from "next/navigation";
import useStore from "@/store/store";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";

interface postLikeButtonProps {
  postData?: IPost;
  currentUser?: IUser | any;
}
export default function PostLikeButton({
  postData,
  currentUser,
}: postLikeButtonProps) {
  let isLiked;
  const [liked, setLiked] = useState<boolean | undefined>(isLiked);
  const route = useRouter();
  const handleLike = async (postId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/like/${postId}`,
      {
        method: "POST",
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

  isLiked = postData?.likes?.some((item) => item?.userId === currentUser?.id);

  return (
    <Button
      variant={"ghost"}
      className="rounded-full"
      size={"icon"}
      onClick={() => handleLike(postData?.id!)}
    >
      {isLiked ? <HeartLikeIcon /> : <HeartIcon />}
    </Button>
  );
}

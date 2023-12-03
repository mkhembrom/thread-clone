"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IPost, IUser } from "@/app/types";
import RetweetIcon from "../ui/icons/retweet";
import toast from "react-hot-toast";
import RetweetGreenIcon from "../ui/icons/retweetgreen";
import { useRouter } from "next/navigation";

interface postRepostButtonProps {
  postData: IPost;
  user: any;
}

export default function PostRepostButton({
  postData,
  user,
}: postRepostButtonProps) {
  const router = useRouter();
  let repostdata;
  const handleRepostBtn = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/repost/${postData.id}`,
      {
        method: "POST",
        body: JSON.stringify({ userId: user?.id }),
        cache: "no-cache",
      }
    );

    if (res.ok) {
      toast.success("success", {
        style: {
          borderRadius: "8px",
          padding: "12px",
          width: "250px",
          backgroundColor: "black",
          color: "white",
        },
      });
      router.refresh();
    }
  };

  repostdata = postData?.reposts?.some(
    (item: any) => `${item?.userId}` === `${user?.id}`
  );

  return (
    <Button
      variant={"ghost"}
      className={`rounded-full`}
      size={"icon"}
      onClick={handleRepostBtn}
    >
      {repostdata ? <RetweetGreenIcon /> : <RetweetIcon />}
    </Button>
  );
}

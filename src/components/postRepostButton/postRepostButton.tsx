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
  currentUser: IUser | any;
}

export default function PostRepostButton({
  postData,
  currentUser,
}: postRepostButtonProps) {
  const router = useRouter();
  let repostdata;
  const handleRepostBtn = async (postId: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/repost/${postId}`,
      {
        method: "POST",
        body: JSON.stringify({ userId: currentUser.id }),
        cache: "no-cache",
      }
    );

    if (res.ok) {
      toast.success("success");
      router.refresh();
    }
  };

  // useEffect(() => {
  //   fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/repost/${currentUser?.id}`, {
  //     method: "GET",
  //   })
  //     .then((res) => {
  //       return res.json();
  //     })
  //     .then((data) => {
  //       router.refresh();
  //     });
  // }, [currentUser?.id, router]);

  repostdata = postData?.reposts?.some(
    (item: any) => `${item?.userId}` == `${currentUser?.id}`
  );

  return (
    <Button
      variant={"ghost"}
      className={`rounded-full`}
      size={"icon"}
      onClick={() => handleRepostBtn(postData.id)}
    >
      {repostdata ? <RetweetGreenIcon /> : <RetweetIcon />}
    </Button>
  );
}

"use client";
import React, { useEffect, useId, useState } from "react";
import { Button } from "../ui/button";
import HeartIcon from "../ui/icons/heart";
import RetweetIcon from "../ui/icons/retweet";
import SendIcon from "../ui/icons/send";
import HeartLikeIcon from "../ui/icons/heartLike";
import { IComment, ILike, IUser } from "@/app/types";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CommentToCommentButton from "../commentToCommentButton/commentToCommentButton";

interface commentButtonsProps {
  comment: IComment | any;
  currentUser: IUser | any;
}

type myPromsieData = {
  message: string;
};

export default function CommentButtons({
  comment,
  currentUser,
}: commentButtonsProps) {
  let isMatch;
  const router = useRouter();

  const myPromise = (): Promise<myPromsieData> => {
    return new Promise((resolve, reject) => {
      fetch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/like/${comment.postId}/${comment.id}`,
        {
          method: "POST",
          body: JSON.stringify({ userId: currentUser?.id }),
          cache: "no-cache",
        }
      ).then((data) => {
        resolve(data.json());
      });
    });
  };

  const handleCommentLike = async () => {
    toast
      .promise(
        myPromise(),

        {
          loading: "...",
          success: (data: myPromsieData) => `${data?.message}`,
          error: (error) => `Error: ${error}`,
        },
        {
          style: {
            borderRadius: "8px",
            padding: "12px",
            width: "250px",
            backgroundColor: "black",
            color: "white",
          },
        }
      )
      .then((data) => {
        if (data) {
          router.refresh();
        }
      });
  };

  isMatch = comment?.likes.some((item: any) => item.userId === currentUser?.id);

  return (
    <div className="flex space-x-1 items-center py-0 z-10">
      <Button
        variant={"ghost"}
        className="rounded-full"
        size={"icon"}
        onClick={handleCommentLike}
      >
        {isMatch ? <HeartLikeIcon /> : <HeartIcon />}
      </Button>

      <CommentToCommentButton comment={comment!} currentUser={currentUser} />
      <Button variant={"ghost"} className="rounded-full" size={"icon"}>
        <RetweetIcon />
      </Button>
      <Button variant={"ghost"} className="rounded-full" size={"icon"}>
        <SendIcon />
      </Button>
    </div>
  );
}

"use client";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { IComment, IPost, IUser } from "@/app/types";
interface replyAndCommentProps {
  postData: IPost;
  replies?: IComment[];
}

export default function ReplyAndLike({
  postData,
  replies,
}: replyAndCommentProps) {
  const likeCount = postData?.likes.length;
  return (
    <div className="flex flex-col items-start justify-center pl-2">
      <div className="flex space-x-2 items-center">
        {replies?.length != 0 && (
          <>
            {replies?.length == 1 ? (
              <>
                <Button
                  asChild
                  variant={"link"}
                  size={"link"}
                  className={`dark:text-gray-300 text-sm font-normal`}
                >
                  <Link href={`/post/${postData?.id}`}>
                    {replies?.length} reply
                  </Link>
                </Button>
                <div className={`text-black dark:text-white rounded-full`}>
                  &middot;
                </div>
              </>
            ) : (
              <>
                <Button
                  asChild
                  variant={"link"}
                  size={"link"}
                  className={`dark:text-gray-300 text-sm font-normal`}
                >
                  <Link href={`/post/${postData.id}`}>
                    {replies?.length} replies
                  </Link>
                </Button>
                <div className={`text-black dark:text-white rounded-full`}>
                  &middot;
                </div>
              </>
            )}
          </>
        )}

        <Button
          variant={"link"}
          size={"link"}
          className={`dark:text-gray-300 text-sm font-normal`}
        >
          {likeCount} like
        </Button>
      </div>
    </div>
  );
}

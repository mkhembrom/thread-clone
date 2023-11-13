"use client";
import React, { useCallback } from "react";
import { IComment } from "@/app/types";
import AvatarCn from "../avatar/avatar";

interface replyUsersProps {
  comments: IComment[];
}

export default function ReplyUsers({ comments }: replyUsersProps) {
  const getUniqueObjects = useCallback((arr: IComment[]) => {
    const uniqueObjects: IComment[] = [];

    arr.forEach((obj: IComment) => {
      if (uniqueObjects.indexOf(obj) === -1) {
        uniqueObjects.push(obj);
      }
    });

    return uniqueObjects;
  }, []);

  const uniqueObjects = getUniqueObjects(comments);

  return (
    <div className="relative flex w-10 overflow-hidden items-center justify-end h-6">
      {uniqueObjects.length > 0 &&
        uniqueObjects.map((item, index) => (
          <AvatarCn
            key={index}
            source={item?.user?.image!}
            height={"5"}
            width={"5"}
          />
        ))}
    </div>
  );
}

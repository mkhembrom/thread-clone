"use client";
import React from "react";
import AvatarCn from "../avatar/avatar";
import HeartIcon from "../ui/icons/heart";
import useStore from "@/store/store";
import { INotification } from "@/app/types";
import PostIcon from "../ui/icons/post";
import PostLikeIcon from "../ui/icons/postLikeIcon";

interface notificationProps {
  likes?: number;
  notification: INotification | any;
  avatar?: string;
}

export default function Notification({
  likes,
  notification,
  avatar,
}: notificationProps) {
  const updateLikedCount = useStore((state) => state.updateLikedCount);
  updateLikedCount(likes);
  return (
    <div className="flex flex-col ">
      <div className="flex item-start space-x-2 my-2">
        {notification?.post != null && notification?.comment != null && (
          <>
            <div>
              <div className="relative z-30 ">
                <AvatarCn source={notification.post.user.image} />
                <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-sky-600  flex items-center justify-center">
                  <PostIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
              <h1>Manjesh Hembrom</h1>
              <p className="text-zinc-400 text-sm">
                {notification?.comment?.reply}
              </p>
            </div>
          </>
        )}

        {notification?.post != null && notification?.comment == null && (
          <>
            <div>
              <div className="relative z-30 ">
                <AvatarCn source={notification.post.user.image} />
                <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-rose-600  flex items-center justify-center">
                  <PostLikeIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
              <h1>Manjesh Hembrom</h1>
              <p className="text-zinc-400 text-sm">
                {notification?.post?.content}
              </p>
            </div>
          </>
        )}

        {notification?.post == null && notification?.comment != null && (
          <>
            <div>
              <div className="relative z-30 ">
                <AvatarCn source={notification.comment.user.image} />
                <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-rose-600  flex items-center justify-center">
                  <PostLikeIcon />
                </div>
              </div>
            </div>
            <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
              <h1>Manjesh Hembrom</h1>
              <p className="text-zinc-400 text-sm">
                {notification?.comment?.reply}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

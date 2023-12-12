"use server";
import React from "react";
import AvatarCn from "../avatar/avatar";
import HeartLikeNotificationIcon from "../ui/icons/heartLikeNotificationIcon";
import { INotification } from "@/app/types";
import Link from "next/link";
import MessageNotificationIcon from "../ui/icons/messageNotificationIcon";
import { formatTimeAgo } from "@/lib/timeFormat";
import { getNotification } from "@/actions/action";

interface notificationProps {}

export default async function Notification({}: notificationProps) {
  const { notification: notify } = await getNotification();

  return (
    <>
      {notify && notify.length > 0 ? (
        notify.map((item: INotification | any) => {
          if (item?.comment && item.post == null) {
            return (
              <Link
                href={`/${item.comment.user.username}/post/${item.comment.postId}`}
                key={item.id}
                className="flex flex-col "
              >
                <div className="flex item-start space-x-2 my-2">
                  <div>
                    <div className="relative z-30 ">
                      <AvatarCn source={item.user.image} />

                      <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-rose-600  flex items-center justify-center">
                        <HeartLikeNotificationIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
                    <div className="flex items-center">
                      <h1>{item.user.name}</h1>
                      <div className="text-sm ml-4 dark:text-zinc-400">
                        {formatTimeAgo(`${item?.createdAt}`)}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm">
                      {item?.post?.content}
                    </p>
                    <p className="text-white text-[16px]">
                      {item.comment.reply}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }

          if (item.post && item.comment) {
            return (
              <Link
                href={`/${item.comment.user.username}/post/${item.comment.postId}`}
                key={item.id}
                className="flex flex-col "
              >
                <div className="flex item-start space-x-2 my-2">
                  <div>
                    <div className="relative z-30 ">
                      <AvatarCn source={item.user.image} />

                      <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-sky-600  flex items-center justify-center">
                        <MessageNotificationIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
                    <div className="flex items-center">
                      <h1>{item.user.name}</h1>
                      <div className="text-sm ml-4 dark:text-zinc-400">
                        {formatTimeAgo(`${item?.createdAt}`)}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm">{item.post.content}</p>
                    <p className="text-white text-[16px]">
                      {item.comment.reply}
                    </p>
                  </div>
                </div>
              </Link>
            );
          }
          if (item?.post && item?.comment == null) {
            return (
              <Link
                href={`/${item.post.user.username}/post/${item.post.id}`}
                key={item.id}
                className="flex flex-col "
              >
                <div className="flex item-start space-x-2 my-2">
                  <div>
                    <div className="relative z-30 ">
                      <AvatarCn source={item.user.image} />
                      <div className="absolute bottom-0 right-0 rounded-full w-5 h-5 bg-black text-white dark:bg-rose-600  flex items-center justify-center">
                        <HeartLikeNotificationIcon />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col  border-b border-zinc-800 w-full pb-2">
                    <div className="flex items-center">
                      <h1>{item.user.name}</h1>
                      <div className="text-sm ml-4 dark:text-zinc-400">
                        {formatTimeAgo(`${item?.createdAt}`)}
                      </div>
                    </div>
                    <p className="text-zinc-400 text-sm">{item.post.content}</p>
                  </div>
                </div>
              </Link>
            );
          }
        })
      ) : (
        <div className="text-center dark:text-white text-black">
          No activity
        </div>
      )}
    </>
  );
}

import React from "react";
import AvatarCn from "../avatar/avatar";
import PlusIcon from "../ui/icons/plus";
import Image from "next/image";
import CommentButtons from "../commentButtons/commentButtons";
import { Button } from "../ui/button";
import CommentDropDown from "../commentDropDown/commentDropDown";
import ThreeDotsIcon from "../ui/icons/threeDots";
import { IComment } from "@/app/types";
import getCurrentUser from "../currentUser/currentUser";
import RootComment from "../rootComment/rootComment";
import { formatTimeAgo } from "@/lib/timeFormat";

interface childCommentProps {
  item: IComment | any;
  replies?: IComment | any;
}
export default async function ChildComment({
  item,
  replies,
}: childCommentProps) {
  const currentUser = await getCurrentUser();
  const time = formatTimeAgo(item.createdAt);

  return (
    <div className="flex flex-col space-x-2 justify-between items-start py-4 w-full">
      <div className="flex justify-between items-start w-full">
        <div className="flex space-x-4 items-start">
          <div className="relative z-30 ">
            <AvatarCn source={item?.user?.image} />

            <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
              <PlusIcon />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <span className="font-bold ">{item?.user?.name}</span>

            <p className="text-sm pb-2">{item?.reply}</p>

            {item?.images.length > 0 ? (
              <Image
                className="rounded-2xl"
                src={item?.images[0]?.imageUrl}
                width={120}
                height={180}
                alt={item.id}
              />
            ) : (
              <></>
            )}

            <CommentButtons comment={item} currentUser={currentUser} />
            <Button
              variant={"link"}
              size={"link"}
              className={`dark:text-gray-300 text-sm font-normal ml-4 mt-0 pt-0`}
            >
              {item.likes.length!} like
            </Button>
          </div>
        </div>

        <div className="z-30 flex items-center  space-x-2">
          <p className="text-xs text-zinc-600 dark:text-zinc-300">{time}</p>
          <div className="flex items-center ">
            <Button
              asChild
              className="hover:bg-zinc-400 dark:hover:bg-zinc-400  rounded-full "
              variant={"ghost"}
              size={"icon"}
            >
              <CommentDropDown
                commentId={item.id}
                postId={item.postId}
                userId={currentUser?.id!}
                currentUser={currentUser}
              >
                <ThreeDotsIcon />
              </CommentDropDown>
            </Button>
          </div>
        </div>
      </div>
      {item?.replies?.length > 0 &&
        item?.replies.map((item: any) => (
          <ChildComment key={item.id} item={item} />
        ))}
    </div>
  );
}

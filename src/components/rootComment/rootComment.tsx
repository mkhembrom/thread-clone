import { IComment, IUser } from "@/app/types";
import React from "react";
import AvatarCn from "../avatar/avatar";
import PlusIcon from "../ui/icons/plus";
import CommentButtons from "../commentButtons/commentButtons";
import { Button } from "../ui/button";
import CommentDropDown from "../commentDropDown/commentDropDown";
import ThreeDotsIcon from "../ui/icons/threeDots";
import Image from "next/image";
import getCurrentUser from "../currentUser/currentUser";
import ChildComment from "../childComment/childComment";
import prisma from "@/lib/prismadb";
import { formatTimeAgo } from "@/lib/timeFormat";

interface rootCommentProps {
  item: IComment | any;
}

export default async function RootComment({ item }: rootCommentProps) {
  const time = formatTimeAgo(item.createdAt);
  const nestedComments = await prisma?.comment.findMany({
    where: {
      parentId: item.id,
    },
    include: {
      replies: {
        select: {
          id: true,
          reply: true,
          likes: true,
          user: true,
          images: true,
          postId: true,
          parentId: true,
        },
      },
      images: true,
      likes: true,
      user: true,
    },
  });
  return (
    <div className={`flex flex-col justify-between items-startw-full `}>
      <div className="flex justify-between items-start w-full">
        <div className="flex space-x-4 items-start">
          <div className="relative z-30 ">
            <AvatarCn source={item?.user?.image} />

            <div className="absolute bottom-0 right-0 rounded-full bg-black dark:bg-white w-4 h-4 flex items-center justify-center">
              <PlusIcon />
            </div>
          </div>
          <div className="flex flex-col items-start relative">
            {nestedComments.length > 0 && (
              <div className="h-full w-[1.5px] my-4 bg-zinc-300 dark:bg-zinc-600 absolute  -left-[36px] right-0"></div>
            )}
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

            <CommentButtons comment={item} />
            <Button
              variant={"link"}
              size={"link"}
              className={`dark:text-gray-300 text-sm font-normal ml-4 mt-0 pt-0`}
            >
              {item?.likes.length!} like
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
              <CommentDropDown commentId={item.userId} postId={item.postId}>
                <ThreeDotsIcon />
              </CommentDropDown>
            </Button>
          </div>
        </div>
      </div>

      {nestedComments?.length > 0 &&
        nestedComments.map((item: any) => (
          <RootComment key={item.id} item={item} />
        ))}
    </div>
  );
}

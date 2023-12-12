"use client";

import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";
import { IUser } from "@/app/types";
import getCurrentUser from "../currentUser/currentUser";
import Link from "next/link";
import AvatarCn from "../avatar/avatar";
import useCurrentUser from "@/hooks/useCurrentUser";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface userProfileProps {
  user: IUser;
  currentUser: IUser;
}
export default function UsersProfile({ user, currentUser }: userProfileProps) {
  const router = useRouter();
  const handleFollowUser = async (followUserId: string) => {
    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/follow/${followUserId}`, {
          method: "POST",
          cache: "no-cache",
        }),
        {
          loading: "Following...",
          success: "Followed",
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
        router.refresh();
      });
  };

  const isFollowed = user.followedByIDs.includes(currentUser?.id!);
  return (
    <div className="flex space-x-2 w-full items-center  border-b border-zinc-800 py-4 ">
      <div>
        <AvatarCn source={user.image!} />
      </div>
      <div className="flex flex-col items-start justify-start w-full">
        <div className="flex flex-row  w-full">
          <div className="flex flex-row w-full justify-between items-center">
            <div>
              <Link href={`/${user.username}`} className="hover:underline">
                {user.name}
              </Link>
              <p className="flex flex-row  items-center">
                <span className="text-xs text-center">{user.posts.length}</span>
                <span className=" px-1 rounded-lg text-xs italic py-0">
                  threads
                </span>
              </p>
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              className="hover:bg-transparent bg-transparent py-0 px-6 rounded-xl"
              onClick={() => handleFollowUser(user.id)}
            >
              {!isFollowed ? "Follow" : "Unfollow"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

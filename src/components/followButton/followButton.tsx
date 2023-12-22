"use client";
import React from "react";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";

type followButtonProps = {
  user: IUser;
  currentUser: IUser;
};

const FollowButton = ({ user, currentUser }: followButtonProps) => {
  const router = useRouter();
  const handleFollowUser = async () => {
    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/follow/${user.id}`, {
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

  const isFollowed = user?.followedByIDs.includes(currentUser?.id);
  return (
    <Button
      variant={"outline"}
      className={`w-full my-4   dark:bg-[#101010] border border-[#4d4d4d] rounded-xl`}
      onClick={handleFollowUser}
    >
      {!isFollowed ? "Follow" : "Following"}
    </Button>
  );
};

export default FollowButton;

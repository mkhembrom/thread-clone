"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import getCurrentUser from "../currentUser/currentUser";
import prisma from "@/lib/prismadb";
import DeletePost from "../deletePost/deletePost";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";

interface postDropDownProps {
  children: React.ReactNode;
  postId: string;
  userId: string;
}

export default function PostDropDown({
  children,
  postId,
  userId,
}: postDropDownProps) {
  const { user } = useCurrentUserForClient();

  // const postUserId = prisma?.post.findUnique({
  //   where: {
  //     id: postId,
  //     // userId: session?.id,
  //   },
  // });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={`dark:bg-zinc-900 rounded-xl`}>
        <DropdownMenuLabel className="cursor-pointer p-2">
          <Button variant={"dropicon"} size={"dropicon"} className={``}>
            Hide like count
          </Button>
        </DropdownMenuLabel>

        {`${user?.id}` === `${userId}` && (
          <div>
            <DropdownMenuSeparator className={`$ bottom-1`} />
            <DropdownMenuLabel className="cursor-pointer p-2 w-full">
              <DeletePost postId={postId} />
            </DropdownMenuLabel>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

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
import DeletePost from "../deletePost/deletePost";
import { IUser } from "@/app/types";

interface CommentDropDownProps {
  children: React.ReactNode;
  commentId: string;
  postId: string;
  userId: string;
  currentUser: IUser | any;
}

export default function CommentDropDown({
  children,
  commentId,

  currentUser,
}: CommentDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={`dark:bg-zinc-900 rounded-xl`}>
        <DropdownMenuLabel className="cursor-pointer p-2">
          <Button variant={"dropicon"} size={"dropicon"} className={``}>
            Hide like count
          </Button>
        </DropdownMenuLabel>

        {currentUser && (
          <>
            <DropdownMenuSeparator className={`$ bottom-1`} />
            <DropdownMenuLabel className="cursor-pointer p-2 w-full">
              <DeletePost commentId={commentId} />
            </DropdownMenuLabel>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

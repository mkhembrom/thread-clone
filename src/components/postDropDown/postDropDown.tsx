"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CustomAlertDialoge from "../customAlert/customAlertDialoge";
import ThreeDotsIcon from "../ui/icons/threeDots";
import { IUser } from "@/app/types";

interface postDropDownProps {
  currentUser?: IUser | any;
  postId?: string;
  userId?: string;
}

export default function PostDropDown({
  postId,
  userId,
  currentUser,
}: postDropDownProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <ThreeDotsIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={`dark:bg-zinc-900 rounded-xl`}>
        <DropdownMenuLabel className="cursor-pointer p-2">
          <Button variant={"dropicon"} size={"dropicon"} className={``}>
            Hide like count
          </Button>
        </DropdownMenuLabel>

        {`${currentUser?.id}` === `${userId}` && isClient && (
          <div>
            <DropdownMenuSeparator className={`$ bottom-1`} />
            <DropdownMenuLabel className="cursor-pointer p-2 w-full">
              <CustomAlertDialoge postId={postId} />
            </DropdownMenuLabel>
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

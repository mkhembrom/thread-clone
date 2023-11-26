"use client";

import React, { useState } from "react";
import PostDropDown from "../postDropDown/postDropDown";
import { IUser } from "@/app/types";

interface postClientProps {
  postId: string;
  userId: string;
  currentUser: IUser | any;
}

const PostClient = ({ postId, userId, currentUser }: postClientProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <PostDropDown postId={postId} userId={userId} currentUser={currentUser} />
  );
};

export default PostClient;

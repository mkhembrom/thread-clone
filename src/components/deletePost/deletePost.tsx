"use client";

import React from "react";
import { Button } from "../ui/button";

import CustomAlertDialoge from "../customAlert/customAlertDialoge";

interface deletePostProps {
  postId?: string;
  commentId?: string;
}

export default function DeletePost({ postId, commentId }: deletePostProps) {
  return (
    <Button
      asChild
      variant={"dropicon"}
      size={"dropicon"}
      className={`text-red-500 font-bold w-full`}
    >
      <CustomAlertDialoge postId={postId} commentId={commentId} />
    </Button>
  );
}

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
    <div>
      <CustomAlertDialoge postId={postId} commentId={commentId} />
    </div>
  );
}

"use client";
import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface customAlertDialogeProps {
  postId?: string;
  commentId?: string;
}

export default function CustomAlertDialoge({
  postId,
  commentId,
}: customAlertDialogeProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const handleDeletePost = async () => {
    console.log("POST");

    setIsOpen(false);
    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/post/${postId}`, {
          method: "DELETE",
          cache: "no-cache",
        }),
        {
          loading: "Deleting...",
          success: "Deleted",
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
        if (data) {
          router.refresh();
        }
      });
  };

  const handleDeleteComment = async () => {
    console.log("COMMENT");

    setIsOpen(false);
    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/comment/${commentId}`, {
          method: "DELETE",
          cache: "no-cache",
        }),
        {
          loading: "Deleting...",
          success: "Deleted",
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
        if (data) {
          router.refresh();
        }
      });
  };

  return (
    <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
      <AlertDialogTrigger className="text-red-500 w-full text-left">
        Delete
      </AlertDialogTrigger>
      <AlertDialogContent className="w-1/2 rounded-3xl">
        <AlertDialogHeader className="flex flex-col items-center">
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription className="flex space-x-2 border-t dark:border-zinc-300 border-zinc-600 w-full justify-evenly items-center pt-4">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={
                postId
                  ? handleDeletePost
                  : commentId
                  ? handleDeleteComment
                  : () => {}
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

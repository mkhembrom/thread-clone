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
    <>
      <AlertDialog onOpenChange={setIsOpen} open={isOpen}>
        <AlertDialogTrigger className="text-red-500 w-full text-left">
          Delete
        </AlertDialogTrigger>
        <AlertDialogContent className="w-1/2 rounded-3xl dark:bg-zinc-800">
          <AlertDialogHeader className="flex flex-col items-center">
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="flex space-x-2 justify-evenly items-center pt-4">
              <AlertDialogCancel className="dark:bg-white hover:dark:bg-zinc-300 dark:text-black">
                Cancel
              </AlertDialogCancel>
              <div className="h-6 w-[1px] bg-white"></div>
              <AlertDialogAction
                onClick={
                  postId
                    ? handleDeletePost
                    : commentId
                    ? handleDeleteComment
                    : () => null
                }
              >
                Delete
              </AlertDialogAction>
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

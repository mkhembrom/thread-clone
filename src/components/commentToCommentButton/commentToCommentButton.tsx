"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import MessageIcon from "../ui/icons/message";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AvatarCn from "../avatar/avatar";
import ClipIcon from "../ui/icons/clip";
import Image from "next/image";
import { IComment, IUser } from "@/app/types";
import { formatTimeAgo } from "@/lib/timeFormat";
import CrossIcon from "../ui/icons/cross";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import currentUser from "../currentUser/currentUser";

interface commentToCommentProps {
  comment: IComment;
  currentUser: IUser;
}

export default function CommentToCommentButton({
  comment,
  currentUser,
}: commentToCommentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [preview, setPreview] = useState("");
  const [replyText, setReplyText] = useState("");
  const [selectedFIle, setSelectedFile] = useState<File | null>(null);
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    const img = URL.createObjectURL(file);
    setPreview(img);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    if (!selectedFIle) {
      formData.append("replyText", replyText);
      formData.append("postId", comment.postId);
    } else {
      formData.append("replyText", replyText);
      formData.append("postId", comment.postId);
      formData.append("file", selectedFIle);
    }

    setIsOpen(false);
    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/comment/${comment.id}`, {
          method: "POST",
          body: formData,
          cache: "no-cache",
        }),
        {
          loading: "Posting...",
          success: "Posted",
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
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <MessageIcon />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[567px] p-4 rounded-3xl dark:bg-zinc-800">
        <div className="flex flex-col space-y-4 ">
          <div className="flex flex-row items-start justify-between">
            <div className="flex items-start  space-x-3">
              <AvatarCn source={comment.user.image!} />
              <div className="flex flex-col items-start justify-start">
                <h1 className="text-base">{comment.user.name}</h1>
                <p>{comment.reply}</p>

                {comment.images.length >= 1 && (
                  <Image
                    className="rounded-xl mt-2"
                    width={120}
                    height={150}
                    src={comment.images[0].imageUrl}
                    alt={comment.images[0].id}
                  />
                )}
              </div>
            </div>
            <p className="mr-10 text-zinc-600 text-sm">
              {formatTimeAgo(`${comment.createdAt}`)}
            </p>
          </div>
          <div className="flex flex-row items-start space-x-3">
            <AvatarCn source={currentUser?.image!} />
            <div className="flex flex-col items-start justify-start">
              <h1 className="text-base">{currentUser?.name}</h1>
              <input
                name="replytext"
                className="bg-transparent outline-none border-none text-sm pb-3"
                type="text"
                placeholder={`Reply to ${comment.user.name}...`}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
              <input
                accept="image/*"
                type="file"
                id="commentImage"
                className="hidden"
                onChange={handleImage}
              />
              {preview ? (
                <div className="relative">
                  <Image
                    className="rounded-xl mt-2"
                    width={120}
                    height={150}
                    src={preview}
                    alt={"commentImg"}
                  />
                  <Button
                    onClick={() => setPreview("")}
                    variant={"ghost"}
                    size={"icon"}
                    className="absolute top-3 right-2 rounded-full text-white w-8 h-8 backdrop-blur-md"
                  >
                    <CrossIcon />
                  </Button>
                </div>
              ) : (
                <label htmlFor="commentImage">
                  <ClipIcon />
                </label>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center mt-20">
          <Button className="hover:bg-zinc-500" variant={"ghost"}>
            Anyone can reply
          </Button>
          <Button
            onClick={handleSubmit}
            className="dark:bg-zinc-500 bg-zinc-300 hover:dark:bg-zinc-700"
            variant={"outline"}
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

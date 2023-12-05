"use client";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import InputImage from "../inputImage/inputImage";
import { IPost, ISession, IUser } from "@/app/types";
import ImagePreview from "../imagePreview/imagePreview";
import AvatarCn from "../avatar/avatar";

interface customCommentProps {
  children?: React.ReactNode;
  postData?: IPost;
  currentUser: IUser | any;
}

export default function CustomComment({
  children,
  postData,
  currentUser,
}: customCommentProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger className="h-full border-none">{children}</DialogTrigger>
      <DialogContent
        className={`dark:bg-zinc-800 dark:border-zinc-600 rounded-lg p-4 w-full`}
      >
        <div className="flex flex-row space-x-2 w-full">
          <div className="flex flex-col items-center space-y-4">
            <AvatarCn source={postData?.user?.image!} />
            <div className="w-[2px] h-full max-h-full dark:bg-[#333638]  bg-zinc-300"></div>
          </div>
          <div className="flex flex-col w-full">
            <span className=" font-bold">{`${postData?.user?.name}`}</span>

            <span className="py-2">{`${postData?.content}`}</span>

            <ImagePreview imageData={postData?.image!} postData={postData} />
          </div>
        </div>
        <InputImage
          currentUser={currentUser}
          setIsOpen={setIsOpen}
          isOpen={isOpen}
          postData={postData!}
        />
      </DialogContent>
    </Dialog>
  );
}

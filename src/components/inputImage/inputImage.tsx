"use client";
import React, { useState } from "react";
import AvatarCn from "../avatar/avatar";
import ClipIcon from "../ui/icons/clip";
import Image from "next/image";
import CrossIcon from "../ui/icons/cross";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import AnimateSpinnerIcon from "../ui/icons/animateSpinner";
import toast, { Toaster } from "react-hot-toast";
import { IPost, ISession, IUser } from "@/app/types";

interface InputImageProps {
  isOpen: boolean;
  postData: IPost;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  currentUser: IUser | any;
}

export default function InputImage({
  isOpen,
  postData,
  setIsOpen,
  currentUser,
}: InputImageProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [reply, setReply] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [display, setDisplay] = useState<string | undefined>("");
  const [image, setImage] = useState<string | undefined>("");

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    const preview: string | undefined = file
      ? URL.createObjectURL(file)
      : undefined;
    setImage(preview);
    setFile(file as File);
  };

  const handleRemoveImage = () => {
    setImage("");
    setFile(null);
  };

  const handlePostReply = async (e: React.MouseEvent<HTMLElement>) => {
    const formData = new FormData();
    if (reply.length > 1) {
      formData.append("reply", reply);
    } else {
      formData.append("reply", "");
    }

    if (!file) {
      formData.append("userId", currentUser?.id!);
      formData.append("postId", postData.id);
    } else {
      formData.append("userId", currentUser?.id!);
      formData.append("postId", postData.id);
      formData.append("image", file);
    }

    try {
      setIsOpen(false);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/upload/post/comment`,
        {
          method: "POST",
          body: formData,
          cache: "no-cache",
        }
      );
      const data = await res.json();

      if (data) {
        toast.success("Posted", {
          style: {
            borderRadius: "8px",
            padding: "12px",
            width: "250px",
            backgroundColor: "black",
            color: "white",
          },
        });
        router.refresh();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className={`flex space-x-2 w-full `}>
        <AvatarCn source={currentUser?.image!} />
        <div className="flex flex-col w-full">
          <span className=" font-bold">{currentUser?.name}</span>
          <textarea
            value={reply}
            name="reply"
            onChange={(e) => setReply(e.target.value)}
            className="bg-transparent outline-none border-none text-sm w-full resize-none"
            placeholder={`Reply to ${postData?.user?.name!}...`}
          ></textarea>
          <input
            accept="image/*"
            type="file"
            name="image"
            id="imageFiles"
            className="hidden"
            onChange={handleFile}
          />

          {image ? (
            <div className="relative w-28">
              <Image
                className="rounded-xl"
                src={image}
                width={100}
                height={100}
                alt="images"
              />
              <Button
                onClick={handleRemoveImage}
                variant={"ghost"}
                size={"icon"}
                className="absolute top-2 right-4 rounded-full text-white w-8 h-8 backdrop-blur-md"
              >
                <CrossIcon />
              </Button>
            </div>
          ) : (
            <label
              htmlFor="imageFiles"
              className="hover:text-white cursor-pointer mt-4"
            >
              <ClipIcon />
            </label>
          )}
        </div>
      </div>
      <div className="w-full flex flex-col mt-4">
        <div className="flex w-full justify-between items-center">
          <Button
            className="hover:bg-zinc-300 dark:hover:bg-zinc-600 "
            variant={"ghost"}
          >
            Anyone can reply
          </Button>
          <Button
            // type="submit"
            onClick={handlePostReply}
            className="dark:bg-zinc-600 bg-zinc-300 dark:hover:bg-zinc-700 hover:bg-zinc-200"
            variant={"outline"}
          >
            {isLoading ? (
              <span className="flex space-x-2 items-center">
                <AnimateSpinnerIcon /> Posting...
              </span>
            ) : (
              "Post"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}

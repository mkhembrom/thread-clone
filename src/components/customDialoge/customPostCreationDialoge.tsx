"use client";
import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import ClipIcon from "../ui/icons/clip";
import Image from "next/image";
import CrossIcon from "../ui/icons/cross";
import AvatarCn from "../avatar/avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import CreateIcon from "../ui/icons/create";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";
import { useForm, SubmitHandler } from "react-hook-form";
import { IImage, IPost } from "@/app/types";
import { Readable } from "stream";
import { create } from "@/actions/acttion";
interface Props {
  customBtn?: boolean;
}

interface ImageData {
  id: number;
  file: File;
  preview: string;
}

function CustomPostCreationDialoge({ customBtn }: Props) {
  const { user } = useCurrentUserForClient();
  const { register, handleSubmit } = useForm<IPost>();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [isOpen, setIsOpen] = useState(false);
  const [imageList, setImageList] = useState<ImageData[]>([]);
  // const onSubmit: SubmitHandler<IPost> = (data) => console.log(data);

  const onSubmit: SubmitHandler<IPost> = async (data: IPost) => {
    const { content, image } = data;
    try {
      const formData = new FormData();
      formData.append("content", content);

      for (let i = 0; i < image.length; i++) {
        formData.append(`image_${i}`, image[i]);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/upload/post`,
        {
          method: "POST",
          body: formData,
          cache: "no-cache",
        }
      );

      const data = await response.json();

      console.log("Post created:", data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles: FileList | null = e.target.files;

    if (!selectedFiles) return;

    const newImageDataList: ImageData[] = [];
    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        newImageDataList.push({ id: i, file, preview });
      }
    }
    setImageList([...newImageDataList]);
  };

  const handleRemoveImage = (id: number) => {
    const newImageDataList = [...imageList];
    const updatedData = newImageDataList.filter((item) => item.id !== id);
    setImageList(updatedData);
  };

  const clearData = () => {
    setIsOpen(false);
    setImageList([]);

    toast.success("Posted", {
      style: {
        borderRadius: "8px",
        padding: "12px",
        width: "250px",
        backgroundColor: "black",
        color: "white",
      },
    });
  };
  return (
    <>
      {isClient && (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger
            className={`px-0 md:px-6 h-full border-none  ${
              customBtn
                ? "py-4 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-lg"
                : "w-full"
            }`}
          >
            {customBtn ? (
              <CreateIcon />
            ) : (
              <input
                type="text"
                className="w-full p-4 border-none outline-none bg-transparent text-zinc-600"
                placeholder="Start a thread..."
              />
            )}
          </DialogTrigger>
          <DialogContent
            className={`dark:bg-zinc-800 dark:border-zinc-600 rounded-lg p-4 w-full`}
          >
            <DialogHeader className="flex flex-row items-start space-x-2 w-full">
              <div className="mt-2">
                <AvatarCn source={user?.image!} />
              </div>
              <form
                // onSubmit={handleSubmit(onSubmit)}
                action={create}
                encType="multipart/form-data"
                className={`w-full flex flex-col items-start justify-start`}
              >
                <h1>{user?.name}</h1>
                <textarea
                  // {...register("content")}
                  name="content"
                  placeholder="Start a thread..."
                  className={`w-full resize-none overflow-hidden bg-transparent border-none outline-none dark:text-zinc-300 text-zinc-600`}
                ></textarea>
                <input
                  // {...register("image")}
                  name="image"
                  accept="image/*"
                  type="file"
                  id="imageFile"
                  className="hidden"
                  onChange={handleImage}
                  multiple
                />

                {imageList && (
                  <div className="flex flex-wrap items-center justify-start w-full">
                    {imageList.map((img, index) => (
                      <div
                        key={index}
                        className="w-32 h-full relative pr-2 pb-2"
                      >
                        <Image
                          className="rounded-lg w-full"
                          src={img.preview}
                          width={300}
                          height={400}
                          alt={"upload Image"}
                        />
                        <Button
                          onClick={() => handleRemoveImage(img.id)}
                          variant={"ghost"}
                          size={"icon"}
                          className="absolute top-2 right-2 rounded-full text-white w-8 h-8 backdrop-blur-md"
                        >
                          <CrossIcon />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                <label
                  htmlFor="imageFile"
                  className="hover:text-white cursor-pointer py-2"
                >
                  <ClipIcon />
                </label>
                <div className="w-full flex items-center justify-between mt-4">
                  <Button
                    variant={"ghost"}
                    className="hover:bg-zinc-300 dark:hover:bg-zinc-600"
                  >
                    Anyone can reply
                  </Button>
                  <Button
                    type="submit"
                    variant={"outline"}
                    onClick={clearData}
                    className="dark:bg-zinc-600 bg-zinc-300 dark:hover:bg-zinc-700 hover:bg-zinc-200"
                  >
                    Post
                  </Button>
                </div>
              </form>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default CustomPostCreationDialoge;

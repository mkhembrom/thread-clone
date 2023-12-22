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
import CreateIcon from "../ui/icons/create";
import { useForm, SubmitHandler } from "react-hook-form";
import { IImage, IPost, IUser } from "@/app/types";
import { create, handlePostCreation } from "@/actions/action";
import { useRouter } from "next/navigation";
import image from "next/image";
import router from "next/router";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { UploadApiResponse, v2 as cloudinary } from "cloudinary";
import { uploadToCloudinary } from "@/lib/uploadToCloudinary";
import { revalidatePath } from "next/cache";
import prisma from "@/lib/prismadb";
import { error } from "console";

interface Props {
  customBtn?: boolean;
  currentUser?: IUser | any;
}

function CustomPostCreationDialoge({ customBtn, currentUser }: Props) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [imagefiles, setImageFiles] = useState<any>([]);
  const [file, setFile] = useState<FileList | null>(null);
  const [display, setDisplay] = useState<Array<{
    id: number;
    preview: string;
    file: File;
  }> | null>(null);
  const [content, setContent] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("content", content);
      if (display?.length) {
        for (let i = 0; i < display.length; i++) {
          formData.set(`image_${i}`, display[i].file as File);
        }
      }

      setIsOpen(false);
      toast
        .promise(
          fetch(
            `${process.env.NEXT_PUBLIC_DB_HOST}/api/upload/post`,

            {
              method: "POST",
              body: formData,
              cache: "no-cache",
            }
          ),
          {
            loading: "Posting",
            success: "Posted",
            error: "Error when fetching",
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
        .then(() => {
          clearData();
          router.refresh();
        });
    } catch {
      console.log("Error");
    } finally {
    }
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target?.files;
    let i = 1;
    if (files) {
      const images = Array.from(files).map((file) => {
        const preview = URL.createObjectURL(file);
        return { id: i++, preview, file };
      });
      setDisplay([...images]);
    }
  };

  const handleRemoveImage = (id: number) => {
    setDisplay((display) => display!.filter((image) => image.id !== id));
  };

  const clearData = () => {
    setIsOpen(false);
    setDisplay(null);
  };

  return (
    <>
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
              <AvatarCn source={currentUser?.image!} />
            </div>
            <form
              onSubmit={handleSubmit}
              // action={create}
              className={`w-full flex flex-col items-start justify-start`}
            >
              <h1>{currentUser?.name}</h1>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                name="content"
                placeholder="Start a thread..."
                className={`w-full resize-none overflow-hidden bg-transparent border-none outline-none dark:text-zinc-300 text-zinc-600`}
              ></textarea>
              <input
                name="image"
                accept="image/*"
                type="file"
                id="imageFile"
                className="hidden"
                onChange={handleImage}
                multiple
              />

              {display && (
                <LayoutGroup>
                  <div className="flex flex-wrap items-start h-full justify-start w-full">
                    <AnimatePresence>
                      {display.map((item) => (
                        <div
                          key={item.id}
                          className="w-36 h-full relative pr-2 pb-2"
                        >
                          <motion.img
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.1 }}
                            transition={{
                              duration: 0.3,
                              ease: "easeOut",
                            }}
                            className="rounded-xl w-full h-[200px] object-cover "
                            src={item.preview}
                            width={200}
                            height={300}
                            alt={"upload Image"}
                          />
                          <Button
                            onClick={() => handleRemoveImage(item.id)}
                            variant={"ghost"}
                            size={"icon"}
                            className="absolute top-2 right-2 rounded-full text-white  w-8 h-8 backdrop-blur-md"
                          >
                            <CrossIcon />
                          </Button>
                        </div>
                      ))}
                    </AnimatePresence>
                  </div>
                </LayoutGroup>
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
                  className="dark:bg-zinc-600 bg-zinc-300 dark:hover:bg-zinc-700 hover:bg-zinc-200"
                >
                  Post
                </Button>
              </div>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CustomPostCreationDialoge;

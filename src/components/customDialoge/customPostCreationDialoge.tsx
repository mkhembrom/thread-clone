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

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  const [isOpen, setIsOpen] = useState(false);

  const [text, setText] = useState("");
  const [imageDataList, setImageDataList] = useState<ImageData[]>([]);

  const router = useRouter();
  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newImageDataList: ImageData[] = [];

    for (let i = 0; i < selectedFiles.length; i++) {
      const file = selectedFiles[i];

      if (file.type.startsWith("image/")) {
        const preview = URL.createObjectURL(file);
        newImageDataList.push({ id: i, file, preview });
      }
    }
    setImageDataList([...imageDataList, ...newImageDataList]);
  };

  const handleRemoveImage = (index: number) => {
    const newImageDataList = [...imageDataList];
    const updatedData = newImageDataList.filter((item) => item.id !== index);
    setImageDataList(updatedData);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let formData = new FormData();
    formData.append("text", text);

    if (imageDataList) {
      imageDataList.forEach((image: ImageData, index: number) => {
        formData.append(`images[${index}]`, image.file);
      });
    }
    setIsOpen(false);
    try {
      toast
        .promise(
          fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/upload/post`, {
            headers: {
              "Access-Control-Allow-Origin": "*",
            },
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
            setImageDataList([]);
            setText("");
            router.refresh();
          }
        });
    } catch (error) {
      console.log(error);
    }
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
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className={`w-full flex flex-col items-start justify-start`}
              >
                <h1>{user?.name}</h1>
                <textarea
                  value={text}
                  onChange={handleTextChange}
                  placeholder="Start a thread..."
                  className={`w-full resize-none overflow-hidden bg-transparent border-none outline-none dark:text-zinc-300 text-zinc-600`}
                ></textarea>
                <input
                  accept="image/*"
                  type="file"
                  id="imageFile"
                  className="hidden"
                  multiple
                  onChange={handleImage}
                />

                {imageDataList && (
                  <div className="flex flex-wrap items-center justify-start w-full">
                    {imageDataList.map((img, index) => (
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

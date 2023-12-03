"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar } from "../ui/avatar";
import useCurrentUserForClient from "@/lib/clientComponent";
import AvatarCn from "../avatar/avatar";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { IUser } from "@/app/types";

type initialUserProps = {
  name: string;
  bio: string;
  link: string;
};

type editProfileButtonProps = {
  user: IUser;
};

const EditProfileButton = ({ user }: editProfileButtonProps) => {
  const [isOpenHere, setIsOpenHere] = useState(false);

  const initialUser: initialUserProps = {
    name: "",
    bio: "",
    link: "",
  };

  const [selectedFile, setSelectedFile] = useState<File | null | undefined>(
    null
  );
  const router = useRouter();
  const [image, setImage] = useState<string | undefined>("");
  const [userInfo, setUserInfo] = useState<initialUserProps>(initialUser);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInfo((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async () => {
    let formData = new FormData();

    formData.append("username", userInfo.name);
    formData.append("bio", userInfo.bio);
    formData.append("url", userInfo.link);

    formData.append("instagram", "");
    formData.append("twitter", "");

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    toast
      .promise(
        fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user?.id}`, {
          method: "POST",
          body: formData,
          cache: "no-cache",
        }),
        {
          loading: "Loading...",
          success: "Profile updated",
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
        router.replace(`/${userInfo.name}`);
        router.refresh();
        setIsOpenHere(false);
      });
  };

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user?.id}`, {
      method: "GET",
      cache: "no-cache",
    })
      .then((res) => {
        return res.json();
      })
      .then(({ social: socials }) => {
        setUserInfo({
          name: user?.username as string,
          bio: user?.bio as string,
          link: socials?.url as string,
        });
      });
  }, [user?.bio, user]);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    const preview: string | undefined = file
      ? URL.createObjectURL(file)
      : undefined;
    setImage(preview);
    setSelectedFile(file);
  };
  return (
    <Dialog open={isOpenHere} onOpenChange={setIsOpenHere}>
      <DialogTrigger className="my-4 dark:bg-[#101010]" asChild>
        <Button
          variant={"outline"}
          className={`w-full my-4dark:bg-[#101010] border border-[#4d4d4d] rounded-xl`}
        >
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="dark:bg-[#101010]">
        <div className="w-full flex flex-col">
          <div id="name" className="flex items-center">
            <div className="flex flex-col bg-[#101010] border-b border-b-zinc-600 w-full py-4">
              <label className="mb-[1px]" htmlFor="">
                Name
              </label>
              <input
                type="text"
                name="name"
                className="bg-transparent outline-none focus:outline-none w-full font-light"
                value={userInfo.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <input
                className="hidden"
                id="imageFile"
                accept="image/*"
                type="file"
                onChange={handleFile}
              />
              {image ? (
                <label htmlFor="imageFile">
                  <AvatarCn
                    id="imagechange"
                    source={image}
                    height={"20"}
                    width="20"
                  />
                </label>
              ) : (
                <label htmlFor="imageFile">
                  <AvatarCn
                    id="imagechange"
                    source={user?.image!}
                    height={"20"}
                    width="20"
                  />
                </label>
              )}
            </div>
          </div>
          <div id="bio" className="flex">
            <div className="flex flex-col bg-[#101010] border-b border-b-zinc-600 w-full py-4">
              <label className="mb-[1px]" htmlFor="">
                Bio
              </label>
              <input
                type="text"
                name="bio"
                className="bg-transparent outline-none focus:outline-none w-full font-light"
                value={userInfo.bio}
                onChange={handleChange}
              />
            </div>
            <div></div>
          </div>
          <div id="link" className="flex">
            <div className="flex flex-col bg-[#101010] border-b border-b-zinc-600 w-full py-4">
              <label className="mb-[1px]" htmlFor="">
                Link
              </label>
              <input
                type="text"
                name="link"
                className="bg-transparent outline-none focus:outline-none w-full font-light"
                value={userInfo.link}
                onChange={handleChange}
              />
            </div>
            <div></div>
          </div>
          <div id="private_profile" className="flex items-center">
            <div className="flex bg-[#101010] w-full py-4 mb-6 justify-between">
              <label className="mb-[1px]" htmlFor="">
                Private profile
              </label>
              <Switch />
            </div>
          </div>
          <div>
            <Button
              variant={"outline"}
              className="bg-white text-black w-full py-6 rounded-xl"
              onClick={handleSubmit}
            >
              Done
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileButton;

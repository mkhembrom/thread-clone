"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import LoadingIcon from "@/components/ui/icons/loading";
import Link from "next/link";
import { BiImageAdd } from "react-icons/bi";
import { RxCross2 } from "react-icons/rx";
type Props = {};

interface User {
  name: string;
  username: string;
  email: string;
  password: string;
}

export default function Page({}: Props) {
  const router = useRouter();

  const initialUser: User = {
    name: "",
    username: "",
    email: "",
    password: "",
  };
  const [user, setUser] = useState<User>(initialUser);
  const [selectedFile, setSelectedFile] = useState("");
  const [image, setImage] = useState<string | undefined>("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target?.files?.[0];
    const preview: string | undefined = file
      ? URL.createObjectURL(file)
      : undefined;
    setImage(preview);

    const reader = new FileReader();
    reader.readAsDataURL(file as unknown as File);
    reader.onloadend = () => {
      setSelectedFile(reader.result as string);
    };
  };

  const handleRemoveImage = () => {
    setImage("");
    setSelectedFile("");
  };

  const [loading, setLoading] = useState(false);

  const resetInputText = () => {
    setUser(initialUser);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      let formData = new FormData();

      for (let [key, value] of Object.entries(user)) {
        formData.append(key, value);
      }
      if (selectedFile) {
        formData.append("image", selectedFile);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_DB_HOST}/api/auth/register`,
        {
          method: "POST",
          body: formData,
          cache: "no-cache",
        }
      );

      const { message } = await response.json();

      if (response.ok) {
        resetInputText();
        setLoading(false);

        setLoading(false);
        toast(`Account created successfully`, {
          duration: 3000,
          position: "bottom-center",
          style: {},
          className: "",
          icon: "✅",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });

        router.push(`/login?message=${message}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-11/12 min-h-screen mx-auto relative flex justify-center items-center ">
      <div className="fixed top-0 w-[1900px] h-[400px] object-cover ">
        <Image
          className="absolute top-0 left-0 object-cover"
          src={"/images/login_wallpaper.webp"}
          alt="wallpaper"
          width={1900}
          height={400}
        />
      </div>
      <div className="flex  flex-col mt-[100px]">
        <form
          className="w-96 flex flex-col z-50 space-y-2"
          onSubmit={handleSubmit}
        >
          <input
            className="hidden"
            id="imageFile"
            accept="image/*"
            type="file"
            onChange={handleFile}
          />
          <div className="pb-10 flex items-center justify-center">
            {!image ? (
              <label
                htmlFor="imageFile"
                className="hover:text-white  cursor-pointer w-24 h-24 mx-auto rounded-full bg-zinc-300 flex items-center justify-center"
              >
                <BiImageAdd size={30} color="black" className="" />
              </label>
            ) : (
              <div className="rounded-full relative bottom-2 border-rose-600 ">
                <Image
                  className="rounded-full w-24 h-24  object-cover "
                  src={image}
                  width={100}
                  height={100}
                  alt="images"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-1  -right-2 w-8 h-8 rounded-full bg-black  flex items-center justify-center hover:scale-110 cursor-pointer"
                >
                  <RxCross2
                    className="font-bold bottom-2 border-white"
                    size={20}
                    color="white"
                  />
                </button>
              </div>
            )}
          </div>
          <input
            onChange={handleInputChange}
            value={user.name}
            name="name"
            className="p-4 rounded-lg outline-zinc-800 active:outline-1 outline-1 border-2 border-zinc-600"
            placeholder="Name"
            type="text"
          />
          <input
            onChange={handleInputChange}
            value={user.username}
            name="username"
            className="p-4 rounded-lg outline-zinc-800 active:outline-1 outline-1 border-2 border-zinc-600"
            placeholder="Username"
            type="text"
          />
          <input
            onChange={handleInputChange}
            value={user.email}
            name="email"
            className="p-4 rounded-lg outline-zinc-800 active:outline-1 outline-1 border-2 border-zinc-600"
            placeholder="Email"
            type="email"
          />
          <input
            onChange={handleInputChange}
            value={user.password}
            name="password"
            className="p-4 rounded-lg border-2 border-zinc-600"
            placeholder="Password"
            type="password"
          />
          <Button type="submit" className="py-7 rounded-lg" disabled={loading}>
            Register
          </Button>
          <a className="text-center text-gray-300 font-light py-4 cursor-pointer">
            Forget password?
          </a>
          <Link
            href={"/login"}
            className="text-center underline underline-offset-4"
          >
            Already have an account
          </Link>
        </form>
      </div>
      <Toaster />
    </div>
  );
}

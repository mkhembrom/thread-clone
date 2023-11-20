"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import LoadingIcon from "@/components/ui/icons/loading";
import toast from "react-hot-toast";
import Link from "next/link";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { revalidatePath } from "next/cache";

type User = {
  userinfo: string;
  password: string;
};

export default function Login() {
  const initialUser: User = {
    userinfo: "",
    password: "",
  };

  const router = useRouter();

  const searchParams = useSearchParams();
  const message = searchParams.get("message");

  const [user, setUser] = useState<User>(initialUser);
  const [loading, setLoading] = useState(false);

  const resetInputText = () => {
    setUser(initialUser);
  };

  const handleGithub = () => {
    signIn("github", { callbackUrl: `${process.env.NEXT_PUBLIC_DB_HOST}` });
    toast.success("Logged in");
  };

  const handleGoogle = async () => {
    await signIn("google", {
      callbackUrl: `${process.env.NEXT_PUBLIC_DB_HOST}`,
    });
    toast.success("Logged in");
  };
  const handleInstagram = async () => {
    await signIn("instagram", {
      callbackUrl: `${process.env.NEXT_PUBLIC_DB_HOST}`,
    });
    toast.success("Logged in");
  };

  function endsWithGmail(text: string) {
    const regex = /@gmail\.com$/i;
    return regex.test(text);
  }

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      if (!user.userinfo && !user.password)
        toast.error("No email & password provided");

      if (user.userinfo || user.password) {
        if (!user.userinfo) {
          toast.error("No email & username provided");
        }

        if (!user.password) {
          toast.error("No password provided");
        }
      }

      if (user.userinfo && user.password) {
        setLoading(true);
        const result = await signIn("credentials", {
          identifier: user.userinfo,
          password: user.password,
          redirect: false,
        });

        setLoading(false);
        resetInputText();

        if (result?.error) {
          toast.error(result.error);
        } else {
          toast.success("Login succesfull");
          router.push("/");
          router.refresh();
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="w-11/12 min-h-screen mx-auto relative flex justify-center items-center ">
      <div className="fixed top-0 w-[1900px] h-[400px] object-cover">
        <Image
          className="absolute top-0 left-0 object-cover"
          src={"/images/login_wallpaper.webp"}
          alt="wallpaper"
          width={1900}
          height={400}
        />
      </div>
      <div className="flex flex-col z-50">
        {/* <div className="flex space-x-4 justify-end items-center my-4">
          <p>Log in with </p>
          <Button className="cursor-pointer" onClick={handleInstagram}>
            <span className="mr-2">
              <AiFillGithub />
            </span>{" "}
            Instagram
          </Button>
          <Button className="cursor-pointer" onClick={handleGoogle}>
            <span className="mr-2">
              {" "}
              <FcGoogle />
            </span>{" "}
            Google
          </Button>
        </div> */}
        <form
          className="w-96 flex flex-col z-50 space-y-2"
          onSubmit={handleSubmit}
        >
          <input
            name="userinfo"
            className="p-4 rounded-lg outline-zinc-800 active:outline-1 outline-1"
            placeholder="Email or Username"
            type="text"
            value={user.userinfo}
            onChange={handleChange}
          />
          <input
            name="password"
            className="p-4 rounded-lg "
            placeholder="Password"
            type="password"
            value={user.password}
            onChange={handleChange}
          />

          <Button type="submit" className="py-7 rounded-lg">
            Log in
          </Button>

          <a className="text-end text-gray-300 font-light py-4 cursor-pointer">
            Forget password?
          </a>
          <Link
            href={"/register"}
            className="text-center underline underline-offset-4"
          >
            Create your account.
          </Link>
        </form>
      </div>
    </div>
  );
}

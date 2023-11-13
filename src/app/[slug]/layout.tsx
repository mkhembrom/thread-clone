import React, { ReactNode } from "react";
import { InstagramIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Tabs from "@/components/tabs/tabs";
import getCurrentUser from "@/components/currentUser/currentUser";
import AvatarCn from "@/components/avatar/avatar";
import { loginIsRequiredServer } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import { IUser } from "../types";

type Props = {
  children: ReactNode;
  params: {
    slug: string;
  };
};

async function getProfile(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Layout({ children, params }: Props) {
  // await loginIsRequiredServer();

  const username = params.slug;
  const { user } = await getProfile(username);

  const lastProfile = user?.followedBy[user?.followedBy.length - 1];

  return (
    <div className="w-screen max-w-xl mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-start justify-center ">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p className="flex items-center justify-center">
            @{user?.username}
            <span className="dark:bg-zinc-800 bg-zinc-300 text-[12px] ml-1 px-1 italic rounded-full">
              threads.net
            </span>
          </p>
        </div>

        <AvatarCn source={user?.image!} width={"20"} height={"20"} />
      </div>
      <p className="flex my-4 text-base">{user?.bio!}</p>
      <div className="flex justify-between items-center">
        <div className="text-md flex flex-row space-x-2 font-light text-gray-900 dark:text-zinc-300">
          {user?.followedBy.length > 0 && (
            <div
              key={lastProfile.id}
              className="rounded-full flex justify-center items-center "
            >
              <AvatarCn source={lastProfile?.image!} width="5" height="5" />
            </div>
          )}
          <p className="hover:underline text-zinc-400 cursor-pointer">
            {user?.followedBy.length} followers
          </p>{" "}
          {user?.socials?.url! && <div> . {user?.socials?.url!}</div>}
        </div>

        <div className="flex space-x-3">
          {user?.socials?.instagram! && (
            <Link target="_blank" href={`${user?.socials?.instagram!}`}>
              <InstagramIcon />
            </Link>
          )}
          {user?.socials?.twitter! && (
            <Link target="_blank" href={`${user?.socials?.twitter!}`}>
              <FaXTwitter size={24} />
            </Link>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Tabs user={user} />
      </div>

      {children}
    </div>
  );
}

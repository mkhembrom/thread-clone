"use server";
import React, { ReactNode } from "react";
import { InstagramIcon } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import Tabs from "@/components/tabs/tabs";
import getCurrentUser from "@/components/currentUser/currentUser";
import AvatarCn from "@/components/avatar/avatar";
import Link from "next/link";
import FollowButton from "@/components/followButton/followButton";
import EditProfileButton from "@/components/editProfileButton/editProfileButton";
import { loginIsRequiredServer } from "@/lib/isLoginUser";
import { getProfile } from "@/actions/action";

type Props = {
  children: ReactNode;
  params: {
    slug: string;
  };
};

export default async function Layout({ children, params }: Props) {
  await loginIsRequiredServer();

  const username = params.slug;
  const { user } = await getProfile(username);

  const lastProfile = user?.followedBy[user?.followedBy.length - 1];

  const currentUser = await getCurrentUser();
  function trimTxt(txt: string) {
    return txt.slice(8);
  }
  return (
    <div className="w-screen max-w-xl mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-start justify-center ">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <div className="flex items-center justify-center">
            @{user?.username}
            <Link href={"/"}>
              <span className="dark:bg-[#1e1e1e] bg-zinc-300 text-[12px] font-thin ml-1 p-1 px-2  rounded-full">
                threads.net
              </span>
            </Link>
          </div>
        </div>

        <AvatarCn source={user?.image!} width={"20"} height={"20"} />
      </div>
      <p className="flex my-4 text-base">{user?.bio!}</p>
      <div className="flex justify-between items-center">
        <div className="text-md flex flex-row space-x-2 font-light text-gray-900 dark:text-zinc-300">
          {user?.followedBy && (
            <div
              key={lastProfile?.id}
              className="rounded-full flex justify-center items-center "
            >
              <AvatarCn source={lastProfile?.image!} width="5" height="5" />
            </div>
          )}
          <p className="hover:underline dark:text-zinc-300  cursor-pointer">
            {user?.followedBy.length} followers
          </p>

          {user?.socials?.url! && (
            <span>&#xB7; {trimTxt(user?.socials?.url!)}</span>
          )}
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
      <div>
        {currentUser?.username === username ? (
          <EditProfileButton user={user as any} />
        ) : (
          <FollowButton user={user as any} currentUser={currentUser as any} />
        )}
      </div>
      <div className={`flex items-center justify-center`}>
        {/* <ClientComponent> */}
        <Tabs user={user as any} />
        {/* </ClientComponent> */}
      </div>

      <div className="flex items-center justify-center w-full h-full">
        {children}
      </div>
    </div>
  );
}

"use server";
import React from "react";
import SearchInput from "@/components/searchInput/searchInput";
import UsersProfile from "@/components/usersProfile/usersProfile";
import { IUser } from "../types";
import getCurrentUser from "@/components/currentUser/currentUser";
import prisma from "@/lib/prismadb";
import { loginIsRequiredServer } from "@/lib/isLoginUser";
type Props = {};

export default async function Page({}: Props) {
  const currentUser = await getCurrentUser();

  const users: IUser | any = await prisma?.user.findMany({
    where: {
      NOT: {
        id: currentUser?.id,
      },
    },
    select: {
      id: true,
      image: true,
      username: true,
      name: true,
      posts: true,
      comments: true,
      likes: true,
      followedByIDs: true,
      followingIDs: true,
      following: true,
      followedBy: true,
    },
  });

  await loginIsRequiredServer();

  return (
    <div className="min-h-fit relative">
      <div className="z-30 absolute top-0 left-0 right-0">
        <SearchInput users={users} currentUser={currentUser as any} />
      </div>
      <div className="z-0 absolute  top-20 left-0 right-0">
        <div className=" w-full">
          {users.map((item: IUser) => (
            <div key={item.id}>
              <UsersProfile user={item} currentUser={currentUser as any} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

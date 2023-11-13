"use client";
import React from "react";
import UsersProfile from "../usersProfile/usersProfile";
import { IUser } from "@/app/types";
import useStore from "@/store/store";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";

interface searchUsersProps {
  users?: any;
}

export default function SearchUsers({ users }: searchUsersProps) {
  const tags = useStore((state) => state.searchTag);

  const seachedUser = users.filter((item: any) =>
    item.name?.toLowerCase().includes(tags.toLowerCase())
  );

  const { user } = useCurrentUserForClient();

  return (
    <>
      {tags.length > 0 ? (
        <div className="my-4 w-full">
          {seachedUser.map((item: IUser) => (
            <div key={item.id}>
              {user?.id !== item.id ? <UsersProfile user={item} /> : <></>}
            </div>
          ))}
        </div>
      ) : (
        <div className="my-4 w-full">
          {users.map((item: IUser) => (
            <div key={item.id}>
              {user?.id !== item.id ? <UsersProfile user={item} /> : <></>}
            </div>
          ))}
        </div>
      )}
    </>
  );
}

"use client";
import React, { Suspense } from "react";
import UsersProfile from "../usersProfile/usersProfile";
import { IUser } from "@/app/types";
import useStore from "@/store/store";

interface searchUsersProps {
  users?: any;
}

export default function SearchUsers({ users }: searchUsersProps) {
  const tags = useStore((state) => state.searchTag);

  const seachedUser = users.filter((item: any) =>
    item.name?.toLowerCase().includes(tags.toLowerCase())
  );

  return (
    <>
      <div className=" w-full">
        {seachedUser.map((item: IUser) => (
          <div key={item.id}>
            <Suspense fallback={<>Loading...</>}>
              <UsersProfile user={item} />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  );
}

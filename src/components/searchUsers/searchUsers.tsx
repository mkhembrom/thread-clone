"use client";
import React, { Suspense } from "react";
import UsersProfile from "../usersProfile/usersProfile";
import { IUser } from "@/app/types";
import useStore from "@/store/store";
import useCurrentUserForClient from "@/lib/clientComponent";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/post/loading";

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
      <div className=" w-full">
        {seachedUser.map((item: IUser) => (
          <div key={item.id}>
            <Suspense fallback={<Loading />}>
              <UsersProfile user={item} />
            </Suspense>
          </div>
        ))}
      </div>
    </>
  );
}

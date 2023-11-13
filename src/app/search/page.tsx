import React from "react";
import getCurrentUser from "@/components/currentUser/currentUser";
import { loginIsRequiredServer } from "../api/auth/[...nextauth]/route";
import SearchInput from "@/components/searchInput/searchInput";
import SearchUsers from "@/components/searchUsers/searchUsers";

type Props = {};

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/search/`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Search({}: Props) {
  const { users } = await getUsers();
  await loginIsRequiredServer();

  return (
    <div className="min-h-fit">
      <SearchInput />

      {users && <SearchUsers users={users} />}
    </div>
  );
}

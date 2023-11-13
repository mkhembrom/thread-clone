"use client";
import React, { useState } from "react";
import SearchIcon from "../ui/icons/search";
import useStore from "@/store/store";
import { useSession } from "next-auth/react";

export default function SearchInput() {
  const tags = useStore((state) => state.searchTag);
  const updateSearchTag = useStore((state) => state.updateSearchTag);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTag(e.target.value);
  };

  const session = useSession();
  return (
    <>
      <div className="relative">
        <input
          className=" w-full pl-14 py-5 bg-transparent border border-zinc-800 rounded-xl outline-none"
          placeholder="Search"
          type="text"
          id="search"
          name="search"
          value={tags}
          onChange={handleSearchText}
        />
        <div className="absolute top-1/2 left-4 -translate-y-1/2 ">
          <SearchIcon />
        </div>
      </div>
    </>
  );
}

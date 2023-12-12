"use client";
import React, { useEffect, useState } from "react";
import SearchIcon from "../ui/icons/search";
import useStore from "@/store/store";
import { AiFillCloseCircle } from "react-icons/ai";
import SearchUsers from "../searchUsers/searchUsers";
import { IUser } from "@/app/types";

interface searchInputProps {
  users: IUser;
  currentUser: IUser;
}

export default function SearchInput({ users, currentUser }: searchInputProps) {
  const tags = useStore((state) => state.searchTag);
  const updateSearchTag = useStore((state) => state.updateSearchTag);

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateSearchTag(e.target.value);
  };

  const clearText = () => {
    updateSearchTag("");
  };

  useEffect(() => {
    const handleFocus = () => {
      const inpt = document.getElementById("searchOne");
      inpt?.focus();
    };
    handleFocus();
  }, [tags]);

  useEffect(() => {
    const handleStopScroll = () => {
      if (typeof window !== "undefined") {
        if (tags.length > 0) {
          window.scrollTo(0, 0);
        }
      }
      window.addEventListener("scroll", handleStopScroll);

      return () => window.removeEventListener("scroll", handleStopScroll);
    };
  }, [tags.length]);

  return (
    <>
      {tags.length > 0 ? (
        <div className="fixed w-full left-0 top-20 right-0 bottom-0 flex items-start justify-center z-50  backdrop-blur-md">
          <div className="w-[576px] bg-[#101010] rounded-xl">
            <div className="relative ">
              <input
                className=" w-full pl-14 py-5 bg-transparent border border-zinc-800 border-b-0 rounded-xl rounded-b-none outline-none"
                placeholder="Search"
                type="text"
                id="searchOne"
                name="search"
                value={tags}
                onChange={handleSearchText}
                autoComplete="off"
              />
              <div className="absolute top-1/2 left-4 -translate-y-1/2">
                <SearchIcon />
              </div>
              <div className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer">
                <AiFillCloseCircle
                  onClick={clearText}
                  color="#dddddd"
                  size={20}
                />
              </div>
            </div>
            <div className="w-[576px] min-h-min  bg-transparent border border-zinc-800 border-t-0 rounded-t-none rounded-xl px-4">
              {users && <SearchUsers users={users} currentUser={currentUser} />}
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <input
            className=" w-full pl-14 py-5 bg-transparent border border-zinc-800 rounded-xl outline-none"
            placeholder="Search"
            type="text"
            id="search"
            name="search"
            value={tags}
            onChange={handleSearchText}
            autoComplete="off"
          />
          <div className="absolute top-1/2 left-4 -translate-y-1/2">
            <SearchIcon />
          </div>
        </div>
      )}
    </>
  );
}

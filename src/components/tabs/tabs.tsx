"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { IUser } from "@/app/types";
type Props = {
  user: IUser;
};

export default function Tabs({ user }: Props) {
  const tabs = ["Threads", "Replies", "Reposts"];
  const pathname = usePathname();
  const [name, setName] = useState("Threads");
  const router = useRouter();

  const handleClick = (idx: number) => {
    if (idx == 0) {
      setName("Threads");
      router.push(`/${user.username}`);
    } else if (idx == 1) {
      setName("Replies");
      router.push(`/${user.username}/replies`);
    } else {
      setName("Reposts");
      router.push(`/${user.username}/reposts`);
    }
  };

  return (
    <div className="flex justify-evenly items-center w-full my-4">
      {tabs.map((tab, index) => {
        return (
          <div className="w-full flex-1" key={index}>
            <button
              onClick={() => handleClick(index)}
              className={`relative flex-1 py-2 text-center text-md w-full border-b`}
            >
              {tab}

              {name == tabs[index] && (
                <motion.div
                  layoutId="underline"
                  className="absolute w-full bottom-0 left-0 right-0 h-[1px] bg-black dark:bg-zinc-300"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}

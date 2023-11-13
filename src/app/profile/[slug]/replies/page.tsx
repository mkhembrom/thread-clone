"use client";

import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function Replies({}: Props) {
  const pathname = usePathname();

  return (
    <div className="flex mx-auto w-full md:w-[576px] md:px-0 px-10">
      <div className="flex items-center justify-center">
        <p className="dark:text-zinc-600"> No replies</p>
      </div>
    </div>
  );
}

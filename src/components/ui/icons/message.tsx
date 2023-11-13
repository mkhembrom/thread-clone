"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../button";

type Props = {};

export default function MessageIcon({}: Props) {
  const { theme } = useTheme();

  return (
    // <Button asChild variant={"ghost"} size={"icon"} className="rounded-full">
    <svg
      aria-label="Comment"
      className={` dark:text-white text-black hover:bg-accent hover:text-accent-foreground h-10 w-10 px-[10px]   rounded-full`}
      color={`${theme == "light" ? "rgb(0, 0, 0)" : "rgb(250, 250, 250)"}`}
      fill={`transparent`}
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
    >
      <title>Comment</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
    // </Button>
  );
}

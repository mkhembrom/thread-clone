"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../button";

type Props = {};

export default function MessageNotificationIcon({}: Props) {
  const { theme } = useTheme();

  return (
    <svg
      aria-label="Comment"
      className={``}
      color={`${theme == "light" ? "rgb(0, 0, 0)" : "rgb(250, 250, 250)"}`}
      fill={`white`}
      height="12"
      role="img"
      viewBox="0 0 26 26"
      width="12"
    >
      <title>Comment</title>
      <path
        d="M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z"
        fill="true"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      ></path>
    </svg>
    // </Button>
  );
}

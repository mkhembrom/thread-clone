"use client";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {};

export default function HeartIcon({}: Props) {
  const { theme } = useTheme();
  const pathname = usePathname();

  const colorSetOnThemeChange = () => {
    if (theme == "light") {
      return "#b8b8b8";
    }
    return "#4d4d4d";
  };
  return (
    <svg
      aria-label="Notifications"
      className="x1lliihq x1n2onr6"
      color={`${theme == "light" ? "rgb(0, 0, 0)" : "rgb(250, 250, 250)"}`}
      fill={`transparent`}
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
    >
      <title>Like</title>
      <path
        d="M2.5 9.85683C2.5 14.224 6.22178 18.5299 12.0332 22.2032C12.3554 22.397 12.7401 22.5909 13 22.5909C13.2703 22.5909 13.655 22.397 13.9668 22.2032C19.7782 18.5299 23.5 14.224 23.5 9.85683C23.5 6.11212 20.8698 3.5 17.4599 3.5C15.4847 3.5 13.9356 4.39792 13 5.74479C12.0851 4.40812 10.5257 3.5 8.5401 3.5C5.14059 3.5 2.5 6.11212 2.5 9.85683Z"
        stroke="currentColor"
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}

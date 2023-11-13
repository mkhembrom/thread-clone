"use client";
import { useTheme } from "next-themes";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

import React from "react";

export default function SearchIcon() {
  const { theme } = useTheme();
  const colorSetOnThemeChange = () => {
    if (theme == "light") {
      return "#b8b8b8";
    }
    return "#4d4d4d";
  };

  const pathname = usePathname();

  return (
    <svg
      aria-label="Search"
      className="text-black dark:text-white"
      color={pathname === "/search" ? "currentColor" : colorSetOnThemeChange()}
      fill={pathname === "/search" ? "currentColor" : "transparent"}
      height="26"
      role="img"
      viewBox="0 0 26 26"
      width="26"
    >
      <title>Search</title>
      <path
        clipRule="evenodd"
        d="M3.5 11.5C3.5 7.08172 7.08172 3.5 11.5 3.5C15.9183 3.5 19.5 7.08172 19.5 11.5C19.5 15.9183 15.9183 19.5 11.5 19.5C7.08172 19.5 3.5 15.9183 3.5 11.5ZM11.5 1C5.70101 1 1 5.70101 1 11.5C1 17.299 5.70101 22 11.5 22C13.949 22 16.2023 21.1615 17.9883 19.756L22.3661 24.1339C22.8543 24.622 23.6457 24.622 24.1339 24.1339C24.622 23.6457 24.622 22.8543 24.1339 22.3661L19.756 17.9883C21.1615 16.2023 22 13.949 22 11.5C22 5.70101 17.299 1 11.5 1Z"
        fill={pathname === "/search" ? "currentColor" : colorSetOnThemeChange()}
        fillRule="evenodd"
      ></path>
    </svg>
  );
}

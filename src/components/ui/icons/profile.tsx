"use client";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import React from "react";

interface profileIconProps {
  user: any;
}

export default function ProfileIcon({ user }: profileIconProps) {
  const { theme } = useTheme();
  const colorSetOnThemeChange = () => {
    if (theme == "light") {
      return "#b8b8b8";
    }
    return "#4d4d4d";
  };

  const pathname = usePathname();

  const profilePageX = () => {
    if (pathname === `/${user?.username}`) {
      return true;
    }
    return false;
  };
  return (
    <svg
      aria-label="Profile"
      className="text-black dark:text-white"
      color={profilePageX() ? "currentColor" : colorSetOnThemeChange()}
      fill={profilePageX() ? "currentColor" : "transparent"}
      height="26"
      role="img"
      viewBox="0 0 26 26"
      width="26"
    >
      <title>Profile</title>
      <circle
        cx="13"
        cy="7.25"
        r="4"
        stroke={profilePageX() ? "currentColor" : colorSetOnThemeChange()}
        strokeWidth="2.5"
      ></circle>
      <path
        d="M6.26678 23.75H19.744C21.603 23.75 22.5 23.2186 22.5 22.0673C22.5 19.3712 18.8038 15.75 13 15.75C7.19625 15.75 3.5 19.3712 3.5 22.0673C3.5 23.2186 4.39704 23.75 6.26678 23.75Z"
        stroke={profilePageX() ? "currentColor" : colorSetOnThemeChange()}
        strokeWidth="2.5"
      ></path>
    </svg>
  );
}

"use client";
import { useTheme } from "next-themes";
import React from "react";

export default function ThreeDotsIcon() {
  const { theme } = useTheme();
  return (
    <svg
      aria-label="More"
      className="x1lliihq x1n2onr6"
      color={`${theme == "light" ? "rgb(0,0,0)" : "rgb(184,184,184)"}`}
      fill={`${theme == "light" ? "rgb(0,0,0)" : "rgb(184,184,184)"}`}
      height="20"
      role="img"
      viewBox="0 0 24 24"
      width="20"
    >
      <title>More</title>
      <circle cx="12" cy="12" r="1.5"></circle>
      <circle cx="6" cy="12" r="1.5"></circle>
      <circle cx="18" cy="12" r="1.5"></circle>
    </svg>
  );
}

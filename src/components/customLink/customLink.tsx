"use client";

import Link from "next/link";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
  backArrow?: boolean;
  linkName?: string;
  customBtn?: boolean;
};

export default function CustomLink({
  children,
  backArrow,
  linkName,
  customBtn,
}: Props) {
  return (
    <>
      {customBtn ? (
        <span className={`cursor-pointer`}>{children}</span>
      ) : (
        <Link
          href={`${linkName}`}
          className={`cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-900  transition-colors duration-300 ${
            backArrow ? "-ml-4 p-4 rounded-full" : "md:p-6 py-2 rounded-lg"
          }`}
        >
          {children}
        </Link>
      )}
    </>
  );
}

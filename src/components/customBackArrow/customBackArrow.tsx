"use client";

import React, { useState } from "react";
import CustomLink from "../customLink/customLink";
import ArrowIcon from "../ui/icons/arrow";
import { usePathname } from "next/navigation";

export default function CustomBackArrow() {
  const pathname = usePathname();

  return (
    <>
      {pathname === "/" ||
      pathname === "/notification" ||
      pathname === "/search" ? (
        <></>
      ) : (
        <ul className="flex items-center w-full justify-start">
          <CustomLink backArrow linkName="/">
            <ArrowIcon />
          </CustomLink>
        </ul>
      )}
    </>
  );
}

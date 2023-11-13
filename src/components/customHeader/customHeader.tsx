"use client";

import { usePathname } from "next/navigation";
import Header from "../header/header";

interface customHeaderProps {}

export default function CustomHeader({}: customHeaderProps) {
  const pathname = usePathname();
  // const pattern = /^\/post\/.+/;
  // const isMatch = pattern.test(pathname);
  if (pathname === "/" || pathname == "/likes" || pathname == "/search") {
    return (
      <>
        <Header />
      </>
    );
  }
  return (
    <>
      <Header backArrow />
    </>
  );
}

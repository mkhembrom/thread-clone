"use client";
import Header from "@/components/header/header";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();
  const pathname = usePathname();
  console.log(pathname);
  return (
    <div>
      {session && pathname !== "/login" ? <Header /> : null}
      <div className="w-screen max-w-xl mx-auto px-4 md:px-0">{children}</div>
    </div>
  );
}

"use client";
import { SessionProvider } from "next-auth/react";

export default function SessionProviderWrapper({
  children,
  customSession,
}: {
  children: React.ReactNode;
  customSession: any;
}): React.ReactNode {
  return <SessionProvider session={customSession}>{children}</SessionProvider>;
}

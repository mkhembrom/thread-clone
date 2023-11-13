"use client";

import { CustomUser, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

const useCurrentUserForClient = () => {
  const { data: session } = useSession();
  const [user, setUser] = useState<CustomUser | null>(null);
  const u = session?.user as CustomUser;

  useEffect(() => {
    setUser(u);
  }, [u]);

  return {
    user: user,
  };
};

export default useCurrentUserForClient;

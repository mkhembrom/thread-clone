"use client";

import { CustomUser, authOptions } from "@/app/api/auth/[...nextauth]/route";
import { useSession } from "next-auth/react";

const useCurrentUserForClient = () => {
  const { data: session } = useSession();

  const u = session?.user as CustomUser;
  return {
    user: { ...u },
  };
};

export default useCurrentUserForClient;

"use client";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { IUser } from "@/app/types";
import { redirect, usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

interface onboardFormProps {
  user: IUser | any;
}

export default function OnboardForm({ user }: onboardFormProps) {
  const [username, setUsername] = useState("");
  const route = useRouter();
  const pathname = usePathname();

  const session = useSession();

  if (pathname === "/onboard" && session && user?.username) {
    redirect("/");
  }
  const handleUpdateUsername = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // toast
    //   .promise(
    //     fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user.id}`, {
    //       method: "POST",
    //       body: JSON.stringify({ username }),
    //       cache: "no-cache",
    //     }),
    //     {
    //       loading: "Registering...",
    //       success: "Registered",
    //       error: (error) => `Error: ${error}`,
    //     },
    //     {
    //       style: {
    //         borderRadius: "8px",
    //         padding: "12px",
    //         width: "250px",
    //         backgroundColor: "black",
    //         color: "white",
    //       },
    //     }
    //   )
    //   .then(() => {
    //     redirect("/");
    //   });

    fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/users/${user.id}`, {
      method: "POST",
      body: JSON.stringify({ username }),
    }).then((data) => {
      route.refresh();
      route.push("/");
    });
  };

  return (
    <form
      onSubmit={handleUpdateUsername}
      className="w-full flex flex-col items-start px-4 space-y-2"
    >
      <input
        className="text-black dark:text-white px-5 py-2 outline-none border-none rounded-xl"
        type="text"
        id="username"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder={`Enter username`}
        autoComplete="off"
      />

      <Button
        type="submit"
        disabled={username == ""}
        className={`rounded-xl bg-zinc-300 dark:bg-zinc-800 text-black dark:text-white hover:bg-zinc-400 dark:hover:bg-zinc-900 w-full ${
          username != "" ? "" : "cursor-not-allowed "
        }`}
      >
        use app
      </Button>
    </form>
  );
}

import getCurrentUser from "@/components/currentUser/currentUser";
import OnboardForm from "@/components/onboardForm/onboardForm";
import { redirect } from "next/navigation";
import Image from "next/image";
import React from "react";
import prisma from "@/lib/prismadb";
import {
  loginIsRequiredServer,
  loginIsUsername,
} from "../api/auth/[...nextauth]/route";
import { formatSlugByUsername } from "@/lib/generateSlugs";

export default async function Page() {
  const currentUser = await getCurrentUser();

  // if (`${currentUser?.username}` == "") {
  //   await prisma?.user
  //     .update({
  //       where: {
  //         id: currentUser?.id,
  //       },
  //       data: {
  //         username: formatSlugByUsername(`${currentUser?.name}`),
  //       },
  //     })
  //     .then(() => {
  //       redirect("/");
  //     });
  // }
  return (
    <div className="bg-white dark:bg-zinc-900 min-h-screen fixed inset-0 z-50 flex items-center justify-center">
      <div className="rounded-3xl p-4 w-full max-w-xs relative bg-zinc-900 dark:bg-black ">
        <div className="flex items-center justify-center flex-col pb-5">
          <Image
            className="rounded-full"
            src={currentUser?.image!}
            alt={currentUser?.name!}
            width={80}
            height={80}
          />
          <h1 className="text-zinc-300 dark:text-white py-2">
            {currentUser?.name}
          </h1>
          <pre>{currentUser?.username}</pre>
        </div>
        <OnboardForm user={currentUser} />
      </div>
    </div>
  );
}

import React, { ReactNode } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { InstagramIcon } from "lucide-react";
import Tabs from "@/components/tabs/tabs";
import getCurrentUser from "@/components/currentUser/currentUser";
import { redirect } from "next/navigation";
import { IUser } from "@/app/types";

type Props = {
  children: ReactNode;
  params: {
    slug: string;
  };
};

async function getProfile(slug: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/${slug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Layout({ children, params: { slug } }: Props) {
  const session = await getCurrentUser();
  const { user }: { user: IUser } = await getProfile(slug);

  return (
    <div className="w-screen max-w-xl mx-auto px-4 md:px-0">
      <div className="flex justify-between items-center py-4">
        <div className="flex flex-col items-start justify-center ">
          <h1 className="text-xl font-bold">{user?.name}</h1>
          <p>{user.usernameslug}</p>
        </div>

        <Avatar className={`w-20 h-20`}>
          <AvatarImage
            className="object-cover"
            src={`${
              user?.image != null
                ? user?.image
                : "https://xsgames.co/randomusers/assets/avatars/pixel/3.jpg"
            }`}
            alt="avatar"
          />
          <AvatarFallback>{`${user?.name}`}</AvatarFallback>
        </Avatar>
      </div>
      <p className="flex my-4 text-base">
        &quotAI art: Where algorithms meet aesthetics.&quot
        <br />
        #ai #digitalart #generativeart
      </p>
      <div className="flex justify-between items-center">
        <p className="text-md flex flex-row space-x-2 font-light text-gray-900 dark:text-zinc-300">
          22,811 followers . ayloope.com
        </p>

        <div className="flex space-x-2">
          <InstagramIcon />
        </div>
      </div>
      <div className="flex items-center justify-center">
        <Tabs user={user} />
      </div>

      {children}
    </div>
  );
}

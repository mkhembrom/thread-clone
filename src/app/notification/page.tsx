import getCurrentUser from "@/components/currentUser/currentUser";
import React from "react";
import { loginIsRequiredServer } from "../api/auth/[...nextauth]/route";
import AvatarCn from "@/components/avatar/avatar";
import HeartIcon from "@/components/ui/icons/heart";
import Notification from "@/components/notification/notification";

type Props = {};

async function getLikeNotification(username: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_DB_HOST}/api/${username}`,
    { cache: "no-cache" }
  );
  return res.json();
}

export default async function Likes({}: Props) {
  await loginIsRequiredServer();
  const currentUser = await getCurrentUser();

  const notify = await prisma?.notification.findMany({
    include: {
      post: {
        where: {
          userId: currentUser?.id,
        },
        select: {
          content: true,
          image: true,
        },
      },
      comment: {
        where: {
          userId: currentUser?.id,
        },
        select: {
          reply: true,
          images: true,
        },
      },
    },
  });
  return (
    <div className="min-h-fit">
      <div className="w-full md:w-[572px] mx-auto px-10 md:px-0 flex flex-col justify-center">
        {/* {notify?.notification != null ? (
          <>
            {notify?.notification.map((item: any) => (
              <Notification key={item.id} notification={item} />
            ))}
          </>
        ) : (
          <p className="text-gray-300 dark:text-zinc-600 text-center">
            No such activity
          </p>
        )} */}

        {/* <pre>{JSON.stringify(notify, null, 2)}</pre> */}
        <p className="text-gray-300 dark:text-zinc-600 text-center">
          No such activity
        </p>
      </div>
    </div>
  );
}

import React, { Suspense } from "react";
import Notification from "@/components/notification/notification";
import { loginIsRequiredServer } from "@/lib/isLoginUser";
type Props = {};

export default async function Page({}: Props) {
  await loginIsRequiredServer();

  return (
    <div className="min-h-fit">
      <div className="w-full md:w-[572px] mx-auto px-10 md:px-0 flex flex-col justify-center">
        <Notification />
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  source?: string;
  height?: string;
  width?: string;
};

export default function AvatarCn({ source, width, height }: Props) {
  return (
    <Avatar className={`w-${width} h-${height}  object-cover rounded-full`}>
      <AvatarImage
        className="object-cover shadow-sm"
        src={source}
      ></AvatarImage>
      <AvatarFallback>MH</AvatarFallback>
    </Avatar>
  );
}

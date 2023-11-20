"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  source?: string;
  height?: string;
  width?: string;
  id?: string;
};

export default function AvatarCn({ source, width, height, id }: Props) {
  return (
    <Avatar
      id={id}
      className={`w-${width} h-${height}  object-cover rounded-full`}
    >
      <AvatarImage
        className="object-cover shadow-sm"
        src={source}
      ></AvatarImage>
      <AvatarFallback>MH</AvatarFallback>
    </Avatar>
  );
}

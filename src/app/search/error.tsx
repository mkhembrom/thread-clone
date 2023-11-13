"use client";

import React from "react";

type Props = {
  error: Error;
  result: () => void;
};

export default function Error({ error, result }: Props) {
  return (
    <div className="flex items-center justify-center min-h-max flex-col">
      <div className="text-red-400">{error.message}</div>
    </div>
  );
}

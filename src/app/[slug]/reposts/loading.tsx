"use client";
import React from "react";
import { Puff } from "react-loader-spinner";
export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <Puff
        visible={true}
        height="40"
        width="40"
        color="#ffffff"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
}

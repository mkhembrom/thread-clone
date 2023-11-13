import React from "react";
import { FadeLoader } from "react-spinners";
type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="flex justify-center items-center">
      <FadeLoader height={15} width={6} radius={10} color="#eee" />
    </div>
  );
}

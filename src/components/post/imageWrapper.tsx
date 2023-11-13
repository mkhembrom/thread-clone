import React from "react";

interface imageWraperProps {
  children: React.ReactNode;
}

export default function ImageWraper({ children }: imageWraperProps) {
  return <div className="w-80 relative ">{children}</div>;
}

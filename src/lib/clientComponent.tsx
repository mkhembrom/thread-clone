"use client";

import { useState, useEffect, ReactNode } from "react";

type clientComponentProps = {
  children: ReactNode;
};

export default function ClientComponent({ children }: clientComponentProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, [isClient]);

  return <>{isClient ? <>{children}</> : null}</>;
}

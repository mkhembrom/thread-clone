"use client";

import prisma from "@/lib/prismadb";
import useCurrentUserForClient from "@/lib/useCurrentUserForClient";
import React, { useEffect, useState } from "react";

const useNotification = () => {
  const [notify, setNotify] = useState([]);
  const getNotification = async () => {
    const res = await fetch(`http://localhost:3000/api/notification`);
    return res.json();
  };

  useEffect(() => {
    async function rose() {
      const data = await getNotification();
      setNotify(data.notification);
    }
    rose();
  }, []);
  return {
    notify,
  };
};

export default useNotification;

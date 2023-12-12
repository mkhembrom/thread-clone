"use client";
import React, { useEffect, useState } from "react";

const useNotification = () => {
  const [notify, setNotify] = useState([]);
  const getNotification = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/notification`
    );
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

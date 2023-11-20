"use client";
import { useCallback, useEffect, useState } from "react";

export const useComment = (postId: string) => {
  const [comment, setComment] = useState(null);

  const fetchDataCallback = useCallback(async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_DB_HOST}/api/comment/${postId}`,
      {
        cache: "no-cache",
      }
    );
    const data = await res.json();

    if (res.ok) {
      setComment(data.comments);
    }
  }, [postId]);

  return { fetchDataCallback, comment };
};

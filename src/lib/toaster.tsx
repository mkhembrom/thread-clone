"use client";

import { useEffect } from "react";
import toast, { ToastBar, Toaster } from "react-hot-toast";

interface customToastProps {
  message: string;
  response: Promise<any>;
}

export default function CustomToast({ message, response }: customToastProps) {
  useEffect(() => {
    toast.promise(response, {
      loading: "Uploading...",
      success: "Upload successful!",
      error: (error) => `Error: ${error}`,
    });
  }, [message, response]);

  return <Toaster />;
}

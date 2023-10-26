"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RefreshRSCOnFocus() {
  const { refresh } = useRouter();

  useEffect(() => {
    const onFocus = () => {
      if (document.readyState === "complete" && document.visibilityState === "visible") {
        refresh();
      }
    };

    window.addEventListener("visibilitychange", onFocus);

    return () => {
      window.removeEventListener("visibilitychange", onFocus);
    };
  }, [refresh]);

  return null;
}

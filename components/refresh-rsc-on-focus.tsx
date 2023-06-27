"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function RefreshRSCOnFocus() {
  const { refresh } = useRouter();

  useEffect(() => {
    const onFocus = () => {
      refresh();
    };

    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("focus", onFocus);
    };
  }, [refresh]);

  return null;
}

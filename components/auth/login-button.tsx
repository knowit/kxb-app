"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

function LoginButton() {
  const searchParams = useSearchParams();

  return (
    <Button
      onClick={() =>
        signIn("azure-ad", {
          redirect: false,
          callbackUrl: searchParams?.get("from") || "/dashboard"
        })
      }
    >
      Login
    </Button>
  );
}

export { LoginButton };

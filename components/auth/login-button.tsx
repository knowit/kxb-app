"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Button } from "../ui/button";

function LoginButton({
  children,
  onLoginClicked = () => {},
  ...other
}: React.ComponentPropsWithoutRef<typeof Button> & {
  children?: React.ReactNode;
  onLoginClicked?: () => void;
}) {
  const searchParams = useSearchParams();

  return (
    <Button
      onClick={async () => {
        onLoginClicked?.();
        signIn("azure-ad", {
          redirect: false,
          callbackUrl: searchParams?.get("from") || "/dashboard"
        });
      }}
      {...other}
    >
      {children ?? "Login"}
    </Button>
  );
}

export { LoginButton };

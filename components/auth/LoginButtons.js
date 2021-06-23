import useAuthProviders from "@/components/auth/hooks/useAuthProviders";
import Button from "@/components/button";
import { signIn } from "next-auth/client";
import * as React from "react";

export default function LoginButtons({ onClick, ...other }) {
  const authProviders = useAuthProviders();
  const providers = React.useMemo(() => Object.keys(authProviders ?? {}), [authProviders]);

  return (
    <Button
      onClick={() => {
        if (onClick) {
          onClick();
        }

        if (providers.length === 1) {
          signIn(providers[0]);
        } else {
          signIn();
        }
      }}
    >
      Login
    </Button>
  );
}

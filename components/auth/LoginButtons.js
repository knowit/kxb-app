import { signIn } from "next-auth/client";
import * as React from "react";
import Button from "../button";
import useAuthProviders from "./hooks/useAuthProviders";

export default function LoginButtons() {
  const authProviders = useAuthProviders();
  const providers = React.useMemo(() => Object.keys(authProviders ?? {}), [authProviders]);

  return (
    <Button onClick={() => (providers.length === 1 ? signIn(providers[0]) : signIn())}>
      Login
    </Button>
  );
}

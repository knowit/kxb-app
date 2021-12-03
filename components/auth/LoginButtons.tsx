import { useAuthProviders } from "@/components/auth";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import * as React from "react";

type LoginButtonsProps = {} & React.HTMLAttributes<HTMLButtonElement>;

const LoginButtons = ({ onClick, ...other }: LoginButtonsProps) => {
  const authProviders = useAuthProviders();
  const providers = React.useMemo(() => Object.keys(authProviders ?? {}), [authProviders]);

  return (
    <Button
      onClick={e => {
        if (onClick) {
          onClick(e);
        }

        if (providers.length === 1) {
          signIn(providers[0]);
        } else {
          signIn();
        }
      }}
      {...other}
    >
      Login
    </Button>
  );
};

export default LoginButtons;

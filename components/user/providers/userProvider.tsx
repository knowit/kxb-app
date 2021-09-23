import { User } from "@/types";
import { debounceFetch, fetcher } from "@/utils/fetcher";
import * as React from "react";
import useSWR, { useSWRConfig } from "swr";

interface UserContextProps {
  user: User;
  update: (updatedUser: Partial<User>) => Promise<void>;
  isLoadingUser: boolean;
}

const UserContext = React.createContext<UserContextProps>(null);

function UserProvider({ children, session = {}, user }) {
  const { data } = useSWR<User>(() => `/api/user/${user.id}`, fetcher, {
    fallbackData: user,
    revalidateOnMount: true
  });

  const { mutate } = useSWRConfig();

  const update = React.useCallback(
    async (updatedUser: Partial<User>) => {
      const mutatedUser = await mutate(
        `/api/user/${data.id}`,
        (user: User) => ({
          ...user,
          ...updatedUser
        }),
        false
      );

      debounceFetch(`/api/user/${data.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(mutatedUser)
      });
    },
    [mutate, data]
  );

  const value = React.useMemo(
    () => ({
      user: data,
      update,
      isLoadingUser: !data
    }),
    [data, update]
  );

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}

export { UserProvider, useUser };

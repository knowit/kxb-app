import { debounceFetch, fetcher } from "@/utils/fetcher";
import * as React from "react";
import useSWR, { mutate } from "swr";

const UserContext = React.createContext({});
UserContext.displayName = "UserContext";

function UserProvider({ children, session = {}, user }) {
  const { data } = useSWR(() => `/api/user/${user.id}`, fetcher, {
    fallbackData: user,
    revalidateOnMount: true
  });

  const value = React.useMemo(
    () => ({
      user: data,
      update: async updatedUser => {
        mutate(
          `/api/user/${user.id}`,
          {
            ...data,
            ...updatedUser
          },
          false
        );

        debounceFetch(`/api/user/${user.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({
            ...data,
            ...updatedUser
          })
        });
      },
      isLoadingUser: !data
    }),
    [data, user]
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

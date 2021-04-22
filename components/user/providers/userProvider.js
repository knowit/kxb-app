import * as React from "react";
import useSWR, { mutate } from "swr";
import { fetcher } from "../../../utils/fetcher";

const UserContext = React.createContext();
UserContext.displayName = "UserContext";

function UserProvider({ children, session }) {
  const { data } = useSWR(() => `/api/user/${session.user.id}`, fetcher);

  return (
    <UserContext.Provider
      value={{
        user: data,
        update: async user => {
          mutate(
            `/api/user/${session.user.id}`,
            {
              ...data,
              ...user
            },
            false
          );

          await fetch(`/api/user/${session.user.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: JSON.stringify({
              ...data,
              ...user
            })
          });
        }
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
function useUser() {
  const context = React.useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
}
export { UserProvider, useUser };

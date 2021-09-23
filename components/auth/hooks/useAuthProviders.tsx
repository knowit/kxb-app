import { getProviders } from "next-auth/client";
import useSWR from "swr";

export default function useAuthProviders() {
  const { data } = useSWR("/auth/providers", () => getProviders());

  return data;
}

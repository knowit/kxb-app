import { useSession } from "next-auth/client";
import useSWR from "swr";
import { fetcher } from "../../../utils/fetcher";

export default function useUser() {
  const [session] = useSession();
  const { data } = useSWR(() => `/api/user/${session.user.id}`, fetcher);

  return { user: data };
}

import { fetcher } from "@/utils/fetcher";
import { useLocalStorage } from "react-use";
import useSWR from "swr";

export default function useUserAvatar() {
  const [userAvatarSrc, setUserAvatarSrc] = useLocalStorage<string | undefined>(
    "kxb-app-user-avatar-src",
    undefined
  );

  useSWR<{ src: string }>("/api/user/avatar", fetcher, {
    onSuccess: data => {
      setUserAvatarSrc(data.src);
    }
  });

  return {
    userAvatarSrc
  };
}

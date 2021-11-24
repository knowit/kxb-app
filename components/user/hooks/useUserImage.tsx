import { fetchBlobWithToken } from "@/utils/fetcher";
import { useSession } from "next-auth/client";
import * as React from "react";
import useSWR from "swr";

// The supported sizes of HD photos on Microsoft 365 are as follows:
// 48x48, 64x64, 96x96, 120x120, 240x240, 360x360, 432x432, 504x504, and 648x648.
// Photos can be any dimension if they are stored in Azure Active Directory.

export default function useUserImage(size = "120x120") {
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<boolean>(false);
  const [userImageUrl, setUserImageUrl] = React.useState<string>(
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
  );

  const [session] = useSession();

  const { data } = useSWR(
    () => [`https://graph.microsoft.com/v1.0/me/photos/${size}/$value`, session?.accessToken],
    fetchBlobWithToken,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: () => {
        setError(true);
        setLoading(false);
      }
    }
  );

  React.useEffect(() => {
    if (data) {
      setUserImageUrl(webkitURL.createObjectURL(data));
      setLoading(false);
    }
  }, [data]);

  return { userImageUrl, loading, error };
}

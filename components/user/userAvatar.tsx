/* eslint-disable @next/next/no-img-element */
/* next does not yet support blob usage in next image component */
/* active PR: https://github.com/vercel/next.js/pull/23622 */
import { Box } from "@/components/ui";
import { useUser } from "@/components/user/hooks";
import { useSession } from "next-auth/react";
import * as React from "react";
import { styled } from "stitches.config";

const AvatarImage = styled("img", {
  height: "100%",
  width: "100%"
});

const AvatarImageFallback = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
  width: "100%",
  backgroundColor: "$avatarImageFallback",
  color: "$text",
  fontSize: "$3",
  textTransform: "uppercase",
  letterSpacing: "$avatarImageFallback"
});

const UserAvatar = () => {
  const { user } = useUser();
  const { data: session } = useSession();
  const [imageError, setImageError] = React.useState(false);

  const initials = React.useMemo(
    () =>
      user?.name
        ?.split(" ")
        ?.map(name => name[0])
        ?.slice(0, 3)
        ?.join(""),
    [user?.name]
  );

  return (
    <Box
      css={{
        width: "100%",
        height: "100%",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        borderRadius: "$round",
        overflow: "hidden"
      }}
    >
      {imageError ? (
        <AvatarImageFallback>{initials}</AvatarImageFallback>
      ) : (
        <AvatarImage
          src={session.user?.image}
          alt="User avatar"
          onError={() => {
            setImageError(true);
          }}
        />
      )}
    </Box>
  );
};

export default UserAvatar;

/* eslint-disable @next/next/no-img-element */
/* next does not yet support blob usage in next image component */
/* active PR: https://github.com/vercel/next.js/pull/23622 */
import { Box } from "@/components/ui";
import { useUserImage } from "@/components/user/hooks";
import * as React from "react";
import { styled } from "stitches.config";

const AvatarImage = styled("img", {
  height: "$7",
  width: "$7"
});

const UserAvatar = () => {
  const userImage = useUserImage();

  return (
    <Box
      css={{
        width: "100%",
        height: "100%",
        border: "1px solid transparent",
        borderRadius: "$round",
        overflow: "hidden"
      }}
    >
      <AvatarImage src={userImage} alt="User avatar" />
    </Box>
  );
};

export default UserAvatar;

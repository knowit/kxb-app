import {
  Button,
  Heading,
  IconButton,
  Li,
  Link,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Ul
} from "@/components/ui";
import { signOut } from "next-auth/client";
import * as React from "react";
import { styled } from "stitches.config";
import { useUser } from ".";
import UserAvatar from "./userAvatar";

const UserAvatarPopoverSection = styled("section", {
  padding: "0 $5",
  "&:nth-child(1)": {
    backgroundColor: "$gray-light"
  }
});

const UserAvatarPopover = ({}) => {
  const { user } = useUser();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={state => setOpen(state)}>
      <PopoverTrigger asChild>
        <IconButton size="3" variant="ghost">
          <UserAvatar />
        </IconButton>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        css={{
          padding: "0",
          py: "$3",
          minWidth: "260px"
        }}
      >
        <UserAvatarPopoverSection>
          <Heading size="1">{user.name}</Heading>
        </UserAvatarPopoverSection>
        <Separator space="3" />
        <UserAvatarPopoverSection>
          <Ul>
            <Li>
              <Link variant="full" href="/profile" onClick={() => setOpen(false)}>
                Profile
              </Link>
            </Li>
            <Li>
              <Link variant="full" href="/feedback" onClick={() => setOpen(false)}>
                Feedback
              </Link>
            </Li>
          </Ul>
        </UserAvatarPopoverSection>
        <Separator space="3" />
        <UserAvatarPopoverSection>
          <Button onClick={() => signOut()}>Logout</Button>
        </UserAvatarPopoverSection>
        <PopoverArrow offset={19} />
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatarPopover;

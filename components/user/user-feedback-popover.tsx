"use client";

import { Button, ButtonSkeleton } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserFeedbackForm } from "@/components/user/user-feedback-form";
import { ComponentPropsWithoutRef } from "react";
import { SelectUser } from "../../lib/db/schema";

const UserFeedbackPopover = ({
  user,
  ...other
}: ComponentPropsWithoutRef<typeof PopoverTrigger> & { user: SelectUser }) => {
  return (
    <Popover>
      <PopoverTrigger asChild {...other}>
        <Button>Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[320px]">
        <UserFeedbackForm user={user} />
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

const UserFeedbackPopoverSkeleton = () => {
  return <ButtonSkeleton className="h-[40px] w-[100px]" />;
};

export { UserFeedbackPopover, UserFeedbackPopoverSkeleton };

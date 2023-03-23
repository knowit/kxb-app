"use client";

import { Button } from "@/components/ui/button";
import { Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { UserFeedbackForm } from "@/components/user/user-feedback-form";
import { User } from "@/types";

const UserFeedback = ({ user }: { user: User }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button>Feedback</Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[300px]">
        <UserFeedbackForm user={user} />
        <PopoverArrow />
      </PopoverContent>
    </Popover>
  );
};

export { UserFeedback };

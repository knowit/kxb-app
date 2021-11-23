import { Button, Popover, PopoverArrow, PopoverContent, PopoverTrigger } from "@/components/ui";
import * as React from "react";
import FeedbackForm from "./feedbackForm";

const FeedbackPopover = ({}) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="black">Feedback</Button>
      </PopoverTrigger>
      <PopoverContent
        align="start"
        sideOffset={10}
        css={{
          minWidth: "320px"
        }}
      >
        <FeedbackForm compact />
        <PopoverArrow offset={55} />
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackPopover;

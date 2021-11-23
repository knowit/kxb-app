import {
  Button,
  IconButton,
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
  Svg
} from "@/components/ui";
import * as React from "react";
import { IoClose } from "react-icons/io5";
import { FeedbackForm } from ".";

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
        <PopoverClose aria-label="Close">
          <IconButton variant="ghost">
            <Svg color="white" as={IoClose} />
          </IconButton>
        </PopoverClose>
      </PopoverContent>
    </Popover>
  );
};

export default FeedbackPopover;

import {
  IconButton,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Svg
} from "@/components/ui";
import { WithChildren } from "@/types";
import { PopoverContentProps } from "@radix-ui/react-popover";
import * as React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CSS, VariantProps } from "stitches.config";
import Button from "./button";

type PopoverContentSizeVariants = 1 | 2 | 3;

type InfoButtonProps = VariantProps<typeof IconButton> &
  WithChildren<{
    css?: CSS;
    popoverSide?: Pick<PopoverContentProps, "side">["side"];
    popoverSize?: PopoverContentSizeVariants;
  }>;

const InfoButton = React.forwardRef<React.ElementRef<typeof Button>, InfoButtonProps>(
  function InfoButton({ children, popoverSide = "top", popoverSize = "2", ...other }, ref) {
    const popoverContentSize = {
      1: { "@initial": "1" },
      2: { "@initial": "1", "@bp1": "2" },
      3: { "@initial": "1", "@bp2": "3" }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <IconButton size="info" type="button" variant="textDark" {...other} ref={ref}>
            <Svg as={IoInformationCircleOutline} variant="textDark" />
          </IconButton>
        </PopoverTrigger>
        <PopoverContent
          portal
          variant="gray"
          side={popoverSide}
          size={popoverContentSize[popoverSize]}
        >
          {children}
          <PopoverArrow variant="gray" offset={11} />
        </PopoverContent>
      </Popover>
    );
  }
);

export default InfoButton;

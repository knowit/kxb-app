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
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import * as React from "react";
import { IoInformationCircleOutline } from "react-icons/io5";
import { CSS, styled, VariantProps } from "stitches.config";
import Button from "./button";

const InfoButtonRoot = styled(IconButton, {
  variants: {
    size: {
      1: {
        borderRadius: "$2",
        height: "$4",
        width: "$4"
      },
      2: {
        borderRadius: "$2",
        height: "$5",
        width: "$5"
      },
      3: {
        borderRadius: "$2",
        height: "$6",
        width: "$6"
      },
      4: {
        borderRadius: "$3",
        height: "$7",
        width: "$7"
      }
    }
  }
});

type PopoverContentSizeVariants = 1 | 2 | 3;

type RadioGroupRadioProps = VariantProps<typeof InfoButtonRoot> &
  WithChildren<{
    css?: CSS;
    popoverSide?: Pick<PopoverContentProps, "side">["side"];
    popoverSize?: PopoverContentSizeVariants;
  }>;

const InfoButton = React.forwardRef<React.ElementRef<typeof Button>, RadioGroupRadioProps>(
  function RadioGroupRadio({ children, popoverSide = "top", popoverSize = "2", ...other }, ref) {
    const popoverContentSize: Record<
      PopoverContentSizeVariants,
      Pick<VariantProps<typeof PopoverContent>, "size">["size"]
    > = {
      1: { "@initial": "1" },
      2: { "@initial": "1", "@bp1": "2" },
      3: { "@initial": "1", "@bp2": "3" }
    };

    return (
      <Popover>
        <PopoverTrigger asChild>
          <InfoButtonRoot
            type="button"
            variant="textDark"
            size="1"
            css={{ marginLeft: "$2" }}
            {...other}
            ref={ref}
          >
            <Svg as={IoInformationCircleOutline} variant="textDark" />
          </InfoButtonRoot>
        </PopoverTrigger>
        <PopoverContent variant="gray" side={popoverSide} size={popoverContentSize[popoverSize]}>
          {children}
          <PopoverArrow variant="gray" offset={11} />
        </PopoverContent>
      </Popover>
    );
  }
);

const RadioGroup = RadioGroupPrimitive.Root;

export default InfoButton;

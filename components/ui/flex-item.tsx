import { Flex } from "@/components/ui/flex";
import { forwardRef } from "react";

type FlexItemElementRef = React.ElementRef<typeof Flex>;
type FlexItemProps = React.ComponentPropsWithoutRef<typeof Flex> & {
  children?: React.ReactNode;
};

const FlexItem = forwardRef<FlexItemElementRef, FlexItemProps>(
  ({ children, direction = "column", ...other }, forwardedRef) => {
    return (
      <Flex direction={direction} {...other} ref={forwardedRef}>
        {children}
      </Flex>
    );
  }
);

FlexItem.displayName = "FlexItem";

export { FlexItem };
export type { FlexItemProps };

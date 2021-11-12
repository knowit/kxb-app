import merge from "lodash.merge";
import React from "react";
import { CSS, VariantProps } from "stitches.config";
import Text from "./text";

const DEFAULT_TAG = "h1";

type TextSizeVariants = Pick<VariantProps<typeof Text>, "size">;
type HeadingSizeVariants = "1" | "2" | "3" | "4" | "5";
type HeadingVariants = { size?: HeadingSizeVariants } & Omit<VariantProps<typeof Text>, "size">;
export type HeadingProps = React.ComponentProps<typeof DEFAULT_TAG> &
  HeadingVariants & { css?: CSS; as?: any };

const Heading = React.forwardRef<React.ElementRef<typeof DEFAULT_TAG>, HeadingProps>(
  (props, forwardedRef) => {
    // '2' here is the default heading size variant
    const { size = "1", ...textProps } = props;
    // This is the mapping of Heading Variants to Text variants
    const textSize: Record<HeadingSizeVariants, TextSizeVariants["size"]> = {
      1: { "@initial": "4", "@bp2": "5" },
      2: { "@initial": "5", "@bp2": "6" },
      3: { "@initial": "6", "@bp2": "7" },
      4: { "@initial": "7", "@bp2": "8" },
      5: { "@initial": "8", "@bp2": "9" }
    };

    // This is the mapping of Heading Variants to Text css
    const textCss: Record<HeadingSizeVariants, CSS> = {
      1: { fontWeight: "bold", lineHeight: "130%" },
      2: { fontWeight: "bold", lineHeight: "130%" },
      3: { fontWeight: "bold", lineHeight: "130%" },
      4: { fontWeight: "bold", lineHeight: "120%" },
      5: { fontWeight: "bold", lineHeight: "122%" }
    };

    return (
      <Text
        as={DEFAULT_TAG}
        {...textProps}
        ref={forwardedRef}
        size={textSize[size]}
        css={{
          ...merge(textCss[size], props.css)
        }}
      />
    );
  }
);

Heading.displayName = "Heading";

Heading.toString = () => ".heading";

export default Heading;

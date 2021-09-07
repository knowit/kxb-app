import BaseHeroIcon from "@/components/icons/svgs/hero/baseHeroIcon";
import React from "react";

const DoubleChevronUp = React.forwardRef(
  (
    { className, color = "currentColor", size = "base", baseComponent = BaseHeroIcon, ...rest },
    ref
  ) => {
    const BaseComponent = baseComponent ?? "div";

    return (
      <BaseComponent ref={ref} className={className} color={color} size={size} {...rest}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 11l7-7 7 7M5 19l7-7 7 7"
        />
      </BaseComponent>
    );
  }
);

DoubleChevronUp.displayName = "DoubleChevronUp";

export default DoubleChevronUp;

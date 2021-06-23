import BaseHeroIcon from "@/components/icons/svgs/hero/baseHeroIcon";
import React from "react";

const ChevronLeft = React.forwardRef(
  (
    { className, color = "currentColor", size = "base", baseComponent = BaseHeroIcon, ...rest },
    ref
  ) => {
    const BaseComponent = baseComponent ?? "div";

    return (
      <BaseComponent ref={ref} className={className} color={color} size={size} {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </BaseComponent>
    );
  }
);

ChevronLeft.displayName = "ChevronLeft";

export default ChevronLeft;

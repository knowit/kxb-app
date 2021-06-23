import BaseHeroIcon from "@/components/icons/svgs/hero/baseHeroIcon";
import React from "react";

const ChevronRight = React.forwardRef(
  (
    { className, color = "currentColor", size = "base", baseComponent = BaseHeroIcon, ...rest },
    ref
  ) => {
    const BaseComponent = baseComponent ?? "div";

    return (
      <BaseComponent ref={ref} className={className} color={color} size={size} {...rest}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </BaseComponent>
    );
  }
);

ChevronRight.displayName = "ChevronRight";

export default ChevronRight;

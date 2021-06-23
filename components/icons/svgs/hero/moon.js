import BaseHeroIcon from "@/components/icons/svgs/hero/baseHeroIcon";
import React from "react";

const Moon = React.forwardRef(
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
          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
        />
      </BaseComponent>
    );
  }
);

Moon.displayName = "Moon";

export default Moon;

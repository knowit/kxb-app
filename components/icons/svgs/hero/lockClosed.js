import BaseHeroIcon from "@/components/icons/svgs/hero/baseHeroIcon";
import React from "react";

const LockClosed = React.forwardRef(
  (
    { className, color = "currentColor", size = "base", baseComponent = BaseHeroIcon, ...rest },
    ref
  ) => {
    const BaseComponent = baseComponent ?? "svg";

    return (
      <BaseComponent ref={ref} className={className} color={color} size={size} {...rest}>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
        />
      </BaseComponent>
    );
  }
);

LockClosed.displayName = "LockClosed";

export default LockClosed;

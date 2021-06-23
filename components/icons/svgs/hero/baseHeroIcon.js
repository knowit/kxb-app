import { getIconSizeClassnames } from "@/components/icons/svgs/hero/utils/iconSize";
import clsx from "clsx";
import React from "react";

const BaseHeroIcon = React.forwardRef(
  ({ children, className, color = "currentColor", size = "base", ...rest }, ref) => {
    const iconSizeClassnames = React.useMemo(() => getIconSizeClassnames(size), [size]);

    return (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        className={clsx(iconSizeClassnames, className, "text-gray-900 dark:text-gray-100")}
        {...rest}
      >
        {children}
      </svg>
    );
  }
);

BaseHeroIcon.displayName = "BaseHeroIcon";

export default BaseHeroIcon;

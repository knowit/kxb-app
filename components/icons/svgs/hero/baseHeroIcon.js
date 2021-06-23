import clsx from "clsx";
import React, { forwardRef } from "react";
import { getIconSizeClassnames } from "./utils/iconSize";

const BaseHeroIcon = forwardRef(
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

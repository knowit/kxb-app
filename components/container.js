import * as React from "react";

export default function Container({ children, as = "div", ...other }) {
  const Component = as;
  return <Component {...other}>{children}</Component>;
}

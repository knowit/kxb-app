import * as React from "react";

interface Props {
  as?: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

const Container: React.FC<Props> = ({ children, as = "div", ...other }) => {
  const Component = as;
  return <Component {...other}>{children}</Component>;
};

export default Container;

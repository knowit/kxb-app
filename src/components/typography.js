import styled from "@emotion/styled";
import { compose, lineHeight } from "styled-system";
import { Box } from "./box";

export const composedHelpers = compose(lineHeight);

export const Typography = styled(Box)`
  ${composedHelpers}
  ${props => props.textTransform && `text-transform: ${props.textTransform}`};
`;

Typography.defaultProps = {
  as: "p",
  fontWeight: 1,
  color: "text500"
};

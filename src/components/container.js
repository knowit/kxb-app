import styled from "@emotion/styled";
import { Box } from "./box";

export const Container = styled(Box)`
  width: 100%;

  ${props => props.center && `margin: 0 auto;`}
`;

Container.defaultProps = {
  minWidth: 288,
  maxWidth: 1440
};

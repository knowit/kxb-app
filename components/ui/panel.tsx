import { css, styled } from "stitches.config";

export const panelStyles = css({
  backgroundColor: "$panel",
  borderRadius: "$3",
  border: "1px solid $grayLight",
  boxShadow: "0 0 1px $colors$grayLight"
});

const Panel = styled("div", panelStyles);

export default Panel;

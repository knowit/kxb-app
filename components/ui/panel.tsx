import { css, styled } from "stitches.config";

export const panelStyles = css({
  backgroundColor: "$panel",
  borderRadius: "$3",
  border: "2px solid $grayLight",
  boxShadow: "0 0 2px $colors$grayLight"
});

const Panel = styled("div", panelStyles);

export default Panel;

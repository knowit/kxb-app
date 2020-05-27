import { css, keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

const basicStyles = css`
  font-size: 2.4rem;
  background-color: white;
  color: cornflowerblue;
  border: 1px solid lightgreen;
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 lightgreen, 10px 10px 0 0 lightyellow;
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 2rem 1.5rem;
`;

const hoverStyles = css`
  &:hover {
    color: white;
    background-color: lightgray;
    border-color: aqua;
    box-shadow: -15px -15px 0 0 aqua, -30px -30px 0 0 cornflowerblue;
  }
`;
const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;
const StyledBouncyInput = styled.input`
  ${basicStyles};
  ${hoverStyles};
  & code {
    background-color: linen;
  }
  animation: ${props => props.animation} 0.2s infinite ease-in-out alternate;
`;

export default function BouncyInput({ animation = bounce, initialValue, onChange, ...other }) {
  const [value, setValue] = React.useState(initialValue);

  return (
    <StyledBouncyInput
      animation={animation}
      value={value}
      onChange={e => {
        setValue(e.target.value);
        onChange(e.target.value);
      }}
      {...other}
    />
  );
}

import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import * as React from "react";

const bounce = keyframes`
  from {
    transform: scale(1.01);
  }
  to {
    transform: scale(0.99);
  }
`;

const StyledBouncyInputContainer = styled.div`
  display: flex;
  flex-direction: column-reverse;
`;

const StyledBouncyInputLabel = styled.label`
  font-size: 1.4rem;
  color: ${props => props.theme.colors.text500};
  transform: translate(0, 20px);
  transition: transform 0.1s linear;
`;

const StyledBouncyInput = styled.input`
  font-size: 2.4rem;
  background-color: ${props => props.theme.colors.bg500};
  color: ${props => props.theme.colors.text500};
  border: 1px solid ${props => props.theme.colors.text500};
  border-right: none;
  border-bottom: none;
  box-shadow: 5px 5px 0 0 ${props => props.theme.colors.text500},
    10px 10px 0 0 ${props => props.theme.colors.bg300};
  transition: all 0.1s linear;
  margin: 3rem 0;
  padding: 2rem 1.5rem;

  &:hover {
    color: ${props => props.theme.colors.bg500};
    background-color: ${props => props.theme.colors.text500};
    border-color: ${props => props.theme.colors.text100};
    box-shadow: -15px -15px 0 0 ${props => props.theme.colors.text300},
      -30px -30px 0 0 ${props => props.theme.colors.text100};
  }

  &:hover + label {
    transform: translate(0);
  }

  & code {
    background-color: linen;
  }
  animation: ${props => props.animation} 0.2s infinite ease-in-out alternate;
`;

export default function BouncyInput({
  id,
  animation = bounce,
  initialValue,
  onChange,
  label,
  ...other
}) {
  const [value, setValue] = React.useState(initialValue);

  return (
    <StyledBouncyInputContainer>
      <StyledBouncyInput
        id={id}
        animation={animation}
        value={value}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        {...other}
      />
      {label && <StyledBouncyInputLabel htmlFor={id}>{label}</StyledBouncyInputLabel>}
    </StyledBouncyInputContainer>
  );
}

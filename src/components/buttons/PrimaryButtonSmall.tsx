import { ReactNode } from "react";
import styled from "styled-components";

const StyledPrimaryButtonSmall = styled.button`
  width: auto;
  height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 1.625rem;
  border: none;
  outline: none;
  padding: 0 1.75rem;
  background: ${(props) => props.theme.orange};

  &:hover {
    background: ${(props) => props.theme.orangeHover};
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }
`;

const PrimaryButtonSmall = ({ children }: { children: ReactNode }) => {
  return <StyledPrimaryButtonSmall>{children}</StyledPrimaryButtonSmall>;
};

export default PrimaryButtonSmall;

import { ReactNode } from "react";
import styled from "styled-components";

const StyledSecondaryButtonSmall = styled.button`
  width: auto;
  height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkGrey};
  text-align: center;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 1.625rem;
  border: none;
  outline: none;
  padding: 0 1.75rem;
  background: #dfe7ec;

  &:hover {
    background: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }
`;

const SecondaryButtonSmall = ({ children }: { children: ReactNode }) => {
  return <StyledSecondaryButtonSmall>{children}</StyledSecondaryButtonSmall>;
};

export default SecondaryButtonSmall;

import { ReactNode } from "react";
import styled from "styled-components";

const StyledSecondaryButtonSmall = styled.button`
  min-width: 7.9375rem;
  width: 100%;
  min-height: 3.25rem;
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
  background: #dfe7ec;

  &:hover {
    background: ${(props) => props.theme.blue};
    color: ${(props) => props.theme.white};
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }

  @media (max-width: 650px) {
    min-width: 3.875rem;
    min-height: 2.5rem;
    font-size: 1rem;
  }
`;

const SecondaryButtonSmall = ({ children }: { children: ReactNode }) => {
  return <StyledSecondaryButtonSmall>{children}</StyledSecondaryButtonSmall>;
};

export default SecondaryButtonSmall;

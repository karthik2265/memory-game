import { ReactNode } from "react";
import styled from "styled-components";

const StyledPrimaryButtonSmall = styled.button`
  min-width: 7.9375rem;
  min-height: 3.25rem;
  width: 100%;
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
  background: ${(props) => props.theme.orange};

  &:hover {
    background: ${(props) => props.theme.orangeHover};
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

const PrimaryButtonSmall = ({ children }: { children: ReactNode }) => {
  return <StyledPrimaryButtonSmall>{children}</StyledPrimaryButtonSmall>;
};

export default PrimaryButtonSmall;

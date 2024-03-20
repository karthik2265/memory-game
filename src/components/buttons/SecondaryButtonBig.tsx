import { ReactNode } from "react";
import styled from "styled-components";

const StyledSecondaryButtonBig = styled.button`
  width: 33.8125rem;
  height: 4.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.darkGrey};
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 2.1875rem;
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
    width: max(17.4375rem, 100%);
    height: 3rem;
    font-size: 1.125rem;
  }
`;
const SecondaryButtonBig = ({ children }: { children: ReactNode }) => {
  return <StyledSecondaryButtonBig>{children}</StyledSecondaryButtonBig>;
};

export default SecondaryButtonBig;

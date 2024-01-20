import { ReactNode } from "react";
import styled from "styled-components";

const StyledPrimaryButtonBig = styled.button`
  width: auto;
  height: 4.375rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 2rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 2.1875rem;
  border: none;
  outline: none;
  padding: 0 10rem;
  background: ${(props) => props.theme.orange};

  &:hover {
    background: ${(props) => props.theme.orangeHover};
    cursor: pointer;
  }

  &:active {
    scale: 0.97;
  }
`;
const PrimaryButtonBig = ({ children }: { children: ReactNode }) => {
  return <StyledPrimaryButtonBig>{children}</StyledPrimaryButtonBig>;
};

export default PrimaryButtonBig;

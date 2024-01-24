import { ReactNode } from "react";
import styled from "styled-components";

const StyledSelectionButtonMedium = styled.button<{ $isIdle: boolean }>`
  width: 16rem;
  height: 3.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.white};
  text-align: center;
  font-size: 1.625rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  border-radius: 1.625rem;
  border: none;
  outline: none;
  background: ${(props) => (props.$isIdle ? props.theme.softBlue : props.theme.darkGrey)};

  &:hover {
    background: ${(props) => (props.$isIdle ? props.theme.blue : "")};
    cursor: ${(props) => (props.$isIdle ? "pointer" : "")};
  }

  &:active {
    scale: ${(props) => (props.$isIdle ? 0.97 : 1)};
  }

  @media (max-width: 650px) {
    width: 8.375rem;
    height: 2.5rem;
    font-size: 1rem;
  }
`;
const SelectionButtonMedium = ({ children, isIdle }: { children: ReactNode; isIdle: boolean }) => {
  return <StyledSelectionButtonMedium $isIdle={isIdle}>{children}</StyledSelectionButtonMedium>;
};

export default SelectionButtonMedium;

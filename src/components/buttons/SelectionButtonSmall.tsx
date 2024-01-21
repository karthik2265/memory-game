import { ReactNode } from "react";
import styled from "styled-components";

const StyledSelectionButtonSmall = styled.button<{ $isIdle: boolean }>`
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
  background: ${(props) => (props.$isIdle ? props.theme.softBlue : props.theme.darkGrey)};

  &:hover {
    background: ${(props) => (props.$isIdle ? "" : props.theme.blue)};
    cursor: ${(props) => (props.$isIdle ? "" : "pointer")};
  }

  &:active {
    scale: ${(props) => (props.$isIdle ? 1 : 0.97)};
  }
`;

const SelectionButtonSmall = ({ children, isIdle }: { children: ReactNode; isIdle: boolean }) => {
  return <StyledSelectionButtonSmall $isIdle={isIdle}>{children}</StyledSelectionButtonSmall>;
};

export default SelectionButtonSmall;
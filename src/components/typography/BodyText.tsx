import { ReactNode } from "react";
import styled from "styled-components";

const StyledBodyText = styled.p<{ $color: string }>`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.$color};

  @media (max-width: 650px) {
    font-size: 0.875rem;
  }
`;

const BodyText = ({ children, color }: { children: ReactNode; color: string }) => {
  return <StyledBodyText $color={color}>{children}</StyledBodyText>;
};

export default BodyText;

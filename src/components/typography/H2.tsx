import { ReactNode } from "react";
import styled from "styled-components";

const StyledH2 = styled.h2<{ $color: string }>`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.$color};

  @media (max-width: 650px) {
    font-size: 1.25rem;
  }
`;

const H2 = ({ children, color }: { children: ReactNode; color: string }) => {
  return <StyledH2 $color={color}>{children}</StyledH2>;
};

export default H2;

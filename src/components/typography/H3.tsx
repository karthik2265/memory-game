import { ReactNode } from "react";
import styled from "styled-components";

const StyledH3 = styled.h3<{ $color: string }>`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.$color};
`;

const H3 = ({ children, color }: { children: ReactNode; color: string }) => {
  return <StyledH3 $color={color}>{children}</StyledH3>;
};

export default H3;

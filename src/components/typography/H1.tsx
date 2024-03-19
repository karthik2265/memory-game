import { ReactNode } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1<{ $color: string }>`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme.black};

  @media (max-width: 650px) {
    font-size: 2rem;
  }
`;

const H1 = ({ children, color }: { children: ReactNode; color: string }) => {
  return <StyledH1 $color={color}>{children}</StyledH1>;
};

export default H1;

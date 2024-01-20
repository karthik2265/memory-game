import { ReactNode } from "react";
import styled from "styled-components";

const StyledH1 = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: ${(props) => props.theme.black};
`;

const H1 = ({ children }: { children: ReactNode }) => {
  return <StyledH1>{children}</StyledH1>;
};

export default H1;

import { ReactNode } from "react";
import styled from "styled-components";

const StyledH2 = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: ${(props) => props.theme.black};
`;

const H2 = ({ children }: { children: ReactNode }) => {
  return <StyledH2>{children}</StyledH2>;
};

export default H2;

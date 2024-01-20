import { ReactNode } from "react";
import styled from "styled-components";

const StyledH3 = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: ${(props) => props.theme.black};
`;

const H3 = ({ children }: { children: ReactNode }) => {
  return <StyledH3>{children}</StyledH3>;
};

export default H3;

import { ReactNode } from "react";
import styled from "styled-components";

const StyledBodyText = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  color: ${(props) => props.theme.black};
`;

const BodyText = ({ children }: { children: ReactNode }) => {
  return <StyledBodyText>{children}</StyledBodyText>;
};

export default BodyText;

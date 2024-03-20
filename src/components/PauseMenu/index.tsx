import styled from "styled-components";
import PrimaryButtonBig from "../buttons/PrimaryButtonBig";
import SecondaryButtonBig from "../buttons/SecondaryButtonBig";
import { useNavigate } from "react-router-dom";

type ResultProps = {
  restart: () => void;
  resume: () => void;
};

const StyledWrapper = styled.div`
  width: 20.4rem;
  padding: 2rem 2rem;
  border-radius: 0.625rem;
  background-color: ${props => props.theme.white};
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

const PauseMenu = ({ restart, resume }: ResultProps) => {
  const navigate = useNavigate();
  return (
    <StyledWrapper>
      <div onClick={restart}>
        <PrimaryButtonBig>Restart</PrimaryButtonBig>
      </div>
      <div onClick={() => navigate("/")}>
        <SecondaryButtonBig>New Game</SecondaryButtonBig>
      </div>
      <div onClick={resume}>
        <SecondaryButtonBig>Resume Game</SecondaryButtonBig>
      </div>
    </StyledWrapper>
  );
};

export default PauseMenu;

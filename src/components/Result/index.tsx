import { useContext } from "react";
import H1 from "../typography/H1";
import { ThemeContext } from "../../context/ThemeContext";
import BodyText from "../typography/BodyText";
import PrimaryButtonSmall from "../buttons/PrimaryButtonSmall";
import SecondaryButtonSmall from "../buttons/SecondaryButtonSmall";
import styled from "styled-components";
import H2 from "../typography/H2";
import { useNavigate } from "react-router-dom";

type ResultProps = {
  players: { name: string; pairsMatched: number; time: string; movesTaken: number; isWinner: boolean }[];
  restart: () => void;
};

const StyledResult = styled.div`
  background-color: ${(props) => props.theme.white};
  padding: 2rem 1.25rem;
  border-radius: 1rem;
  display: grid;
  place-items: center;
`;

const StyledActions = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 2rem;

  @media (max-width: 650px) {
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
  }
`;

const StyledActionButton = styled.div`
  width: 49%;
  @media (max-width: 650px) {
    width: 100%;
  }
`;

const StyledInfoBox = styled.div<{ $backgroundColor: string }>`
  width: 33.87rem;
  background-color: ${(props) => props.$backgroundColor};
  border-radius: 0.625rem;
  padding: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 650px) {
    width: 17.43rem;
    padding: 1rem;
  }
`;

const Result = ({ players, restart }: ResultProps) => {
  const title = getTitleText(players);
  const subTitle = getSubTitleText(players);
  const theme = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <StyledResult>
      <div style={{ marginBottom: "2rem", textAlign: "center" }}>
        <div style={{ marginBottom: "1rem" }}>
          <H1 color={theme.black}>{title}</H1>
        </div>
        <BodyText color={theme.grey}>{subTitle}</BodyText>
      </div>
      {players.length > 1
        ? players.map((player, idx) => {
            return (
              <div key={idx} style={{ marginTop: idx === 0 ? 0 : "1rem" }}>
                <StyledInfoBox $backgroundColor={player.isWinner ? theme.black : theme.iceBlue}>
                  <BodyText color={player.isWinner ? theme.white : theme.grey}>{`${player.name} ${
                    player.isWinner ? "(Winner!)" : ""
                  }`}</BodyText>
                  <H2 color={player.isWinner ? theme.white : theme.darkGrey}>{player.pairsMatched} Pairs</H2>
                </StyledInfoBox>
              </div>
            );
          })
        : players.map((player, idx) => {
            return (
              <div key={idx} style={{ marginTop: idx === 0 ? 0 : "1rem" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <StyledInfoBox $backgroundColor={theme.iceBlue}>
                    <BodyText color={theme.grey}>Time Elapsed</BodyText>
                    <H2 color={theme.black}>{player.time}</H2>
                  </StyledInfoBox>
                  <StyledInfoBox $backgroundColor={theme.iceBlue}>
                    <BodyText color={theme.grey}>Moves Taken</BodyText>
                    <H2 color={theme.black}>{player.movesTaken}</H2>
                  </StyledInfoBox>
                </div>
              </div>
            );
          })}
      <StyledActions>
        <StyledActionButton onClick={restart}>
          <PrimaryButtonSmall>Restart</PrimaryButtonSmall>
        </StyledActionButton>
        <StyledActionButton onClick={() => navigate("/")}>
          <SecondaryButtonSmall>Setup New Game</SecondaryButtonSmall>
        </StyledActionButton>
      </StyledActions>
    </StyledResult>
  );
};

function getTitleText(players: ResultProps["players"]) {
  if (players.length == 1) {
    return "You did it!";
  }
  players.sort((a, b) => b.pairsMatched - a.pairsMatched);
  const highestScore = players[0].pairsMatched;
  const isTie = players.filter((p) => p.pairsMatched === highestScore).length > 1;
  if (isTie) {
    return "It's a tie!";
  }
  return `${players[0].name} Wins!`;
}

function getSubTitleText(players: ResultProps["players"]) {
  if (players.length > 1) {
    return "Game over! Here are the results…";
  }
  return "Game over! Here’s how you got on…";
}

// function findWinners(players: ResultProps["players"]) {
//   players.sort((a, b) => b.pairsMatched - a.pairsMatched);
//   if (players.length <= 1) return players.map((player) => ({ ...player, isWinner: true }));
//   const highest = players[0].pairsMatched;
//   players = players.map((player) => ({ ...player, isWinner: player.pairsMatched == highest ? true : false }));
//   return players;
// }

export default Result;

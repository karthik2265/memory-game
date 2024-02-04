import React, { Dispatch, SetStateAction, useContext } from "react";
import H1 from "../typography/H1";
import { ThemeContext } from "../../context/ThemeContext";
import BodyText from "../typography/BodyText";

type ResultProps = {
  players: { name: string; pairsMatched: number }[];
  restart: Dispatch<SetStateAction<boolean>>;
  time?: string;
};

const Result = ({ players, restart }: ResultProps) => {
  const title = getTitleText(players);
  findWinners(players);
  const theme = useContext(ThemeContext);

  return (
    <div>
      <H1 color={theme.black}>{title}</H1>
      <BodyText color={theme.grey}>Game over! Here are the results…</BodyText>
      {players.length > 1 ? (
        <div>
          {players.map((player) => (
            <div>{player.name}</div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

function getTitleText(players: ResultProps["players"]) {
  if (players.length == 1) {
    return "You did it!";
  }
  const isTie = new Set(players.map((p) => p.pairsMatched)).size == players.length;
  if (isTie) {
    return "It's a tie!";
  }
  players.sort((a, b) => b.pairsMatched - a.pairsMatched);
  return `${players[0].name} Wins!`;
}

function findWinners(players: ResultProps["players"]) {
  players.sort((a, b) => b.pairsMatched - a.pairsMatched);
  if (players.length <= 1) return;
  const highest = players[0].pairsMatched;
  players = players.map((player) => ({ ...player, isWinner: player.pairsMatched == highest ? true : false }));
}

export default Result;

import { useLocation } from "react-router-dom";
import { GameThemeOptions, Icons, Numbers } from "../../constants";
import Modal from "../../components/Modal";
import React, { useState, useEffect, ReactNode } from "react";
import Result from "../../components/Result";
import { Cell, Player } from "../../types";

const GamePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const theme: GameThemeOptions = GameThemeOptions[params.get("theme") as keyof typeof GameThemeOptions];
  const playersCount: number = Number(params.get("players"));
  const size: number = Number(params.get("size"));

  // state
  const [isResultModalOpen, setIsResultModalOpen] = useState(false);
  // game state
  const [cells, setCells] = useState(() => {
    return getCells(size, theme);
  });
  const [players, setPlayers] = useState(() => {
    return getPlayers(playersCount);
  });
  const [currentActivePlayer, setCurrentActivePlayer] = useState(0);

  // time
  useEffect(() => {
    const timer = setInterval(() => {
      setPlayers((prev) => {
        const next = [...prev];
        next[currentActivePlayer].time += 1;
        return next;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentActivePlayer]);

  // handler functions
  function resetGameToInitialState() {
    setPlayers(getPlayers(playersCount));
    setCells(getCells(size, theme));
    setCurrentActivePlayer(0);
  }

  function cellClickHandler(cell: Cell) {}

  return (
    <div>
      {cells.map((row, i) => {
        return row.map((cell, j) => {
          const value = cell.value;
          return <div key={`${i}-${j}`}>{renderValue(value)}</div>;
        });
      })}
      <Modal isOpen={isResultModalOpen} setIsOpen={setIsResultModalOpen}>
        <Result
          restart={resetGameToInitialState}
          players={[
            { name: "karthik", pairsMatched: 34, time: "1:54", movesTaken: 23, isWinner: true },
            { name: "karthik", pairsMatched: 34, time: "1:54", movesTaken: 23, isWinner: false },
          ]}
        />
      </Modal>
    </div>
  );
};

function getCells(size: number, theme: GameThemeOptions) {
  const positions: number[][] = [];
  const grid: Cell[][] = [];
  for (let i = 0; i < size; i++) {
    const row: Cell[] = [];
    for (let j = 0; j < size; j++) {
      row.push({ x: i, y: j, isMatched: false, isSelected: false, value: 0 });
      positions.push([i, j]);
    }
    grid.push(row);
  }
  while (positions.length > 0) {
    const value =
      theme === GameThemeOptions.Icons
        ? Icons[getRandomInRange(0, Icons.length - 1)]
        : Numbers[getRandomInRange(0, Numbers.length - 1)];
    const pos1 = positions.splice(getRandomInRange(0, positions.length - 1), 1)[0];
    const pos2 = positions.splice(getRandomInRange(0, positions.length - 1), 1)[0];

    grid[pos1[0]][pos1[1]].value = value;
    grid[pos2[0]][pos2[1]].value = value;
  }
  return grid;
}

function getPlayers(count: number) {
  const player = {
    name: "Player",
    isActive: false,
    time: 0,
    pairsMatched: 0,
    movesTaken: 0,
    isWinner: false,
  };
  const players: Player[] = [];
  for (let i = 0; i < count; i++) {
    players.push({ ...player, name: `${player.name} ${i + 1}` });
  }
  return players;
}

function getRandomInRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const renderValue = (value: number | (() => JSX.Element)) => {
  if (typeof value === "number") {
    return <span>{value}</span>;
  } else {
    return value(); // Assuming it's a function returning JSX
  }
};

export default GamePage;

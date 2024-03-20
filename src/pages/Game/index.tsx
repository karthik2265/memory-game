import { useLocation, useNavigate } from "react-router-dom";
import { GameThemeOptions, Icons, Numbers } from "../../constants";
import Modal from "../../components/Modal";
import React, { useState, useEffect, useContext } from "react";
import Result from "../../components/Result";
import { Cell, Player } from "../../types";
import H1 from "../../components/typography/H1";
import { ThemeContext } from "../../context/ThemeContext";
import PrimaryButtonSmall from "../../components/buttons/PrimaryButtonSmall";
import SecondaryButtonSmall from "../../components/buttons/SecondaryButtonSmall";
import styled from "styled-components";
import PauseMenu from "../../components/PauseMenu";

const StyledPageWrapper = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 768px) {
    padding: 1.25rem 0;
  }
`;

const StyledActionButton = styled.div<{ $hideOnSmallScreen: boolean }>`
  width: 7.9rem;
  display: ${(props) => (props.$hideOnSmallScreen ? "block" : "none")};
  @media (max-width: 650px) {
    width: 4.8rem;
    display: ${(props) => (props.$hideOnSmallScreen ? "none" : "block")};
  }
`;

const StyledHeader = styled.div`
  max-width: 1110px;
  width: 80%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 900px) {
    width: 95%;
  }

  @media (max-width: 650px) {
    width: 100%;
    padding: 0 1rem;
  }
`;

const GamePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const gameTheme: GameThemeOptions = GameThemeOptions[params.get("theme") as keyof typeof GameThemeOptions];
  const playersCount: number = Number(params.get("players"));
  const size: number = Number(params.get("size"));
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  // state
  const [isResultModalOpen, setIsResultModalOpen] = useState(true);
  const [isPauseMenuOpen, setIsPauseMenuOpen] = useState(false);
  // game state
  const [cells, setCells] = useState(() => {
    return getCells(size, gameTheme);
  });
  const [players, setPlayers] = useState(() => {
    return getPlayers(playersCount);
  });
  const [currentActivePlayer, setCurrentActivePlayer] = useState(0);

  // time
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isPauseMenuOpen) {
        setPlayers((prev) => {
          const next = [...prev];
          next[currentActivePlayer].time += 1;
          return next;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [currentActivePlayer, isPauseMenuOpen]);

  // handler functions
  function resetGameToInitialState() {
    setPlayers(getPlayers(playersCount));
    setCells(getCells(size, gameTheme));
    setCurrentActivePlayer(0);
  }

  function cellClickHandler(cell: Cell) {}

  return (
    <StyledPageWrapper>
      <StyledHeader>
        <H1 color={theme.black}>memory</H1>
        <div style={{ display: "flex", gap: "1.25rem" }}>
          <StyledActionButton onClick={resetGameToInitialState} $hideOnSmallScreen={true}>
            <PrimaryButtonSmall>Restart</PrimaryButtonSmall>
          </StyledActionButton>
          <StyledActionButton onClick={() => navigate("/")} $hideOnSmallScreen={true}>
            <SecondaryButtonSmall>New Game</SecondaryButtonSmall>
          </StyledActionButton>
          <StyledActionButton onClick={() => setIsPauseMenuOpen(true)} $hideOnSmallScreen={false}>
            <PrimaryButtonSmall>Menu</PrimaryButtonSmall>
          </StyledActionButton>
        </div>
      </StyledHeader>
      {cells.map((row, i) => {
        return row.map((cell, j) => {
          const value = cell.value;
          return <div key={`${i}-${j}`}>{renderValue(value)}</div>;
        });
      })}
      <div></div>
      <Modal isOpen={isResultModalOpen} setIsOpen={setIsResultModalOpen}>
        <Result
          restart={() => {
            resetGameToInitialState();
            setIsResultModalOpen(false);
          }}
          players={[
            { name: "karthik", pairsMatched: 34, time: "1:54", movesTaken: 23, isWinner: true },
            { name: "karthik", pairsMatched: 34, time: "1:54", movesTaken: 23, isWinner: false },
          ]}
        />
      </Modal>
      <Modal isOpen={isPauseMenuOpen} setIsOpen={setIsPauseMenuOpen}>
        <PauseMenu
          restart={() => {
            resetGameToInitialState();
            setIsPauseMenuOpen(false);
          }}
          resume={() => setIsPauseMenuOpen(false)}
        />
      </Modal>
    </StyledPageWrapper>
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

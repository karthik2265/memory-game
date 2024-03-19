import { useLocation } from "react-router-dom";
import { GameGridSize, GameThemeOptions, NumberOfPlayersInGame } from "../../constants";
import Modal from "../../components/Modal";
import { useState } from "react";
import Result from "../../components/Result";

const GamePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const theme: GameThemeOptions = GameThemeOptions[params.get("theme") as keyof typeof GameThemeOptions];
  const players: NumberOfPlayersInGame =
    NumberOfPlayersInGame[params.get("players") as keyof typeof NumberOfPlayersInGame];
  const size: GameGridSize = GameGridSize[params.get("size") as keyof typeof GameGridSize];

  console.log(theme, players, size, params.get("theme"));

  // state
  const [isResultModalOpen, setIsResultModalOpen] = useState(true);

  function resetGameToInitialState() {}
  return (
    <div>
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

export default GamePage;

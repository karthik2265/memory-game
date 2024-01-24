import styled from "styled-components";
import PrimaryButtonBig from "../../components/buttons/PrimaryButtonBig";
import H3 from "../../components/typography/H3";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useReducer } from "react";
import SelectionButtonMedium from "../../components/buttons/SelectionButtonMedium";
import SelectionButtonSmall from "../../components/buttons/SelectionButtonSmall";
import { GameGridSize, GameThemeOptions, NumberOfPlayersInGame } from "../../constants";
import { useNavigate } from "react-router-dom";

const StyledHomePage = styled.div`
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.black};
  display: grid;
  place-items: center;
  gap: 3rem;
  padding: 2rem 0;
`;

const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  color: ${(props) => props.theme.white};
`;

const StyledMenu = styled.div`
  background: ${(props) => props.theme.white};
  border-radius: 1.25rem;
  padding: 3.5rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 800px) {
    padding: 2rem;
  }
`;

const defaultOptions: SelectedOptions = {
  theme: GameThemeOptions.Numbers,
  players: NumberOfPlayersInGame.One,
  size: GameGridSize.FourByFour,
};

type SelectedOptions = {
  theme: GameThemeOptions;
  players: NumberOfPlayersInGame;
  size: GameGridSize;
};

type Action =
  | {
      type: "UPDATE_THEME";
      payload: GameThemeOptions;
    }
  | { type: "UPDATE_NUMBER_OF_PLAYERS"; payload: NumberOfPlayersInGame }
  | { type: "UPDATE_GRID_SIZE"; payload: GameGridSize };

function reducer(state: SelectedOptions, action: Action) {
  switch (action.type) {
    case "UPDATE_THEME":
      return { ...state, theme: action.payload };
      break;
    case "UPDATE_NUMBER_OF_PLAYERS":
      return { ...state, players: action.payload };
      break;
    case "UPDATE_GRID_SIZE":
      return { ...state, size: action.payload };
      break;
    default:
      return state;
  }
}

const HomePage = () => {
  const theme = useContext(ThemeContext);
  const [selectedOptions, dispatch] = useReducer(reducer, defaultOptions);
  const navigate = useNavigate();
  return (
    <StyledHomePage>
      <StyledTitle>memory</StyledTitle>
      <StyledMenu>
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <H3 color={theme.grey}>Select Theme</H3>
          <div style={{ display: "flex", gap: "1.85rem", justifyContent: "space-between" }}>
            <div onClick={() => dispatch({ type: "UPDATE_THEME", payload: GameThemeOptions.Numbers })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.theme === GameThemeOptions.Numbers)}>
                Numbers
              </SelectionButtonMedium>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_THEME", payload: GameThemeOptions.Icons })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.theme === GameThemeOptions.Icons)}>
                Icons
              </SelectionButtonMedium>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1.85rem", flexDirection: "column" }}>
          <H3 color={theme.grey}>Numbers of Players</H3>
          <div style={{ display: "flex", gap: "1.3rem", justifyContent: "space-between" }}>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: NumberOfPlayersInGame.One })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === NumberOfPlayersInGame.One)}>
                1
              </SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: NumberOfPlayersInGame.Two })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === NumberOfPlayersInGame.Two)}>
                2
              </SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: NumberOfPlayersInGame.Three })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === NumberOfPlayersInGame.Three)}>
                3
              </SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: NumberOfPlayersInGame.Four })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === NumberOfPlayersInGame.Four)}>
                4
              </SelectionButtonSmall>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <H3 color={theme.grey}>Grid Size</H3>
          <div style={{ display: "flex", gap: "1.85rem", justifyContent: "space-between" }}>
            <div onClick={() => dispatch({ type: "UPDATE_GRID_SIZE", payload: GameGridSize.FourByFour })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.size === GameGridSize.FourByFour)}>
                4x4
              </SelectionButtonMedium>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_GRID_SIZE", payload: GameGridSize.SixBySix })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.size === GameGridSize.SixBySix)}>
                6x6
              </SelectionButtonMedium>
            </div>
          </div>
        </div>
        <div
          onClick={() => {
            const queryParams = new URLSearchParams({
              theme: selectedOptions.theme.toString(),
              players: selectedOptions.players.toString(),
              size: selectedOptions.size.toString(),
            });
            navigate(`/game?${queryParams.toString()}`);
          }}
          style={{ display: "grid", placeItems: "center" }}
        >
          <PrimaryButtonBig>Start Game</PrimaryButtonBig>
        </div>
      </StyledMenu>
    </StyledHomePage>
  );
};

export default HomePage;

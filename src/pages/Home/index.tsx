import styled from "styled-components";
import PrimaryButtonBig from "../../components/buttons/PrimaryButtonBig";
import H3 from "../../components/typography/H3";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext, useReducer } from "react";
import SelectionButtonMedium from "../../components/buttons/SelectionButtonMedium";
import SelectionButtonSmall from "../../components/buttons/SelectionButtonSmall";
import {  GameThemeOptions } from "../../constants";
import { useNavigate } from "react-router-dom";

const StyledHomePage = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100vh;
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
  players: 1,
  size: 4,
};

type SelectedOptions = {
  theme: GameThemeOptions;
  players: number;
  size: number;
};

type Action =
  | {
      type: "UPDATE_THEME";
      payload: GameThemeOptions;
    }
  | { type: "UPDATE_NUMBER_OF_PLAYERS"; payload: number }
  | { type: "UPDATE_GRID_SIZE"; payload: number };

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
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: 1 })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === 1)}>1</SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: 2 })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === 2)}>2</SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: 3 })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === 3)}>3</SelectionButtonSmall>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_NUMBER_OF_PLAYERS", payload: 4 })}>
              <SelectionButtonSmall isIdle={!(selectedOptions.players === 4)}>4</SelectionButtonSmall>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
          <H3 color={theme.grey}>Grid Size</H3>
          <div style={{ display: "flex", gap: "1.85rem", justifyContent: "space-between" }}>
            <div onClick={() => dispatch({ type: "UPDATE_GRID_SIZE", payload: 4 })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.size === 4)}>4x4</SelectionButtonMedium>
            </div>
            <div onClick={() => dispatch({ type: "UPDATE_GRID_SIZE", payload: 6 })}>
              <SelectionButtonMedium isIdle={!(selectedOptions.size === 6)}>6x6</SelectionButtonMedium>
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

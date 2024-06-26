import { ReactNode, createContext } from "react";
import { ThemeProvider as StyledComponentsThemeContextProvider } from "styled-components";

const theme = {
  orange: "#FDA214",
  orangeHover: "#FFB84A",
  softBlue: "#BCCED9",
  iceBlue: "#DFE7EC",
  darkGrey: "#304859",
  black: "#152938",
  softWhite: "#F2F2F2",
  grey: "#7191A5",
  blue: "#6395B8",
  white: "#FCFCFC",
};
const ThemeContext = createContext(theme);
const ThemeProvider = ({ children }: { children: ReactNode }) => {
  return (
    <ThemeContext.Provider value={theme}>
      <StyledComponentsThemeContextProvider theme={theme}>{children}</StyledComponentsThemeContextProvider>
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };

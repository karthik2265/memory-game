import "./App.css";
import PrimaryButtonSmall from "./components/buttons/PrimaryButtonSmall";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <PrimaryButtonSmall>Restart</PrimaryButtonSmall>
    </ThemeProvider>
  );
}

export default App;

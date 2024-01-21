import Anchor from "./components/icons/Anchor";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <Anchor></Anchor>
    </ThemeProvider>
  );
}

export default App;

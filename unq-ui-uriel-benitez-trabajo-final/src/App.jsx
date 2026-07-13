import { GameProvider, useGame } from "./context/GameContext.jsx";
import Menu from "./components/Menu.jsx";
import Juego from "./components/Juego.jsx";
import ModalFin from "./components/ModalFin.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import "./App.css";

function AppContent() {
  const { pantalla } = useGame();

  return (
    <div className="main-container">
      {pantalla === "menu" && <Menu />}
      {pantalla === "juego" && <Juego />}
      {pantalla === "finalizado" && <ModalFin />}
      {pantalla === "leaderboard" && <Leaderboard />}
    </div>
  );
}

export default function App() {
  return (
    <GameProvider>
      <AppContent />
    </GameProvider>
  );
}

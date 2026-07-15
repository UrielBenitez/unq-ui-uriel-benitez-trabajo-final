import { Routes, Route } from "react-router-dom";
import { GameProvider } from "./context/GameContext.jsx";
import Menu from "./components/Menu.jsx";
import Juego from "./components/Juego.jsx";
import Leaderboard from "./components/Leaderboard.jsx";
import "./App.css";

export default function App() {
  return (
    <GameProvider>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/juego" element={<Juego />} />
          <Route path="/estadisticas" element={<Leaderboard />} />
        </Routes>
      </div>
    </GameProvider>
  );
}

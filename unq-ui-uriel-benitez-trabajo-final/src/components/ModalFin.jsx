import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext.jsx";

export default function ModalFin() {
  const { puntajeFinal, volverAJugar, encadenadas } = useGame();
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>¡Se acabó el tiempo!</h2>
        <p>Puntaje final: {puntajeFinal} puntos</p>
        <div className="palabras-encadenadas">
          <ul>
            {[...encadenadas].reverse().map((palabra) => (
              <li
                key={palabra}
              >{`${palabra} suma ${palabra.length} puntos`}</li>
            ))}
          </ul>
        </div>
        <div className="modal-buttons">
          <button onClick={() => { volverAJugar(); navigate("/juego") }}>
            Volver a jugar
          </button>
          <button onClick={() => navigate("/")}>Menú principal</button>
        </div>
      </div>
    </div>
  );
}

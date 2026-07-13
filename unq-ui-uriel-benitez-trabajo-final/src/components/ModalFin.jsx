import { useGame } from "../context/GameContext.jsx";

export default function ModalFin() {
  const { puntajeFinal, volverAJugar, volverAlMenu, encadenadas } = useGame();

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
          <button onClick={volverAJugar}>Volver a jugar</button>
          <button onClick={volverAlMenu}>Menú principal</button>
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { useGame } from "../context/GameContext.jsx";
import JuegoInformacion from "./JuegoInformacion.jsx";
import ModalFin from "./ModalFin.jsx";

export default function Juego() {
  const {
    palabra,
    actualizarPalabra,
    error,
    loading,
    jugarPalabra,
    finalizado,
  } = useGame();
  const navigate = useNavigate();

  if (finalizado) {
    return <ModalFin />;
  }

  return (
    <>
      <h1>Palabras encadenadas</h1>
      <input
        type="text"
        value={palabra}
        onChange={(e) => actualizarPalabra(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            jugarPalabra();
          }
        }}
        placeholder="Ingresá una palabra"
      />
      {error && <p className="error">{error}</p>}
      <button onClick={() => jugarPalabra()} disabled={loading || !palabra}>
        Agregar palabra
      </button>
      <button onClick={() => navigate("/")}>Salir del juego</button>
      <JuegoInformacion />
    </>
  );
}

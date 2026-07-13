import { useGame } from "../context/GameContext.jsx";
import JuegoInformacion from "./JuegoInformacion.jsx";

export default function Juego() {
  const { palabra, actualizarPalabra, error, loading, jugarPalabra } =
    useGame();

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
      <button onClick={() => jugarPalabra()} disabled={loading}>
        Agregar palabra
      </button>
      <JuegoInformacion />
    </>
  );
}

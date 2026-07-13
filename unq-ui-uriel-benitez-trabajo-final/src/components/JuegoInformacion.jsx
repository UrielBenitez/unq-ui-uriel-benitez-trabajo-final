import { useGame } from "../context/GameContext.jsx";
import ListadoInverso from "./ListadoInverso.jsx";

export default function JuegoInformacion() {
  const { encadenadas, tiempoRestante, puntajeTotal } = useGame();

  if (encadenadas.length === 0) return null;

  return (
    <>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
      <p>Puntaje total: {puntajeTotal} puntos</p>
      <div className="palabras-encadenadas">
        <ListadoInverso iterable={encadenadas} />
      </div>
    </>
  );
}

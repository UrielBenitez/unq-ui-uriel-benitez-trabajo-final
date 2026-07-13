import { useGame } from "../context/GameContext.jsx";
import ListadoInverso from "./ListadoInverso.jsx";
import { calcularColorTiempo } from "../utils/utils.js";

export default function JuegoInformacion() {
  const { encadenadas, tiempoRestante, puntajeTotal } = useGame();

  if (encadenadas.length === 0) return null;

  const colorTiempo = calcularColorTiempo(tiempoRestante, 15);

  return (
    <>
      <p className="info-linea" style={{ color: colorTiempo }}>
        <i className="ti ti-clock"></i>
        Tiempo restante: {tiempoRestante} segundos
      </p>

      <p className="info-linea puntaje">
        <i className="ti ti-star"></i>
        Puntaje total: {puntajeTotal} puntos
      </p>

      <div className="palabras-encadenadas">
        <ListadoInverso iterable={encadenadas} />
      </div>
    </>
  );
}

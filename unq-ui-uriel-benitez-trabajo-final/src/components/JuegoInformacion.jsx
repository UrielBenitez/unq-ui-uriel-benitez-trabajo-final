import { useGame } from "../context/GameContext.jsx";

export default function JuegoInformacion() {
  const { encadenadas, tiempoRestante, puntajeTotal } = useGame();

  if (encadenadas.length === 0) return null;

  return (
    <>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
      <p>Puntaje total: {puntajeTotal} puntos</p>
      <ul>
        {[...encadenadas].reverse().map((palabra) => (
          <li
            key={palabra}
          >{`${palabra} suma ${palabra.length} puntos`}</li>
        ))}
      </ul>
    </>
  );
}

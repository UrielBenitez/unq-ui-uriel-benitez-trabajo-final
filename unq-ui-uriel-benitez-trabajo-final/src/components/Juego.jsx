import { useGame } from "../context/GameContext.jsx";

export default function Juego() {
  const {
    palabra,
    actualizarPalabra,
    error,
    loading,
    jugarPalabra,
    encadenadas,
    tiempoRestante,
    puntajeTotal,
  } = useGame();

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
      {encadenadas.length > 0 && (
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
      )}
    </>
  );
}

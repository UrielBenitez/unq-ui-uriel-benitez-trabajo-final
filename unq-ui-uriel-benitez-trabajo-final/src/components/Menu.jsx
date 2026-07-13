import { useGame } from "../context/GameContext.jsx";

export default function Menu() {
  const { comenzarJuego } = useGame();

  return (
    <>
      <h1>Palabras encadenadas</h1>
      <div className="explicacion">
        <p>
          Formá una cadena de palabras. Cada nueva palabra debe comenzar con la
          última letra de la palabra anterior.
        </p>
        <p>
          No podés repetir palabras y deben ser palabras válidas en español.
        </p>
        <p>Tenés 15 segundos por palabra. ¡Sumá puntos por cada letra!</p>
      </div>
      <button onClick={comenzarJuego}>Jugar</button>
    </>
  );
}

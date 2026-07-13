import { useState, useEffect } from "react";
import "./App.css";
import { existeLaPalabra } from "./services/palabras.service.js";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [palabra, setPalabra] = useState("");
  const [encadenadas, setEncadenadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [pantalla, setPantalla] = useState("menu");
  const [puntajeFinal, setPuntajeFinal] = useState(0);

  useEffect(() => {
    if (pantalla !== "juego") return;
    if (tiempoRestante <= 0) {
      finalizarJuego();
      return;
    }
    if (encadenadas.length === 0) return;
    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, juegoActivo, pantalla]);

  const puntajeTotal = encadenadas.reduce((total, p) => total + p.length, 0);

  const fueUtilizada = (palabraCandidata) => {
    return encadenadas.includes(palabraCandidata);
  };

  const encadenaCorrectamente = (palabraCandidata) => {
    const ultimaPalabra = encadenadas.at(-1);
    return (
      encadenadas.length === 0 ||
      ultimaPalabra.at(-1) === palabraCandidata.at(0)
    );
  };

  const finalizarJuego = () => {
    setPuntajeFinal(puntajeTotal);
    setPantalla("finalizado");
    setJuegoActivo(false);
  };

  const comenzarJuego = () => {
    setError("");
    setPalabra("");
    setEncadenadas([]);
    setTiempoRestante(15);
    setJuegoActivo(false);
    setPantalla("juego");
  };

  const volverAlMenu = () => {
    setError("");
    setPalabra("");
    setEncadenadas([]);
    setTiempoRestante(15);
    setJuegoActivo(false);
    setPantalla("menu");
  };

  const volverAJugar = () => {
    setError("");
    setPalabra("");
    setEncadenadas([]);
    setTiempoRestante(15);
    setJuegoActivo(false);
    setPantalla("juego");
  };

  const jugarPalabra = async () => {
    if (loading) return;
    setLoading(true);

    try {
      const palabraJugada = palabra.trim().toLowerCase();

      if (fueUtilizada(palabraJugada)) {
        setError(`La palabra "${palabraJugada}" ya fue utilizada`);
        return;
      }

      if (!encadenaCorrectamente(palabraJugada)) {
        setError(`La palabra "${palabraJugada}" no encadena correctamente`);
        return;
      }
      const existe = await existeLaPalabra(palabraJugada);
      if (!existe) {
        setError(`La palabra "${palabraJugada}" no es válida`);
      } else {
        setJuegoActivo(true);
        setError("");
        setPalabra("");
        setTiempoRestante(15);
        setEncadenadas((prev) => [...prev, palabraJugada]);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      {pantalla === "menu" && (
        <>
          <h1>Palabras encadenadas</h1>
          <div className="explicacion">
            <p>
              Formá una cadena de palabras. Cada nueva palabra debe comenzar con
              la última letra de la palabra anterior.
            </p>
            <p>
              No podés repetir palabras y deben ser palabras válidas en español.
            </p>
            <p>Tenés 15 segundos por palabra. ¡Sumá puntos por cada letra!</p>
          </div>
          <button onClick={comenzarJuego}>Jugar</button>
        </>
      )}

      {pantalla === "juego" && (
        <>
          <h1>Palabras encadenadas</h1>
          <input
            type="text"
            value={palabra}
            onChange={(e) =>
              setPalabra(e.target.value.replace(/[^A-Za-zÀ-ÿñÑ]/g, ""))
            }
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
      )}

      {pantalla === "finalizado" && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>¡Se acabó el tiempo!</h2>
            <p>Puntaje final: {puntajeFinal} puntos</p>
            <div className="modal-buttons">
              <button onClick={volverAJugar}>Volver a jugar</button>
              <button onClick={volverAlMenu}>Menú principal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

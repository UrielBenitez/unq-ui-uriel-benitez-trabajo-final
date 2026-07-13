import { useState, useEffect, useMemo } from "react";
import "./App.css";
import { existeLaPalabra } from "./services/palabras.service.js";

function App() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [palabra, setPalabra] = useState("");
  const [encadenadas, setEncadenadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [juegoActivo, setJuegoActivo] = useState(false);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      finalizarJuego();
      return;
    }
    if (encadenadas.length === 0) return;
    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, juegoActivo]);

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
    setError("Se acabó el tiempo. Partida finalizada.");
    setPalabra("");
    setEncadenadas([]);
    setJuegoActivo(false);
  };

  const reiniciarJuego = () => {
    setError("");
    setPalabra("");
    setTiempoRestante(15);
    setJuegoActivo(true);
  };

  const jugarPalabra = async () => {
    if (loading) return; // Con esto evito que se intente jugar la misma palabra miestras se está jugando la anterior
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
        reiniciarJuego();
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
    </div>
  );
}

export default App;

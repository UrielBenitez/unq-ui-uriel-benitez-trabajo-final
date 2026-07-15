import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { existeLaPalabra } from "../services/palabras.service.js";
import { guardarPuntaje } from "../services/leaderboard.service.js";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [palabra, setPalabra] = useState("");
  const [encadenadas, setEncadenadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [finalizado, setFinalizado] = useState(false);
  const [puntajeFinal, setPuntajeFinal] = useState(0);

  const puntajeTotal = encadenadas.reduce((total, p) => total + p.length, 0);

  const finalizarJuego = useCallback(() => {
    guardarPuntaje(puntajeTotal, encadenadas.length);
    setPuntajeFinal(puntajeTotal);
    setFinalizado(true);
    setJuegoActivo(false);
  }, [puntajeTotal, encadenadas.length]);

  useEffect(() => {
    if (!juegoActivo) return;
    if (tiempoRestante <= 0 && encadenadas.length > 0) {
      finalizarJuego();
    }
    if (encadenadas.length === 0) return;
    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, juegoActivo, encadenadas.length, finalizarJuego]);

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

  const comenzarJuego = () => {
    setError("");
    setPalabra("");
    setEncadenadas([]);
    setTiempoRestante(15);
    setJuegoActivo(false);
    setFinalizado(false);
  };

  const volverAJugar = () => {
    setError("");
    setPalabra("");
    setEncadenadas([]);
    setTiempoRestante(15);
    setJuegoActivo(false);
    setFinalizado(false);
  };

  const actualizarPalabra = (valor) => {
    setPalabra(valor.replace(/[^A-Za-zÀ-ÿñÑ]/g, ""));
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
    <GameContext.Provider
      value={{
        error,
        loading,
        palabra,
        encadenadas,
        tiempoRestante,
        juegoActivo,
        finalizado,
        puntajeFinal,
        puntajeTotal,
        actualizarPalabra,
        jugarPalabra,
        comenzarJuego,
        volverAJugar,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGame() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame debe usarse dentro de un GameProvider");
  }
  return context;
}

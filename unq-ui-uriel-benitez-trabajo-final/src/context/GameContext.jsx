import { createContext, useContext, useState, useEffect } from "react";
import { existeLaPalabra } from "../services/palabras.service.js";

const GameContext = createContext();

export function GameProvider({ children }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [palabra, setPalabra] = useState("");
  const [encadenadas, setEncadenadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(15);
  const [juegoActivo, setJuegoActivo] = useState(false);
  const [pantalla, setPantalla] = useState("menu");
  const [puntajeFinal, setPuntajeFinal] = useState(0);

  const puntajeTotal = encadenadas.reduce((total, p) => total + p.length, 0);

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
        pantalla,
        puntajeFinal,
        puntajeTotal,
        actualizarPalabra,
        jugarPalabra,
        comenzarJuego,
        volverAJugar,
        volverAlMenu,
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

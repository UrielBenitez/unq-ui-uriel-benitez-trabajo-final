import { useState, useEffect } from "react";
import "./App.css";
import { existeLaPalabra } from "./services/palabras.service.js";

function App() {
  const [error, setError] = useState("");
  const [palabra, setPalabra] = useState("");
  const [encadenadas, setEncadenadas] = useState([]);
  const [tiempoRestante, setTiempoRestante] = useState(15);

  useEffect(() => {
    if (tiempoRestante <= 0) {
      setError("Se acabó el tiempo");
      return;
    }
    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante]);

  const jugarPalabra = async () => {
    const palabraJugada = palabra.trim().toLowerCase();
    try {
      const existe = await existeLaPalabra(palabraJugada);
      if (!existe) {
        setError(`La palabra "${palabraJugada}" no es válida`);
      } else {
        setError("");
        setPalabra("");
        setTiempoRestante(15);
        setEncadenadas((prev) => [...prev, palabraJugada]);
        console.log(`La palabra "${palabraJugada}" es válida`);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <button onClick={() => jugarPalabra()}>Agregar palabra</button>
      <p>Tiempo restante: {tiempoRestante} segundos</p>
    </div>
  );
}

export default App;

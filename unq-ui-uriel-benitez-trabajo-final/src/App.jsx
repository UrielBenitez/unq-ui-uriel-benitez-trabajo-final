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
    if (encadenadas.length === 0) return;
    const timer = setTimeout(() => {
      setTiempoRestante((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [tiempoRestante, encadenadas]);

  const fueUtilizada = (palabra) => {
    return encadenadas.includes(palabra);
  };

  const encadenaCorrectamente = (palabra) => {
    const ultimaPalabra = encadenadas.at(-1);
    return encadenadas.length === 0 || ultimaPalabra.at(-1) === palabra.at(0);
  };

  const jugarPalabra = async () => {
    const palabraJugada = palabra.trim().toLowerCase();

    if (fueUtilizada(palabraJugada)) {
      setError(`La palabra "${palabraJugada}" ya fue utilizada`);
      return;
    }

    if (!encadenaCorrectamente(palabraJugada)) {
      setError(`La palabra "${palabraJugada}" no encadena correctamente`);
      return;
    }

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
      {encadenadas.length > 0 && (
        <>
          <p>Tiempo restante: {tiempoRestante} segundos</p>
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

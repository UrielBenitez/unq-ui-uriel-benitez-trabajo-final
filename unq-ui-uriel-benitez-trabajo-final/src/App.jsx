import { useState } from "react";
import "./App.css";
import { existeLaPalabra } from "./services/palabras.service.js";

function App() {
  const [error, setError] = useState("");
  const [palabra, setPalabra] = useState("");

  const validarPalabra = async () => {
    try {
      const existe = await existeLaPalabra(palabra);
      if (!existe) {
        setError(`La palabra "${palabra}" no es válida`);
      } else {
        setError("");
        setPalabra("");
        console.log(`La palabra "${palabra}" es válida`);
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
            validarPalabra();
          }
        }}
        placeholder="Ingresá una palabra"
      />
      <button onClick={() => validarPalabra()}>Agregar palabra</button>
    </div>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import { existeLaPalabra } from "./services/palabras.service.js";

function App() {
  const [error, setError] = useState("");

  const validarPalabra = async () => {
    const palabra = document.querySelector("input").value;
    try {
      const existe = await existeLaPalabra(palabra);
      if (!existe) {
        setError(`La palabra "${palabra}" no es válida`);
      } else {
        setError("");
        console.log(`La palabra "${palabra}" es válida`);
      }
    } catch (err) {
      setError(err);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="main-container">
      <h1>Palabras encadenadas</h1>
      <input type="text" placeholder="Ingrese una palabra" />
      <button onClick={() => validarPalabra()}>Agregar palabra</button>
    </div>
  );
}

export default App;

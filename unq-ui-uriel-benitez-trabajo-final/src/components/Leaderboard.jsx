import { useNavigate } from "react-router-dom";
import { obtenerPuntajes } from "../services/leaderboard.service.js";

const MEDALLAS = { 0: "🥇", 1: "🥈", 2: "🥉" };
const CLASES_PUESTO = {
  0: "puesto-oro",
  1: "puesto-plata",
  2: "puesto-bronce",
};

export default function Leaderboard() {
  const navigate = useNavigate();
  const puntajes = obtenerPuntajes();

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <h2>Top 10</h2>

      <div className="leaderboard-scroll">
        {puntajes.length === 0 ? (
          <p className="leaderboard-vacio">Todavía no hay puntajes</p>
        ) : (
          <table className="leaderboard-tabla">
            <thead>
              <tr>
                <th>#</th>
                <th>Puntaje</th>
                <th>Palabras</th>
              </tr>
            </thead>
            <tbody>
              {puntajes.map((entry, index) => (
                <tr key={index} className={CLASES_PUESTO[index] ?? ""}>
                  <td className="leaderboard-posicion">
                    {MEDALLAS[index] ?? `#${index + 1}`}
                  </td>
                  <td className="leaderboard-puntaje">{entry.puntaje}</td>
                  <td>{entry.palabras}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <button onClick={() => navigate("/")}>Volver al menú</button>
    </div>
  );
}

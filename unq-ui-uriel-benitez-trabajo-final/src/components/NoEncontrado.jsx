import { useNavigate } from "react-router-dom";

export default function NoEncontrado() {
  const navigate = useNavigate();

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Ruta no encontrada</h2>
        <p>La ruta solicitada no existe.</p>
        <div className="modal-buttons">
          <button onClick={() => navigate("/")}>Ir al menú</button>
        </div>
      </div>
    </div>
  );
}

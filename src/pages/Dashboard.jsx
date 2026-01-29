import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log("Token en localStorage:", token);
    
    api.get("/users")
      .then(res => {
        console.log("Respuesta del API:", res.data);
        // Manejo flexible de la respuesta
        const userData = Array.isArray(res.data) ? res.data : res.data.users || [];
        setUsers(userData);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError("No autorizado. Por favor, inicia sesión nuevamente.");
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  if (loading) {
    return (
      <div className="dashboard-container">
        <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "12px" }}>
          <h2>Cargando...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="empty-state" style={{ color: "#c33" }}>
          <h3>⚠️ Error</h3>
          <p>{error}</p>
          <button onClick={handleLogout} style={{ marginTop: "20px" }}>Volver al Login</button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2>👥 Gestión de Usuarios</h2>
        <button className="logout-btn" onClick={handleLogout}>
          ↪️ Cerrar Sesión
        </button>
      </div>

      {users.length === 0 ? (
        <div className="empty-state">
          <h3>No hay usuarios registrados</h3>
          <p>Los usuarios aparecerán aquí una vez que se registren.</p>
        </div>
      ) : (
        <>
          <p style={{ color: "#666", marginBottom: "20px" }}>
            Total de usuarios: <strong>{users.length}</strong>
          </p>
          
          <table className="users-table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo Electrónico</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id}>
                  <td>
                    <strong>{u.name || "Sin nombre"}</strong>
                  </td>
                  <td>
                    <span className="user-email">{u.email}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
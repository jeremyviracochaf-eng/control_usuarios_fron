import { useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const res = await api.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Email o contraseña incorrectos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>🔐 Control de Usuarios</h2>
      
      {error && <div style={{ 
        padding: "12px", 
        marginBottom: "16px", 
        background: "#fee", 
        color: "#c33", 
        borderRadius: "8px",
        fontSize: "14px"
      }}>
        ⚠️ {error}
      </div>}
      
      <input 
        type="email"
        placeholder="📧 Correo electrónico" 
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      
      <input 
        type="password" 
        placeholder="🔑 Contraseña" 
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      
      <button type="submit" disabled={loading}>
        {loading ? "Ingresando..." : "Ingresar"}
      </button>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
       <p>¿No tienes una cuenta?</p>
        <Link to="/register" style={{ color: "#4f46e5", fontWeight: "bold" }}>
        Regístrate aquí
       </Link>
     </div>
     
    </form>
  );
}
import { useState } from "react";
import api from "../services/api"; 
import { useNavigate, Link } from "react-router-dom"; // <--- Agregamos Link aquí

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Usuario registrado con éxito");
      navigate("/"); 
    } catch (error) {
      alert("Error al registrar: " + error.response?.data?.message);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <h2>Registrar Nuevo Usuario</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input type="email" placeholder="Email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input type="password" placeholder="Contraseña" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button type="submit">Registrar</button>
        
        <div style={{ marginTop: "15px", textAlign: "center" }}>
          <Link to="/" style={{ color: "#4f46e5" }}>Volver al Inicio de Sesión</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
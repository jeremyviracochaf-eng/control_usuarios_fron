import { useState } from "react";
import api from "../services/api"; // Usa la configuración con la URL de Render
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", formData);
      alert("Usuario registrado con éxito");
      navigate("/"); // Te manda al login tras registrarte
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
      </form>
    </div>
  );
};

export default Register;
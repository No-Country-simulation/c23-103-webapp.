import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importar useNavigate para la redirección
import QRCode from "react-qr-code"; // Asegúrate de tener instalada la librería react-qr-code
import { Navbar } from "../components/Navbar"; // Importar el componente de filtros


export const SettingsPage = () => {
  const navigate = useNavigate(); // Inicializamos el hook de useNavigate para redirigir
  // Estados para gestionar los datos
  const [profilePic, setProfilePic] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const [name, setName] = useState("Juan Miranda");
  const [status, setStatus] = useState("Disponible");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true); // Si las notificaciones están activadas
  const [showQRCode, setShowQRCode] = useState(false); // Para mostrar el código QR



  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  // Función para manejar el cierre de sesión
  const handleLogout = () => {
    // Aquí puedes agregar la lógica para eliminar la sesión si es necesario
    navigate("/login"); // Redirige al login
  };

  return (
    <div className="max-w-3xl mx-auto p-6 mb-10">
      <h2 className="text-3xl font-bold mb-4">Configuración</h2>

      {/* Foto de perfil */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Foto de Perfil</h3>
        <div className="flex items-center">
          <img
            src={profilePic}
            alt="Foto de perfil"
            className="w-24 h-24 rounded-full object-cover mr-4"
          />
         
        </div>
      </div>

      {/* Nombre */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Nombre</h3>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full p-2 border rounded"
          placeholder="Ingrese su nombre"
        />
      </div>

      {/* Estado */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Estado</h3>
        <select
          value={status}
          onChange={handleStatusChange}
          className="w-full p-2 border rounded"
        >
          <option value="Disponible">Disponible</option>
          <option value="Ausente">Ausente</option>
        </select>
      </div>

      {/* Cambiar contraseña */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Cambiar Contraseña</h3>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="w-full p-2 border rounded"
          placeholder="Nueva contraseña"
        />
      </div>

      {/* Notificaciones de chats */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Notificaciones de Chats</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={notifications}
            onChange={toggleNotifications}
            className="mr-2"
          />
          Activar Notificaciones
        </label>
      </div>

      {/* Botón para mostrar el código QR */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-2">Código QR</h3>
        <button
          onClick={toggleQRCode}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          {showQRCode ? "Ocultar Código QR" : "Compartir Código QR"}
        </button>

        {showQRCode && (
          <div className="mt-4 flex justify-center">
            <QRCode value={name} size={128} />
          </div>
        )}
      </div>

      {/* Botón para guardar cambios */}
      <button className="bg-green-500 text-white py-2 px-4 rounded w-full">
        Guardar Cambios
      </button>

      {/* Botón para cerrar sesión */}
      <div className="mt-3">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded w-full"
        >
          Cerrar Sesión
        </button>
      </div>

      <Navbar />
    </div>
  );
};

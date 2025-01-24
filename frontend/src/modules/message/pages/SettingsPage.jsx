import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Navbar } from "../components/Navbar";
import { DeleteModal } from "../components/DeleteModal";

export const SettingsPage = () => {
  const navigate = useNavigate();

  const [profilePic, setProfilePic] = useState(
    "https://randomuser.me/api/portraits/men/1.jpg"
  );
  const [name, setName] = useState("Juan Miranda");
  const [email] = useState("Juanmiranda@gmail.com");
  const [status, setStatus] = useState("Disponible");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // Estado para manejar visibilidad de la contraseña
  const [showQRCode, setShowQRCode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewPasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const toggleQRCode = () => {
    setShowQRCode(!showQRCode);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const handleDeleteAccount = () => {
    console.log("Account deleted"); // Aquí llamas a tu lógica para eliminar la cuenta
    setDeleteModalOpen(false);
  };

  // En tu JSX:

  return (
    <div className="bg-violet-500 min-h-screen">
      {/* Banner */}
      <div className="bg-violet-500 p-8">
        <h2 className="text-3xl text-white font-bold">Settings</h2>
      </div>

      {/* Contenedor principal */}
      <div className="bg-white text-violet-900 rounded-3xl p-4 shadow-lg">
        {/* Perfil */}
        <div className="mb-5 bg-violet-100 rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Profile</h3>
          <div className="flex items-left justify-left mb-4">
            <img
              src={profilePic}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-2xl object-cover border-violet-500"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="status"
            >
              Estado
            </label>
            <select
              id="status"
              value={status}
              onChange={handleStatusChange}
              className="w-full p-4 border rounded-lg shadow-sm"
            >
              <option value="Disponible">Available</option>
              <option value="Away">Away</option>
              <option value="Busy">Busy</option>
              <option value="In a meeting">In a meeting</option>
              <option value="On vacation">On vacation</option>
            </select>
          </div>
        </div>

        {/* Información del usuario */}
        <div className="mb-5 bg-violet-100 rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">User Information</h3>
          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="name"
            >
              Full name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
              className="w-full p-4 border rounded-lg shadow-sm"
              placeholder="Enter your name"
            />
          </div>
          <div className="mb-3">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="email"
            >
              E-mail
            </label>
            <input
              type="text"
              id="email"
              value={email}
              className="bg-white w-full p-4 border rounded-lg shadow-sm text-gray-400"
              disabled
            />
          </div>
          <div className="w-50 mt-3 flex items-center justify-center">
            <button className="bg-violet-500 text-white py-2 px-6 rounded-2xl shadow-lg w-100">
              Update
            </button>
          </div>
        </div>

        {/* Configuración de seguridad */}
        <div className="mb-5 bg-violet-100 rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">Security</h3>
          <div className="mb-3 relative">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="password"
            >
              Current Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={handlePasswordChange}
                className="w-full p-4 border rounded-lg shadow-sm"
                placeholder="Enter your current password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="mb-3 relative">
            <label
              className="block text-violet-700 font-medium mb-2"
              htmlFor="newpassword"
            >
              New Password
            </label>
            <div className="flex items-center">
              <input
                type={showPassword ? "text" : "password"}
                id="newpassword"
                value={newPassword}
                onChange={handleNewPasswordChange}
                className="w-full p-4 border rounded-lg shadow-sm"
                placeholder="Enter your new password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 text-gray-500"
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>
          </div>

          <div className="w-50 mt-3 flex items-center justify-center">
            <button className="bg-violet-500 text-white py-2 px-6 rounded-2xl shadow-lg w-100">
              Update
            </button>
          </div>
        </div>

        {/* Código QR */}
        <div className="mb-5 bg-violet-100 rounded-xl shadow-md p-4">
          <h3 className="text-xl font-semibold mb-4">QR Code</h3>
          <div className="flex items-center justify-center">
            <button
              onClick={toggleQRCode}
              className="bg-violet-500 text-white py-3 px-6 rounded-2xl shadow-lg w-50 mb-4"
            >
              {showQRCode ? "Hide QR Code" : "Share QR Code"}
            </button>
          </div>

          {showQRCode && (
            <div className="flex justify-center m-4">
              <QRCode value={name} size={150} />
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center justify-center">
          <div className="w-60">
            <button
              onClick={() => setDeleteModalOpen(true)}
              className="bg-violet-900 text-white py-3 px-6 rounded-2xl shadow-lg w-full"
            >
              Delete Account
            </button>
          </div>
        </div>
        <DeleteModal
          isOpen={isDeleteModalOpen}
          onClose={() => setDeleteModalOpen(false)}
          onConfirm={handleDeleteAccount}
        />
        <div className="mb-20 flex items-center justify-center">
          <div className="w-60">
            <button
              onClick={handleLogout}
              className="bg-violet-500 text-white py-3 px-6 rounded-2xl shadow-lg w-full"
            >
              Exit
            </button>
          </div>
        </div>
      </div>

      <Navbar />
    </div>
  );
};

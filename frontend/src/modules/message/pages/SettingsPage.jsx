import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "react-qr-code";
import { Navbar } from "../components/Navbar";
import { DeleteModal } from "../components/DeleteModal";
import { AppContext } from "../../../context/context";
import { updateUser } from "../../auth/services/userService";

export const SettingsPage = () => {
  const navigate = useNavigate();

  const { userInfo } = useContext(AppContext);
  const [formData, setFormData] = useState({
    userId: userInfo.id,
    profileImage: userInfo.profileImage,
    username: userInfo.username,
    email: userInfo.email,
    status: "Disponible",
    password: "",
    newPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false); // Estado para manejar visibilidad de la contraseña
  const [showQRCode, setShowQRCode] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
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

  const handleUpdateInfo = async () => {
    await updateUser(formData);
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
          <div className="row items-left justify-left mb-4">
            <img
              src={formData.profileImage}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-2xl object-cover border-violet-500"
            />
            <div>
              <input
                type="file"
                accept="image/*"
                id="profileImageInput"
                className="hidden"
                onChange={(event) => {
                  const file = event.target.files[0];
                  if (file) {
                    const imageUrl = URL.createObjectURL(file);
                    setFormData((prev) => ({
                      ...prev,
                      profileImage: imageUrl,
                    }));
                  }
                }}
              />
              <button
                className="bg-violet-500 text-white py-3 px-3 mt-4 rounded-2xl shadow-md"
                onClick={() =>
                  document.getElementById("profileImageInput").click()
                }
              >
                Change Image
              </button>
            </div>
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
              value={formData.status}
              onChange={handleChange}
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
              id="username"
              value={formData.username}
              onChange={handleChange}
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
              value={formData.email}
              className="bg-white w-full p-4 border rounded-lg shadow-sm text-gray-400"
              disabled
            />
          </div>
          <div className="w-50 mt-3 flex items-center justify-center">
            <button
              className="bg-violet-500 text-white py-2 px-6 rounded-2xl shadow-lg w-100"
              onClick={handleUpdateInfo}
            >
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
                value={formData.password}
                onChange={handleChange}
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
                id="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
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
            <button
              className="bg-violet-500 text-white py-2 px-6 rounded-2xl shadow-lg w-100"
              onClick={handleUpdateInfo}
            >
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
              <QRCode value={formData.username} size={150} />
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

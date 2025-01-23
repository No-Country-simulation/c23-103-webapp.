import React from "react";
import { Link, useLocation } from "react-router-dom";
import status from "../../../assets/status.svg"; // Asegúrate de que la ruta sea correcta
import calls from "../../../assets/calls.svg"; // Asegúrate de que la ruta sea correcta
import settings from "../../../assets/settings.svg"; // Asegúrate de que la ruta sea correcta
import chats from "../../../assets/chats.svg"; // Asegúrate de que la ruta sea correcta

export const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/StatusPage", label: "Status", icon: status }, // Usamos la imagen directamente
    { path: "/CallsPage", label: "Calls", icon: calls },
    { path: "/ChatsPage", label: "Chats", icon: chats },
    { path: "/SettingsPage", label: "Settings", icon: settings },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 text-sm ${
              location.pathname === item.path ? "text-violet-700" : "text-gray-400"
            }`}
          >
            {/* Si el icono es una imagen, la mostramos en un <img /> */}
            <img src={item.icon} alt={item.label} className="w-7 h-8" />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

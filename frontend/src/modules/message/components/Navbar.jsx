import React from "react";
import { Link, useLocation } from "react-router-dom";

export const ChatNavbar = () => {
  const location = useLocation();

  const navItems = [
    { path: "/chats", label: "Chats", icon: "💬" },
    { path: "/status", label: "Estado", icon: "📜" },
    { path: "/calls", label: "Llamadas", icon: "📞" },
    { path: "/settings", label: "Ajustes", icon: "⚙️" },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 text-sm ${
              location.pathname === item.path ? "text-blue-500" : "text-gray-500"
            } hover:text-blue-500`}
          >
            <span className="text-2xl">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

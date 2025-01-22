import React from "react";
import { Link } from "react-router-dom";

export const ChatHeader = ({ title, profileImage }) => {
  return (
    <div className="flex items-center p-4 bg-blue-600 text-white shadow-md">
      {/* Botón para volver a la lista de conversaciones */}
      <Link
        to="/chats"
        className="inline-flex items-center space-x-2 hover:text-gray-200"
      >
        <svg
          className="w-5 h-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </Link>

      {/* Imagen de perfil */}
      <img
        src={profileImage}
        alt={title}
        className="w-10 h-10 rounded-full ml-4"
      />

      {/* Nombre de la persona/grupo */}
      <h1 className="text-lg font-semibold ml-4">{title}</h1>
    </div>
  );
};

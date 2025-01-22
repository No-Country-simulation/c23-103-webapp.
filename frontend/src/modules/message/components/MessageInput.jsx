import React, { useState } from "react";

export const MessageInput = () => {
  const [message, setMessage] = useState(""); // Estado para el mensaje
  const [file, setFile] = useState(null); // Estado para el archivo adjunto

  const handleInputChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log("Archivo seleccionado:", e.target.files[0].name);
    }
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Mensaje enviado:", message);
      setMessage(""); // Limpiar el mensaje
    }
    if (file) {
      console.log("Archivo enviado:", file.name);
      setFile(null); // Limpiar el archivo
    }
  };

  const handleSendVoiceNote = () => {
    console.log("Nota de voz grabada");
  };

  const handleAddSticker = () => {
    console.log("Sticker añadido");
  };

  return (
    <div className="p-4 bg-gray-100 flex items-center space-x-2">
      {/* Botón para adjuntar archivos multimedia */}
      <label className="text-gray-600 hover:text-gray-800 cursor-pointer" title="Adjuntar archivo">
        <input
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 15l4.5-4.5m-4.5 4.5L7.5 10.5M18 16.5A2.5 2.5 0 0015.5 14V7.5A4.5 4.5 0 007 7.5v9A4.5 4.5 0 0011.5 21h6a2.5 2.5 0 002.5-2.5v-2z"
          />
        </svg>
      </label>

      {/* Botón para agregar stickers */}
      <button
        onClick={handleAddSticker}
        className="text-gray-600 hover:text-gray-800"
        title="Agregar sticker"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M20.25 8.511l-7.5 7.5m0 0l-7.5-7.5m7.5 7.5V2.25"
          />
        </svg>
      </button>

      {/* Campo de entrada */}
      <input
        type="text"
        value={message}
        onChange={handleInputChange}
        placeholder="Escribe un mensaje..."
        className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
      />

      {/* Mostrar nombre del archivo adjunto */}
      {file && (
        <span className="text-sm text-gray-500 truncate max-w-xs">
          {file.name}
        </span>
      )}

      {/* Botón para enviar un mensaje o grabar una nota de voz */}
      {message.trim() || file ? (
        <button
          onClick={handleSendMessage}
          className="text-blue-600 hover:text-blue-800"
          title="Enviar mensaje"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 10l9 9 9-9-9-9-9 9zm0 0l9 9-9-9zm0 0l9-9 9 9-9-9z"
            />
          </svg>
        </button>
      ) : (
        <button
          onClick={handleSendVoiceNote}
          className="text-gray-600 hover:text-gray-800"
          title="Grabar nota de voz"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 3v10m0 0v4m0-4h-4m4 0h4"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

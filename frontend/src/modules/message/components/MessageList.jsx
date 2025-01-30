import React, { useEffect, useRef } from "react";

export const MessageList = ({ messages }) => {
  const messagesEndRef = useRef(null);

  // Auto-scroll al último mensaje cuando cambien los mensajes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2" style={{ maxHeight: "calc(100vh - 150px)" }}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`flex items-start ${
            message.sender === "me" ? "flex-row-reverse" : ""
          }`}
        >
          {/* Foto del usuario */}
          <img
            src={message.image}
            alt="User Avatar"
            className="w-10 h-10 rounded-lg object-cover mx-2"
          />

          {/* Mensaje */}
          <div
            className={`max-w-xs p-3 rounded-lg shadow-md ${
              message.sender === "me"
                ? "bg-violet-200 text-gray-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className="text-xs text-gray-400 mt-1 block">
              {message.time}
            </span>
          </div>
        </div>
      ))}
      {/* Este div mantiene el scroll en el último mensaje */}
      <div ref={messagesEndRef} />
    </div>
  );
};

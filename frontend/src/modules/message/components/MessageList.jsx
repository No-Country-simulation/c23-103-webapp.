import React from "react";

export const MessageList = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-4">
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
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            <p className="text-sm">{message.text}</p>
            <span className="text-xs text-gray-500 mt-1 block">
              {message.time}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

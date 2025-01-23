
import React from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";

export const UserChat = () => {
  const { conversationId } = useParams();

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col">
      {/* Encabezado del chat */}
      <ChatHeader title={` ${conversationId}`} />

      {/* Contenido del chat */}
      <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
        {/* Mensajes */}
      </div>

      {/* Input */}
      <MessageInput/>
     
    </div>
  );
};
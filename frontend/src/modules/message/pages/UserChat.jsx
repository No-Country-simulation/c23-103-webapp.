import React from "react";
import { useParams } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";

export const UserChat = () => {
  const { conversationId } = useParams();

  // Mensajes simulados con fotos
  const messages = [
    {
      sender: "other",
      text: "Hola, ¿cómo estás?",
      time: "10:00 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg", // Foto del contacto
    },
    {
      sender: "me",
      text: "¡Hola! Estoy bien, gracias. ¿Y tú?",
      time: "10:02 AM",
      image: "https://randomuser.me/api/portraits/women/45.jpg", // Foto del usuario
    },
    {
      sender: "other",
      text: "Todo bien, ¿quieres hablar sobre el proyecto?",
      time: "10:03 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      sender: "me",
      text: "¡Claro! ¿Qué necesitas?",
      time: "10:05 AM",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
  ];

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-violet-500">
      {/* Encabezado del chat */}
      <ChatHeader
        profileImage={`${conversationId}`}
        name={` ${conversationId}`}
      />

      {/* Contenido del chat */}
      <div className="flex-1 pt-5 px-2 bg-white rounded-t-3xl">
        
        <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} />
        </div>
      </div>

      {/* Input */}
      <MessageInput />
    </div>
  );
};

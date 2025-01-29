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
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      sender: "me",
      text: "¡Hola! Estoy bien, gracias. ¿Y tú?",
      time: "10:02 AM",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
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
    {
      sender: "other",
      text: "Solo quiero saber, ¿has avanzado en algo?",
      time: "10:10 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      sender: "me",
      text: "Si, ¿te parece si vemos mañana los avances a las 09:00hrs?",
      time: "10:12 AM",
      image: "https://randomuser.me/api/portraits/women/45.jpg",
    },
    {
      sender: "other",
      text: "Perfecto, ¡nos vemos mañana!",
      time: "10:14 AM",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
  ];

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-violet-500">
      {/* Encabezado del chat */}
      <ChatHeader profileImage={`${conversationId}`} name={` ${conversationId}`} />

      {/* Contenedor del chat */}
      <div className="flex-1 flex flex-col bg-white rounded-t-3xl">
        {/* Área de mensajes con scrollbar */}
        <div className="flex-1 overflow-y-auto px-2 pt-5" style={{ maxHeight: "calc(100vh - 150px)" }}>
          <MessageList messages={messages} />
        </div>

        {/* Input */}
        <MessageInput />
      </div>
    </div>
  );
};

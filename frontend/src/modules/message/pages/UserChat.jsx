import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import axios from "axios";
import { AppContext } from "../../../context/context";
import socket from "../../../core/utils/socket";

export const UserChat = () => {
  const { conversationId } = useParams();
  const { userInfo, currentConversation} = useContext(AppContext);

  useEffect(() => {
      socket.on('newMessage', (data) => {
        const response = async () => {
          const token = localStorage.getItem("token");
          const response = await axios.get(`http://localhost:3001/api/messages/${currentConversation.conversationId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
        });
        
        setMessages(response.data.messages);
      }
      response()
      });
  
      return () => {
        socket.off('newMessage'); 
      };
    }, []);
  
  //! TODO: llamar a la api para traer los mensajes de la base de datos
  const [ messages, setMessages] = useState([])
  // Función para obtener mensajes
  const fetchMessages = useCallback(async () => {
    // setIsLoading(true);
    // setError("");
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`http://localhost:3001/api/messages/${currentConversation.conversationId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data.messages);
    } catch (err) {
      // setError(err.response?.data?.error || "Error al obtener los contactos");
      console.log("error", err)
    }
  }, []);
  useEffect(() => {
    fetchMessages()
  },[])

  //! TODO: funcion para enviar mensajes
  const sendMessage = useCallback(async (content) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/messages", {
        content,
        conversationId: currentConversation.conversationId,
        receiverId : currentConversation.contactId,
        senderId: userInfo.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      socket.emit("sendMessage", content)
    } catch (err) {
      console.log("Error al enviar el mensaje", err);
    }
  }, []);

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-violet-500">
      {/* Encabezado del chat */}
      {/* TODO: aqui podria enviar la informacion de manera condicional en caso sea un nueva conversacion o una conversacion ya iniciada */}
      <ChatHeader
          profileImage={`${currentConversation.profileImage}`}
          name={` ${currentConversation.username}`}
      />

      {/* Contenido del chat */}
      <div className="flex-1 pt-5 px-2 bg-white rounded-t-3xl">
        
        <div className="flex-1 overflow-y-auto">
        <MessageList messages={messages} senderImage={userInfo.profileImage} receiverImage={currentConversation.profileImage}/>
        </div>
      </div>

      {/* Input */}
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

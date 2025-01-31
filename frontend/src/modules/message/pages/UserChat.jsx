import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChatHeader } from "../components/ChatHeader";
import { MessageInput } from "../components/MessageInput";
import { MessageList } from "../components/MessageList";
import axios from "axios";
import { AppContext } from "../../../context/context";
import socket from "../../../core/utils/socket";

export const UserChat = () => {
  const navigate = useNavigate()
  const { userInfo, currentConversation, addCurrentConversation} = useContext(AppContext);

  const [ messages, setMessages] = useState([])

  useEffect(() => {
    const handleNewMessage = async (data) => {
      try {
        if (currentConversation?.conversationId) {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `http://localhost:3001/api/messages/${currentConversation.conversationId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setMessages(response.data.messages);
        }
      } catch (err) {
        console.error("Error al obtener los mensajes:", err);
      }
    };
    
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage'); 
    };
    }, [currentConversation]);
  
  //! TODO: llamar a la api para traer los mensajes de la base de datos

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
      const conversation = await axios.post("http://localhost:3001/api/messages", {
        content,
        conversationId: currentConversation.conversationId,
        receiverId : currentConversation.contactId,
        senderId: userInfo.id
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if ( !currentConversation.conversationId) { 
        const contactInformacionChat = {
          ...currentConversation,
          conversationId: conversation.data?.conversationId
        }
        addCurrentConversation(contactInformacionChat);
        navigate(`/chats/${conversation.data?.conversationId}`);
      }
      socket.emit("sendMessage", content)
      socket.emit('newConversation')
    } catch (err) {
      console.log("Error al enviar el mensaje", err);
    }
  }, [currentConversation]);

  return (
    <div className="w-full mx-auto h-screen flex flex-col bg-violet-500">
      {/* Encabezado del chat */}
      {/* TODO: aqui podria enviar la informacion de manera condicional en caso sea un nueva conversacion o una conversacion ya iniciada */}
      <ChatHeader
          profileImage={`${currentConversation.profileImage}`}
          name={` ${currentConversation.username}`}
      />

      {/* Contenido del chat */}
      <div className="flex-1 flex flex-col bg-white rounded-t-3xl">
        {/* Área de mensajes con scrollbar */}
        <div className="flex-1 overflow-y-auto px-2 pt-5" style={{ maxHeight: "calc(100vh - 120px)" }}>
        <MessageList messages={messages} senderImage={userInfo.profileImage} receiverImage={currentConversation.profileImage}/>
        </div>

        {/* Input */}
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

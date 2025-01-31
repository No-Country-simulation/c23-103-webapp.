import React, { useCallback, useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { GroupBar } from "../components/GroupBar";
import { Navbar } from "../components/Navbar";
import { ChatModal } from "../components/ChatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import AddContactModal from "../components/AddContactModal";
import { AppContext } from "../../../context/context";
import socket from "../../../core/utils/socket";

export const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModalId, setOpenModalId] = useState(null);
  const { addUserInfo, userConversations, addUserConversations, addCurrentConversation } = useContext(AppContext)

  //! TODO: este estado gestiona los contactos, podria ser un estado global
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  //! TODO: llamamos a los contactos del usuario al cargar la página, (este useEffect es solo para que funcione por ahora, creo que seria mejor al iniciar sesion traer toda la informacion del usuario con sus contactos y conversaciones y traerlas del estado global)
  useEffect(() => {
    const userInformation = async() => {
      let token = localStorage.getItem("token");
      let userId = localStorage.getItem("userId");
      const response = await axios.get(`http://localhost:3001/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      addUserInfo(response.data);
    }
    userInformation();
  }, []);
  
  const fetchConversations = useCallback(async () => {
    
    try {
      if(!userConversations.length) {
        let token = localStorage.getItem("token");
        const res = await axios.get(`http://localhost:3001/api/conversations/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        addUserConversations(res.data.conversations);
      }
    } catch (err) {
      console.log("Error al obtener los contactos", err);
    }
  }, [userConversations, addUserConversations]);
  
  //! TODO: verificar la conexion del socket
  useEffect(() => {
    fetchConversations();
    const handleUpdateConversation = () => {
      fetchConversations();
    };
    socket.on("updateConversation", fetchConversations)
    socket.on("updateConversation", handleUpdateConversation);

    return () => {
      socket.off("updateConversation", handleUpdateConversation);
    };
  }, [fetchConversations]);

  const filteredConversations = userConversations.filter((conversation) => {
      switch (filter) {
        case "noLeidos":
          return conversation.unreadCount > 0;
        case "favoritos":
          return conversation.isFavorite;
        case "grupos":
          return conversation.isGroup;
        default:
          return true; // Todos
      }
    })
    .filter((conversation) =>
      conversation.Users.some((user) =>
        user.username.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );

  //! TODO: boton que abre el modal pra mostrar y agregar contactos
  const handleContactModal = () => {
    setIsContactModalOpen(true);
  };

  //! TODO: envia informacion a un estado
  const handleConversationClick = (conversation) => {
    const contactInformacionChat = {
      conversationId: conversation.id,
      contactId: conversation.Users[0].id,
      username: conversation.Users[0].username,
      profileImage: conversation.Users[0].profileImage,
    }
    addCurrentConversation(contactInformacionChat);
  }

  const handleOpenModal = (id) => {
    setOpenModalId(id);
  };

  const handleCloseModal = () => {
    setOpenModalId(null);
  };

  const handleAction = (action, id) => {
    console.log(`Acción: ${action} en chat con ID: ${id}`);
    handleCloseModal();
  };

  return (
    <div className="bg-violet-500">
      <div className="bg-violet-500 p-8">
        <h2 className="text-3xl text-white font-bold">Chats</h2>
      </div>

      {/* //! TODO: Arreglar boton para agregar contactost*/}

      <ul className="bg-white text-gray-900 rounded-t-2xl p-4 mb-10">
        <div className="flex justify-between p-0 w-100">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <button
            className="bg-violet-500 rounded-xl w-10 h-10 "
            onClick={handleContactModal}
          >
            <FontAwesomeIcon className="text-white" icon={faPlus} />
          </button>
        </div>

        <GroupBar onFilterChange={setFilter} />
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <li
              key={conversation.id}
              className="flex items-center p-3 bg-violet-100 rounded-xl shadow-md mb-3"
            >
              <img
                src={conversation.Users[0].profileImage}
                alt={conversation.Users[0].username}
                className="w-14 h-15 rounded-xl"
              />
              <div className="flex-grow ml-4">
                <Link
                  to={`/chats/${conversation.Users[0].id}`}
                  className="flex justify-between text-violet-900"
                  onClick={() => handleConversationClick(conversation)}
                >
                  <span className="font-semibold">
                    {conversation.Users[0].username}
                  </span>
                  <span className="text-gray-500 text-sm mx-3">
                    {conversation.timestamp}
                  </span>
                </Link>

                <div className="flex justify-between items-center">
                  <p
                    className="text-gray-500 text-sm truncate"
                    style={{
                      maxWidth: "100px", // Ajusta este valor según el diseño deseado
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                    title={conversation.lastMessage} // Muestra el mensaje completo en un tooltip
                  >
                    {conversation.lastMessage}
                  </p>
                  {conversation.unreadCount > 0 && (
                    <span className="ml-2 bg-violet-500 text-white text-xs font-bold mx-3 px-2 py-1 rounded-full">
                      {conversation.unreadCount}
                    </span>
                  )}
                </div>
              </div>

              <button
                onClick={() => handleOpenModal(conversation.id)}
                className="text-violet-600"
                title="Options"
              >
                <FontAwesomeIcon icon={faAnglesLeft} />
              </button>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No conversations found.</li>
        )}
      </ul>

      {/* Componente del Modal */}
      <ChatModal
        isOpen={!!openModalId}
        onClose={handleCloseModal}
        onAction={handleAction}
        conversationId={openModalId}
      />

      {/* //! aqui se muestran los contactos y el input para agregar un contacto */}
      <AddContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />

      <Navbar />
    </div>
  );
};

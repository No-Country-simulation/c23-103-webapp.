import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { GroupBar } from "../components/GroupBar";
import { Navbar } from "../components/Navbar";
import { ChatModal } from "../components/ChatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModalId, setOpenModalId] = useState(null);
  
  
  //! TODO: este estado gestiona los contactos, podria ser un estado global
  const [conversations, setConversations] = useState([])
  //! llamamos a los contactos del usuario al cargar la página
  useEffect(() =>{
    const conversations = async () => {
      let token = localStorage.getItem("token")
      const res = await axios.get(`http://localhost:3001/api/conversations/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setConversations(res.data.conversations)
    };
    conversations()
  },[])

  // Conversaciones de ejemplo
  // const conversations = [
  //   {
  //     id: "1",
  //     name: "Juan Miranda",
  //     lastMessage: "Hola, ¿cómo estás?",
  //     timestamp: "14:35",
  //     unreadCount: 2,
  //     isFavorite: false,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/men/3.jpg",
  //   },
  //   {
  //     id: "2",
  //     name: "Equipo Trabajo",
  //     lastMessage: "Revisemos el documento.",
  //     timestamp: "13:20",
  //     unreadCount: 0,
  //     isFavorite: false,
  //     isGroup: true,
  //     profileImage: "https://randomuser.me/api/portraits/lego/2.jpg",
  //   },
  //   {
  //     id: "3",
  //     name: "María Lucas",
  //     lastMessage: "Gracias por la ayuda!",
  //     timestamp: "10:15",
  //     unreadCount: 5,
  //     isFavorite: true,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
  //   },
  //   {
  //     id: "4",
  //     name: "Fernando León",
  //     lastMessage: "¿Te llamo más tarde?",
  //     timestamp: "08:50",
  //     unreadCount: 0,
  //     isFavorite: false,
  //     isGroup: false,
  //     profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
  //   },
  // ];

  // Filtrar las conversaciones según el filtro seleccionado

  const filteredConversations = conversations?.filter((conversation) => {
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
  }).filter((conversation) =>
    conversation.Users.some((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  //! TODO: manejador de agregar contacto se debe enviar el email del usuario a agregar. esta peticion deberia actualizar la informacion de los contactos y renderizar el nuevo contacto
  const handleAddContact = async ( ) => {
    try {
      let token = localStorage.getItem("token")
      let email = "test@gmail.com"
  
      const res = await axios.post(`http://localhost:3001/api/contacts/`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log({error: error.response.data.error})
    }
  };

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

      {/* //! TODO: Arreglar boton para agregar contactos deberia abrirse un modal que muestre los contactos y un boton de agregar nuevo, ahi colocariamos el mail del usuario a agregar y al confirmar deberia lanzarse handleAddContact*/}
      <button className="bg-cyan-600" onClick={handleAddContact}>AGREGAR(+)</button>

      <ul className="bg-white text-gray-900 rounded-t-3xl p-4 mb-10">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <GroupBar onFilterChange={setFilter} />
        {filteredConversations.length > 0 ? (
          filteredConversations.map((conversation) => (
            <li
              key={conversation.id}
              className="flex items-center p-3 bg-violet-100 rounded-xl shadow-md mb-3"
            >
              <img
                src={conversation.profileImage}
                alt={conversation.name}
                className="w-14 h-15 rounded-xl"
              />
              <div className="flex-grow ml-4">
                <Link
                  to={`/chats/${conversation.name}`}
                  className="flex justify-between text-violet-900"
                >
                  <span className="font-semibold">{conversation.Users[0].username}</span>
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

      <Navbar />
    </div>
  );
};

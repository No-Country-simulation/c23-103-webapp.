import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SearchBar } from "../components/SearchBar";
import { GroupBar } from "../components/GroupBar";
import { Navbar } from "../components/Navbar";
import { ChatModal } from "../components/ChatModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAnglesLeft } from "@fortawesome/free-solid-svg-icons";

export const ChatsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [openModalId, setOpenModalId] = useState(null);

  const conversations = [
    {
      id: "1",
      name: "Juan Miranda",
      lastMessage: "Hi, how are you?",
      timestamp: "14:35",
      unreadCount: 2,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/men/1.jpg",
    },
    {
      id: "2",
      name: "Team Work",
      lastMessage: "Let's review the document.",
      timestamp: "13:20",
      unreadCount: 0,
      isFavorite: false,
      isGroup: true,
      profileImage: "https://randomuser.me/api/portraits/lego/2.jpg",
    },
    {
      id: "3",
      name: "María Lucas",
      lastMessage: "Thanks for the help!",
      timestamp: "10:15",
      unreadCount: 5,
      isFavorite: true,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/women/3.jpg",
    },
    {
      id: "4",
      name: "Fernando León",
      lastMessage: "Should I call you later?",
      timestamp: "08:50",
      unreadCount: 0,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/men/4.jpg",
    },
    {
      id: "5",
      name: "Alice Johnson",
      lastMessage: "See you at the meeting.",
      timestamp: "07:45",
      unreadCount: 3,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/women/5.jpg",
    },
    {
      id: "6",
      name: "Family Group",
      lastMessage: "Don't forget the dinner tonight.",
      timestamp: "06:30",
      unreadCount: 1,
      isFavorite: true,
      isGroup: true,
      profileImage: "https://randomuser.me/api/portraits/lego/3.jpg",
    },
    {
      id: "7",
      name: "Mark Peterson",
      lastMessage: "I'll send you the details later.",
      timestamp: "05:20",
      unreadCount: 0,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/men/7.jpg",
    },
    {
      id: "8",
      name: "Design Team",
      lastMessage: "Can we finalize the colors today?",
      timestamp: "03:10",
      unreadCount: 4,
      isFavorite: true,
      isGroup: true,
      profileImage: "https://randomuser.me/api/portraits/lego/4.jpg",
    },
    {
      id: "9",
      name: "Sophia Brown",
      lastMessage: "The files are ready for review.",
      timestamp: "01:00",
      unreadCount: 0,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/women/9.jpg",
    },
    {
      id: "10",
      name: "James Carter",
      lastMessage: "Did you receive my email?",
      timestamp: "00:45",
      unreadCount: 2,
      isFavorite: false,
      isGroup: false,
      profileImage: "https://randomuser.me/api/portraits/men/10.jpg",
    },
  ];

  const filteredConversations = conversations
    .filter((conversation) => {
      switch (filter) {
        case "unRead":
          return conversation.unreadCount > 0;
        case "favorites":
          return conversation.isFavorite;
        case "groups":
          return conversation.isGroup;
        default:
          return true;
      }
    })
    .filter((conversation) =>
      conversation.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                  <span className="font-semibold">{conversation.name}</span>
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

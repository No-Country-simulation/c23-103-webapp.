import socket from "./socket";

export const setupSocketListeners = (setConversations) => {
    const updateLastMessage = (message) => {
        console.log("mensaje info", message);

        setConversations((prev) =>{
            console.log("la previa", prev);
            const nuevitas =prev.map((conv) =>
                conv.id === message.conversationId
                    ? { ...conv, lastMessage: message.content, unreadCount :  conv.unreadCount + 1}
                    : conv
            )
            console.log("nuevas", nuevitas)
        return nuevitas}
        );
    };

    const addNewContact = (contact) => {
        setConversations((prev) => [...prev, contact]);
    };

    const deleteConversation = (conversationId) => {
        setConversations((prev) => prev.filter((conv) => conv.id !== conversationId));
    };

    const updateConversation = (data) => {
        setConversations((prev) =>
            prev.map((conv) =>
                conv.id === data.conversationId ? { ...conv, ...data } : conv
            )
        );
    };

    socket.on("newMessage", updateLastMessage);
    socket.on("contactAdded", addNewContact);
    socket.on("conversationDeleted", deleteConversation);
    socket.on("conversationUpdated", updateConversation);
};

export const removeSocketListeners = () => {
    socket.off("newMessage");
    socket.off("contactAdded");
    socket.off("conversationDeleted");
    socket.off("conversationUpdated");
};

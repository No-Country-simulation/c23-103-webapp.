import { createContext, useEffect, useState } from "react";
import { fetchConversations } from "../modules/message/services/conversationsService";
import { removeSocketListeners, setupSocketListeners } from "../core/utils/socket/socketEvents";

export const AppContext = createContext({})

const ContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({})
    const addUserInfo = (info) => {
        setUserInfo(info)
    }
    
    
    const [userContacts, setUserContacts] = useState([])
    const addUserContacts = (info) => {
        setUserContacts(info)
    }
    
    const [currentConversation, setCurrentConversation] = useState({})
    const addCurrentConversation = (info) => {
        setCurrentConversation(info)
    }
    
    const [userConversations, setUserConversations] = useState([])

    useEffect(() => {
        const loadConversations = async () => {
            console.log("usuarui", userInfo)
            if (Object.keys(userInfo).length === 0) {
                setUserConversations([]);
                return;
            };

            try {
                console.log("cargando conversas")
                const conversations = await fetchConversations();
                if (conversations) setUserConversations(conversations || []);
                console.log("conversaciones cargadas", conversations);
            } catch (error) {
                logout()
            }
        };
        loadConversations();
    }, [userInfo]);

    // Escuchar eventos de Socket.io
    useEffect(() => {
        if (Object.keys(userInfo).length === 0) return;
        setupSocketListeners(setUserConversations);
        return () => removeSocketListeners();
    }, [userInfo]);

    const logout = () => {
        localStorage.removeItem("token");
        setUserInfo(null);
    };



    return(
        <AppContext.Provider value={{ userInfo, addUserInfo, userConversations, userContacts, addUserContacts, currentConversation, addCurrentConversation, logout }}>
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider
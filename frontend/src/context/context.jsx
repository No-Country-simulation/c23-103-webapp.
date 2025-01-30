import { createContext, useState } from "react";

export const AppContext = createContext({})

const ContextProvider = ({children}) => {

    const [userInfo, setUserInfo] = useState({})
    const addUserInfo = (info) => {
        setUserInfo(info)
    }
    
    const [userConversations, setUserConversations] = useState([])
    const addUserConversations = (info) => {
        setUserConversations(info)
    }

    const [userContacts, setUserContacts] = useState([])
    const addUserContacts = (info) => {
        setUserContacts(info)
    }
    
    const [currentConversation, setCurrentConversation] = useState({})
    const addCurrentConversation = (info) => {
        setCurrentConversation(info)
    }

    return(
        <AppContext.Provider value={{ userInfo, addUserInfo, userConversations, addUserConversations, userContacts, addUserContacts, currentConversation, addCurrentConversation }}>
            {children}
        </AppContext.Provider>
    )
}

export default ContextProvider
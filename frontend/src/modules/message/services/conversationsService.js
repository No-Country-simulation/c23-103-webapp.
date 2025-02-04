import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchConversations = async () => {
    try {
        let token = localStorage.getItem("token");
        const response = await axios.get(`${API_BASE}/conversations`, {
            headers: {
                        Authorization: `Bearer ${token}`,
                        },
        });
        return response.data.conversations
    } catch (error) {
        console.log("error", error)
    }
};

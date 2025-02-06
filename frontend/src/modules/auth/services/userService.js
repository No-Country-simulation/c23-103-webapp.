import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const updateUser = async (userData) => {
    try {
        const response = await axios.put(`${API_BASE}/users`, userData);
        return response.data
    } catch (error) {
        console.log("error", error)
    }
};

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

const token = localStorage.getItem("token");
export const changeImage = async (imageData) => {
  try {
    const response = await axios.post(`${API_BASE}/upload`, imageData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.imageUrl;
  } catch (error) {
    console.log("error", error);
  }
};
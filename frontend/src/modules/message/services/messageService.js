// Métodos para obtener, enviar, y manejar mensajes.

import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const fetchMessages = (conversationId) => {
  return axios.get(`${API_BASE}/messages/${conversationId}`);
};

export const sendMessage = (conversationId, message) => {
  return axios.post(`${API_BASE}/messages/${conversationId}`, { message });
};

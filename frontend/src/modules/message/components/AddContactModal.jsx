import axios from "axios";
import React, { useEffect, useState, useCallback } from "react";

const AddContactModal = ({ isOpen, onClose }) => {
  const [newContact, setNewContact] = useState("");
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para obtener contactos
  const fetchContacts = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:3001/api/contacts/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(response.data.Contacts || []);
    } catch (err) {
      setError(err.response?.data?.error || "Error al obtener los contactos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Obtener contactos al abrir el modal
  useEffect(() => {
    if (isOpen) {
      fetchContacts();
    }
  }, [isOpen, fetchContacts]);

  // Función para agregar un contacto
  const handleAddContact = async () => {
    if (!newContact.trim()) {
      setError("Por favor ingresa un email válido.");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:3001/api/contacts/",
        { email: newContact },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setNewContact(""); // Limpiar input
      fetchContacts(); // Actualizar la lista de contactos
    } catch (err) {
      setError(err.response?.data?.error || "Error al agregar el contacto");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      {/* Modal Content */}
      <div
        className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-xl font-semibold">Agregar Contacto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-2 text-sm text-red-600 bg-red-100 rounded">
            {error}
          </div>
        )}

        {/* Input for New Contact */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Email del contacto"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            disabled={isLoading}
          />
        </div>

        {/* Add Contact Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddContact}
            className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Agregando..." : "Agregar"}
          </button>
        </div>

        {/* Contact List */}
        <div>
          <h3 className="text-lg font-medium mb-2">Contactos:</h3>
          {isLoading ? (
            <p className="text-gray-500">Cargando contactos...</p>
          ) : (
            <ul className="space-y-2 max-h-48 overflow-y-auto">
              {contacts.map((contact, index) => (
                <li
                  key={index}
                  className="bg-gray-100 p-2 rounded flex items-center justify-between"
                >
                  <button>{contact.username}</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

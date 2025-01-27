import axios from "axios";
import React, { useState } from "react";

const AddContactModal = ({ isOpen, onClose, contacts }) => {
  const [newContact, setNewContact] = useState("");

  //! TODO: manejador de agregar contacto se debe enviar el email del usuario a agregar. esta peticion deberia actualizar la informacion de los contactos y renderizar el nuevo contacto (esta hardcodeado, falta la funcion para capturar la info del input y enviarla)
  const handleAddContact = async ( ) => {
    try {
      let token = localStorage.getItem("token")
      let email = "carlos@gmail.com"
  
      await axios.post(`http://localhost:3001/api/contacts/`, { email }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
    } catch (error) {
      console.log({error: error.response.data.error})
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

        {/* Input for New Contact */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Nombre del contacto"
            value={newContact}
            onChange={(e) => setNewContact(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Add Contact Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleAddContact}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Agregar
          </button>
        </div>

        {/* Contact List */}
        <div>
          <h3 className="text-lg font-medium mb-2">Contactos:</h3>
          <ul className="space-y-2 max-h-48 overflow-y-auto">
            {contacts.map((contact, index) => (
              <li
                key={index}
                className="bg-gray-100 p-2 rounded flex items-center justify-between"
              >
                {/* TODO este boton debería abrir la pantalla de conversacion */}
                <button>{contact.username}</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AddContactModal;

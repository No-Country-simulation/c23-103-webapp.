import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // Importar el componente de navegación

export const CallsPage = () => {
  // Llamadas de ejemplo
  const callsList = [
    {
      id: "1",
      name: "Llamada de Juan Miranda",
      images: [
        "https://picsum.photos/500/500?random=7", // Imagen aleatoria 1
        "https://picsum.photos/500/500?random=8", // Imagen aleatoria 2
        "https://picsum.photos/500/500?random=9", // Imagen aleatoria 3
      ],
    },
    {
      id: "2",
      name: "Llamada de María Lucas",
      images: [
        "https://picsum.photos/500/500?random=10", // Imagen aleatoria 4
        "https://picsum.photos/500/500?random=11", // Imagen aleatoria 5
        "https://picsum.photos/500/500?random=12", // Imagen aleatoria 6
      ],
    },
    // Agregar más llamadas aquí
  ];

  const [currentCall, setCurrentCall] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openCall = (call) => {
    setCurrentCall(call);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentCall && currentImageIndex < currentCall.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentCall && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const closeCall = () => {
    setCurrentCall(null);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      {!currentCall ? (
        <div>
          <h2 className="text-3xl font-bold mb-4">Calls</h2>

          {/* Lista de llamadas */}
          <ul className="space-y-2">
            {callsList.map((call) => (
              <li
                key={call.id}
                className="bg-white p-4 rounded-lg shadow-md flex items-center space-x-4"
              >
                {/* Imagen de perfil */}
                <img
                  src={`https://randomuser.me/api/portraits/men/1.jpg`}
                  alt={call.name}
                  className="w-10 h-10 rounded-full"
                />

                {/* Información de la llamada */}
                <div className="flex-grow">
                  <Link
                    to="#"
                    onClick={() => openCall(call)}
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    {call.name}
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {/* Botón para cerrar la llamada */}
          <button
            onClick={closeCall}
            className="absolute top-4 right-4 text-white text-2xl font-bold z-10"
          >
            &times; {/* Símbolo de X para cerrar */}
          </button>

          {/* Contenedor para la imagen */}
          <div className="relative mt-24"> {/* Margin-top para evitar que se quede detrás del navbar */}
            <img
              src={currentCall.images[currentImageIndex]}
              alt="Llamada"
              className="w-full h-[80vh] object-cover rounded-lg"
            />

            {/* Botón de flecha hacia la izquierda */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl font-bold"
            >
              &#10094;
            </button>

            {/* Botón de flecha hacia la derecha */}
            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl font-bold"
            >
              &#10095;
            </button>
          </div>
        </div>
      )}

      <Navbar />
    </div>
  );
};

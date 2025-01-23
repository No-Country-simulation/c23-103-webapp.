import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../components/Navbar"; // Importar el componente de navegación

export const StatusPage = () => {
  // Estados de ejemplo de personas
  const statusList = [
    {
      id: "1",
      name: "Juan Miranda",
      time: "recientemente",
      src: "https://randomuser.me/api/portraits/men/1.jpg",
      images: [
        "https://picsum.photos/500/500?random=1", // Imagen aleatoria 1
        "https://picsum.photos/500/500?random=2", // Imagen aleatoria 2
      ],
    },
    {
      id: "2",
      name: "María Lucas",
      time: "hace 1 min",
      src: "https://randomuser.me/api/portraits/women/20.jpg",
      images: [
        "https://picsum.photos/500/500?random=4", // Imagen aleatoria 4
        "https://picsum.photos/500/500?random=5", // Imagen aleatoria 5
      ],
    },
    {
      id: "3",
      name: "Luis Fernandez",
      time: "hace 2 min",
      src: "https://randomuser.me/api/portraits/men/4.jpg",
      images: [
        "https://picsum.photos/500/500?random=1", // Imagen aleatoria 1
        "https://picsum.photos/500/500?random=2", // Imagen aleatoria 2
      ],
    },
    {
      id: "4",
      name: "Lucía Chacón",
      time: "hace 3 min",
      src: "https://randomuser.me/api/portraits/women/9.jpg",
      images: [
        "https://picsum.photos/500/500?random=4", // Imagen aleatoria 4
        "https://picsum.photos/500/500?random=6", // Imagen aleatoria 6
      ],
    },
    {
      id: "5",
      name: "Marcos Betancourt",
      time: "hace 3 min",
      src: "https://randomuser.me/api/portraits/men/20.jpg",
      images: [
        "https://picsum.photos/500/500?random=1", // Imagen aleatoria 1
        "https://picsum.photos/500/500?random=2", // Imagen aleatoria 2
        "https://picsum.photos/500/500?random=3", // Imagen aleatoria 3
      ],
    },
    {
      id: "6",
      name: "Luz Parra",
      time: "hace 7 min",
      src: "https://randomuser.me/api/portraits/women/6.jpg",
      images: [
        "https://picsum.photos/500/500?random=4", // Imagen aleatoria 4
        "https://picsum.photos/500/500?random=5", // Imagen aleatoria 5
        "https://picsum.photos/500/500?random=6", // Imagen aleatoria 6
      ],
    },

    // Agregar más personas aquí
  ];

  const [currentStatus, setCurrentStatus] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const openStatus = (status) => {
    setCurrentStatus(status);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (currentStatus && currentImageIndex < currentStatus.images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const prevImage = () => {
    if (currentStatus && currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  const closeStatus = () => {
    setCurrentStatus(null);
  };

  return (
    <div className="bg-violet-900">
      {" "}
      {/* / background messages atras */}
      {!currentStatus ? (
        <>
          {/* Primera sección (título) */}
          <div className="bg-violet-900 p-8">
            {" "}
            {/* // background titulo  */}
            <h2 className="text-3xl text-white font-bold">Status</h2>
          </div>

          {/* Segunda sección (lista de personas con sus estados) */}
          <div className="bg-white pt-6 rounded-t-2xl">
            <ul className="Down-side space-y-2 p-4">
              {" "}
              {/* // background messages atras */}
              {statusList.map((status) => (
                <li
                  key={status.id}
                  className="bg-violet-100 p-4 rounded-2xl shadow-md flex items-center space-x-4"
                >
                  {/* Imagen de perfil */}
                  <img
                    src={status.src}
                    alt={status.name}
                    className="w-12 h-12 rounded-full"
                  />

                  {/* Información del estado */}
                  <div className="flex-grow">
                    <Link
                      to="#"
                      onClick={() => openStatus(status)}
                      className="font-semibold text-violet-900" /* hover:underline */
                    >
                      {status.name}
                    </Link>
                  </div>
                  <span className="text-gray-500">{status.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : (
        <div>
          {/* Botón para cerrar el estado */}
          <button
            onClick={closeStatus}
            className="absolute top-4 right-4 text-white text-2xl font-bold z-10"
          >
            &times; {/* Símbolo de X para cerrar */}
          </button>

          {/* Contenedor para la imagen */}
          <div className="relative mt-24">
            {" "}
            {/* Margin-top para evitar que se quede detrás del navbar */}
            <img
              src={currentStatus.images[currentImageIndex]}
              alt="Estado"
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

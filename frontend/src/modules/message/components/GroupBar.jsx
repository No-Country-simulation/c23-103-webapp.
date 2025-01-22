import React, { useState } from "react";

export const GroupBar = ({ onFilterChange }) => {
  const [selectedFilter, setSelectedFilter] = useState("todos");

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    onFilterChange(filter); // Llama al callback para cambiar el filtro en el componente principal
  };

  return (
    <div className="flex space-x-4 bg-white p-4 shadow-md">
      <button
        onClick={() => handleFilterChange("todos")}
        className={`flex-1 py-2 text-center ${selectedFilter === "todos" ? "bg-blue-500 text-white" : "text-blue-500"}`}
      >
        Todos
      </button>
      <button
        onClick={() => handleFilterChange("noLeidos")}
        className={`flex-1 py-2 text-center ${selectedFilter === "noLeidos" ? "bg-blue-500 text-white" : "text-blue-500"}`}
      >
        No Leídos
      </button>
      <button
        onClick={() => handleFilterChange("favoritos")}
        className={`flex-1 py-2 text-center ${selectedFilter === "favoritos" ? "bg-blue-500 text-white" : "text-blue-500"}`}
      >
        Favoritos
      </button>
      <button
        onClick={() => handleFilterChange("grupos")}
        className={`flex-1 py-2 text-center ${selectedFilter === "grupos" ? "bg-blue-500 text-white" : "text-blue-500"}`}
      >
        Grupos
      </button>
    </div>
  );
};

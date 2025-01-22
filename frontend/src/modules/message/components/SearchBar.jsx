import React from "react";

export const SearchBar = ({ searchQuery, setSearchQuery }) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Buscar conversaciones..."
      />
    </div>
  );
};

import React from 'react';

const NavBar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white shadow-md">
      <div className="text-xl font-bold">🚗 Maryann Projects</div>
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search cars..."
          className="px-3 py-1 rounded-md text-black focus:outline-none"
        />
        <button className="bg-white text-blue-600 px-3 py-1 rounded-md hover:bg-gray-100">
          Profile
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
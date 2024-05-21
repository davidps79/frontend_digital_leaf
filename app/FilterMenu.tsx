'use client'; 
import React, { useState } from 'react';
import { IconFilter } from '@tabler/icons-react';

const FilterMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          onClick={toggleMenu}
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <IconFilter />
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            <option value="Fantasy" className="block px-4 py-2 text-sm text-gray-700">Fantasy</option>
            <option value="Science Fiction" className="block px-4 py-2 text-sm text-gray-700">Science Fiction</option>
            <option value="Mystery" className="block px-4 py-2 text-sm text-gray-700">Mystery</option>
            <option value="Romance" className="block px-4 py-2 text-sm text-gray-700">Romance</option>
            <option value="Horror" className="block px-4 py-2 text-sm text-gray-700">Horror</option>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;

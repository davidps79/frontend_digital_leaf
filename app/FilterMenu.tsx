'use client'; 
import React, { useState } from 'react';
import { IconFilter } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

const FilterMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (value: string) => {
    router.push(`/filter/category/${value}`);
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
            <button onClick={() => handleOptionClick('Fantasia')} className="block px-4 py-2 text-sm text-gray-700">Fantasia</button>
            <button onClick={() => handleOptionClick('Comedia')} className="block px-4 py-2 text-sm text-gray-700">Comedia</button>
            <button onClick={() => handleOptionClick('Ciencia Ficcion')} className="block px-4 py-2 text-sm text-gray-700">Ciencia Ficcion</button>
            <button onClick={() => handleOptionClick('Historia')} className="block px-4 py-2 text-sm text-gray-700">Historia</button>
            <button onClick={() => handleOptionClick('Misterio')} className="block px-4 py-2 text-sm text-gray-700">Misterio</button>
            <button onClick={() => handleOptionClick('Romance')} className="block px-4 py-2 text-sm text-gray-700">Romance</button>
            <button onClick={() => handleOptionClick('Horror')} className="block px-4 py-2 text-sm text-gray-700">Horror</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterMenu;

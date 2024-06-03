import React, { useState, useEffect, useRef } from 'react';

function Header() {
  
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between py-4 px-8">
        <a href="/" className="flex items-center text-xl font-semibold">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-8 h-8 text-indigo-500 mr-2" viewBox="0 0 24 24">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
          </svg>
          StockMS
        </a>
        <div ref={dropdownRef} className="relative">
          <button onClick={toggleDropdown} className="bg-transparent text-white font-semibold py-2 px-4 rounded-md focus:outline-none">Menu</button>
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg z-10">
              <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Service</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">About</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Contact</a>
              <hr className="border-gray-700" />
              <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Sign In</a>
              <a href="#" className="block px-4 py-2 text-white hover:bg-gray-700">Logout</a>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

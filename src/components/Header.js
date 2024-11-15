// Header.js
import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl">Reviews by Menu</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="#review" className="hover:text-gray-400">Write a review</a>
            </li>
            <li>
              <a href="#login" className="hover:text-gray-400">Login</a>
            </li>
            <li>
              <a href="#signUp" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300">Sign Up</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
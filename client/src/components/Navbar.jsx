import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token;
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="bg-blue-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Name */}
          <div className="flex items-center space-x-2">
            <span className="text-blue-600 font-bold text-xl tracking-tight">SHORTS //:</span>
            <span className="text-xs text-gray-500 hidden sm:inline">URL Shortner</span>
          </div>

          {/* Hamburger */}
          <div className="md:hidden">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {menuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {isLoggedIn ? (
              <>
                <Link to="/" className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                <Link to="/create" className="text-gray-700 hover:text-blue-600 font-medium">Link Shortener</Link>
                <Link to="/links" className="text-gray-700 hover:text-blue-600 font-medium">My Links</Link>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4">
          <div className="flex flex-col space-y-3">
            {isLoggedIn ? (
              <>
                <Link to="/" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">Home</Link>
                <Link to="/create" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">Link Shortener</Link>
                <Link to="/links" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">My Links</Link>
                <button
                  onClick={() => {
                    setMenuOpen(false);
                    handleLogout();
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-md transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-gray-700 hover:text-blue-600 font-medium">Login</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

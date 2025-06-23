import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

const navLinks = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'scan', path: '/scan', label: 'Scan' },
  { id: 'chatbot', path: '/chatbot', label: 'Chatbot' },
  { id: 'info', path: '/info', label: 'Info' },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold text-gray-800 tracking-tight">
            MediScanAI
          </span>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-2">
          {navLinks.map(link => (
            <NavLink
              key={link.id}
              to={link.path}
              className="relative px-3 py-2 font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-150"
              style={{ borderBottom: 'none' }}
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-gray-900' : ''}>{link.label}</span>
                  <span
                    className={`
                      absolute left-0 -bottom-0.5 w-full h-0.5
                      bg-gray-800
                      transition-transform duration-300
                      ${isActive ? 'scale-x-100' : 'scale-x-0'}
                      origin-left
                      pointer-events-none
                    `}
                  />
                </>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors duration-150"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow">
          <div className="flex flex-col px-4 py-2 gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.id}
                to={link.path}
                className="relative block px-3 py-3 font-semibold text-gray-600 hover:text-gray-900 transition-colors duration-150"
                style={{ borderBottom: 'none' }}
                onClick={() => setMenuOpen(false)}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-gray-900' : ''}>{link.label}</span>
                    <span
                      className={`
                        absolute left-0 -bottom-0.5 w-full h-0.5
                        bg-gray-800
                        transition-transform duration-300
                        ${isActive ? 'scale-x-100' : 'scale-x-0'}
                        origin-left
                        pointer-events-none
                      `}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  // Background scroll disable karo jab menu open ho
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isMenuOpen]);

  const menuLinks = [
    { name: 'Home', path: '/' },
    { name: 'Projects', path: '/projects' },
    { name: 'Tasks', path: '/tasks' },
    { name: 'Commits', path: '/commits' },
    { name: 'Login', path: '/login' },
  ];

  return (
    <>
      <nav className="absolute top-0 left-0 w-full z-[9000] px-6 py-8 flex justify-between items-center select-none">
        
        <Link 
          to="/" 
          onClick={closeMenu}
          className="text-white text-xl md:text-2xl font-bold tracking-tight cursor-none transition-transform duration-500 hover:scale-105"
        >
          DevTrack<span className="text-[#555555]">.</span>
        </Link>

        <div className="hidden md:flex space-x-12 text-xs tracking-[0.2em] font-mono uppercase">
          <Link to="/" onClick={closeMenu} className={`cursor-none transition-colors duration-300 ${location.pathname === '/' ? 'text-white font-bold' : 'text-[#777777] hover:text-white'}`}>Home</Link>
          <Link to="/login" onClick={closeMenu} className={`cursor-none transition-colors duration-300 ${location.pathname === '/login' ? 'text-white font-bold' : 'text-[#777777] hover:text-white'}`}>Login</Link>
          <Link to="/projects" onClick={closeMenu} className={`cursor-none transition-colors duration-300 ${location.pathname === '/projects' ? 'text-white font-bold' : 'text-[#777777] hover:text-white'}`}>Projects</Link>
        </div>

        <button 
          onClick={toggleMenu}
          className="text-[#777777] text-xs tracking-[0.2em] font-mono uppercase hover:text-white transition-colors cursor-none outline-none"
        >
          {isMenuOpen ? 'Close X' : 'Menu +'}
        </button>
        
      </nav>

      {/* OVERLAY - Ekdum Clean */}
      <div 
        className={`fixed inset-0 w-full h-screen bg-[#050505] z-[8500] flex flex-col items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center space-y-6 md:space-y-8 w-full px-6 text-center select-none">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              onClick={closeMenu}
              className={`text-5xl md:text-7xl font-bold uppercase tracking-tighter cursor-none transition-all duration-500 hover:scale-105 ${
                location.pathname === link.path ? 'text-white' : 'text-[#333333] hover:text-white'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Yehan se wo copyright text hata diya gaya hai taaki clash na ho */}
      </div>
    </>
  );
};

export default Navbar;
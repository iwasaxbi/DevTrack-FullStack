import React from 'react';

const Footer = () => {
  return (
    <footer className="w-full bg-black text-[#A3A3A3] pt-24 pb-32 border-t border-[#1a1a1a] relative overflow-hidden select-none">
      
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-center">
        
        {/* Massive Text (Scales with viewport width) */}
        <h1 className="text-[12vw] font-bold text-white tracking-tighter leading-none mb-8 text-center uppercase cursor-none transition-transform duration-700 hover:scale-105">
          Let's Build.
        </h1>

        {/* Minimal Divider Line */}
        <div className="w-full max-w-2xl h-px bg-[#222222] mb-8"></div>

        {/* Links & Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-2xl text-xs md:text-sm tracking-widest font-mono uppercase">
          
          <div className="mb-4 md:mb-0">
            © 2026 ABHISHEK SINGH
          </div>

          <div className="flex space-x-8">
            <a href="https://github.com/iwasaxbi" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300 cursor-none">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/abhishek-singh-76a86435a/" target="_blank" rel="noreferrer" className="hover:text-white transition-colors duration-300 cursor-none">
              LinkedIn
            </a>
            <a href="mailto:ilostaxbi@gmail.com" className="hover:text-white transition-colors duration-300 cursor-none">
              Contact
            </a>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
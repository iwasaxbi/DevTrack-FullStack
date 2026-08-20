import React, { useState, useEffect } from 'react';

const FloatingDock = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* 1. Custom Animation: Ye code sirf dock ke shimmer ko chalayega */}
      <style>
        {`
          @keyframes shimmer-slide {
            0% { transform: translateX(-150%) skewX(-15deg); }
            20% { transform: translateX(250%) skewX(-15deg); }
            100% { transform: translateX(250%) skewX(-15deg); }
          }
          .animate-shimmer {
            animation: shimmer-slide 6s ease-in-out infinite;
          }
        `}
      </style>

      {/* Entry Animation Container */}
      <div 
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9000] transition-all duration-1000 ease-out ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24'
        }`}
      >
        
        {/* 2. Glassmorphism Dock (Darker, Cleaner Base) */}
        <div className="relative flex items-center px-8 py-4 bg-[#0a0a0a]/70 backdrop-blur-xl border border-[#222222] rounded-full shadow-[0_20px_40px_rgba(0,0,0,0.8)] overflow-hidden">
          
          {/* 3. THE SHIMMER LAYER (Har 6 second mein light reflect hogi) */}
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none animate-shimmer"></div>
          
          {/* 4. Icons Container */}
          <div className="relative z-10 flex space-x-8">
            
            {/* Abhishek's GitHub */}
            <a href="https://github.com/iwasaxbi" target="_blank" rel="noreferrer" className="text-[#A3A3A3] hover:text-white transition-all duration-500 hover:-translate-y-1.5 cursor-none">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>

            {/* Abhishek's LinkedIn */}
            <a href="https://www.linkedin.com/in/abhishek-singh-76a86435a/" target="_blank" rel="noreferrer" className="text-[#A3A3A3] hover:text-white transition-all duration-500 hover:-translate-y-1.5 cursor-none">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>

            {/* Abhishek's Email */}
            <a href="mailto:ilostaxbi@gmail.com" className="text-[#A3A3A3] hover:text-white transition-all duration-500 hover:-translate-y-1.5 cursor-none">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/></svg>
            </a>

          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingDock;
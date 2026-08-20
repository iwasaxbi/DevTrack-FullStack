import React, { useState, useEffect } from 'react';

const Hero = () => {
  const [time, setTime] = useState('');

  // Live Timer Logic: Har 1000ms (1 second) mein time update hoga
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Time ko 24-hour format mein aur IST timezone mein set kiya
      const formatted = now.toLocaleTimeString('en-IN', {
        hour12: false,
        timeZone: 'Asia/Kolkata',
      });
      setTime(`${formatted} IST`);
    };

    updateTime(); // Load hote hi pehli baar time set karega
    const interval = setInterval(updateTime, 1000); // Phir har second update karega
    
    return () => clearInterval(interval);
  }, []);

  return (
    // Hero container - Center aligned
    <div className="w-full bg-black min-h-[60vh] flex flex-col items-center justify-center px-6 pt-20 pb-10">
      
      {/* 1. THE LIVE STATUS BADGE (Minimalist Pill) */}
      <div className="flex items-center space-x-3 mb-8 border border-[#222222] bg-[#0a0a0a]/50 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg">
        
        {/* Blinking Green Dot (Tailwind 'ping' animation) */}
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
        </span>
        
        {/* Live Text with Monospace font so numbers don't jitter */}
        <p className="text-[10px] tracking-[0.2em] text-[#A3A3A3] uppercase font-mono">
          System Online • Based In India • {time}
        </p>
      </div>

      {/* 2. Main Heading (Unchanged, exactly like your screenshot) */}
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tighter text-center uppercase max-w-5xl leading-tight">
        Manage your projects <span className="inline-block translate-y-2">💻</span> Track your skills
      </h1>
      
    </div>
  );
};

export default Hero;
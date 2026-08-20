import React, { useState, useEffect } from 'react';

const Preloader = ({ onLoaded }) => {
  const [progress, setProgress] = useState(0);
  const [isHiding, setIsHiding] = useState(false);

  // 1. Percentage Counter Logic (0 se 100 tak jayega)
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        // Random speed se badhega taaki real loading jaisa feel ho
        return prev + Math.floor(Math.random() * 15) + 5; 
      });
    }, 70);

    return () => clearInterval(interval);
  }, []);

  // 2. Hide Logic (Jab 100% ho jaye)
  useEffect(() => {
    if (progress >= 100) {
      // 100% hone ke baad thoda rukega (300ms) phir parda upar uthega
      setTimeout(() => {
        setIsHiding(true);
        onLoaded(); // App.jsx ko batayega ki "Bhai tu ab neeche se upar aana shuru kar!"
      }, 300);
    }
  }, [progress, onLoaded]);

  return (
    // Parda (Curtain): z-[9999] taaki sabse upar rahe, slide-up animation ke sath
    <div 
      className={`fixed inset-0 z-[9999] bg-[#070707] flex items-center justify-center transition-transform duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        isHiding ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      
      {/* Loading Text (Name --- Line --- Percentage) */}
      <div className="flex items-center space-x-6 text-[#A3A3A3] font-mono text-sm md:text-base tracking-widest uppercase">
        <span className="text-white font-bold">DevTrack</span>
        <div className="w-12 md:w-24 h-px bg-[#333333]"></div>
        <span className="w-12 text-right">{Math.min(progress, 100)}%</span>
      </div>

    </div>
  );
};

export default Preloader;
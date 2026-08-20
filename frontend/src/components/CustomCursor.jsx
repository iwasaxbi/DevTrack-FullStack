import React, { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  // NAYA STATE: Cursor ko dikhana hai ya chhupana hai
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true); // Agar mouse move hua, toh cursor show karo
    };

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.closest('button') ||
        e.target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    // NAYA LOGIC: Window ke bahar jane par gayab, andar aane par wapas show
    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible]);

  return (
    <>
      {/* Outer Circle */}
      <div
        className={`fixed top-0 left-0 w-8 h-8 border border-white rounded-full pointer-events-none z-[9999] transition-all duration-300 ease-out mix-blend-difference 
          ${isVisible ? 'opacity-100' : 'opacity-0'} 
          ${isHovering && isVisible ? 'scale-[2.5] bg-white' : 'scale-100'}
        `}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
        }}
      ></div>

      {/* Inner Dot */}
      <div
        className={`fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[10000] transition-opacity duration-200 mix-blend-difference 
          ${isVisible && !isHovering ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          transform: `translate3d(${mousePos.x}px, ${mousePos.y}px, 0) translate(-50%, -50%)`,
        }}
      ></div>
    </>
  );
};

export default CustomCursor;
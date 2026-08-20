import React from 'react';

// Tech Item Component (Logo + Text)
const TechItem = ({ icon, name }) => (
  <div className="flex items-center space-x-3 mx-10 text-[#333333] hover:text-[#E5E5E5] transition-colors duration-500 cursor-none group">
    <div className="transition-transform duration-500 group-hover:scale-110">
      {icon}
    </div>
    <span className="text-lg md:text-xl font-bold tracking-[0.2em] uppercase font-mono">
      {name}
    </span>
  </div>
);

const Marquee = () => {
  // Ultra-minimalist SVG Icons
  const techStack = [
    {
      name: "React",
      icon: (
        <svg className="w-8 h-8 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24">
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(90 12 12)" />
          <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(150 12 12)" />
          <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
        </svg>
      )
    },
    {
      name: "Tailwind",
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 5.5c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 2-1.6 3.1-1.3.7.2 1.2.7 1.7 1.3.9 1.1 2 2.4 4.2 2.4 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-2 1.6-3.1 1.3-.7-.2-1.2-.7-1.7-1.3-.9-1.1-2-2.4-4.2-2.4zm-7.5 6c-2.4 0-3.9 1.2-4.5 3.6.9-1.2 2-1.6 3.1-1.3.7.2 1.2.7 1.7 1.3.9 1.1 2 2.4 4.2 2.4 2.4 0 3.9-1.2 4.5-3.6-.9 1.2-2 1.6-3.1 1.3-.7-.2-1.2-.7-1.7-1.3-.9-1.1-2-2.4-4.2-2.4z" />
        </svg>
      )
    },
    {
      name: "Node.js",
      icon: (
        <svg className="w-8 h-8 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
           <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
        </svg>
      )
    },
    {
      name: "Git",
      icon: (
        <svg className="w-8 h-8 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="6" cy="18" r="3"/>
          <circle cx="6" cy="6" r="3"/>
          <circle cx="18" cy="18" r="3"/>
          <path d="M6 9v6M18 15l-3-3M6 9l6 6h3"/>
        </svg>
      )
    },
    {
      name: "Python",
      icon: (
        <svg className="w-8 h-8 fill-none stroke-current stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2C8.686 2 6 4.686 6 8v1h12V8c0-3.314-2.686-6-6-6z" />
          <path d="M12 22c3.314 0 6-2.686 6-6v-1H6v1c0 3.314 2.686 6 6 6z" />
          <circle cx="9" cy="5" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="19" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    }
  ];

  return (
    // Razor-thin borders (border-y border-[#1a1a1a])
    <div className="relative w-full bg-black py-8 border-y border-[#1a1a1a] overflow-hidden select-none">
      
      {/* CSS Animation */}
      <style>
        {`
          @keyframes scroll-tech {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll-tech {
            display: flex;
            width: max-content;
            animation: scroll-tech 30s linear infinite;
          }
          .animate-scroll-tech:hover {
            animation-play-state: paused;
          }
        `}
      </style>

      {/* Left Shadow Fade (Darkness) */}
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
      
      {/* Right Shadow Fade (Darkness) */}
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

      {/* Scrolling Track */}
      <div className="animate-scroll-tech">
        {/* Set 1 */}
        <div className="flex items-center">
          {techStack.map((tech, idx) => (
            <TechItem key={`set1-${idx}`} icon={tech.icon} name={tech.name} />
          ))}
        </div>
        {/* Set 2 (For seamless loop) */}
        <div className="flex items-center">
          {techStack.map((tech, idx) => (
            <TechItem key={`set2-${idx}`} icon={tech.icon} name={tech.name} />
          ))}
        </div>
        {/* Set 3 (Buffer for large screens) */}
        <div className="flex items-center">
          {techStack.map((tech, idx) => (
            <TechItem key={`set3-${idx}`} icon={tech.icon} name={tech.name} />
          ))}
        </div>
      </div>

    </div>
  );
};
export default Marquee;
import React from 'react';

const Projects = () => {
  return (
    <div className="min-h-screen bg-black pt-40 px-6 flex flex-col items-center select-none">
      
      {/* Title */}
      <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">
        All Projects
      </h1>
      
      {/* Divider */}
      <div className="w-24 h-px bg-[#333333] mb-8"></div>
      
      {/* Skeleton Text */}
      <p className="text-[#777777] font-mono tracking-widest uppercase text-sm animate-pulse">
        Fetching data from database...
      </p>
      
    </div>
  );
};

export default Projects;
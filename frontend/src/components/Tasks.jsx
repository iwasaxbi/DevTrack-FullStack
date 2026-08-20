import React from 'react';

const Tasks = () => {
  return (
    <div className="min-h-screen bg-black pt-40 px-6 flex flex-col items-center select-none">
      <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">
        All Tasks
      </h1>
      <div className="w-24 h-px bg-[#333333] mb-8"></div>
      <p className="text-[#777777] font-mono tracking-widest uppercase text-sm animate-pulse">
        Fetching tasks from database...
      </p>
    </div>
  );
};

export default Tasks;
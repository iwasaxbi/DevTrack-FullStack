import React from 'react';

const Commits = () => {
  return (
    <div className="min-h-screen bg-black pt-40 px-6 flex flex-col items-center select-none">
      <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-tighter mb-6">
        Recent Commits
      </h1>
      <div className="w-24 h-px bg-[#333333] mb-8"></div>
      <p className="text-[#777777] font-mono tracking-widest uppercase text-sm animate-pulse">
        Fetching live data from GitHub API...
      </p>
    </div>
  );
};

export default Commits;
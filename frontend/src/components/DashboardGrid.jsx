import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Tilt from 'react-parallax-tilt';
import axios from 'axios';

const DashboardGrid = () => {
  const navigate = useNavigate();
  
  // 🚀 1. State for real data (Default 00)
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    commits: 0
  });

  // 🚀 2. Fetch real data from our new Backend API
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('devtrack_token');
        if (!token) return;

        const response = await axios.get('http://localhost:5000/api/dashboard/stats', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (response.data.success) {
          setStats(response.data.data);
        }
      } catch (error) {
        console.error("Failed to fetch dashboard stats:", error);
      }
    };

    fetchStats();
  }, []);

  // Helper function to keep numbers double-digit (e.g., 5 becomes "05") for that premium look
  const formatNumber = (num) => num.toString().padStart(2, '0');

  const cards = [
    { 
      title: "Projects", 
      status: "Active Right Now", 
      path: "/projects",
      metric: formatNumber(stats.projects), // 🚀 Real Data Linked
      spanClass: "md:col-span-2 md:row-span-2",
      description: "Manage your ongoing development projects, track milestones, and ship faster to production.",
      tiltDegree: 4
    },
    { 
      title: "Tasks", 
      status: "Needs Attention", 
      path: "/tasks",
      metric: formatNumber(stats.tasks), // 🚀 Real Data Linked
      spanClass: "md:col-span-1 md:row-span-1",
      description: "Pending bug fixes and feature requests.",
      tiltDegree: 15
    },
    { 
      title: "Commits", 
      status: "Pushed This Week", 
      path: "/commits",
      metric: formatNumber(stats.commits), // 🚀 Real Data Linked
      spanClass: "md:col-span-1 md:row-span-1",
      description: "Recent code integration and deployments.",
      tiltDegree: 15
    },
  ];

  return (
    <div className="w-full h-full flex flex-col justify-center items-center select-none pt-10 pb-12">
      <div className="max-w-7xl mx-auto w-full">
        
        {/* WORKSPACE HEADER */}
        <div className="mb-10 animate-[fadeIn_0.5s_ease-out]">
          <h1 className="text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-3">
            Workspace
          </h1>
          <div className="flex items-center space-x-4">
            <div className="h-px w-12 bg-[#333333]"></div>
            <p className="text-[10px] uppercase tracking-[0.3em] text-[#777777] font-mono">
              Overview & Analytics
            </p>
          </div>
        </div>

        {/* 3D PREMIUM BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[300px] gap-6">
          {cards.map((card, index) => (
            <Tilt
              key={index}
              tiltMaxAngleX={card.tiltDegree} 
              tiltMaxAngleY={card.tiltDegree} 
              glareEnable={true} 
              glareMaxOpacity={0.03} 
              transitionSpeed={1500} 
              className={`${card.spanClass} h-full w-full rounded-none`}
            >
              <div 
                onClick={() => navigate(card.path)}
                className={`group relative border border-[#222222] bg-[#0a0a0a] p-8 flex flex-col justify-between overflow-hidden cursor-none transition-colors duration-500 hover:border-[#555555] hover:bg-[#111111] h-full w-full`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#ffffff03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-0"></div>

                <div className="absolute -bottom-4 -left-2 z-0 pointer-events-none select-none">
                  <span className="text-[120px] md:text-[140px] leading-none font-bold text-[#111111] group-hover:text-[#181818] transition-colors tracking-tighter">
                    {card.metric}
                  </span>
                </div>

                <div className="relative z-10 pointer-events-none">
                  <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#555555] mb-2 group-hover:text-[#888888] transition-colors">
                    {card.status}
                  </p>
                  <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-[#555555] text-sm mt-4 max-w-[80%] leading-relaxed group-hover:text-[#999999] transition-colors">
                    {card.description}
                  </p>
                </div>
                
                <div className="relative z-10 flex-1 flex items-end justify-end mt-4 pointer-events-none">
                  <div className="w-14 h-14 rounded-full border border-[#333333] flex items-center justify-center group-hover:border-white transition-all duration-500 transform group-hover:translate-x-2 group-hover:-translate-y-2 group-hover:bg-white group-hover:text-black text-white">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>

              </div>
            </Tilt>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardGrid;
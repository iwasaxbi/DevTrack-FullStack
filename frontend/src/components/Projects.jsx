import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Naya project add karne ke liye state
  const [newProject, setNewProject] = useState({ title: '', description: '', status: 'Active' });
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 🚀 1. Fetch Projects from Backend
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setProjects(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setLoading(false);
    }
  };

  // 🚀 2. Create New Project
  const handleCreateProject = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.post('http://localhost:5000/api/projects', newProject, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        // Naya project list mein add karo aur form band karo
        setProjects([response.data.data, ...projects]);
        setNewProject({ title: '', description: '', status: 'Active' });
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-16 font-sans selection:bg-white selection:text-black">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 animate-[fadeIn_0.5s_ease-out]">
          <div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-[#555555] hover:text-white mb-4 flex items-center gap-2 transition-colors text-sm font-mono uppercase tracking-widest"
            >
              ← Back to Workspace
            </button>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Projects</h1>
            <p className="text-[#777777] mt-2 font-mono text-sm tracking-widest uppercase">Manage your development universe</p>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="border border-[#333333] hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 uppercase tracking-widest font-mono text-sm"
          >
            {isFormOpen ? 'Close Form ✕' : 'Initialize New +'}
          </button>
        </div>

        {/* CREATE PROJECT FORM (Expandable) */}
        {isFormOpen && (
          <div className="mb-16 border border-[#222222] bg-[#0a0a0a] p-8 animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Deploy New Project</h2>
            <form onSubmit={handleCreateProject} className="flex flex-col gap-6">
              <div>
                <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Project Title</label>
                <input 
                  type="text" 
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                  className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 text-xl outline-none transition-colors"
                  placeholder="e.g. Apollo Engine"
                />
              </div>
              <div>
                <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Description</label>
                <input 
                  type="text" 
                  value={newProject.description}
                  onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                  className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 outline-none transition-colors"
                  placeholder="What is this project about?"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                  Save to Database
                </button>
              </div>
            </form>
          </div>
        )}

        {/* PROJECTS GRID */}
        {loading ? (
          <div className="text-[#555555] font-mono animate-pulse">Loading database arrays...</div>
        ) : projects.length === 0 ? (
          <div className="border border-dashed border-[#222222] p-16 text-center text-[#555555] font-mono uppercase tracking-widest">
            No active projects found. Initialize one above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <div 
                key={index} 
                className="group relative border border-[#222222] bg-[#0a0a0a] p-8 flex flex-col justify-between hover:border-[#555555] transition-colors duration-500 h-[250px]"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00ff00]">
                      ● {project.status}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-white text-gray-200 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[#555555] text-sm line-clamp-3">
                    {project.description || "No description provided."}
                  </p>
                </div>
                
                <div className="text-[10px] font-mono text-[#444444] uppercase tracking-widest">
                  ID: {project._id.slice(-6)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projects;
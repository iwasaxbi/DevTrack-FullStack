import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Commits = () => {
  const navigate = useNavigate();
  const [commits, setCommits] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [newCommit, setNewCommit] = useState({ 
    message: '', 
    branch: 'main', 
    repository: 'Core Engine' 
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 🚀 Fetch Commits from Backend
  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.get('http://localhost:5000/api/commits', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setCommits(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching commits:", error);
      setLoading(false);
    }
  };

  // 🚀 Create New Commit
  const handleCreateCommit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.post('http://localhost:5000/api/commits', newCommit, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setCommits([response.data.data, ...commits]);
        setNewCommit({ message: '', branch: 'main', repository: 'Core Engine' });
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error creating commit:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white p-8 md:p-16 font-sans selection:bg-white selection:text-black">
      <div className="max-w-4xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6 animate-[fadeIn_0.5s_ease-out]">
          <div>
            <button 
              onClick={() => navigate('/dashboard')}
              className="text-[#555555] hover:text-white mb-4 flex items-center gap-2 transition-colors text-sm font-mono uppercase tracking-widest"
            >
              ← Back to Workspace
            </button>
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Commits</h1>
            <p className="text-[#777777] mt-2 font-mono text-sm tracking-widest uppercase">Version history and deployments</p>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="border border-[#333333] hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 uppercase tracking-widest font-mono text-sm"
          >
            {isFormOpen ? 'Cancel ✕' : 'Push Code +'}
          </button>
        </div>

        {/* CREATE COMMIT FORM */}
        {isFormOpen && (
          <div className="mb-16 border border-[#222222] bg-[#0a0a0a] p-8 animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Execute Push</h2>
            <form onSubmit={handleCreateCommit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Commit Message</label>
                  <input 
                    type="text" 
                    required
                    value={newCommit.message}
                    onChange={(e) => setNewCommit({...newCommit, message: e.target.value})}
                    className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 text-xl outline-none transition-colors font-mono"
                    placeholder="e.g. fix: resolved navbar routing bug"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Branch</label>
                  <input 
                    type="text" 
                    value={newCommit.branch}
                    onChange={(e) => setNewCommit({...newCommit, branch: e.target.value})}
                    className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 outline-none transition-colors font-mono text-sm"
                    placeholder="main"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Repository</label>
                  <input 
                    type="text" 
                    value={newCommit.repository}
                    onChange={(e) => setNewCommit({...newCommit, repository: e.target.value})}
                    className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 outline-none transition-colors font-mono text-sm"
                    placeholder="Core Engine"
                  />
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors flex items-center gap-2">
                  <span>Commit</span> 
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* COMMITS TIMELINE */}
        {loading ? (
          <div className="text-[#555555] font-mono animate-pulse">Fetching repository history...</div>
        ) : commits.length === 0 ? (
          <div className="border border-dashed border-[#222222] p-16 text-center text-[#555555] font-mono uppercase tracking-widest">
            No commits found. Push some code above.
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {commits.map((commit, index) => (
              <div 
                key={index} 
                className="group relative border border-[#222222] bg-[#0a0a0a] p-6 hover:border-[#555555] transition-colors duration-500 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#00ff00] text-xs font-mono bg-[#00ff0011] px-2 py-0.5 rounded-sm">
                      {commit.branch}
                    </span>
                    <span className="text-[#555555] text-xs font-mono uppercase tracking-widest">
                      {commit.repository}
                    </span>
                  </div>
                  <h3 className="text-lg font-mono text-gray-200 group-hover:text-white transition-colors">
                    {commit.message}
                  </h3>
                </div>
                
                <div className="flex flex-col md:items-end text-left md:text-right border-t md:border-t-0 md:border-l border-[#222222] pt-4 md:pt-0 md:pl-6">
                  <span className="text-[#888888] font-mono text-sm">
                    {commit._id.slice(-7)} {/* Looks like a Git Hash! */}
                  </span>
                  <span className="text-[#444444] text-[10px] font-mono uppercase tracking-widest mt-1">
                    {new Date(commit.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commits;
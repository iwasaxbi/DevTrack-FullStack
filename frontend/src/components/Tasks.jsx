import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Tasks = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Naya task add karne ke liye state
  const [newTask, setNewTask] = useState({ 
    title: '', 
    description: '', 
    status: 'To Do',
    priority: 'Medium' 
  });
  const [isFormOpen, setIsFormOpen] = useState(false);

  // 🚀 1. Fetch Tasks from Backend
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.get('http://localhost:5000/api/tasks', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.data.success) {
        setTasks(response.data.data);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setLoading(false);
    }
  };

  // 🚀 2. Create New Task
  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('devtrack_token');
      const response = await axios.post('http://localhost:5000/api/tasks', newTask, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.data.success) {
        setTasks([response.data.data, ...tasks]);
        setNewTask({ title: '', description: '', status: 'To Do', priority: 'Medium' });
        setIsFormOpen(false);
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  // UI Helpers
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-[#ff0000]';
      case 'Medium': return 'text-[#ffff00]';
      case 'Low': return 'text-[#00ff00]';
      default: return 'text-[#777777]';
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
            <h1 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter">Tasks</h1>
            <p className="text-[#777777] mt-2 font-mono text-sm tracking-widest uppercase">Track bugs, features, and deployments</p>
          </div>
          
          <button 
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="border border-[#333333] hover:border-white hover:bg-white hover:text-black transition-all duration-300 px-6 py-3 uppercase tracking-widest font-mono text-sm"
          >
            {isFormOpen ? 'Close Terminal ✕' : 'New Task +'}
          </button>
        </div>

        {/* CREATE TASK FORM */}
        {isFormOpen && (
          <div className="mb-16 border border-[#222222] bg-[#0a0a0a] p-8 animate-[fadeIn_0.3s_ease-out]">
            <h2 className="text-2xl font-bold mb-6 uppercase tracking-tight">Deploy New Task</h2>
            <form onSubmit={handleCreateTask} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Task Title</label>
                  <input 
                    type="text" 
                    required
                    value={newTask.title}
                    onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                    className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 text-xl outline-none transition-colors"
                    placeholder="e.g. Fix navbar routing bug"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Description</label>
                  <input 
                    type="text" 
                    value={newTask.description}
                    onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                    className="w-full bg-transparent border-b border-[#333333] focus:border-white py-2 outline-none transition-colors"
                    placeholder="What needs to be done?"
                  />
                </div>

                <div>
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Priority</label>
                  <select 
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                    className="w-full bg-[#111111] border border-[#333333] text-white p-3 outline-none focus:border-white transition-colors uppercase tracking-widest text-xs font-mono"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#555555] text-xs font-mono uppercase tracking-widest mb-2">Status</label>
                  <select 
                    value={newTask.status}
                    onChange={(e) => setNewTask({...newTask, status: e.target.value})}
                    className="w-full bg-[#111111] border border-[#333333] text-white p-3 outline-none focus:border-white transition-colors uppercase tracking-widest text-xs font-mono"
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-white text-black px-8 py-3 font-bold uppercase tracking-widest text-sm hover:bg-gray-200 transition-colors">
                  Push to Board
                </button>
              </div>
            </form>
          </div>
        )}

        {/* TASKS GRID */}
        {loading ? (
          <div className="text-[#555555] font-mono animate-pulse">Scanning task registry...</div>
        ) : tasks.length === 0 ? (
          <div className="border border-dashed border-[#222222] p-16 text-center text-[#555555] font-mono uppercase tracking-widest">
            Task queue is empty. Initialize one above.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tasks.map((task, index) => (
              <div 
                key={index} 
                className="group relative border border-[#222222] bg-[#0a0a0a] p-8 flex flex-col justify-between hover:border-[#555555] transition-colors duration-500 min-h-[250px]"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] px-2 py-1 border border-[#333333] ${task.status === 'Done' ? 'text-[#00ff00]' : 'text-white'}`}>
                      {task.status}
                    </span>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.2em] ${getPriorityColor(task.priority)} flex items-center gap-1`}>
                      ● {task.priority}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold uppercase tracking-tight mb-2 group-hover:text-white text-gray-200 transition-colors">
                    {task.title}
                  </h3>
                  <p className="text-[#555555] text-sm line-clamp-3">
                    {task.description || "No description provided."}
                  </p>
                </div>
                
                <div className="mt-8 pt-4 border-t border-[#222222] flex justify-between items-center text-[10px] font-mono text-[#444444] uppercase tracking-widest">
                  <span>ID: {task._id.slice(-6)}</span>
                  <span>{new Date(task.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tasks;
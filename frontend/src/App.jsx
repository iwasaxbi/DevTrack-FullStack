import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom'; // 🚀 'Navigate' import kiya redirect ke liye
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Marquee from './components/Marquee';
import DashboardGrid from './components/DashboardGrid';
import Footer from './components/Footer';
import Login from './components/Login';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Commits from './components/Commits';
import CustomCursor from './components/CustomCursor';
import FloatingDock from './components/FloatingDock';

// ==========================================
// 🚀 PROTECTED ROUTE WRAPPER (Security)
// ==========================================
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('devtrack_token');
  
  // Agar browser mein token nahi hai, toh user ko wapas Login par bhej do
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  
  // Agar token hai, toh jo component manga hai wo dikha do
  return children;
};

function App() {
  const [isSiteReady, setIsSiteReady] = useState(false);

  return (
    <div className="min-h-screen bg-black text-[#A3A3A3] font-sans selection:bg-white selection:text-black cursor-none relative overflow-x-hidden">
      
      <CustomCursor />
      <Preloader onLoaded={() => setIsSiteReady(true)} />

      {/* Navbar ab animated div ke BAHAR hai taaki 'fixed' position perfectly kaam kare */}
      <Navbar />

      <div 
        className={`transition-all duration-[1200ms] ease-[cubic-bezier(0.76,0,0.24,1)] flex flex-col min-h-screen ${
          isSiteReady ? 'translate-y-0 opacity-100' : 'translate-y-[10vh] opacity-0'
        }`}
      >
        <div className="flex-grow">
          <Routes>
            <Route 
              path="/" 
              element={
                <>
                  <Hero />
                  <Marquee />
                  <DashboardGrid />
                  <Footer />
                </>
              } 
            />
            
            <Route 
              path="/login" 
              element={
                <div className="flex items-center justify-center min-h-screen pt-32 pb-20 px-4">
                  <Login />
                </div>
              } 
            />

            {/* ========================================== */}
            {/* 🚀 NEW: SECURE DASHBOARD ROUTE */}
            {/* ========================================== */}
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <div className="pt-32 pb-20 px-4 min-h-screen">
                    <DashboardGrid />
                  </div>
                </ProtectedRoute>
              } 
            />
            
            {/* Note: Inko bhi future mein ProtectedRoute se wrap kar sakte ho */}
            <Route path="/projects" element={<Projects />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/commits" element={<Commits />} />
          </Routes>
        </div>
      </div>

      <FloatingDock />
      
    </div>
  );
}

export default App;
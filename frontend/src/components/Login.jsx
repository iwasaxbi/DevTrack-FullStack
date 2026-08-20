import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useGoogleLogin } from '@react-oauth/google'; 
import { useNavigate } from 'react-router-dom'; // 🚀 1. REDIRECT HOOK IMPORT KIYA

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate(); // 🚀 2. NAVIGATE KO INITIALIZE KIYA

  // ==========================================
  // GOOGLE LOGIN HANDLER 
  // ==========================================
  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsLoading(true);
      try {
        const response = await axios.post('http://localhost:5000/api/auth/google', {
          accessToken: tokenResponse.access_token,
        });

        toast.success(response.data.message, {
          position: "bottom-right",
          theme: "dark",
        });

        if (response.data.token) {
          localStorage.setItem('devtrack_token', response.data.token);
          
          // 🚀 3. PREMIUM REDIRECT WITH 1 SECOND DELAY
          setTimeout(() => {
            navigate('/dashboard');
          }, 1000); 
        }
      } catch (error) {
        const errorMsg = error.response?.data?.message || "Google Authentication Failed on Server!";
        toast.error(errorMsg, {
          position: "bottom-right",
          theme: "dark",
        });
      } finally {
        setIsLoading(false);
      }
    },
    onError: (error) => {
      console.log("Google Login Failed", error);
      toast.error("Google Login Pop-up Closed or Failed", { position: "bottom-right", theme: "dark" });
    }
  });

  // ==========================================
  // NORMAL EMAIL/PASSWORD HANDLER
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const endpoint = isLogin ? '/api/auth/login' : '/api/auth/signup';
      const payload = isLogin ? { email, password } : { name, email, password };
      
      const response = await axios.post(`http://localhost:5000${endpoint}`, payload);

      toast.success(response.data.message, {
        position: "bottom-right",
        theme: "dark",
      });

      if (response.data.token) {
        localStorage.setItem('devtrack_token', response.data.token);
        
        // 🚀 4. PREMIUM REDIRECT WITH 1 SECOND DELAY
        setTimeout(() => {
          navigate('/dashboard');
        }, 1000);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Something went wrong!";
      toast.error(errorMsg, {
        position: "bottom-right",
        theme: "dark",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setName('');
    setPassword('');
  };

  return (
    <div className="w-full max-w-md mx-auto select-none">
      <ToastContainer />

      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-tighter text-white mb-1.5">
          {isLogin ? 'Welcome Back' : 'Join DevTrack'}
        </h1>
        <p className="text-[#777777] text-[10px] tracking-[0.2em] font-mono uppercase">
          {isLogin ? 'Authenticate to continue' : 'Create a new account'}
        </p>
      </div>

      <button 
        type="button" 
        onClick={() => handleGoogleLogin()}
        disabled={isLoading}
        className="w-full py-3 px-6 border border-[#222222] hover:border-[#555555] flex items-center justify-center space-x-3 transition-all duration-300 group cursor-none mb-4 disabled:opacity-50"
      >
        <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white group-hover:scale-110 transition-transform">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-[10px] font-mono tracking-[0.1em] text-[#A3A3A3] group-hover:text-white transition-colors">
          {isLoading ? 'PROCESSING...' : 'CONTINUE WITH GOOGLE'}
        </span>
      </button>

      <div className="flex items-center justify-center space-x-4 mb-4">
        <div className="h-px w-full bg-[#222222]"></div>
        <span className="text-[#555555] text-[10px] font-mono tracking-[0.2em] uppercase">OR</span>
        <div className="h-px w-full bg-[#222222]"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {!isLogin && (
          <div className="group animate-[fadeIn_0.3s_ease-in-out]">
            <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#555555] group-hover:text-white transition-colors mb-1">
              Full Name
            </label>
            <input 
              type="text" 
              required={!isLogin}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-transparent border-b border-[#222222] focus:border-white py-1.5 text-white outline-none transition-colors font-sans text-sm cursor-none placeholder-[#333333]"
              placeholder="John Doe"
            />
          </div>
        )}

        <div className="group">
          <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#555555] group-hover:text-white transition-colors mb-1">
            Email Address
          </label>
            <input 
            type="email" 
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-transparent border-b border-[#222222] focus:border-white py-1.5 text-white outline-none transition-colors font-sans text-sm cursor-none placeholder-[#333333]"
            placeholder="hello@awwwards.com"
          />
        </div>

        <div className="group">
          <label className="block text-[10px] font-mono tracking-[0.2em] uppercase text-[#555555] group-hover:text-white transition-colors mb-1">
            Password
          </label>
          <input 
            type="password" 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-transparent border-b border-[#222222] focus:border-white py-1.5 text-white outline-none transition-colors font-sans text-xl tracking-[0.2em] cursor-none placeholder-[#333333]"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-white text-black py-3 text-xs font-bold font-mono tracking-[0.2em] uppercase hover:bg-[#A3A3A3] transition-colors cursor-none disabled:opacity-50 mt-1"
        >
          {isLoading ? 'PROCESSING...' : (isLogin ? 'SIGN IN' : 'CREATE ACCOUNT')}
        </button>
      </form>

      <div className="mt-4 text-center">
        <button 
          onClick={toggleMode}
          type="button"
          className="text-[#555555] hover:text-white text-[10px] font-mono tracking-[0.2em] uppercase transition-colors cursor-none"
        >
          {isLogin ? "DON'T HAVE AN ACCOUNT? SIGN UP" : "ALREADY HAVE AN ACCOUNT? SIGN IN"}
        </button>
      </div>
    </div>
  );
};

export default Login;
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';

// ENTERPRISE RULE: Strict Environment Validation
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

if (!GOOGLE_CLIENT_ID) {
  console.warn("⚠️ SYSTEM ALERT: VITE_GOOGLE_CLIENT_ID is missing in .env file.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* ENTERPRISE RULE: Global Wrapping & Type Safety (Never pass undefined) */}
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID || "missing_client_id"}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
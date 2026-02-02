import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

// Global error handler for catching non-React crashes
window.onerror = function (message, source, lineno, colno, error) {
    const root = document.getElementById('root');
    if (root && !root.innerHTML) {
        root.innerHTML = `
            <div style="background: #010101; color: #ff4d4d; padding: 40px; font-family: sans-serif; min-h: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; text-align: center;">
                <h1 style="font-size: 24px;">Critical Startup Error</h1>
                <p style="color: #888;">${message}</p>
                <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: white; color: black; border: none; border-radius: 8px; cursor: pointer; font-weight: bold;">Retry Connection</button>
            </div>
        `;
    }
    return false;
};
ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

<<<<<<< HEAD
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
=======
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
>>>>>>> origin/main
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import OAuthCallback from './pages/OAuthCallback';
import AdCreation from './pages/AdCreation';
import Settings from './pages/Settings';
import AdHistory from './pages/AdHistory';
import Register from './pages/Register';
import Login from './pages/Login';
<<<<<<< HEAD
import GoogleLogin from './pages/GoogleLogin';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Navbar from './components/Navbar';
import GlobalErrorBanner from './components/GlobalErrorBanner';
import { tokenService } from './services/tokenService';


function App() {
    const [globalError, setGlobalError] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        try {
            const savedUser = localStorage.getItem('tiktok_user');
            if (savedUser && savedUser !== '[object Object]') {
                setUser(JSON.parse(savedUser));
            }

            // Check if token is expired on app load
            if (tokenService.isTokenExpired() && savedUser) {
                setGlobalError({
                    message: 'Your session has expired. Please log in again.',
                    status: 401
                });
                logout();
            }
        } catch (e) {
            console.error("Failed to parse user from localStorage", e);
            localStorage.removeItem('tiktok_user');
        }
    }, []);

    // Listen for 401 errors globally
    useEffect(() => {
        const handle401Error = (event) => {
            if (event.detail && event.detail.status === 401) {
                setGlobalError({
                    message: event.detail.message || 'Session expired. Please reconnect.',
                    status: 401
                });
                logout();
            }
        };

        window.addEventListener('authError', handle401Error);
        return () => window.removeEventListener('authError', handle401Error);
    }, []);


    const clearError = () => setGlobalError(null);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('tiktok_user', JSON.stringify(userData));
        // Set mock tokens
        tokenService.setTokens('mock_token_' + Date.now(), 'mock_refresh_' + Date.now(), 3600);
        setGlobalError(null); // Clear any previous errors
    };

    const logout = () => {
        setUser(null);
        tokenService.clearTokens(); // This also clears tiktok_user
    };

    return (
        <Router>
            <div className="min-h-screen bg-black text-white selection:bg-tiktok-pink/30">
                <Navbar user={user} onLogout={logout} />

                <GlobalErrorBanner error={globalError} onClear={clearError} />

                <main className="container mx-auto px-3 py-6 md:px-6 md:py-10 lg:max-w-7xl">
                    <Routes>
                        <Route path="/" element={<Landing user={user} />} />

                        <Route path="/oauth/callback" element={
                            <OAuthCallback onLogin={login} setError={setGlobalError} />
                        } />


                        <Route path="/register" element={
                            user ? <Navigate to="/ad-history" /> : <Register onLogin={login} />
                        } />

                        <Route path="/login" element={
                            user ? <Navigate to="/ad-history" /> : <Login onLogin={login} />
                        } />

                        <Route path="/google-login" element={
                            user ? <Navigate to="/ad-history" /> : <GoogleLogin onLogin={login} />
                        } />

                        <Route path="/forgot-password" element={
                            user ? <Navigate to="/ad-history" /> : <ForgotPassword />
                        } />

                        <Route path="/create-ad" element={
                            user ? <AdCreation setError={setGlobalError} /> : <Navigate to="/login" />
                        } />

                        <Route path="/settings" element={
                            user ? <Settings setError={setGlobalError} /> : <Navigate to="/login" />
                        } />

                        <Route path="/ad-history" element={
                            user ? <AdHistory /> : <Navigate to="/login" />
                        } />

                        <Route path="/dashboard" element={<Dashboard />} />
=======
import Navbar from './components/Navbar';
import GlobalErrorBanner from './components/GlobalErrorBanner';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [globalError, setGlobalError] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('tiktok_token');
        if (token) setIsAuthenticated(true);
    }, []);

    const clearError = () => setGlobalError(null);

    return (
        <Router>
            <div className="min-h-screen bg-black text-white selection:bg-tiktok-pink/30">
                <Navbar isAuthenticated={isAuthenticated} onLogout={() => {
                    localStorage.removeItem('tiktok_token');
                    setIsAuthenticated(false);
                }} />

                <GlobalErrorBanner error={globalError} onClear={clearError} />

                <main className="container mx-auto px-4 py-8">
                    <Routes>
                        <Route path="/" element={<Landing isAuthenticated={isAuthenticated} />} />

                        <Route path="/oauth/callback" element={
                            <OAuthCallback onLogin={() => setIsAuthenticated(true)} setError={setGlobalError} />
                        } />

                        <Route path="/register" element={
                            isAuthenticated ? <Navigate to="/ad-history" /> : <Register onLogin={() => setIsAuthenticated(true)} />
                        } />

                        <Route path="/login" element={
                            isAuthenticated ? <Navigate to="/ad-history" /> : <Login onLogin={() => setIsAuthenticated(true)} />
                        } />

                        <Route path="/create-ad" element={
                            isAuthenticated ? (
                                <AdCreation setError={setGlobalError} />
                            ) : (
                                <Navigate to="/" />
                            )
                        } />

                        <Route path="/settings" element={
                            isAuthenticated ? (
                                <Settings setError={setGlobalError} />
                            ) : (
                                <Navigate to="/" />
                            )
                        } />

                        <Route path="/ad-history" element={
                            isAuthenticated ? (
                                <AdHistory />
                            ) : (
                                <Navigate to="/" />
                            )
                        } />
>>>>>>> origin/main
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

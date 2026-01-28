import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Landing from './pages/Landing';
import OAuthCallback from './pages/OAuthCallback';
import AdCreation from './pages/AdCreation';
import Settings from './pages/Settings';
import AdHistory from './pages/AdHistory';
import Register from './pages/Register';
import Login from './pages/Login';
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
                    </Routes>
                </main>
            </div>
        </Router>
    );
}

export default App;

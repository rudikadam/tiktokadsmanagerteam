import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Loader2, ArrowRight } from 'lucide-react';
import { authApi } from '../services/authApi';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await authApi.login({ contact, password });
            localStorage.setItem('tiktok_token', 'mock_logged_in_token');
            if (onLogin) onLogin();
            navigate('/create-ad');
        } catch (err) {
            setError(err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-pink/10 blur-[50px] rounded-full pointer-events-none" />

                <h1 className="text-3xl font-extrabold mb-8 text-center">Login</h1>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Email or Phone</label>
                        <input
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                            placeholder="user@example.com"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-500 uppercase ml-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-tiktok-pink hover:bg-tiktok-pink/90 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Login <ArrowRight className="w-5 h-5" /></>}
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account? <Link to="/register" className="text-white font-bold hover:underline">Register</Link>
                    </p>
                </form>
            </motion.div>
        </div>
    );
};

export default Login;

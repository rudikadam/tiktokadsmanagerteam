import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Layout, Mail, Lock, User, ArrowRight, Sparkles } from 'lucide-react';

const Register = ({ onLogin }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Mock register
        setTimeout(() => {
            onLogin({
                id: '1',
                email: formData.email,
                fullName: formData.fullName,
                avatar: null
            });
            setLoading(false);
            navigate('/ad-history');
        }, 1000);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[40px] p-10 shadow-2xl relative overflow-hidden"
            >
                {/* Decorative background elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-tiktok-cyan/10 blur-[60px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-tiktok-pink/10 blur-[60px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                    <div className="flex flex-col items-center mb-8 text-center">
                        <div className="w-16 h-16 bg-tiktok-cyan rounded-2xl flex items-center justify-center mb-6 shadow-xl shadow-tiktok-cyan/20">
                            <Sparkles className="text-black w-8 h-8" />
                        </div>
                        <h1 className="text-4xl font-black italic tracking-tighter text-white mb-2 uppercase">Create <span className="text-tiktok-pink">Profile</span></h1>
                        <p className="text-gray-500 font-medium">Join the elite network of TikTok advertisers.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Full Name</label>
                                <div className="relative">
                                    <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="text"
                                        required
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 transition-all"
                                        placeholder="Alex Mercer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="email"
                                        required
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 transition-all"
                                        placeholder="name@company.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl px-14 py-4 text-white font-bold focus:outline-none focus:border-tiktok-pink/50 transition-all"
                                        placeholder="••••••••"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 px-2">
                            <input type="checkbox" required className="w-4 h-4 bg-white/5 border border-white/10 rounded-md checked:bg-tiktok-pink focus:ring-0 transition-all" />
                            <span className="text-xs font-bold text-gray-500">I agree to the <button type="button" className="text-white hover:underline">Terms of Service</button></span>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-5 bg-white text-black font-black uppercase italic tracking-tighter text-lg rounded-2xl flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-white/5 disabled:opacity-50"
                        >
                            {loading ? (
                                <div className="w-6 h-6 border-4 border-black border-t-transparent rounded-full animate-spin" />
                            ) : (
                                <>
                                    Create Account
                                    <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-sm font-bold text-gray-500">
                            Already have an account? {' '}
                            <Link to="/login" className="text-white hover:text-tiktok-cyan transition-colors">Sign in here</Link>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default Register;

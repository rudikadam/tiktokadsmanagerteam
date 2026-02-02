import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { LogOut, Layout, Settings as SettingsIcon, History, PlusCircle, Zap, User, TrendingUp } from 'lucide-react';

const Navbar = ({ user, onLogout }) => {
    const location = useLocation();
    const [marketingMode, setMarketingMode] = useState(true);
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem('user_preferences');
        if (saved) {
            const prefs = JSON.parse(saved);
            setMarketingMode(prefs.marketingMode ?? true);
        }
    }, [location]);

    const isActive = (path) => location.pathname === path;

    const handleLogoutClick = () => {
        setShowLogoutConfirm(true);
    };

    const confirmLogout = () => {
        setShowLogoutConfirm(false);
        onLogout();
    };

    return (
        <>
            <nav className="border-b border-white/5 bg-black/60 backdrop-blur-2xl sticky top-0 z-50">
                <div className="container mx-auto px-4 h-20 flex items-center justify-between">
                    <Link to="/" className="flex items-center gap-3 no-underline group">
                        <div className="w-10 h-10 bg-tiktok-pink rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-lg shadow-tiktok-pink/20">
                            <Layout className="text-white w-6 h-6" />
                        </div>
                        <div>
                            <span className="text-2xl font-black italic tracking-tighter text-white block leading-none">
                                TikTok<span className="text-tiktok-cyan">Ads</span>
                            </span>
                            {marketingMode && (
                                <div className="flex items-center gap-1 mt-1">
                                    <Zap className="w-2.5 h-2.5 text-tiktok-cyan fill-tiktok-cyan" />
                                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-tiktok-cyan">Marketing Pro</span>
                                </div>
                            )}
                        </div>
                    </Link>

                    <div className="flex items-center gap-8">
                        {user && (
                            <div className="hidden lg:flex items-center gap-2 bg-white/[0.03] p-1.5 rounded-2xl border border-white/5">
                                <Link
                                    to="/create-ad"
                                    className={`flex items-center gap-2 no-underline text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl transition-all ${isActive('/create-ad') ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <PlusCircle className="w-4 h-4" />
                                    NEW CAMPAIGN
                                </Link>
                                <Link
                                    to="/ad-history"
                                    className={`flex items-center gap-2 no-underline text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl transition-all ${isActive('/ad-history') ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <History className="w-4 h-4" />
                                    MONITORING
                                </Link>
                                <Link
                                    to="/benchmarks"
                                    className={`flex items-center gap-2 no-underline text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl transition-all ${isActive('/benchmarks') ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <TrendingUp className="w-4 h-4" />
                                    BENCHMARKS
                                </Link>
                                <Link
                                    to="/settings"
                                    className={`flex items-center gap-2 no-underline text-[10px] font-black tracking-widest px-4 py-2.5 rounded-xl transition-all ${isActive('/settings') ? 'bg-white text-black shadow-xl' : 'text-gray-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <SettingsIcon className="w-4 h-4" />
                                    CONTROL
                                </Link>
                            </div>
                        )}

                        <div className="flex items-center gap-4 pl-8 border-l border-white/10">
                            {user ? (
                                <div className="flex items-center gap-4">
                                    <div className="flex flex-col items-end hidden sm:flex">
                                        <span className="font-black text-white text-[11px] tracking-tighter uppercase italic">{user.fullName}</span>
                                        <span className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">Active Advertiser</span>
                                    </div>
                                    <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-lg transition-transform hover:scale-105 overflow-hidden">
                                        {user.avatar ? <img src={user.avatar} className="w-full h-full object-cover" /> : <User className="w-5 h-5 text-gray-400" />}
                                    </div>
                                    <button
                                        onClick={handleLogoutClick}
                                        className="p-3 bg-white/5 border border-white/10 text-gray-400 hover:bg-red-500 hover:text-white hover:border-red-500 rounded-2xl transition-all active:scale-95 group"
                                        title="Sign Out"
                                    >
                                        <LogOut className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <Link to="/login" className="text-gray-500 hover:text-white font-black uppercase text-[10px] tracking-widest no-underline px-4 transition-all">
                                        Log In
                                    </Link>
                                    <Link to="/register" className="bg-white text-black px-6 py-3 rounded-2xl font-black uppercase text-[10px] tracking-widest no-underline transition-all hover:scale-105 active:scale-95 shadow-xl shadow-white/5">
                                        Register
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <AnimatePresence>
                {showLogoutConfirm && (
                    <div className="relative z-[100]">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
                            onClick={() => setShowLogoutConfirm(false)}
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-sm p-6 bg-[#121212] border border-white/10 rounded-3xl shadow-2xl flex flex-col items-center text-center"
                        >
                            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                                <LogOut className="w-8 h-8 text-red-500" />
                            </div>
                            <h3 className="text-xl font-black text-white mb-2">Sign Out?</h3>
                            <p className="text-gray-400 text-sm mb-8 font-medium">Are you sure you want to log out of your account?</p>

                            <div className="flex gap-3 w-full">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="flex-1 py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 py-3 px-4 rounded-xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm shadow-lg shadow-red-500/20 transition-all hover:scale-105 active:scale-95"
                                >
                                    Log Out
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;

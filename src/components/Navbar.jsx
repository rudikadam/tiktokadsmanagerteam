import { Link } from 'react-router-dom';
import { User, LogOut, Layout, Settings as SettingsIcon, History, AlertTriangle, X, PlusCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ isAuthenticated, onLogout }) => {
    const [userPhoto, setUserPhoto] = useState(null);
    const [userName, setUserName] = useState('');
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    useEffect(() => {
        const checkProfile = () => {
            const saved = localStorage.getItem('user_profile');
            if (saved) {
                const parsed = JSON.parse(saved);
                setUserPhoto(parsed.photoUrl);
                setUserName(parsed.name || parsed.email || 'User');
            }
        };
        checkProfile();
        window.addEventListener('storage', checkProfile);
        return () => window.removeEventListener('storage', checkProfile);
    }, [isAuthenticated]);
    return (
        <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link to={isAuthenticated ? "/ad-history" : "/"} className="flex items-center gap-2 no-underline">
                    <div className="w-8 h-8 bg-tiktok-pink rounded-lg flex items-center justify-center">
                        <Layout className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tighter text-white">
                        TikTok<span className="text-tiktok-cyan">Ads</span>
                    </span>
                </Link>

                {isAuthenticated && (
                    <div className="flex items-center gap-6">
                        <div className="hidden md:flex items-center gap-4 border-r border-white/10 pr-6 mr-2">
                            <Link to="/create-ad" className="text-white hover:text-tiktok-cyan transition-colors flex items-center gap-2 no-underline text-sm font-bold bg-white/10 px-3 py-2 rounded-xl border border-white/5">
                                <PlusCircle className="w-4 h-4" />
                                <span>Create Ad</span>
                            </Link>
                            <Link to="/settings" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 no-underline text-sm">
                                <SettingsIcon className="w-4 h-4" />
                                <span>Settings</span>
                            </Link>
                            <Link to="/ad-history" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 no-underline text-sm">
                                <History className="w-4 h-4" />
                                <span>Ad History</span>
                            </Link>
                        </div>

                        <Link to="/settings" className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors no-underline">
                            {userPhoto ? (
                                <img src={userPhoto} className="w-8 h-8 rounded-full object-cover border border-white/10" alt="Avatar" />
                            ) : (
                                <User className="w-4 h-4" />
                            )}
                            <span className="font-bold text-white">{userName}</span>
                        </Link>

                        <button
                            onClick={() => setShowLogoutConfirm(true)}
                            className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Disconnect</span>
                        </button>
                    </div>
                )}
            </div>

            <AnimatePresence>
                {showLogoutConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowLogoutConfirm(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm bg-[#121212] border border-white/10 rounded-3xl p-6 shadow-2xl relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-4">
                                <button
                                    onClick={() => setShowLogoutConfirm(false)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-2">
                                    <LogOut className="w-8 h-8" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">Disconnect Account?</h3>
                                    <p className="text-gray-400 text-sm">
                                        Are you sure you want to log out? You will need to sign in again to access your dashboard.
                                    </p>
                                </div>

                                <div className="flex gap-3 w-full mt-4">
                                    <button
                                        onClick={() => setShowLogoutConfirm(false)}
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={() => {
                                            onLogout();
                                            setShowLogoutConfirm(false);
                                        }}
                                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav >
    );
};

export default Navbar;

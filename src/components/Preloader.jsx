import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

const Preloader = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setIsVisible(false), 500);
                    return 100;
                }
                return prev + Math.random() * 15;
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center pointer-events-none"
                >
                    {/* Background Gradients */}
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-tiktok-pink/20 blur-[150px] rounded-full animate-pulse" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tiktok-cyan/20 blur-[150px] rounded-full animate-pulse" />

                    <div className="relative flex flex-col items-center">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-24 h-24 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[32px] flex items-center justify-center mb-8 relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-tiktok-pink/20 to-tiktok-cyan/20 animate-spin-slow" />
                            <Sparkles className="w-10 h-10 text-white relative z-10" />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-center"
                        >
                            <h1 className="text-3xl font-black italic tracking-tighter text-white mb-2 uppercase">
                                TikTok <span className="text-tiktok-pink">Ads</span> <span className="text-tiktok-cyan">Pro</span>
                            </h1>
                            <div className="text-[10px] font-black tracking-[0.5em] text-gray-500 uppercase flex items-center justify-center gap-2">
                                <span className="inline-block w-8 h-[1px] bg-gray-800" />
                                Protocol Sync In Progress
                                <span className="inline-block w-8 h-[1px] bg-gray-800" />
                            </div>
                        </motion.div>

                        <div className="mt-12 w-64 h-1 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                className="absolute inset-y-0 left-0 bg-gradient-to-r from-tiktok-pink via-tiktok-cyan to-tiktok-pink"
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeOut" }}
                            />
                        </div>
                        <div className="mt-4 flex items-center gap-2 text-gray-400 font-bold text-[10px] uppercase tracking-widest italic">
                            <Loader2 className="w-3 h-3 animate-spin" />
                            {Math.round(progress)}% Optimized
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Preloader;

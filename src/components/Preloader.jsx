import { motion } from 'framer-motion';
import { Layout } from 'lucide-react';

const Preloader = ({ message = "Initializing Systems" }) => {
    return (
        <div className="fixed inset-0 z-[1000] bg-black flex flex-col items-center justify-center overflow-hidden">
            {/* Background Glows */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-tiktok-pink/20 blur-[120px] rounded-full animate-pulse" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-tiktok-cyan/10 blur-[120px] rounded-full animate-pulse delay-700" />

            {/* Particle Effect Simulation */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                            opacity: 0
                        }}
                        animate={{
                            y: [null, -100],
                            opacity: [0, 1, 0]
                        }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full"
                    />
                ))}
            </div>

            <div className="relative z-10 flex flex-col items-center">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    className="w-24 h-24 bg-tiktok-pink rounded-3xl flex items-center justify-center shadow-2xl shadow-tiktok-pink/20 mb-8 relative"
                >
                    <Layout className="text-white w-12 h-12" />

                    {/* Ring animation */}
                    <motion.div
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.5, opacity: 0 }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        className="absolute inset-0 border-2 border-tiktok-pink rounded-3xl"
                    />
                </motion.div>

                <div className="text-center space-y-4">
                    <motion.h2
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-black italic tracking-tighter text-white uppercase"
                    >
                        TIKTOK <span className="text-tiktok-cyan">ADS MANAGER</span>
                    </motion.h2>

                    <div className="flex flex-col items-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-6"
                        >
                            {message}
                        </motion.p>

                        <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative">
                            <motion.div
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 1.5,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-tiktok-cyan to-transparent w-1/2"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Version Text */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                <p className="text-[8px] font-black uppercase tracking-widest text-gray-700">Protocol v4.0.2 Stable Core</p>
                <div className="flex gap-4">
                    <div className="w-1.5 h-1.5 rounded-full bg-tiktok-pink animate-pulse" />
                    <div className="w-1.5 h-1.5 rounded-full bg-tiktok-cyan animate-pulse delay-75" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/20 animate-pulse delay-150" />
                </div>
            </div>
        </div>
    );
};

export default Preloader;

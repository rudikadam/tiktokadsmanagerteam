import { motion } from 'framer-motion';
import {
    ShieldCheck,
    Zap,
    Globe,
    Sparkles,
    Play,
    TrendingUp,
    Rocket,
    BrainCircuit,
    Palette,
    Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = ({ user }) => {
    const DemoAdCard = ({ title, views, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="flex-shrink-0"
        >
            <Link to="/benchmarks" className="block w-64 aspect-[9/16] rounded-3xl bg-gray-900 border border-white/10 relative overflow-hidden group cursor-pointer no-underline">
                <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="w-6 h-6 text-white fill-white ml-1" />
                    </div>
                </div>
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                    <p className="font-bold text-white uppercase tracking-tighter text-xs">{title}</p>
                    <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1 font-black">
                        <TrendingUp className="w-3 h-3 text-tiktok-pink" />
                        <span>{views} VIEWS</span>
                    </div>
                </div>
            </Link>
        </motion.div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center pb-20">
            {/* Hero Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-4xl px-4 pt-10"
            >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tiktok-pink/10 text-tiktok-pink text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-tiktok-pink/20">
                    <Sparkles className="w-4 h-4" />
                    <span>Next-Gen AI Creative Flow</span>
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500 italic">
                    SCALE <span className="text-tiktok-pink">FAST</span>.
                </h1>

                <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                    The ultimate dashboard for TikTok advertisers. Create compliant ads, match trending sounds, and monitor performance in real-time.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-24">
                    {user ? (
                        <Link
                            to="/ad-history"
                            className="group relative px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-2xl shadow-white/10 no-underline"
                        >
                            <Layout className="w-5 h-5" />
                            Command Center
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="group relative px-12 py-5 bg-tiktok-pink text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-3 shadow-2xl shadow-tiktok-pink/20 no-underline"
                            >
                                <Zap className="w-5 h-5 fill-white" />
                                Start Creating
                            </Link>
                            <Link
                                to="/register"
                                className="px-12 py-5 bg-white/5 hover:bg-white/10 text-white font-black uppercase tracking-widest text-xs rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 border border-white/10 no-underline"
                            >
                                Join Pro
                            </Link>
                        </>
                    )}
                </div>

                {/* Core Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                    {[
                        { icon: ShieldCheck, title: "COMPLIANT", desc: "Real-time AI validation against TikTok ad policies." },
                        { icon: Zap, title: "TRENDING", desc: "Automated music matching with global trending sounds." },
                        { icon: Globe, title: "GLOBAL", desc: "Region-aware campaign management for viral scale." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="p-8 rounded-[32px] bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.05] transition-all group"
                        >
                            <feature.icon className="w-10 h-10 text-tiktok-cyan mb-6 group-hover:scale-110 transition-transform" />
                            <h3 className="text-xs font-black mb-2 tracking-[0.2em] uppercase">{feature.title}</h3>
                            <p className="text-xs text-gray-500 font-bold leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Demo Showcase */}
            <div className="w-full max-w-6xl mx-auto px-4 mb-32 snap-start">
                <div className="flex items-center justify-between mb-12 px-4">
                    <h2 className="text-2xl font-black text-left text-white italic tracking-tighter uppercase">Viral <span className="text-tiktok-pink">Benchmarks</span></h2>
                    <div className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Global Trends 2024</div>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-12 snap-x custom-scrollbar">
                    <DemoAdCard title="Summer Haul" views="2.4M" color="from-pink-500 to-rose-500" delay={0.1} />
                    <DemoAdCard title="Tech Review" views="1.8M" color="from-blue-500 to-cyan-500" delay={0.2} />
                    <DemoAdCard title="Fitness Pro" views="5.1M" color="from-green-500 to-emerald-500" delay={0.3} />
                    <DemoAdCard title="ASMR Cooking" views="3.2M" color="from-orange-500 to-red-500" delay={0.4} />
                    <DemoAdCard title="Vlog Life" views="740k" color="from-purple-500 to-indigo-500" delay={0.5} />
                </div>
            </div>

            {/* Upcoming Features Roadmap */}
            <div className="w-full max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center gap-4 mb-16">
                    <Rocket className="w-8 h-8 text-tiktok-cyan" />
                    <h2 className="text-4xl font-black italic tracking-tighter uppercase">Product Roadmap</h2>
                </div>

                <div className="relative">
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-tiktok-cyan via-tiktok-pink to-transparent opacity-30" />

                    <div className="space-y-20">
                        <div className="relative flex items-center justify-between w-full">
                            <div className="w-[45%] text-right pr-12">
                                <h3 className="text-xl font-black italic text-white uppercase">AI Video Gen</h3>
                                <p className="text-xs text-gray-500 mt-2 font-bold leading-relaxed">Turn scripts into viral video creatives with one click.</p>
                                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-tiktok-pink/10 text-tiktok-pink text-[8px] font-black uppercase tracking-widest">Target Q3</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
                            <div className="w-[45%] pl-12 opacity-20 group">
                                <BrainCircuit className="w-12 h-12 text-gray-500 group-hover:text-tiktok-cyan transition-colors" />
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between w-full flex-row-reverse">
                            <div className="w-[45%] text-left pl-12">
                                <h3 className="text-xl font-black italic text-white uppercase">Retention Lab</h3>
                                <p className="text-xs text-gray-500 mt-2 font-bold leading-relaxed">Advanced A/B testing for hooks and sound patterns.</p>
                                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-[8px] font-black uppercase tracking-widest">Target Q4</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" />
                            <div className="w-[45%] text-right pr-12 opacity-20">
                                <Palette className="w-12 h-12 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;

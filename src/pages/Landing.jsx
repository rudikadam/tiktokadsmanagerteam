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
    Layout,
    LifeBuoy
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing = ({ user }) => {
    const DemoAdCard = ({ title, views, color, delay, score }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            onClick={() => alert(`Analyzing Viral Benchmark: ${title}\nViral Potential: ${score}%\n\nThis trend is currently peaking in your region!`)}
            className="flex-shrink-0 w-64 aspect-[9/16] rounded-3xl bg-gray-900 border border-white/10 relative overflow-hidden group cursor-pointer"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />

            {/* Viral Score Badge */}
            <div className="absolute top-4 right-4 z-20">
                <div className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-yellow-400" />
                    <span className="text-[10px] font-black text-white italic">{score}%</span>
                </div>
            </div>

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
        </motion.div>
    );

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center pb-20">
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
                    <DemoAdCard title="Summer Haul" views="2.4M" color="from-pink-500 to-rose-500" delay={0.1} score={92} />
                    <DemoAdCard title="Tech Review" views="1.8M" color="from-blue-500 to-cyan-500" delay={0.2} score={88} />
                    <DemoAdCard title="Fitness Pro" views="5.1M" color="from-green-500 to-emerald-500" delay={0.3} score={98} />
                    <DemoAdCard title="ASMR Cooking" views="3.2M" color="from-orange-500 to-red-500" delay={0.4} score={95} />
                    <DemoAdCard title="Vlog Life" views="740k" color="from-purple-500 to-indigo-500" delay={0.5} score={84} />
                </div>
            </div>

            {/* Support Protocol Section */}
            <div className="w-full max-w-6xl mx-auto px-4 mb-32">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white/[0.02] border border-white/5 rounded-[48px] p-12 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
                        <LifeBuoy className="w-64 h-64 text-tiktok-cyan" />
                    </div>

                    <div className="text-left space-y-6 relative z-10">
                        <div className="flex items-center gap-3 text-tiktok-cyan">
                            <LifeBuoy className="w-6 h-6" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Engineered Support</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
                            24/7 TECHNICAL <br />
                            <span className="text-tiktok-pink">PROTOCOL.</span>
                        </h2>
                        <p className="text-gray-500 font-medium max-w-md leading-relaxed">
                            Experience zero-latency resolution. Our technical engineers are on standby to resolve API conflicts, billing inquiries, and creative policy audits 24/7.
                        </p>
                        <div className="flex flex-wrap gap-4 pt-4">
                            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Response Time</p>
                                <p className="text-xl font-black italic text-tiktok-cyan tracking-tighter">&lt; 15 MIN</p>
                            </div>
                            <div className="px-5 py-3 rounded-2xl bg-white/5 border border-white/10">
                                <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Resolution Rate</p>
                                <p className="text-xl font-black italic text-white tracking-tighter">99.8%</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center space-y-6 relative z-10">
                        <div className="p-8 rounded-[32px] bg-black/40 border border-white/5 hover:border-tiktok-cyan/30 transition-all cursor-default group/card">
                            <h3 className="text-xs font-black uppercase tracking-widest mb-3 text-white">Knowledge Core</h3>
                            <p className="text-xs text-gray-500 font-medium leading-relaxed mb-6">
                                Access our encrypted library of technical documentation, ad specs, and viral optimization protocols.
                            </p>
                            <Link to="/support" className="text-[10px] font-black text-tiktok-cyan uppercase tracking-widest no-underline group-hover/card:underline flex items-center gap-2">
                                Launch Support Hub
                                <Rocket className="w-3 h-3 group-hover/card:translate-x-1 group-hover/card:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
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

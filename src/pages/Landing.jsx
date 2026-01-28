import { motion } from 'framer-motion';
import { tiktokApi } from '../services/tiktokApi';
import {
    ShieldCheck,
    Zap,
    Globe,
    Sparkles,
    Play,
    TrendingUp,
    Smartphone,
    CheckCircle2,
    XCircle,
    Rocket,
    BrainCircuit,
    Palette,
    Music,
    Target,
    Layout
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import OTPVerification from '../components/OTPVerification';

const Landing = ({ isAuthenticated }) => {
    const [showOTP, setShowOTP] = useState(false);

    const handleConnect = () => {
        setShowOTP(true);
    };

    const onOTPVerified = () => {
        const authUrl = tiktokApi.getAuthUrl();
        window.location.href = authUrl.replace('https://ads.tiktok.com/marketing_api/auth', '/oauth/callback') + '&code=success_code';
    };

    const DemoAdCard = ({ title, views, color, delay }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay }}
            className="flex-shrink-0 w-64 aspect-[9/16] rounded-3xl bg-gray-900 border border-white/10 relative overflow-hidden group cursor-pointer"
        >
            <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-20 group-hover:opacity-30 transition-opacity`} />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white ml-1" />
                </div>
            </div>
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/90 to-transparent">
                <p className="font-bold text-white">{title}</p>
                <div className="flex items-center gap-2 text-xs text-gray-300 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{views} Views</span>
                </div>
            </div>
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tiktok-pink/10 text-tiktok-pink text-sm font-medium mb-6 border border-tiktok-pink/20">
                    <Sparkles className="w-4 h-4" />
                    <span>New Ad Creative Flow</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-gray-500">
                    Scale your creativity on <span className="text-tiktok-pink">TikTok</span>.
                </h1>

                <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
                    Connect your Ads account to start creating high-performing campaigns with smart music matching and real-time policy validation.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
                    {isAuthenticated ? (
                        <Link
                            to="/ad-history"
                            className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3 overflow-hidden text-center justify-center min-w-[200px]"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-cyan opacity-0 group-hover:opacity-10 transition-opacity" />
                            <Layout className="w-5 h-5" />
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="group relative px-8 py-4 bg-white text-black font-bold rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center gap-3 overflow-hidden text-center justify-center min-w-[200px]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-tiktok-pink to-tiktok-cyan opacity-0 group-hover:opacity-10 transition-opacity" />
                                Log In
                            </Link>

                            <Link
                                to="/register"
                                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] border border-white/10 min-w-[200px]"
                            >
                                <ShieldCheck className="w-5 h-5" />
                                Register New Account
                            </Link>
                        </>
                    )}
                </div>

                {/* Core Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
                    {[
                        { icon: ShieldCheck, title: "Policy Compliant", desc: "Real-time validation against TikTok Ad policies." },
                        { icon: Zap, title: "Smart Music", desc: "Automated music selection and rights validation." },
                        { icon: Globe, title: "Regional Checks", desc: "Geo-restriction awareness for global campaigns." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="p-6 rounded-3xl bg-white/[0.03] border border-white/5 text-left hover:bg-white/[0.05] transition-colors"
                        >
                            <feature.icon className="w-8 h-8 text-tiktok-cyan mb-4" />
                            <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                            <p className="text-sm text-gray-500">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Demo Showcase */}
            <div className="w-full max-w-6xl mx-auto px-4 mb-32">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-left">Previous <span className="text-tiktok-pink">High Performing</span> Ads</h2>
                    <div className="text-sm text-gray-500">Based on global trends</div>
                </div>
                <div className="flex gap-6 overflow-x-auto pb-8 snap-x custom-scrollbar">
                    <DemoAdCard title="Summer Fashion Haul" views="2.4M" color="from-pink-500 to-rose-500" delay={0.1} />
                    <DemoAdCard title="Tech Gadget Review" views="1.8M" color="from-blue-500 to-cyan-500" delay={0.2} />
                    <DemoAdCard title="Fitness Challenge" views="5.1M" color="from-green-500 to-emerald-500" delay={0.3} />
                    <DemoAdCard title="Cooking ASMR" views="3.2M" color="from-orange-500 to-red-500" delay={0.4} />
                    <DemoAdCard title="Travel Vlog" views="900K" color="from-purple-500 to-indigo-500" delay={0.5} />
                </div>
            </div>

            {/* TikTok Ad Policies */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold mb-2">TikTok Ad Policies & Safety</h2>
                    <p className="text-gray-400">Ensure your content is safe and ready for approval.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 rounded-3xl bg-green-500/5 border border-green-500/10 text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <CheckCircle2 className="w-6 h-6 text-green-500" />
                            <h3 className="text-xl font-bold text-green-500">Recommended (Do's)</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Use vertical full-screen video (9:16)",
                                "Include sound (music or voiceover)",
                                "High resolution (720p+)",
                                "Clear Call-to-Action (CTA)"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-8 rounded-3xl bg-red-500/5 border border-red-500/10 text-left">
                        <div className="flex items-center gap-3 mb-6">
                            <XCircle className="w-6 h-6 text-red-500" />
                            <h3 className="text-xl font-bold text-red-500">Prohibited (Don'ts)</h3>
                        </div>
                        <ul className="space-y-4">
                            {[
                                "Misleading claims or scams",
                                "Low quality or pixelated assets",
                                "Copyrighted music without license",
                                "Inappropriate or adult content"
                            ].map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2" />
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Recommended Features */}
            <div className="w-full max-w-4xl mx-auto px-4 mb-32">
                <h2 className="text-3xl font-bold mb-10">Recommended For You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-start gap-4 hover:border-tiktok-cyan/50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-2xl bg-tiktok-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tiktok-cyan/20 transition-colors">
                            <Music className="w-6 h-6 text-tiktok-cyan" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg mb-1">Smart Music Sync</h3>
                            <p className="text-sm text-gray-400">Automatically sync your video cuts to the beat of trending TikTok audio.</p>
                        </div>
                    </div>
                    <div className="p-6 rounded-3xl bg-gradient-to-br from-gray-900 to-black border border-white/10 flex items-start gap-4 hover:border-tiktok-pink/50 transition-colors cursor-pointer group">
                        <div className="w-12 h-12 rounded-2xl bg-tiktok-pink/10 flex items-center justify-center flex-shrink-0 group-hover:bg-tiktok-pink/20 transition-colors">
                            <Target className="w-6 h-6 text-tiktok-pink" />
                        </div>
                        <div className="text-left">
                            <h3 className="font-bold text-lg mb-1">Audience Match</h3>
                            <p className="text-sm text-gray-400">AI-driven targeting recommendations to reach your perfect customer.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Features Roadmap */}
            <div className="w-full max-w-4xl mx-auto px-4">
                <div className="flex items-center justify-center gap-3 mb-10">
                    <Rocket className="w-6 h-6 text-purple-400" />
                    <h2 className="text-3xl font-bold">Product Roadmap</h2>
                </div>

                <div className="relative">
                    {/* Line */}
                    <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-tiktok-cyan via-purple-500 to-transparent opacity-30" />

                    <div className="space-y-12">
                        <div className="relative flex items-center justify-between w-full">
                            <div className="w-[45%] text-right pr-8">
                                <h3 className="text-xl font-bold text-white">AI Video Generation</h3>
                                <p className="text-sm text-gray-400 mt-2">Create compliant ad creatives from simple text prompts.</p>
                                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-wider">Coming Q3</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 border-purple-500 z-10" />
                            <div className="w-[45%] pl-8 opacity-50">
                                <BrainCircuit className="w-8 h-8 text-gray-600" />
                            </div>
                        </div>

                        <div className="relative flex items-center justify-between w-full flex-row-reverse">
                            <div className="w-[45%] text-left pl-8">
                                <h3 className="text-xl font-bold text-white">Advanced A/B Testing</h3>
                                <p className="text-sm text-gray-400 mt-2">Automatically test multiple hook variations to maximize retention.</p>
                                <span className="inline-block mt-2 px-3 py-1 rounded-full bg-tiktok-cyan/20 text-tiktok-cyan text-[10px] font-bold uppercase tracking-wider">Coming Q4</span>
                            </div>
                            <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-gray-900 border-2 border-tiktok-cyan z-10" />
                            <div className="w-[45%] text-right pr-8 opacity-50 flex justify-end">
                                <Palette className="w-8 h-8 text-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <OTPVerification
                isOpen={showOTP}
                onClose={() => setShowOTP(false)}
                onVerified={onOTPVerified}
            />
        </div>
    );
};

export default Landing;

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart,
    MessageCircle,
    Share2,
    Play,
    Pause,
    Volume2,
    VolumeX,
    TrendingUp,
    Music,
    AlertCircle,
    ChevronDown,
    ChevronUp
} from 'lucide-react';

const REEL_DATA = [
    {
        id: 1,
        title: "Summer Drop 2024",
        desc: "New collection just landed. Use code SUMMER20 for 20% off!",
        views: "2.4M",
        likes: "452k",
        comments: "1.2k",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-light-12353-large.mp4",
        music: "Summer Vibes - Chill Mix",
        category: "Fashion"
    },
    {
        id: 2,
        title: "Tech Unboxing: Pro X",
        desc: "The fastest processor ever in a mobile device. See the speed.",
        views: "1.8M",
        likes: "210k",
        comments: "840",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
        music: "Tech Pulse - Future Bass",
        category: "Tech"
    },
    {
        id: 3,
        title: "Morning Routine",
        desc: "How I start my day for maximum productivity. #productivity #vlog",
        views: "5.1M",
        likes: "890k",
        comments: "5.4k",
        videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-946-large.mp4",
        music: "Sunrise - Lofi Girl",
        category: "Lifestyle"
    }
];

const ReelCard = ({ reel, isActive }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (isActive) {
            videoRef.current?.play().catch(() => setIsPlaying(false));
            setIsPlaying(true);
        } else {
            videoRef.current?.pause();
            setIsPlaying(false);
        }
    }, [isActive]);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
        } else {
            videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleTimeUpdate = () => {
        const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
        setProgress(p);
    };

    return (
        <div className="relative w-full h-full bg-black flex items-center justify-center overflow-hidden">
            <video
                ref={videoRef}
                src={reel.videoUrl}
                className="w-full h-full object-cover"
                loop
                muted={isMuted}
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                playsInline
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />

            {/* Play/Pause Button Animation */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ scale: 1.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.5, opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    >
                        <div className="w-20 h-20 bg-black/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/10">
                            <Play className="w-10 h-10 text-white fill-white ml-2" />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* UI - Right Side Stats */}
            <div className="absolute right-4 bottom-32 flex flex-col gap-6 items-center z-10">
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-tiktok-pink/20 transition-all">
                        <Heart className="w-6 h-6 text-white group-hover:text-tiktok-pink transition-colors" />
                    </div>
                    <span className="text-[10px] font-black">{reel.likes}</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-tiktok-cyan/20 transition-all">
                        <MessageCircle className="w-6 h-6 text-white group-hover:text-tiktok-cyan transition-colors" />
                    </div>
                    <span className="text-[10px] font-black">{reel.comments}</span>
                </div>
                <div className="flex flex-col items-center gap-1 group cursor-pointer">
                    <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all">
                        <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-[10px] font-black">Share</span>
                </div>
                <button
                    onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); }}
                    className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all z-20"
                >
                    {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                </button>
            </div>

            {/* UI - Bottom Info */}
            <div className="absolute bottom-10 left-6 right-20 z-10 pointer-events-none">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-tiktok-pink flex items-center justify-center font-black italic shadow-lg">
                        {reel.title.charAt(0)}
                    </div>
                    <span className="font-black italic text-lg tracking-tighter">@{reel.title.toLowerCase().replace(/\s+/g, '_')}</span>
                    <span className="px-2 py-0.5 bg-tiktok-cyan/20 text-tiktok-cyan border border-tiktok-cyan/20 rounded text-[8px] font-black uppercase tracking-widest">PRO</span>
                </div>
                <p className="text-sm font-medium italic opacity-90 line-clamp-2 mb-4 leading-relaxed">
                    {reel.desc}
                </p>
                <div className="flex items-center gap-3">
                    <Music className="w-4 h-4 text-tiktok-cyan animate-spin-slow" />
                    <div className="overflow-hidden whitespace-nowrap w-48">
                        <motion.span
                            animate={{ x: [0, -200] }}
                            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            className="inline-block text-[10px] font-black tracking-widest uppercase italic"
                        >
                            {reel.music} • {reel.music} • {reel.music}
                        </motion.span>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                <motion.div
                    className="h-full bg-tiktok-pink"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

const Benchmark = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const containerRef = useRef(null);

    const handleScroll = (e) => {
        const height = containerRef.current.clientHeight;
        const index = Math.round(containerRef.current.scrollTop / height);
        if (index !== activeIndex) {
            setActiveIndex(index);
        }
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                {/* Left side: Benchmark Info */}
                <div className="lg:w-1/3 space-y-8 lg:sticky lg:top-24">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-tiktok-cyan/10 text-tiktok-cyan text-[10px] font-black uppercase tracking-[0.2em] mb-4 border border-tiktok-cyan/20">
                            <TrendingUp className="w-4 h-4" />
                            <span>Global Creative Benchmark</span>
                        </div>
                        <h1 className="text-5xl font-black italic tracking-tighter text-white leading-none">
                            VIRAL <span className="text-tiktok-pink">ARCHIVE</span>
                        </h1>
                        <p className="text-gray-400 mt-4 font-medium leading-relaxed">
                            Analyze top-performing ads in real-time. Use these benchmarks to calibrate your own hooks and retention patterns.
                        </p>
                    </div>

                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6">
                        <div className="flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-tiktok-cyan" />
                            <h3 className="text-[10px] font-black tracking-widest uppercase text-white">Ad Intelligence</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold uppercase">Average CTR</span>
                                <span className="text-white font-black italic">2.4% - 3.8%</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold uppercase">Hook Duration</span>
                                <span className="text-white font-black italic">1.2s - 2.5s</span>
                            </div>
                            <div className="flex justify-between items-center text-xs">
                                <span className="text-gray-500 font-bold uppercase">Peak Retention</span>
                                <span className="text-white font-black italic">84% at 3s</span>
                            </div>
                        </div>
                        <div className="pt-4 border-t border-white/5">
                            <p className="text-[10px] text-gray-500 font-bold leading-relaxed italic uppercase">
                                * Data updated every 15m based on global campaign clusters.
                            </p>
                        </div>
                    </div>

                    <div className="hidden lg:flex flex-col items-center gap-4 py-10">
                        <div className="w-px h-20 bg-gradient-to-b from-tiktok-pink to-transparent opacity-30" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600 rotate-90 my-8">Scroll Reels</span>
                        <ChevronDown className="w-6 h-6 text-gray-700 animate-bounce" />
                    </div>
                </div>

                {/* Right side: Reels Interface */}
                <div className="lg:w-2/3 w-full flex justify-center lg:justify-end">
                    <div className="relative w-full max-w-[400px] aspect-[9/16] bg-zinc-900 rounded-[56px] border-[12px] border-zinc-900 shadow-[0_0_100px_rgba(0,0,0,0.5)] overflow-hidden">
                        <div
                            ref={containerRef}
                            onScroll={handleScroll}
                            className="w-full h-full overflow-y-scroll snap-y snap-mandatory no-scrollbar"
                        >
                            {REEL_DATA.map((reel, idx) => (
                                <div key={reel.id} className="w-full h-full snap-start snap-always">
                                    <ReelCard reel={reel} isActive={activeIndex === idx} />
                                </div>
                            ))}
                        </div>

                        {/* Pagination Dots */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
                            {REEL_DATA.map((_, idx) => (
                                <div
                                    key={idx}
                                    className={`w-1 h-8 rounded-full transition-all duration-300 ${activeIndex === idx ? 'bg-tiktok-pink h-12' : 'bg-white/20'}`}
                                />
                            ))}
                        </div>

                        {/* Top Notch UI */}
                        <div className="absolute top-0 inset-x-0 h-12 flex justify-center z-30 pointer-events-none">
                            <div className="w-32 h-6 bg-zinc-900 rounded-b-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Benchmark;

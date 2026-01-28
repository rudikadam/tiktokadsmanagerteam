import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    History,
    Trash2,
    BarChart3,
    Clock,
    CheckCircle2,
    AlertTriangle,
    Play,
    Pause,
    RefreshCcw,
    Zap,
    Users,
    MousePointer2,
    X
} from 'lucide-react';

const AdHistory = () => {
    const [ads, setAds] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

    useEffect(() => {
        loadAndCleanupAds();
        // Check for cleanup and update stats every 5 seconds for "live" feel
        const interval = setInterval(loadAndCleanupAds, 5000);
        return () => clearInterval(interval);
    }, []);

    const loadAndCleanupAds = () => {
        const savedAds = JSON.parse(localStorage.getItem('tiktok_ads_history') || '[]');
        const now = new Date();

        // 24 Hour Cleanup Logic
        const validAds = savedAds.filter(ad => {
            const adDate = new Date(ad.timestamp);
            const hoursDiff = (now - adDate) / (1000 * 60 * 60);
            return hoursDiff < 24; // Keep only if less than 24 hours old
        });

        if (validAds.length !== savedAds.length) {
            localStorage.setItem('tiktok_ads_history', JSON.stringify(validAds));
        }

        // Simulate real-time stats updates
        const adsWithStats = validAds.map(ad => ({
            ...ad,
            stats: {
                impressions: ad.stats?.impressions + Math.floor(Math.random() * 50),
                clicks: ad.stats?.clicks + Math.floor(Math.random() * 5),
                ctr: ad.stats?.impressions > 0
                    ? ((ad.stats.clicks / ad.stats.impressions) * 100).toFixed(2)
                    : "0.00"
            }
        }));

        setAds(adsWithStats);
    };

    const deleteAd = (id) => {
        setShowDeleteConfirm(id);
    };

    const confirmDelete = () => {
        const updated = ads.filter(ad => ad.id !== showDeleteConfirm);
        setAds(updated);
        localStorage.setItem('tiktok_ads_history', JSON.stringify(updated));
        setShowDeleteConfirm(null);
    };

    const handleSimulateView = (id) => {
        const updatedAds = ads.map(ad => {
            if (ad.id === id) {
                return {
                    ...ad,
                    stats: {
                        ...ad.stats,
                        impressions: (ad.stats?.impressions || 0) + 1
                    }
                };
            }
            return ad;
        });
        setAds(updatedAds);
        localStorage.setItem('tiktok_ads_history', JSON.stringify(updatedAds));
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'ACTIVE': 'bg-green-500/10 text-green-500 border-green-500/20',
            'PENDING': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'EXPIRED': 'bg-red-500/10 text-red-500 border-red-500/20'
        };
        return (
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold border ${colors[status] || colors.PENDING}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                    <h1 className="text-4xl font-extrabold tracking-tight mb-2 flex items-center gap-3">
                        <History className="w-10 h-10 text-tiktok-cyan" />
                        Ad History & <span className="text-tiktok-pink">Monitoring</span>
                    </h1>
                    <p className="text-gray-400">Tracking performance of your live creatives. Auto-cleans every 24h.</p>
                </div>

                <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                    {['ALL', 'ACTIVE', 'TRAFFIC', 'CONVERSIONS'].map(f => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Stats Summary */}
                <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Active', value: ads.length, icon: Zap, color: 'text-tiktok-cyan' },
                        { label: 'Avg CTR', value: '3.2%', icon: BarChart3, color: 'text-tiktok-pink' },
                        { label: 'Impressions', value: '1.2k', icon: Users, color: 'text-purple-400' },
                        { label: 'Total Clicks', value: '42', icon: MousePointer2, color: 'text-yellow-400' }
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="p-6 rounded-3xl glass border border-white/5"
                        >
                            <stat.icon className={`w-6 h-6 ${stat.color} mb-2`} />
                            <p className="text-2xl font-black">{stat.value}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Ads List */}
                <div className="lg:col-span-3 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {ads.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-20 glass rounded-[40px] border border-dashed border-white/10"
                            >
                                <History className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                                <p className="text-gray-500 font-bold text-xl">No active ads in the last 24 hours</p>
                                <p className="text-gray-600 text-sm mt-2">Start a new campaign to see real-time updates.</p>
                            </motion.div>
                        ) : (
                            ads
                                .filter(ad => filter === 'ALL' || ad.objective === filter || ad.status === filter)
                                .map(ad => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={ad.id}
                                        className="p-6 rounded-[32px] glass group hover:border-white/20 transition-all border border-white/5"
                                    >
                                        <div className="flex flex-col md:flex-row items-center gap-6">
                                            <div className="w-24 h-32 rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden flex-shrink-0 relative group/poster cursor-pointer" onClick={() => handleSimulateView(ad.id)}>
                                                {ad.posterUrl && <img src={ad.posterUrl} className="w-full h-full object-cover" alt="Poster" />}
                                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/poster:opacity-100 transition-opacity">
                                                    <Play className="w-6 h-6 text-white fill-white" />
                                                </div>
                                            </div>

                                            <div className="flex-1 space-y-2 text-center md:text-left">
                                                <div className="flex flex-col md:flex-row items-center gap-3">
                                                    <h3 className="text-xl font-bold">{ad.campaignName}</h3>
                                                    <StatusBadge status={ad.status} />
                                                </div>
                                                <p className="text-gray-400 text-sm line-clamp-1 italic">"{ad.adText}"</p>

                                                <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                                    <div className="flex items-center gap-1.5 text-xs text-tiktok-cyan font-bold">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {ad.durationDays} Days Duration
                                                    </div>
                                                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                                                        <RefreshCcw className="w-3.5 h-3.5 animate-spin-slow" />
                                                        Created {new Date(ad.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Real-time Monitoring Feedback */}
                                            <div className="flex gap-8 px-8 border-x border-white/10">
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-tiktok-pink">{ad.stats?.impressions || 0}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Reach</p>
                                                </div>
                                                <div className="text-center">
                                                    <p className="text-lg font-black text-tiktok-cyan">{ad.stats?.clicks || 0}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Clicks</p>
                                                </div>
                                                <div className="text-center hidden md:block">
                                                    <p className="text-lg font-black text-white">{ad.stats?.ctr || "0.00"}%</p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">CTR</p>
                                                </div>
                                            </div>

                                            <div className="flex gap-2">
                                                <button
                                                    onClick={() => deleteAd(ad.id)}
                                                    className="p-4 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95"
                                                >
                                                    <Trash2 className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={() => setShowDeleteConfirm(null)}
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
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>

                            <div className="flex flex-col items-center text-center gap-4">
                                <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center text-red-500 mb-2">
                                    <Trash2 className="w-8 h-8" />
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold mb-2">Delete Campaign?</h3>
                                    <p className="text-gray-400 text-sm">
                                        This will permanently remove the ad and stop all monitoring history. This action cannot be undone.
                                    </p>
                                </div>

                                <div className="flex gap-3 w-full mt-4">
                                    <button
                                        onClick={() => setShowDeleteConfirm(null)}
                                        className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={confirmDelete}
                                        className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white font-bold rounded-xl transition-all shadow-lg shadow-red-500/20"
                                    >
                                        Delete Forever
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdHistory;

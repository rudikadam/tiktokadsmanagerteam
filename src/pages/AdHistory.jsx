import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
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
    X,
    Edit3,
    CreditCard,
    TrendingUp,
    MoreHorizontal
} from 'lucide-react';

const AdHistory = () => {
    const [ads, setAds] = useState([]);
    const [filter, setFilter] = useState('ALL');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadAndCleanupAds();
        const interval = setInterval(loadAndCleanupAds, 5000);
        return () => clearInterval(interval);
    }, []);

    const loadAndCleanupAds = () => {
        try {
            const stored = localStorage.getItem('tiktok_ads_history');
            let savedAds = [];

            try {
                savedAds = stored ? JSON.parse(stored) : [];
            } catch (parseError) {
                console.warn("Corrupted ad history detected. Resetting storage.");
                localStorage.removeItem('tiktok_ads_history');
                savedAds = [];
            }

            // Just ensure it's a valid array, no auto-deletion time limit
            const validAds = Array.isArray(savedAds) ? savedAds : [];

            const adsWithStats = validAds.map(ad => {
                // Only increment stats if active
                const isAdsActive = ad.status === 'ACTIVE';
                const impressions = (ad.stats?.impressions || 0) + (isAdsActive ? Math.floor(Math.random() * 50) : 0);
                const clicks = (ad.stats?.clicks || 0) + (isAdsActive ? Math.floor(Math.random() * 5) : 0);

                return {
                    ...ad,
                    // Persist status, don't force default to ACTIVE if it exists
                    status: ad.status || 'ACTIVE',
                    stats: {
                        impressions,
                        clicks,
                        ctr: impressions > 0 ? ((clicks / impressions) * 100).toFixed(2) : "0.00"
                    }
                };
            });

            setAds(adsWithStats);
            // Only update local storage stats occasionally to avoid excessive writes, 
            // but for this demo, we'll keep it to persist the simulation.
            localStorage.setItem('tiktok_ads_history', JSON.stringify(adsWithStats));
        } catch (e) {
            console.error("Failed to load ads", e);
            setAds([]);
        }
    };



    const toggleAdStatus = (id) => {
        const updatedAds = ads.map(ad => {
            if (ad.id === id) {
                const newStatus = ad.status === 'ACTIVE' ? 'PAUSED' : 'ACTIVE';
                return { ...ad, status: newStatus };
            }
            return ad;
        });
        setAds(updatedAds);
        localStorage.setItem('tiktok_ads_history', JSON.stringify(updatedAds));
    };

    const deleteAd = (id) => setShowDeleteConfirm(id);

    const confirmDelete = () => {
        const updated = ads.filter(ad => ad.id !== showDeleteConfirm);
        setAds(updated);
        localStorage.setItem('tiktok_ads_history', JSON.stringify(updated));
        setShowDeleteConfirm(null);
    };

    const handleEdit = (ad) => {
        localStorage.setItem('editing_ad', JSON.stringify(ad));
        navigate('/create-ad');
    };

    const StatusBadge = ({ status }) => {
        const colors = {
            'ACTIVE': 'bg-green-500/10 text-green-500 border-green-500/20 shadow-[0_0_10px_rgba(34,197,94,0.1)]',
            'PAUSED': 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
            'EXPIRED': 'bg-red-500/10 text-red-500 border-red-500/20'
        };
        return (
            <span className={`px-4 py-1 rounded-full text-[10px] font-black tracking-widest border transition-all ${colors[status] || colors.PENDING}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-10 px-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2 text-white italic">
                        CAMPAIGN <span className="text-tiktok-pink">HISTORY</span>
                    </h1>
                    <p className="text-gray-400 flex items-center gap-2">
                        <Zap className="w-4 h-4 text-tiktok-cyan fill-tiktok-cyan" />
                        Live monitoring and performance metrics for your creatives.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                        {['ALL', 'ACTIVE', 'PAUSED'].map(f => (
                            <button
                                key={f}
                                onClick={() => setFilter(f)}
                                className={`px-6 py-2 rounded-xl text-xs font-black transition-all tracking-widest ${filter === f ? 'bg-white text-black shadow-lg' : 'text-gray-500 hover:text-white'
                                    }`}
                            >
                                {f}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => {
                            setIsRefreshing(true);
                            setTimeout(() => { loadAndCleanupAds(); setIsRefreshing(false); }, 1000);
                        }}
                        className={`p-3 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                    >
                        <RefreshCcw className="w-5 h-5 text-tiktok-cyan" />
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-8 mb-12">
                {/* Real-time Performance Summary */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Active Reach', value: ads.reduce((acc, ad) => acc + (ad.stats?.impressions || 0), 0).toLocaleString(), icon: TrendingUp, color: 'text-tiktok-cyan' },
                        { label: 'Avg CTR', value: '3.84%', icon: BarChart3, color: 'text-tiktok-pink' },
                        { label: 'Conversion', value: '12', icon: Zap, color: 'text-yellow-400' },
                        { label: 'Billing Mode', value: 'PAY-PER-CLICK', icon: CreditCard, color: 'text-purple-400' }
                    ].map((stat, i) => (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            key={stat.label}
                            className="p-8 rounded-[32px] bg-white/5 border border-white/10 relative overflow-hidden group"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                                <stat.icon className={`w-16 h-16 ${stat.color}`} />
                            </div>
                            <p className="text-3xl font-black mb-1">{stat.value}</p>
                            <p className="text-[10px] text-gray-500 uppercase font-black tracking-[0.2em]">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Ads List */}
                <div className="space-y-6">
                    <AnimatePresence mode="popLayout">
                        {ads.length === 0 ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="text-center py-24 glass rounded-[48px] border-2 border-dashed border-white/5 flex flex-col items-center"
                            >
                                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                                    <History className="w-10 h-10 text-gray-700" />
                                </div>
                                <p className="text-gray-400 font-black text-2xl tracking-tighter">ARCHIVE IS EMPTY</p>
                                <p className="text-gray-600 text-sm mt-2 max-w-xs">Your last 24 hours of activity will appear here once you launch a campaign.</p>
                                <button
                                    onClick={() => navigate('/create-ad')}
                                    className="mt-8 px-8 py-3 bg-tiktok-pink text-white font-bold rounded-2xl hover:scale-110 transition-all shadow-xl shadow-tiktok-pink/20"
                                >
                                    Create First Ad
                                </button>
                            </motion.div>
                        ) : (
                            ads
                                .filter(ad => filter === 'ALL' || ad.status === filter)
                                .map((ad, i) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ delay: i * 0.05 }}
                                        key={ad.id}
                                        className="p-8 rounded-[40px] bg-white/5 hover:bg-white/[0.08] transition-all border border-white/5 relative group cursor-default"
                                    >
                                        <div className="flex flex-col md:flex-row items-center gap-8">
                                            {/* Preview Poster */}
                                            <div className="relative w-28 h-40 rounded-3xl bg-black border border-white/10 overflow-hidden flex-shrink-0 group/poster shadow-2xl">
                                                {ad.posterUrl ? (
                                                    <img src={ad.posterUrl} className="w-full h-full object-cover opacity-80 group-hover/poster:opacity-40 transition-opacity" alt="Poster" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <Zap className="w-8 h-8 text-white/10" />
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/poster:opacity-100 transition-all scale-75 group-hover/poster:scale-100">
                                                    <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center shadow-2xl">
                                                        <Play className="w-5 h-5 fill-black ml-1" />
                                                    </button>
                                                </div>
                                            </div>

                                            {/* Info */}
                                            <div className="flex-1 space-y-4 text-center md:text-left">
                                                <div className="flex flex-col md:flex-row items-center gap-4">
                                                    <h3 className="text-2xl font-black tracking-tight">{ad.campaignName}</h3>
                                                    <StatusBadge status={ad.status} />
                                                    <div className="flex items-center gap-2 text-xs font-bold px-3 py-1 bg-white/5 rounded-full text-tiktok-cyan border border-white/5">
                                                        <CreditCard className="w-3 h-3" />
                                                        PAY-PER-CLICK
                                                    </div>
                                                </div>
                                                <p className="text-gray-400 text-sm line-clamp-2 max-w-xl italic leading-relaxed">
                                                    "{ad.adText || 'No ad text provided'}"
                                                </p>

                                                <div className="flex flex-wrap justify-center md:justify-start gap-6 text-[11px] font-black uppercase tracking-widest text-gray-500">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        Expires in {24 - Math.floor((new Date() - new Date(ad.timestamp)) / (1000 * 60 * 60))}h
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <Zap className="w-3.5 h-3.5" />
                                                        {ad.objective} Objective
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Real-time Stats */}
                                            <div className="flex gap-10 px-10 py-4 border-l border-white/5 bg-black/20 rounded-[32px]">
                                                <div className="text-center group-hover:scale-110 transition-transform">
                                                    <p className="text-2xl font-black text-white">{ad.stats?.impressions || 0}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Reach</p>
                                                </div>
                                                <div className="text-center group-hover:scale-110 transition-transform">
                                                    <p className="text-2xl font-black text-tiktok-pink">{ad.stats?.clicks || 0}</p>
                                                    <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">Interacts</p>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex md:flex-col gap-3">
                                                <button
                                                    onClick={() => toggleAdStatus(ad.id)}
                                                    className={`p-4 rounded-2xl transition-all active:scale-95 shadow-lg flex items-center justify-center ${ad.status === 'ACTIVE'
                                                        ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 hover:bg-yellow-500 hover:text-white shadow-yellow-500/10'
                                                        : 'bg-green-500/10 text-green-500 border border-green-500/20 hover:bg-green-500 hover:text-white shadow-green-500/10'
                                                        }`}
                                                    title={ad.status === 'ACTIVE' ? 'Pause Ad' : 'Resume Ad'}
                                                >
                                                    {ad.status === 'ACTIVE' ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(ad)}
                                                    className="p-4 bg-white/5 border border-white/10 text-white rounded-2xl hover:bg-tiktok-cyan hover:text-black transition-all active:scale-95 shadow-xl shadow-black/20"
                                                    title="Edit Ad"
                                                >
                                                    <Edit3 className="w-6 h-6" />
                                                </button>
                                                <button
                                                    onClick={() => deleteAd(ad.id)}
                                                    className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all active:scale-95 shadow-xl shadow-red-500/10"
                                                    title="Delete Ad"
                                                >
                                                    <Trash2 className="w-6 h-6" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Status Glow Bar */}
                                        <div className={`absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-1/2 rounded-r-full transition-all ${ad.status === 'ACTIVE' ? 'bg-tiktok-cyan shadow-[0_0_15px_rgba(0,255,242,0.5)]' : 'bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]'
                                            }`} />
                                    </motion.div>
                                ))
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Delete Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setShowDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-[40px] p-10 shadow-3xl text-center relative overflow-hidden"
                        >
                            <div className="absolute -top-20 -left-20 w-40 h-40 bg-red-500/10 blur-[60px] rounded-full" />

                            <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mb-8 mx-auto border border-red-500/20">
                                <Trash2 className="w-10 h-10" />
                            </div>

                            <h3 className="text-3xl font-black mb-4 tracking-tighter">DELETE AD?</h3>
                            <p className="text-gray-500 text-sm mb-10 leading-relaxed font-medium">
                                This action will remove the campaign from your local monitoring history. This cannot be undone.
                            </p>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 text-white font-black rounded-2xl transition-all tracking-widest text-[10px]"
                                >
                                    BACK
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="flex-1 py-4 bg-red-500 text-white font-black rounded-2xl hover:bg-red-600 transition-all shadow-xl shadow-red-500/40 tracking-widest text-[10px]"
                                >
                                    CONFIRM
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdHistory;

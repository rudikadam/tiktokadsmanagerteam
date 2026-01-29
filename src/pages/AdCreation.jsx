import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    PlusCircle,
    Music,
    Upload,
    Trash2,
    CheckCircle2,
    AlertTriangle,
    Loader2,
    Info,
    Search,
    Play,
    Pause,
    Volume2,
    Image as ImageIcon,
    Clock,
    BarChart3,
    ArrowLeft,
    Zap,
    Sparkles
} from 'lucide-react';
import { tiktokApi } from '../services/tiktokApi';
import { spotifyApi } from '../services/spotifyApi';

const CTA_OPTIONS = ['Shop Now', 'Learn More', 'Sign Up', 'Download', 'Contact Us'];

const SpotifySearch = ({ onSelect, selectedTrack, onPlay, stopRef }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [playingId, setPlayingId] = useState(null);
    const [audio] = useState(new Audio());

    useEffect(() => {
        if (stopRef) {
            stopRef.current = () => {
                audio.pause();
                setPlayingId(null);
            };
        }
        return () => {
            audio.pause();
            audio.src = '';
        };
    }, [stopRef, audio]);

    const togglePlay = (e, track) => {
        e.stopPropagation();
        if (playingId === track.id) {
            audio.pause();
            setPlayingId(null);
        } else {
            if (onPlay) onPlay();
            audio.src = track.previewUrl;
            audio.play().catch(console.error);
            setPlayingId(track.id);
        }
    };

    const handleSearch = async (e) => {
        const val = e.target.value;
        setQuery(val);
        if (val.length < 2) {
            setResults([]);
            return;
        }
        setLoading(true);
        try {
            const tracks = await spotifyApi.searchTracks(val);
            setResults(tracks);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                    value={query}
                    onChange={handleSearch}
                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#1DB954] transition-all"
                    placeholder="Search for a song or artist on Spotify..."
                />
                {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1DB954] animate-spin" />}
            </div>

            <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                {results.map(track => (
                    <button
                        key={track.id}
                        type="button"
                        onClick={() => onSelect(track)}
                        className={`flex items-center gap-3 p-2 rounded-xl border transition-all text-left group ${selectedTrack?.id === track.id
                            ? 'bg-[#1DB954]/20 border-[#1DB954]'
                            : 'bg-white/5 border-white/5 hover:bg-white/10'
                            }`}
                    >
                        <div className="relative w-10 h-10 flex-shrink-0">
                            <img src={track.albumArt} className="w-full h-full rounded-lg shadow-lg group-hover:opacity-40 transition-opacity" alt={track.name} />
                            <button
                                type="button"
                                onClick={(e) => togglePlay(e, track)}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {playingId === track.id ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate uppercase tracking-tighter">{track.name}</p>
                            <p className="text-[10px] text-gray-500 truncate font-black tracking-widest">{track.artist}</p>
                        </div>
                        {selectedTrack?.id === track.id && <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />}
                    </button>
                ))}
            </div>
        </div>
    );
};

const AdCreation = ({ setError }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [validatingMusic, setValidatingMusic] = useState(false);
    const [success, setSuccess] = useState(null);
    const [previewAudio] = useState(new Audio());
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const fileInputRef = useRef(null);
    const spotifyStopRef = useRef(null);

    // Form State
    const [formData, setFormData] = useState({
        campaignName: '',
        objective: 'TRAFFIC',
        adText: '',
        cta: '',
        musicOption: 'existing', // existing, upload, none, spotify
        musicId: '',
        spotifyTrack: null,
        posterUrl: null,
        durationDays: 7,
        localAudioUrl: null
    });

    const [errors, setErrors] = useState({});

    // Handle Edit Mode Initialization
    useEffect(() => {
        const editingAd = localStorage.getItem('editing_ad');
        if (editingAd) {
            const ad = JSON.parse(editingAd);
            setFormData(ad);
            setIsEditMode(true);
            localStorage.removeItem('editing_ad'); // Clear once loaded
        }
    }, []);

    useEffect(() => {
        if (formData.objective === 'CONVERSIONS' && formData.musicOption === 'none') {
            setFormData(prev => ({ ...prev, musicOption: 'existing' }));
        }
    }, [formData.objective]);

    useEffect(() => {
        previewAudio.onended = () => setIsPlayingPreview(false);
        return () => {
            previewAudio.pause();
            previewAudio.src = '';
        };
    }, [previewAudio]);

    const validateField = (name, value) => {
        let error = '';
        if (name === 'campaignName') {
            if (!value) error = 'Campaign name is required';
            else if (value.length < 3) error = 'Minimum 3 characters required';
        }
        if (name === 'adText') {
            if (!value) error = 'Ad text is required';
            else if (value.length > 100) error = 'Maximum 100 characters allowed';
        }
        if (name === 'cta') {
            if (!value) error = 'Please select a Call to Action';
        }
        if (name === 'musicId' && formData.musicOption === 'existing') {
            if (!value) error = 'Music ID is required';
        }

        setErrors(prev => ({ ...prev, [name]: error }));
        return !error;
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        validateField(name, value);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            const url = URL.createObjectURL(file);
            setFormData(prev => ({
                ...prev,
                musicId: file.name,
                localAudioUrl: url
            }));
            setErrors(prev => ({ ...prev, musicId: '' }));
        } else {
            setError('Please upload a valid audio file (mp3, wav).');
        }
    };

    const toggleUploadedPreview = (e) => {
        e.preventDefault();
        if (spotifyStopRef.current) spotifyStopRef.current();

        if (isPlayingPreview) {
            previewAudio.pause();
            setIsPlayingPreview(false);
        } else {
            previewAudio.src = formData.localAudioUrl;
            previewAudio.play().catch(console.error);
            setIsPlayingPreview(true);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setFormData(prev => ({ ...prev, posterUrl: reader.result }));
            };
            reader.readAsDataURL(file);
        } else {
            setError('Please upload a valid image file (jpg, png).');
        }
    };

    const handleMusicValidation = async () => {
        if (!formData.musicId) return;
        setValidatingMusic(true);
        setErrors(prev => ({ ...prev, musicId: '' }));
        try {
            await tiktokApi.validateMusic(formData.musicId);
        } catch (err) {
            setErrors(prev => ({ ...prev, musicId: err.message }));
        } finally {
            setValidatingMusic(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const fieldNames = ['campaignName', 'adText', 'cta'];
        if (formData.musicOption === 'existing') fieldNames.push('musicId');

        const isValid = fieldNames.every(name => validateField(name, formData[name]));
        if (!isValid) return;

        setLoading(true);
        try {
            const response = isEditMode ? { ad_id: formData.id } : await tiktokApi.createAd(formData);
            const savedAds = JSON.parse(localStorage.getItem('tiktok_ads_history') || '[]');

            if (isEditMode) {
                const idx = savedAds.findIndex(ad => ad.id === formData.id);
                if (idx !== -1) {
                    savedAds[idx] = { ...formData, timestamp: new Date().toISOString() };
                }
            } else {
                const newAd = {
                    ...formData,
                    id: response.ad_id,
                    timestamp: new Date().toISOString(),
                    status: 'ACTIVE',
                    stats: { impressions: 0, clicks: 0, ctr: 0 }
                };
                savedAds.push(newAd);
            }

            localStorage.setItem('tiktok_ads_history', JSON.stringify(savedAds));
            setSuccess(formData);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        // Ensure user sees the success message
        window.scrollTo({ top: 0, behavior: 'smooth' });

        return (
            <div className="max-w-4xl mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-4 border border-green-500/20">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-5xl font-black italic tracking-tighter">
                            {isEditMode ? 'AD UPDATED!' : 'AD CREATED!'}
                        </h2>
                        <p className="text-gray-400 text-lg">
                            Campaign "<span className="text-white font-black italic">{success.campaignName}</span>" is {isEditMode ? 'synced' : 'ready'}.
                        </p>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => navigate('/ad-history')}
                                className="px-10 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-white/5 active:scale-95"
                            >
                                VIEW IN HISTORY
                            </button>
                            <button
                                onClick={() => {
                                    setSuccess(null); setIsEditMode(false); setFormData({
                                        campaignName: '', objective: 'TRAFFIC', adText: '', cta: '',
                                        musicOption: 'existing', musicId: '', spotifyTrack: null,
                                        posterUrl: null, durationDays: 7, localAudioUrl: null
                                    });
                                }}
                                className="px-10 py-4 bg-white/5 text-white border border-white/10 font-black rounded-2xl hover:bg-white/10 transition-all active:scale-95"
                            >
                                NEW AD
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="flex justify-center"
                    >
                        <div className="w-full max-w-[320px] aspect-[9/16] bg-black rounded-[48px] border-[12px] border-zinc-900 relative shadow-3xl overflow-hidden group">
                            {success.posterUrl && <img src={success.posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-60" alt="Ad" />}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black" />

                            <button
                                type="button"
                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-tiktok-pink rounded-full flex items-center justify-center shadow-2xl shadow-tiktok-pink/40 hover:scale-110 transition-transform"
                                onClick={() => {
                                    if (isPlayingPreview) {
                                        previewAudio.pause(); setIsPlayingPreview(false);
                                    } else {
                                        previewAudio.src = success.localAudioUrl || (success.spotifyTrack?.previewUrl);
                                        previewAudio.play().catch(console.error); setIsPlayingPreview(true);
                                    }
                                }}
                            >
                                {isPlayingPreview ? <Pause className="w-10 h-10 fill-white" /> : <Play className="w-10 h-10 fill-white ml-2" />}
                            </button>

                            <div className="absolute bottom-12 left-8 right-8 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-tiktok-pink flex items-center justify-center font-black italic text-white shadow-lg shadow-tiktok-pink/20">
                                        {success.campaignName?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="font-black text-sm tracking-tighter">@{success.campaignName?.toLowerCase().replace(/\s+/g, '_')}</span>
                                </div>
                                <p className="text-sm font-medium italic line-clamp-2 leading-relaxed opacity-80">{success.adText}</p>
                                <div className="py-4 px-8 bg-tiktok-cyan text-black font-black text-center rounded-xl shadow-[0_0_20px_rgba(0,255,242,0.3)]">
                                    {success.cta?.toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-10 px-4">
            <div className="mb-10 flex items-center justify-between">
                <div>
                    <h1 className="text-5xl font-black italic tracking-tighter text-white">
                        {isEditMode ? 'EDIT' : 'CREATE'} <span className="text-tiktok-pink">CAMPAIGN</span>
                    </h1>
                    <p className="text-gray-400 mt-2 font-medium">Fine-tune your creative flow and soundscape.</p>
                </div>
                {isEditMode && (
                    <button
                        onClick={() => navigate('/ad-history')}
                        className="flex items-center gap-2 text-gray-400 hover:text-white font-black text-xs uppercase tracking-widest transition-all"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Cancel Edit
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                            <Zap className="w-32 h-32 text-tiktok-cyan" />
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Campaign Name</label>
                            <input
                                name="campaignName"
                                value={formData.campaignName}
                                onChange={handleInputChange}
                                className={`w-full bg-black/40 border-2 ${errors.campaignName ? 'border-red-500' : 'border-white/5'} rounded-2xl px-6 py-4 focus:outline-none focus:border-tiktok-pink/50 transition-all font-bold`}
                                placeholder="Summer Drop 2024"
                            />
                            {errors.campaignName && <p className="mt-2 text-xs text-red-500 font-bold ml-2">{errors.campaignName}</p>}
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {['TRAFFIC', 'CONVERSIONS'].map(obj => (
                                <button
                                    key={obj}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, objective: obj }))}
                                    className={`py-4 rounded-2xl border-2 text-[10px] font-black tracking-[0.2em] transition-all ${formData.objective === obj
                                        ? 'bg-tiktok-pink border-tiktok-pink text-white shadow-xl shadow-tiktok-pink/20'
                                        : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                                        }`}
                                >
                                    {obj}
                                </button>
                            ))}
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Ad Creative Text</label>
                            <textarea
                                name="adText"
                                rows="3"
                                value={formData.adText}
                                onChange={handleInputChange}
                                className={`w-full bg-black/40 border-2 ${errors.adText ? 'border-red-500' : 'border-white/5'} rounded-2xl px-6 py-4 focus:outline-none focus:border-tiktok-pink/50 transition-all font-bold italic resize-none`}
                                placeholder="Capture their attention in 3 seconds..."
                            />
                            <div className="flex justify-between mt-2 px-2">
                                <p className="text-[10px] text-red-500 font-bold uppercase tracking-widest">{errors.adText}</p>
                                <p className={`text-[10px] font-black tracking-widest ${formData.adText.length > 100 ? 'text-red-500' : 'text-gray-600'}`}>
                                    {formData.adText.length}/100
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 ml-2">Call to Action</label>
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {CTA_OPTIONS.map(opt => (
                                    <button
                                        key={opt}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, cta: opt }))}
                                        className={`py-3 rounded-xl border-2 text-[10px] font-black transition-all ${formData.cta === opt
                                            ? 'bg-tiktok-cyan border-tiktok-cyan text-black shadow-lg shadow-tiktok-cyan/20'
                                            : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                                            }`}
                                    >
                                        {opt.toUpperCase()}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Music Section */}
                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8">
                        <div className="flex items-center gap-3 ml-2">
                            <Music className="w-5 h-5 text-tiktok-cyan" />
                            <h3 className="text-sm font-black italic tracking-widest text-white">SOUNDSCAPE ENGINE</h3>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                            {[
                                { id: 'existing', label: 'MUSIC ID', icon: Music },
                                { id: 'upload', label: 'UPLOAD', icon: Upload },
                                { id: 'spotify', label: 'SPOTIFY', icon: Music },
                                { id: 'none', label: 'NONE', icon: Trash2, disabled: formData.objective === 'CONVERSIONS' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    disabled={opt.disabled}
                                    onClick={() => setFormData(prev => ({ ...prev, musicOption: opt.id, spotifyTrack: null }))}
                                    className={`flex flex-col items-center justify-center p-5 rounded-3xl border-2 transition-all gap-2 ${formData.musicOption === opt.id
                                        ? 'bg-tiktok-cyan/10 border-tiktok-cyan text-tiktok-cyan shadow-lg shadow-tiktok-cyan/10'
                                        : opt.disabled ? 'opacity-20 cursor-not-allowed border-transparent' : 'bg-white/5 border-white/5 text-gray-500 hover:bg-white/10'
                                        }`}
                                >
                                    <opt.icon className="w-6 h-6" />
                                    <span className="text-[10px] font-black tracking-widest">{opt.label}</span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {formData.musicOption === 'existing' && (
                                <motion.div key="existing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-4">
                                    <div className="flex gap-3">
                                        <input
                                            name="musicId"
                                            value={formData.musicId}
                                            onChange={handleInputChange}
                                            className="flex-1 bg-black/40 border-2 border-white/5 rounded-2xl px-6 py-4 focus:outline-none focus:border-tiktok-cyan/50 font-bold"
                                            placeholder="Enter Global Music ID..."
                                        />
                                        <button
                                            type="button"
                                            onClick={handleMusicValidation}
                                            disabled={validatingMusic || !formData.musicId}
                                            className="px-8 bg-white/10 rounded-2xl text-[10px] font-black tracking-widest hover:bg-white/20 transition-all border border-white/5"
                                        >
                                            {validatingMusic ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'VALIDATE'}
                                        </button>
                                    </div>
                                    {errors.musicId && <p className="text-xs text-red-500 font-bold ml-2 italic underline underline-offset-4 decoration-2">{errors.musicId}</p>}
                                </motion.div>
                            )}

                            {formData.musicOption === 'spotify' && (
                                <motion.div key="spotify" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                                    <SpotifySearch
                                        onSelect={(track) => {
                                            setFormData(prev => ({ ...prev, spotifyTrack: track, musicId: track.id }));
                                            setErrors(prev => ({ ...prev, musicId: '' }));
                                        }}
                                        selectedTrack={formData.spotifyTrack}
                                        onPlay={() => { if (isPlayingPreview) { previewAudio.pause(); setIsPlayingPreview(false); } }}
                                        stopRef={spotifyStopRef}
                                    />
                                </motion.div>
                            )}

                            {formData.musicOption === 'upload' && (
                                <motion.div key="upload" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className="p-12 border-2 border-dashed border-white/10 hover:border-tiktok-cyan/40 hover:bg-tiktok-cyan/[0.03] rounded-[32px] flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all group"
                                    >
                                        <input type="file" ref={fileInputRef} className="hidden" accept="audio/*" onChange={handleFileChange} />
                                        <div className="w-16 h-16 bg-white/5 rounded-3xl flex items-center justify-center group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.1)] transition-all">
                                            <Upload className="w-8 h-8 text-tiktok-cyan" />
                                        </div>
                                        <div>
                                            <p className="font-black italic text-lg tracking-tighter">CLOUD UPLOAD</p>
                                            <p className="text-[10px] text-gray-500 font-bold mt-1 tracking-widest uppercase">MP3 / WAV / AAC (PRO ONLY)</p>
                                        </div>
                                    </div>

                                    {formData.localAudioUrl && (
                                        <div className="flex items-center gap-6 p-6 bg-white/5 rounded-[32px] border border-white/5">
                                            <button
                                                type="button"
                                                onClick={toggleUploadedPreview}
                                                className="w-16 h-16 bg-tiktok-cyan rounded-full flex items-center justify-center shadow-xl shadow-tiktok-cyan/20 hover:scale-105 active:scale-95 transition-all"
                                            >
                                                {isPlayingPreview ? <Pause className="w-6 h-6 text-black fill-black" /> : <Play className="w-6 h-6 text-black fill-black ml-1" />}
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-black tracking-tighter truncate italic uppercase">{formData.musicId}</p>
                                                <p className="text-[10px] text-tiktok-cyan font-black tracking-widest mt-1">BUFFERED & READY</p>
                                            </div>
                                            <button type="button" onClick={() => setFormData(prev => ({ ...prev, musicId: '', localAudioUrl: null }))} className="p-4 text-gray-600 hover:text-red-500 transition-colors">
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    {/* Creative Section */}
                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 space-y-8">
                        <div className="flex items-center gap-3 ml-2">
                            <ImageIcon className="w-5 h-5 text-tiktok-pink" />
                            <h3 className="text-sm font-black italic tracking-widest text-white">VISUAL ASSET</h3>
                        </div>

                        <div
                            onClick={() => document.getElementById('image-upload').click()}
                            className="group relative aspect-video bg-black/40 border-2 border-dashed border-white/5 rounded-[32px] overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-tiktok-pink/40 transition-all"
                        >
                            <input id="image-upload" type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
                            {formData.posterUrl ? (
                                <>
                                    <img src={formData.posterUrl} className="w-full h-full object-cover opacity-80" alt="Poster" />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <p className="text-white font-black italic text-lg tracking-widest">CHANGE ASSET</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-12 h-12 text-gray-800 mb-4 group-hover:text-tiktok-pink group-hover:scale-110 transition-all" />
                                    <p className="text-lg font-black italic tracking-tighter">DROP POSTER</p>
                                    <p className="text-[10px] text-gray-600 font-bold mt-2 uppercase tracking-widest">Optimized 1080x1920 (9:16)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group w-full py-6 bg-white text-black font-black italic text-xl tracking-tighter rounded-[32px] flex items-center justify-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-2xl shadow-white/5 disabled:opacity-50 overflow-hidden relative"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-tiktok-pink via-tiktok-cyan to-tiktok-pink opacity-0 group-hover:opacity-10 transition-opacity animate-gradient-x" />
                        {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : isEditMode ? 'SAVE CAMPAIGN CHANGES' : 'GENERATE AD CREATIVE'}
                    </button>
                </form>

                {/* Sidebar Preview */}
                <div className="space-y-8">
                    <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 sticky top-24 shadow-3xl">
                        <div className="flex items-center justify-between mb-8 px-2">
                            <h3 className="text-[10px] font-black tracking-[0.3em] text-gray-500 uppercase italic">Live Render</h3>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                                <span className="text-[8px] font-black uppercase text-red-500 tracking-widest">Live Pre-view</span>
                            </div>
                        </div>

                        <div className="aspect-[9/16] bg-black rounded-[40px] border-8 border-zinc-900 shadow-2xl relative overflow-hidden flex items-center justify-center group/preview">
                            <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-10" />

                            {formData.posterUrl && <img src={formData.posterUrl} className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover/preview:opacity-40 transition-opacity" alt="Ad" />}

                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                type="button"
                                onClick={formData.localAudioUrl ? toggleUploadedPreview : (e) => {
                                    e.preventDefault();
                                    if (isPlayingPreview) {
                                        previewAudio.pause(); setIsPlayingPreview(false);
                                    } else {
                                        const src = formData.spotifyTrack?.previewUrl;
                                        if (src) { previewAudio.src = src; previewAudio.play().catch(console.error); setIsPlayingPreview(true); }
                                    }
                                }}
                                className={`z-50 w-24 h-24 rounded-full flex items-center justify-center backdrop-blur-3xl bg-white/10 border border-white/20 shadow-2xl opacity-0 group-hover/preview:opacity-100 transition-all duration-300 ${isPlayingPreview ? 'opacity-100 bg-tiktok-pink shadow-tiktok-pink/20' : ''}`}
                            >
                                {isPlayingPreview ? (
                                    <Pause className="w-10 h-10 text-white fill-white" />
                                ) : (
                                    <Play className="w-10 h-10 text-white fill-white ml-2" />
                                )}
                            </motion.button>

                            <div className="z-20 absolute bottom-10 left-6 right-6 space-y-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-tiktok-pink flex items-center justify-center font-black italic text-white shadow-xl shadow-tiktok-pink/20">
                                        {formData.campaignName?.charAt(0).toUpperCase() || 'T'}
                                    </div>
                                    <span className="text-sm font-black italic tracking-tighter">@{formData.campaignName?.toLowerCase().replace(/\s+/g, '_') || 'your_brand'}</span>
                                </div>
                                <p className="text-sm font-medium italic line-clamp-3 leading-relaxed opacity-90 drop-shadow-md">
                                    {formData.adText || 'Enter ad text to see the live render...'}
                                </p>
                                <div className="flex items-center gap-3 text-[10px] font-black tracking-widest text-tiktok-cyan uppercase italic">
                                    <Music className="w-3.5 h-3.5 animate-pulse" />
                                    <span className="truncate">
                                        {formData.musicOption === 'existing' ? (formData.musicId || 'SELECT TRACK') :
                                            formData.musicOption === 'upload' ? 'USER_SND_PRO' :
                                                formData.musicOption === 'spotify' ? (formData.spotifyTrack ? `${formData.spotifyTrack.name} - ${formData.spotifyTrack.artist}` : 'CONNECT SPOTIFY') :
                                                    'MUTE'}
                                    </span>
                                </div>
                                {formData.cta && (
                                    <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="mt-4 py-4 px-8 bg-tiktok-cyan text-black font-black italic text-center rounded-xl shadow-[0_0_20px_rgba(0,255,242,0.3)]">
                                        {formData.cta.toUpperCase()}
                                    </motion.div>
                                )}
                            </div>

                            <div className="absolute right-4 bottom-28 flex flex-col gap-8 text-center opacity-60">
                                <div className="space-y-1">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md">❤️</div>
                                    <span className="text-[10px] font-black">240.1k</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md">💬</div>
                                    <span className="text-[10px] font-black">1.2k</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center backdrop-blur-md">🚀</div>
                                    <span className="text-[10px] font-black">Share</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 rounded-[40px] bg-gradient-to-br from-zinc-900 to-black border border-white/5 flex flex-col items-center text-center space-y-6">
                        <div className="w-12 h-12 rounded-2xl bg-tiktok-cyan/10 flex items-center justify-center">
                            <BarChart3 className="w-6 h-6 text-tiktok-cyan" />
                        </div>
                        <h4 className="text-xl font-black italic tracking-tighter">AI REACH ESTIMATOR</h4>
                        <div className="w-full space-y-4">
                            <div className="flex justify-between text-[10px] font-black tracking-widest text-gray-500 uppercase">
                                <span>Estimated Reach</span>
                                <span className="text-tiktok-cyan">42k - 180k</span>
                            </div>
                            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} transition={{ duration: 1.5 }} className="h-full bg-gradient-to-r from-tiktok-cyan to-tiktok-pink" />
                            </div>
                        </div>
                        <p className="text-[10px] text-gray-500 font-bold leading-relaxed uppercase tracking-widest">
                            Reach is estimated based on {formData.durationDays} day duration and current TikTok peak trends.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdCreation;

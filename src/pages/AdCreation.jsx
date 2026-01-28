import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
    BarChart3
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
            audio.play();
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
                                onClick={(e) => togglePlay(e, track)}
                                className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                                {playingId === track.id ? <Pause className="w-4 h-4 fill-white" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
                            </button>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-sm truncate">{track.name}</p>
                            <p className="text-xs text-gray-500 truncate">{track.artist}</p>
                        </div>
                        {selectedTrack?.id === track.id && <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />}
                    </button>
                ))}
            </div>

            {selectedTrack && !results.some(t => t.id === selectedTrack.id) && (
                <div className="flex items-center gap-3 p-2 rounded-xl border bg-[#1DB954]/20 border-[#1DB954] text-left">
                    <img src={selectedTrack.albumArt} className="w-10 h-10 rounded-lg shadow-lg" alt={selectedTrack.name} />
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm truncate">{selectedTrack.name}</p>
                        <p className="text-xs text-gray-500 truncate">{selectedTrack.artist}</p>
                    </div>
                    <CheckCircle2 className="w-4 h-4 text-[#1DB954]" />
                </div>
            )}
        </div>
    );
};

const AdCreation = ({ setError }) => {
    const [loading, setLoading] = useState(false);
    const [validatingMusic, setValidatingMusic] = useState(false);
    const [success, setSuccess] = useState(null);
    const [previewAudio] = useState(new Audio());
    const [isPlayingPreview, setIsPlayingPreview] = useState(false);
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
        durationDays: 7, // Default 7 days
    });

    // Field errors
    const [errors, setErrors] = useState({});

    // Objective constant music constraint
    useEffect(() => {
        if (formData.objective === 'CONVERSIONS' && formData.musicOption === 'none') {
            setFormData(prev => ({ ...prev, musicOption: 'existing' }));
        }
    }, [formData.objective]);

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

        // Stop Spotify if playing
        if (spotifyStopRef.current) spotifyStopRef.current();

        if (isPlayingPreview) {
            previewAudio.pause();
            setIsPlayingPreview(false);
        } else {
            previewAudio.src = formData.localAudioUrl;
            previewAudio.play();
            setIsPlayingPreview(true);
        }
    };

    useEffect(() => {
        previewAudio.onended = () => setIsPlayingPreview(false);
        return () => {
            previewAudio.pause();
            previewAudio.src = '';
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file && file.type.startsWith('image/')) {
            // Convert to Base64 for localStorage persistence
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
            // Valid!
        } catch (err) {
            setErrors(prev => ({ ...prev, musicId: err.message }));
        } finally {
            setValidatingMusic(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Final validation
        const fieldNames = ['campaignName', 'adText', 'cta'];
        if (formData.musicOption === 'existing') fieldNames.push('musicId');

        const isValid = fieldNames.every(name => validateField(name, formData[name]));

        // Objective logic check
        if (formData.objective === 'CONVERSIONS' && formData.musicOption === 'none') {
            setError('Music is required for Conversion campaigns.');
            return;
        }

        if (!isValid) return;

        setLoading(true);
        try {
            const response = await tiktokApi.createAd(formData);

            // Save to localStorage
            const savedAds = JSON.parse(localStorage.getItem('tiktok_ads_history') || '[]');
            const newAd = {
                ...formData,
                id: response.ad_id,
                timestamp: new Date().toISOString(),
                status: 'ACTIVE',
                stats: {
                    impressions: 0,
                    clicks: 0,
                    ctr: 0
                }
            };
            savedAds.push(newAd);
            localStorage.setItem('tiktok_ads_history', JSON.stringify(savedAds));

            // Update User Profile Stats
            const userProfile = JSON.parse(localStorage.getItem('user_profile') || '{}');
            userProfile.adsCreated = (userProfile.adsCreated || 0) + 1;
            userProfile.score = Math.min((userProfile.score || 50) + 5, 100);
            localStorage.setItem('user_profile', JSON.stringify(userProfile));

            setSuccess(newAd);
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="max-w-4xl mx-auto py-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="w-20 h-20 bg-green-500/10 rounded-3xl flex items-center justify-center mb-4">
                            <CheckCircle2 className="w-10 h-10 text-green-500" />
                        </div>
                        <h2 className="text-4xl font-extrabold tracking-tight">Ad Created <span className="text-tiktok-cyan">Successfully!</span></h2>
                        <p className="text-gray-400 text-lg">
                            Your campaign "<span className="text-white font-medium">{success.campaignName}</span>" has been submitted and saved to your local database.
                        </p>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Ad ID</span>
                                <span className="font-mono text-tiktok-cyan">{success.id}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-500">Status</span>
                                <span className="text-yellow-500">PENDING_REVIEW</span>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <button
                                onClick={() => setSuccess(null)}
                                className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition-all flex items-center gap-2"
                            >
                                <PlusCircle className="w-5 h-5" />
                                Create New Ad
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="flex justify-center"
                    >
                        <div className="w-full max-w-[320px] aspect-[9/16] bg-gray-900 rounded-[40px] border-[8px] border-zinc-800 relative shadow-2xl overflow-hidden group">
                            {success.posterUrl && (
                                <img src={success.posterUrl} className="absolute inset-0 w-full h-full object-cover" alt="Ad" />
                            )}
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />

                            {/* Simulated Playback Button */}
                            {(success.localAudioUrl || (success.spotifyTrack && success.spotifyTrack.previewUrl)) && (
                                <button
                                    onClick={success.localAudioUrl ? toggleUploadedPreview : (e) => {
                                        // Quick hack for spotify play in success screen
                                        if (isPlayingPreview) {
                                            previewAudio.pause(); setIsPlayingPreview(false);
                                        } else {
                                            previewAudio.src = success.spotifyTrack.previewUrl;
                                            previewAudio.play(); setIsPlayingPreview(true);
                                        }
                                    }}
                                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-tiktok-pink rounded-full flex items-center justify-center shadow-2xl shadow-tiktok-pink/50 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 active:scale-95"
                                >
                                    {isPlayingPreview ? <Pause className="w-8 h-8 text-white fill-white" /> : <Play className="w-8 h-8 text-white fill-white ml-2" />}
                                </button>
                            )}

                            <div className="absolute bottom-10 left-6 right-6 space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="w-10 h-10 rounded-full bg-tiktok-pink flex items-center justify-center font-bold text-white">
                                        {success.campaignName?.charAt(0).toUpperCase() || 'T'}
                                    </div>
                                    <span className="font-bold text-sm">@{success.campaignName?.toLowerCase().replace(/\s+/g, '_') || 'brand_handle'}</span>
                                </div>
                                <p className="text-sm line-clamp-2">{success.adText || 'No ad text provided'}</p>
                                <div className="py-3 px-6 bg-tiktok-cyan text-black font-bold text-center rounded-lg shadow-lg">
                                    {success.cta}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">Create Ad Creative</h1>
                <p className="text-gray-400">Configure your campaign details and music selection.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Form */}
                <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6">
                    <div className="p-6 rounded-3xl glass space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Name</label>
                            <input
                                name="campaignName"
                                value={formData.campaignName}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border ${errors.campaignName ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all`}
                                placeholder="Summer Sale 2024"
                            />
                            {errors.campaignName && <p className="mt-1 text-xs text-red-500">{errors.campaignName}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Campaign Objective</label>
                            <div className="grid grid-cols-2 gap-3">
                                {['TRAFFIC', 'CONVERSIONS'].map(obj => (
                                    <button
                                        key={obj}
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, objective: obj }))}
                                        className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all ${formData.objective === obj
                                            ? 'bg-tiktok-pink border-tiktok-pink text-white'
                                            : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                            }`}
                                    >
                                        {obj}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Ad Text</label>
                            <textarea
                                name="adText"
                                rows="3"
                                value={formData.adText}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border ${errors.adText ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-tiktok-pink transition-all`}
                                placeholder="What's your ad about?"
                            />
                            <div className="flex justify-between mt-1">
                                {errors.adText ? <p className="text-xs text-red-500">{errors.adText}</p> : <div />}
                                <p className={`text-xs ${formData.adText.length > 100 ? 'text-red-500' : 'text-gray-500'}`}>
                                    {formData.adText.length}/100
                                </p>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">Call to Action</label>
                            <select
                                name="cta"
                                value={formData.cta}
                                onChange={handleInputChange}
                                className={`w-full bg-white/5 border ${errors.cta ? 'border-red-500' : 'border-white/10'} text-white rounded-xl px-4 py-3 focus:outline-none transition-all`}
                            >
                                <option value="" disabled className="bg-black">Select CTA</option>
                                {CTA_OPTIONS.map(opt => <option key={opt} value={opt} className="bg-black">{opt}</option>)}
                            </select>
                            {errors.cta && <p className="mt-1 text-xs text-red-500">{errors.cta}</p>}
                        </div>
                    </div>

                    {/* Music Selection Card */}
                    <div className="p-6 rounded-3xl glass space-y-6">
                        <div className="flex items-center gap-2">
                            <Music className="w-5 h-5 text-tiktok-cyan" />
                            <h3 className="font-bold">Music Selection</h3>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                                { id: 'existing', label: 'Existing ID', icon: Music },
                                { id: 'upload', label: 'Upload Music', icon: Upload },
                                { id: 'spotify', label: 'Spotify', icon: Music },
                                { id: 'none', label: 'No Music', icon: Trash2, disabled: formData.objective === 'CONVERSIONS' }
                            ].map(opt => (
                                <button
                                    key={opt.id}
                                    type="button"
                                    disabled={opt.disabled}
                                    onClick={() => setFormData(prev => ({ ...prev, musicOption: opt.id, spotifyTrack: null }))}
                                    className={`flex flex-col items-center justify-center p-4 rounded-2xl border transition-all ${formData.musicOption === opt.id
                                        ? 'bg-tiktok-cyan/10 border-tiktok-cyan text-tiktok-cyan'
                                        : opt.disabled ? 'opacity-30 cursor-not-allowed border-white/5' : 'bg-white/5 border-white/10 text-gray-400 hover:bg-white/10'
                                        }`}
                                >
                                    {opt.id === 'spotify' ? (
                                        <div className="w-5 h-5 mb-2 bg-[#1DB954] rounded-full flex items-center justify-center p-0.5">
                                            <svg viewBox="0 0 24 24" fill="black" className="w-full h-full"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.498 17.302c-.218.358-.684.47-1.042.252-2.872-1.754-6.486-2.152-10.741-1.177-.41.094-.82-.163-.914-.572-.094-.41.163-.82.572-.914 4.654-1.065 8.64-.612 11.872 1.36.358.218.47.684.252 1.04zM18.965 14.043c-.274.444-.85.59-1.295.316-3.288-2.02-8.3-2.613-12.188-1.433-.5.152-1.026-.131-1.178-.63-.152-.5.131-1.026.63-1.178 4.453-1.352 10.003-.683 13.715 1.595.445.274.59.85.316 1.295zm.135-3.398c-3.945-2.345-10.457-2.56-14.234-1.411-.605.184-1.246-.162-1.431-.767-.184-.605.162-1.246.767-1.431 4.34-1.317 11.536-1.056 16.088 1.646.544.323.722 1.03.399 1.574-.323.543-1.03.721-1.574.399z" /></svg>
                                        </div>
                                    ) : <opt.icon className="w-5 h-5 mb-2" />}
                                    <span className="text-xs font-bold">{opt.label}</span>
                                </button>
                            ))}
                        </div>

                        <AnimatePresence mode="wait">
                            {formData.musicOption === 'existing' && (
                                <motion.div
                                    key="existing"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-3"
                                >
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Industry Music ID</label>
                                    <div className="flex gap-2">
                                        <input
                                            name="musicId"
                                            value={formData.musicId}
                                            onChange={handleInputChange}
                                            className={`flex-1 bg-white/5 border ${errors.musicId ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 focus:outline-none transition-all`}
                                            placeholder="e.g. 7123456789"
                                        />
                                        <button
                                            type="button"
                                            onClick={handleMusicValidation}
                                            disabled={validatingMusic || !formData.musicId}
                                            className="px-4 bg-white/10 rounded-xl text-xs font-bold hover:bg-white/20 disabled:opacity-50 transition-colors"
                                        >
                                            {validatingMusic ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Validate'}
                                        </button>
                                    </div>
                                    {errors.musicId && (
                                        <div className="flex items-start gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl">
                                            <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                                            <p className="text-xs text-red-400 leading-tight">{errors.musicId}</p>
                                        </div>
                                    )}
                                </motion.div>
                            )}

                            {formData.musicOption === 'spotify' && (
                                <motion.div
                                    key="spotify"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4"
                                >
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#1DB954]">Connect Spotify Track</label>
                                    <SpotifySearch
                                        onSelect={(track) => {
                                            setFormData(prev => ({ ...prev, spotifyTrack: track, musicId: track.id }));
                                            setErrors(prev => ({ ...prev, musicId: '' }));
                                        }}
                                        selectedTrack={formData.spotifyTrack}
                                        onPlay={() => {
                                            if (isPlayingPreview) {
                                                previewAudio.pause();
                                                setIsPlayingPreview(false);
                                            }
                                        }}
                                        stopRef={spotifyStopRef}
                                    />
                                    {errors.musicId && <p className="text-xs text-red-500">{errors.musicId}</p>}
                                </motion.div>
                            )}

                            {formData.musicOption === 'upload' && (
                                <motion.div
                                    key="upload"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="space-y-4"
                                >
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-gray-500">Upload MP3/Audio</label>
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            handleFileChange({ target: { files: e.dataTransfer.files } });
                                        }}
                                        className="p-8 border-2 border-dashed border-white/10 hover:border-tiktok-cyan/50 hover:bg-tiktok-cyan/5 rounded-3xl flex flex-col items-center justify-center text-center space-y-4 cursor-pointer transition-all group"
                                    >
                                        <input
                                            type="file"
                                            ref={fileInputRef}
                                            className="hidden"
                                            accept="audio/*"
                                            onChange={handleFileChange}
                                        />

                                        <div className="w-14 h-14 bg-tiktok-cyan/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <Upload className="w-7 h-7 text-tiktok-cyan" />
                                        </div>

                                        <div>
                                            <p className="font-bold">Drag & drop or <span className="text-tiktok-cyan">browse</span></p>
                                            <p className="text-xs text-gray-400 mt-1">MP3, WAV or AAC (Max 10MB)</p>
                                        </div>
                                    </div>

                                    {formData.localAudioUrl && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl"
                                        >
                                            <button
                                                onClick={toggleUploadedPreview}
                                                className="w-12 h-12 bg-tiktok-cyan rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-tiktok-cyan/20"
                                            >
                                                {isPlayingPreview ? <Pause className="w-5 h-5 text-black fill-black" /> : <Play className="w-5 h-5 text-black fill-black ml-1" />}
                                            </button>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-bold truncate">{formData.musicId}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-widest">Ready to use</p>
                                            </div>
                                            <button
                                                onClick={() => setFormData(prev => ({ ...prev, musicId: '', localAudioUrl: null }))}
                                                className="p-2 text-gray-500 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}

                            {formData.musicOption === 'none' && (
                                <motion.div
                                    key="none"
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    className="flex items-center gap-3 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-2xl"
                                >
                                    <Info className="w-5 h-5 text-yellow-500" />
                                    <p className="text-xs text-yellow-500 leading-tight">
                                        Running ads without music may decrease engagement. Only allowed for Traffic objective.
                                    </p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="p-6 rounded-3xl glass space-y-4">
                        <div className="flex items-center gap-2">
                            <ImageIcon className="w-5 h-5 text-tiktok-pink" />
                            <h3 className="font-bold">Ad Creative</h3>
                        </div>

                        <div
                            onClick={() => document.getElementById('image-upload').click()}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                                e.preventDefault();
                                handleImageChange({ target: { files: e.dataTransfer.files } });
                            }}
                            className="group relative aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-2xl overflow-hidden flex flex-col items-center justify-center cursor-pointer hover:border-tiktok-pink/50 transition-all"
                        >
                            <input
                                id="image-upload"
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {formData.posterUrl ? (
                                <>
                                    <img src={formData.posterUrl} className="w-full h-full object-cover" alt="Poster" />
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                        <p className="text-white font-bold">Change Image</p>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <ImageIcon className="w-8 h-8 text-gray-500 mb-2 group-hover:text-tiktok-pink transition-colors" />
                                    <p className="text-sm font-bold">Upload Poster Image</p>
                                    <p className="text-[10px] text-gray-500 mt-1">Recommended size: 1080x1920 (9:16)</p>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="p-6 rounded-3xl glass space-y-6">
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-tiktok-cyan" />
                            <h3 className="font-bold">Campaign Schedule</h3>
                        </div>

                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">Duration</label>
                                <span className="text-tiktok-cyan font-bold">{formData.durationDays} Days</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="30"
                                name="durationDays"
                                value={formData.durationDays}
                                onChange={handleInputChange}
                                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-tiktok-cyan"
                            />
                            <div className="flex justify-between text-[10px] text-gray-500 font-bold uppercase">
                                <span>1 Day</span>
                                <span>15 Days</span>
                                <span>30 Days</span>
                            </div>
                            <p className="text-[10px] text-gray-500 italic mt-2 leading-relaxed">
                                * Ads are monitored in real-time. History is automatically cleaned after 24 hours.
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-tiktok-pink hover:bg-tiktok-pink/90 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Create Ad Creative'}
                    </button>
                </form>

                {/* Sidebar Preview (Simplified) */}
                <div className="space-y-6">
                    <div className="p-6 rounded-3xl glass sticky top-24">
                        <h3 className="font-bold mb-4">Live Preview</h3>
                        <div className="aspect-[9/16] bg-gray-900 rounded-2xl border border-white/10 relative overflow-hidden flex items-center justify-center group/preview">
                            {formData.posterUrl && (
                                <img src={formData.posterUrl} className="absolute inset-0 w-full h-full object-cover" alt="Ad Background" />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60" />

                            {/* Liquid Glass Play Button */}
                            {(formData.localAudioUrl || (formData.spotifyTrack && formData.spotifyTrack.previewUrl)) && (
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={formData.localAudioUrl ? toggleUploadedPreview : (e) => {
                                        e.preventDefault();
                                        if (isPlayingPreview) {
                                            previewAudio.pause(); setIsPlayingPreview(false);
                                        } else {
                                            previewAudio.src = formData.spotifyTrack.previewUrl;
                                            previewAudio.play(); setIsPlayingPreview(true);
                                        }
                                    }}
                                    className="z-50 w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-xl bg-white/10 border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] opacity-0 group-hover/preview:opacity-100 transition-all duration-500 overflow-hidden relative"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-50" />
                                    <div className="absolute inset-0 animate-pulse bg-tiktok-cyan/5 blur-xl" />
                                    {isPlayingPreview ? (
                                        <Pause className="w-8 h-8 text-white fill-white relative z-10" />
                                    ) : (
                                        <Play className="w-8 h-8 text-white fill-white ml-2 relative z-10" />
                                    )}
                                </motion.button>
                            )}

                            <div className="z-10 absolute bottom-6 left-4 right-4 space-y-2">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-tiktok-pink flex items-center justify-center font-bold text-white text-[10px]">
                                        {formData.campaignName?.charAt(0).toUpperCase() || 'T'}
                                    </div>
                                    <span className="text-sm font-bold truncate">@{formData.campaignName?.toLowerCase().replace(/\s+/g, '_') || 'your_brand'}</span>
                                </div>
                                <p className="text-sm line-clamp-3">
                                    {formData.adText || 'Start typing your ad text...'}
                                </p>
                                <div className="flex items-center gap-2 text-xs">
                                    <Music className="w-3 h-3 animate-pulse" />
                                    <span className="truncate">
                                        {formData.musicOption === 'existing' ? (formData.musicId || 'Select music...') :
                                            formData.musicOption === 'upload' ? 'Custom Music' :
                                                formData.musicOption === 'spotify' ? (formData.spotifyTrack ? `${formData.spotifyTrack.name} - ${formData.spotifyTrack.artist}` : 'Search Spotify...') :
                                                    'Original Sound'}
                                    </span>
                                </div>
                                {formData.cta && (
                                    <div className="mt-2 py-2 px-4 bg-tiktok-cyan text-black font-bold text-sm text-center rounded">
                                        {formData.cta}
                                    </div>
                                )}
                            </div>

                            <div className="absolute right-4 bottom-24 flex flex-col gap-6 text-center">
                                <div className="space-y-1">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">❤️</div>
                                    <span className="text-[10px] font-bold">12k</span>
                                </div>
                                <div className="space-y-1">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">💬</div>
                                    <span className="text-[10px] font-bold">42</span>
                                </div>
                            </div>
                        </div>
                        <p className="mt-4 text-[10px] text-center text-gray-500">
                            Mock preview based on TikTok Ads mobile layout.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdCreation;

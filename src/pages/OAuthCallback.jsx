import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { tiktokApi } from '../services/tiktokApi';
import { Loader2 } from 'lucide-react';

const OAuthCallback = ({ onLogin, setError }) => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Exchanging authorization code...');

    useEffect(() => {
        const code = searchParams.get('code');
        const errorParam = searchParams.get('error');

        const handleCallback = async () => {
            try {
                if (errorParam) throw { message: errorParam };
                if (!code) throw { message: 'No authorization code provided.' };

                await tiktokApi.exchangeToken(code);
                onLogin({
                    fullName: 'TikTok Ads Partner',
                    email: 'partner@tiktokads.com',
                    id: 'tt_' + Math.floor(Math.random() * 1000000),
                    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80'
                });
                navigate('/create-ad');
            } catch (err) {
                setError(err);
                navigate('/');
            }
        };

        handleCallback();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
            <div className="p-8 rounded-3xl glass text-center max-w-sm w-full">
                <Loader2 className="w-12 h-12 text-tiktok-pink animate-spin mx-auto mb-6" />
                <h2 className="text-xl font-bold mb-2">Connecting Account</h2>
                <p className="text-gray-400 text-sm">{status}</p>
            </div>
        </div>
    );
};

export default OAuthCallback;

import { mockGoogleApi } from "../mockApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
    const callApi = async () => {
        // For demo purposes, let's try to get the existing tiktok token if googleToken is missing
        // or just rely on what you manually set.
        const token = localStorage.getItem("googleToken");

        try {
            const res = await mockGoogleApi(token);
            alert(res.data.message);
        } catch (err) {
            if (err.status === 401) {
                alert(err.message);
                localStorage.removeItem("googleToken");
                window.location.href = "/login";
            }
        }
    };

    const setValidToken = () => {
        localStorage.setItem("googleToken", "valid_mock_token_123");
        alert("Token Set! Try calling API now.");
    };

    const setExpiredToken = () => {
        localStorage.setItem("googleToken", "expired_token");
        alert("Expired Token Set! API call will fail.");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center space-y-8 bg-black/90 p-10 text-white">
            <h2 className="text-3xl font-bold">Mock API Dashboard</h2>

            <div className="grid gap-4 w-full max-w-md">
                <button
                    onClick={setValidToken}
                    className="px-6 py-3 bg-green-600 rounded-xl font-bold hover:bg-green-500 transition-all"
                >
                    1. Set Valid Token
                </button>

                <button
                    onClick={setExpiredToken}
                    className="px-6 py-3 bg-red-600 rounded-xl font-bold hover:bg-red-500 transition-all"
                >
                    2. Set Expired Token
                </button>

                <button
                    onClick={callApi}
                    className="px-6 py-3 bg-tiktok-blue-500 bg-blue-600 rounded-xl font-bold hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20"
                >
                    3. Call Protected API
                </button>
            </div>

            <div className="mt-8 pt-8 border-t border-white/10 text-center">
                <p className="text-gray-500 text-sm mb-4">Current Token Status:</p>
                <code className="bg-black p-3 rounded-lg border border-white/10 block mb-4">
                    {localStorage.getItem("googleToken") || "No Token Found"}
                </code>
                <Link to="/ad-history" className="text-gray-400 hover:text-white underline">Back to Main App</Link>
            </div>
        </div>
    );
};

export default Dashboard;

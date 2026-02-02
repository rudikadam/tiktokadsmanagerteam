import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleLogin.css";

const dummyAccounts = [
    { name: "John Doe", email: "john.doe@gmail.com", avatar: "https://i.pravatar.cc/50?img=1", id: "g_1" },
    { name: "Jane Smith", email: "jane.smith@gmail.com", avatar: "https://i.pravatar.cc/50?img=2", id: "g_2" },
    { name: "Alice Brown", email: "alice.brown@gmail.com", avatar: "https://i.pravatar.cc/50?img=3", id: "g_3" }
];

export default function GoogleLogin({ onLogin }) {
    const [showAccounts, setShowAccounts] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignInClick = () => setShowAccounts(true);

    const handleAccountClick = (account) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            // Integrate with the main app's login system
            if (onLogin) {
                onLogin({
                    id: account.id,
                    email: account.email,
                    fullName: account.name,
                    avatar: account.avatar
                });
            }
            // Redirect to dashboard
            navigate('/ad-history');
        }, 1500);
    };

    return (
        <div className="google-login-page">
            <div className="google-overlay"></div>
            <div className="google-modal">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="Google logo"
                    className="google-logo-img"
                />
                <h2>Sign in</h2>
                <p>to continue to TikTok Ads Manager</p>

                {!showAccounts && !loading && (
                    <button className="google-btn" onClick={handleSignInClick}>
                        <img src="https://img.icons8.com/color/16/google-logo.png" alt="logo" />
                        Sign in with Google
                    </button>
                )}

                {showAccounts && !loading && (
                    <div className="accounts-list">
                        {dummyAccounts.map((account, index) => (
                            <div
                                key={index}
                                className="account-item"
                                onClick={() => handleAccountClick(account)}
                            >
                                <img src={account.avatar} alt="avatar" />
                                <div>
                                    <p className="name">{account.name}</p>
                                    <p className="email">{account.email}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {loading && (
                    <div className="google-loading">
                        <div className="google-spinner"></div>
                        <p>Signing in...</p>
                    </div>
                )}
            </div>
        </div>
    );
}

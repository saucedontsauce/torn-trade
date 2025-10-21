// src/components/Legal/CookieConsent.jsx
import { useState, useEffect } from "react";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem("cookie-consent");
        if (!consent) setVisible(true);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookie-consent", "accepted");
        setVisible(false);
    };

    if (!visible) return null;

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 text-gray-100 px-6 py-4 flex flex-col sm:flex-row justify-between items-center z-50">
            <p className="text-sm mb-2 sm:mb-0">
                We use cookies to improve your experience.{" "}
                <a href="/legal/cookies" className="underline text-blue-400">Learn more</a>
            </p>
            <button
                onClick={acceptCookies}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium"
            >
                Accept
            </button>
        </div>
    );
}

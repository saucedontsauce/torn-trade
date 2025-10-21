// src/pages/legal/Cookies.jsx
export default function CookiePolicyPage() {
    return (
        <div className="max-w-4xl mx-auto text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-white">Cookie Policy</h1>

            <p className="mb-4">
                We use cookies to enhance your browsing experience, analyze traffic, and provide personalized content.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">Types of Cookies</h2>
            <ul className="list-disc list-inside mb-4">
                <li><strong>Essential:</strong> Required for site operation.</li>
                <li><strong>Analytics:</strong> Help us understand how visitors use the site.</li>
                <li><strong>Functional:</strong> Remember preferences and settings.</li>
            </ul>

            <p className="mb-4">
                You can manage or disable cookies in your browser settings.
            </p>

            <p className="text-sm text-gray-400">
                For more details, contact: <a href="mailto:privacy@yourapp.com" className="underline">privacy@yourapp.com</a>
            </p>
        </div>
    );
}

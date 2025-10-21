// src/pages/legal/Privacy.jsx
export default function PrivacyPage() {
    return (
        <div className="max-w-4xl mx-auto text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-white">Privacy Policy</h1>
            <p className="mb-4">
                Last updated: October 2025
            </p>

            <p className="mb-4">
                This Privacy Policy explains how we collect, use, and protect your personal data in compliance with the
                <strong> General Data Protection Regulation (GDPR)</strong> and the <strong>UK Data Protection Act 2018</strong>.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">1. Data We Collect</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Account information (name, email)</li>
                <li>Usage data (pages visited, interactions)</li>
                <li>Cookies and analytics data</li>
            </ul>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">2. How We Use Your Data</h2>
            <p className="mb-4">
                We use your data to provide services, improve performance, and comply with legal obligations.
            </p>

            <h2 className="text-xl font-semibold mt-6 mb-2 text-white">3. Your Rights</h2>
            <ul className="list-disc list-inside mb-4">
                <li>Access your data</li>
                <li>Request correction or deletion</li>
                <li>Withdraw consent at any time</li>
            </ul>

            <p className="mb-4">
                To exercise your rights, please visit our <a href="/legal/data-request" className="text-blue-400 underline">Data Request page</a>.
            </p>

            <p className="mt-8 text-sm text-gray-400">
                For questions, contact us at: <a href="mailto:privacy@yourapp.com" className="underline">privacy@yourapp.com</a>
            </p>
        </div>
    );
}

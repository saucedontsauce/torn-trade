// src/pages/legal/DataRequest.jsx
import { useState } from "react";

export default function DataRequestPage() {
    const [email, setEmail] = useState("");
    const [requestType, setRequestType] = useState("access");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // In production, submit to backend or support email
        setSubmitted(true);
    };

    return (
        <div className="max-w-2xl mx-auto text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-white">Data Request Form</h1>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2">Email</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2">Request Type</label>
                        <select
                            value={requestType}
                            onChange={(e) => setRequestType(e.target.value)}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
                        >
                            <option value="access">Access My Data</option>
                            <option value="delete">Delete My Data</option>
                            <option value="update">Update My Data</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold"
                    >
                        Submit Request
                    </button>
                </form>
            ) : (
                <p className="text-green-400 mt-4">
                    Your request has been submitted. We’ll contact you at {email} within 30 days.
                </p>
            )}
        </div>
    );
}

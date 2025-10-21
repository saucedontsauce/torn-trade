import { useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function ContactPage() {
    const { db, user } = useContext(AppContext);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await addDoc(collection(db, "supportMessages"), {
                ...formData,
                userId: user?.uid || null,
                createdAt: serverTimestamp(),
                status: "open", // can use for admin workflow later
            });
            setSubmitted(true);
        } catch (err) {
            console.error("Error submitting support message:", err);
            setError("There was a problem sending your message. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-white">Contact Us</h1>
            <p className="mb-6 text-gray-400">
                If you have any questions, feedback, or data concerns, and feel free to message me in game my ID is [].
                I’ll get back to you through chat next time I'm online.
            </p>
            <p className="mb-6 text-gray-400">
                If you really want to please use this form.
                I’ll get back to you through your registered email as soon as possible.
            </p>

            {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm mb-2 text-gray-300">Name</label>
                        <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-300">Email</label>
                        <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-2 text-gray-300">Message</label>
                        <textarea
                            name="message"
                            required
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100 resize-none"
                        ></textarea>
                    </div>

                    {error && <p className="text-red-400 text-sm">{error}</p>}

                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 px-6 py-2 rounded-lg font-semibold"
                    >
                        {loading ? "Sending..." : "Send Message"}
                    </button>
                </form>
            ) : (
                <div className="mt-6 text-green-400">
                    <p>✅ Your message has been received. We’ll reply to {formData.email} soon.</p>
                </div>
            )}

            <div className="mt-10 border-t border-gray-800 pt-6 text-sm text-gray-400">
                <p>
                    <strong>Data Protection Contact:</strong>
                    <br />
                    Adam Auckland-Blaydes
                    <br />
                    Email: <a href="mailto:privacy@yourapp.com" className="underline">adamab1122@hotmail.com</a>
                    <br />
                    (For data access or deletion requests, please use the{" "}
                    <a href="/legal/data-request" className="underline text-blue-400">Data Request page</a>.)
                </p>
            </div>
        </div>
    );
}

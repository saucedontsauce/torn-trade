import { useEffect, useState, useContext } from "react";
import { AppContext } from "@/context/AppContext";
import {
    collection,
    getDocs,
    updateDoc,
    doc,
    query,
    orderBy,
} from "firebase/firestore";

export default function SupportDashboard() {
    const { db, user } = useContext(AppContext);
    const [messages, setMessages] = useState([]);
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // 🧩 Fetch all support messages
    const fetchMessages = async () => {
        try {
            setLoading(true);
            const q = query(collection(db, "supportMessages"), orderBy("createdAt", "desc"));
            const snapshot = await getDocs(q);
            const docs = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
            setMessages(docs);
        } catch (err) {
            console.error(err);
            setError("Failed to load messages.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateDoc(doc(db, "supportMessages", id), { status: newStatus });
            setMessages((prev) =>
                prev.map((m) => (m.id === id ? { ...m, status: newStatus } : m))
            );
        } catch (err) {
            console.error(err);
            alert("Failed to update message status.");
        }
    };

    // 🧩 Filter messages
    const filteredMessages =
        filter === "all"
            ? messages
            : messages.filter((m) => m.status === filter);

    // 🧩 Simple access guard
    if (!user || !user.isAdmin) {
        return (
            <div className="text-center mt-20 text-red-400">
                Access denied. Admins only.
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto text-gray-200">
            <h1 className="text-3xl font-bold mb-6 text-white">Support Dashboard</h1>

            <div className="flex justify-between items-center mb-6">
                <div className="flex gap-2">
                    {["all", "open", "replied", "closed"].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-2 rounded-lg border border-gray-700 ${filter === f
                                ? "bg-blue-600 text-white"
                                : "bg-gray-800 hover:bg-gray-700"
                                }`}
                        >
                            {f.charAt(0).toUpperCase() + f.slice(1)}
                        </button>
                    ))}
                </div>
                <button
                    onClick={fetchMessages}
                    className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
                >
                    Refresh
                </button>
            </div>

            {loading ? (
                <p>Loading messages...</p>
            ) : error ? (
                <p className="text-red-400">{error}</p>
            ) : filteredMessages.length === 0 ? (
                <p className="text-gray-400">No messages found.</p>
            ) : (
                <div className="space-y-4">
                    {filteredMessages.map((msg) => (
                        <div
                            key={msg.id}
                            className="bg-gray-800 border border-gray-700 rounded-xl p-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="font-semibold text-white mb-1">
                                        {msg.name || "Anonymous"}
                                    </h2>
                                    <p className="text-sm text-gray-400">{msg.email}</p>
                                </div>
                                <span
                                    className={`text-xs px-2 py-1 rounded ${msg.status === "open"
                                        ? "bg-yellow-600 text-white"
                                        : msg.status === "replied"
                                            ? "bg-blue-600 text-white"
                                            : "bg-green-600 text-white"
                                        }`}
                                >
                                    {msg.status}
                                </span>
                            </div>

                            <p className="mt-4 text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </p>

                            <div className="mt-4 flex gap-3">
                                {msg.status !== "replied" && (
                                    <button
                                        onClick={() => handleStatusChange(msg.id, "replied")}
                                        className="bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded text-sm"
                                    >
                                        Mark Replied
                                    </button>
                                )}
                                {msg.status !== "closed" && (
                                    <button
                                        onClick={() => handleStatusChange(msg.id, "closed")}
                                        className="bg-green-600 hover:bg-green-700 px-4 py-1 rounded text-sm"
                                    >
                                        Mark Closed
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

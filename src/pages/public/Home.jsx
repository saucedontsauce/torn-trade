import { } from "react-router";
import TEMPLATE1 from "./TEMPLATE1";
import { useEffect, useState } from "react";

import { Link, useLocation } from "react-router";
import { ArrowRight, DollarSign, ClipboardList, MessageSquare } from "lucide-react";

export default function Home({ items }) {
    const { hash } = useLocation();
    const [userHash, setUserHash] = useState(false)

    useEffect(() => {
        if (hash) {
            setUserHash(hash.split("").splice(1, hash.length).join(""))
        }
    }, [hash])

    if (userHash) { return <TEMPLATE1 items={items} hash={userHash} /> }
    return (
        <div className="flex flex-col gap-20">
            {/* HERO SECTION */}
            <section className="text-center mt-10">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                    Torn Trade Helper
                </h1>
                <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                    Your all-in-one assistant for trading in Torn. Get real-time item prices,
                    manage trade templates, and optimize every deal — all in one place.
                </p>

                <div className="flex justify-center gap-4">
                    <Link
                        to="/user/list"
                        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-semibold flex items-center gap-2 transition"
                    >
                        View Price Lists <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        to="/register"
                        className="px-6 py-3 border border-gray-500 hover:bg-gray-800 rounded-xl text-gray-200 font-semibold transition"
                    >
                        Get Started
                    </Link>
                </div>
            </section>

            {/* FEATURES */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <DollarSign className="w-10 h-10 text-indigo-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Live Price Lists</h2>
                    <p className="text-gray-400">
                        Instantly access updated Torn item prices. Stop guessing and make
                        smarter trades.
                    </p>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <ClipboardList className="w-10 h-10 text-indigo-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Trade Templates</h2>
                    <p className="text-gray-400">
                        Save and reuse trade offers, ensuring consistency and faster
                        negotiations every time.
                    </p>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <MessageSquare className="w-10 h-10 text-indigo-400 mb-4" />
                    <h2 className="text-xl font-semibold mb-2">Community Chat</h2>
                    <p className="text-gray-400">
                        Chat with other traders directly in-app. Share deals, tips, and stay
                        updated on market trends.
                    </p>
                </div>
            </section>


            {/* CTA */}
            <section className="text-center py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to streamline your trading?
                </h2>
                <p className="text-gray-400 mb-6">
                    Create an account and take control of your Torn trading strategy today.
                </p>
                <Link
                    to="/register"
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
                >
                    Sign Up Now
                </Link>
            </section>
        </div>
    );
}

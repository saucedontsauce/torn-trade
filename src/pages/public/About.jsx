import { ChevronDown } from "lucide-react";
import { useState } from "react";

const faqData = [
    {
        question: "What is Torn Trade Helper?",
        answer:
            "Torn Trade Helper is an all-in-one assistant for Torn.com traders. It provides live item prices, pricing sheets, trade templates, and a community chat to help you optimize every trade.",
    },
    {
        question: "Do I need a Torn.com account?",
        answer:
            "Technically no, but there'd not really be any point. You can log in and create a price sheet and access trade templates without providing your API key, although you'll need a Torn.com account + API key for features such as automatic name changing.",
    },
    {
        question: "Is my data safe?",
        answer:
            "Absolutely. Your account info is securely handled via Firebase Authentication, and we do not store sensitive Torn passwords.",
    },
    {
        question: "How often are item prices updated?",
        answer:
            "Prices are updated in real-time whenever our backend fetches the latest data from Torn.com. You always get the most accurate market info.",
    },
];

export default function About() {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="flex flex-col gap-16 container mx-auto p-6">
            {/* HERO */}
            <section className="text-center mt-10">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    About Torn Trade Helper
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl">
                    Torn Trade Helper is designed to make your trading in Torn.com faster,
                    smarter, and more efficient. Track prices, save trade templates, and
                    connect with the community—all in one place.
                </p>
            </section>

            {/* FEATURES */}
            <section className="grid md:grid-cols-3 gap-8">
                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">
                        Live Price Tracking
                    </h2>
                    <p className="text-gray-400">
                        Always know the current market value of items with real-time price
                        updates.
                    </p>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">
                        Trade Templates
                    </h2>
                    <p className="text-gray-400">
                        Save commonly used trade offers for quick and consistent deals.
                    </p>
                </div>

                <div className="p-6 bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition">
                    <h2 className="text-xl font-semibold mb-2 text-indigo-400">
                        Community Chat
                    </h2>
                    <p className="text-gray-400">
                        Connect with other traders to share insights, tips, and deals in
                        real-time.
                    </p>
                </div>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl mx-auto">
                <h2 className="text-3xl font-bold text-white mb-6 text-center">FAQ</h2>
                <div className="flex flex-col gap-4">
                    {faqData.map((item, index) => (
                        <div
                            key={index}
                            className="bg-gray-800 rounded-xl p-4 cursor-pointer"
                            onClick={() => toggleFAQ(index)}
                        >
                            <div className="flex justify-between items-center">
                                <h3 className="text-lg md:text-xl font-semibold text-white">
                                    {item.question}
                                </h3>
                                <ChevronDown
                                    className={`w-5 h-5 text-indigo-400 transition-transform ${openIndex === index ? "rotate-180" : ""
                                        }`}
                                />
                            </div>
                            {openIndex === index && (
                                <p className="mt-2 text-gray-400">{item.answer}</p>
                            )}
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="text-center py-10">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    Ready to start trading smarter?
                </h2>
                <p className="text-gray-400 mb-6">
                    Join Torn Trade Helper today and take your trades to the next level.
                </p>
                <a
                    href="/register"
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition"
                >
                    Sign Up Now
                </a>
            </section>
        </div>
    );
}

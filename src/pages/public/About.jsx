import { useState } from "react";

function FAQItem({ question, answer }) {
    const [open, setOpen] = useState(false)

    return (
        <div className="border-b py-3">
            <button
                onClick={() => setOpen(!open)}
                className="w-full cursor-pointer flex justify-between items-center text-left text-lg font-medium focus:outline-none"
            >
                <span>{question}</span>
                <span className="text-gray-500">{open ? "−" : "+"}</span>
            </button>
            {open && (
                <p className="mt-2 text-gray-600 transition-all duration-200">
                    {answer}
                </p>
            )}
        </div>
    )
}

export default function About() {
    const faqs = [
        { question: "How do I reset my password?", answer: "Currently, I've not got it rigged up but i will soon.", future_answer: "Click 'Forgot password?' on the login screen." },
        { question: "Can I use Google sign-in?", answer: "Yes! Just click 'Sign in with Google' on the login page." },
        { question: "Is my data private?", answer: "Yes. Your todos and chat messages are tied to your account only." },
        { question: "Do you use my API key?", answer: "No. Your API key is only used to fill out data on your end, non of your torn data is stored in my database." }
    ]

    return (
        <div>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">About</h1>
                <p>
                    This dashboard securely fetches Torn.com API data through Google Apps Script,
                    keeping my API key safe while serving fast, static pages on GitHub Pages that can feed from automatically updating data.
                </p>
            </div>
            <div className="max-w-2xl mx-auto p-6">
                <h1 className="text-3xl font-semibold mb-6">Frequently Asked Questions</h1>
                {faqs.map((faq, i) => (
                    <FAQItem key={i} {...faq} />
                ))}
            </div>

        </div>
    );
}

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router'

import { getAuth, sendEmailVerification } from "firebase/auth";

import writeDoc from '@/firebase/fn/writeDoc'



export default function Profile() {

    const { user, setUser } = useApp()

    const auth = getAuth();

    console.log(user)

    const [username, setUsername] = useState("");
    const [nameCooldown, setNameCooldown] = useState(0);

    const [link, setLink] = useState("");
    const [linkCooldown, setLinkCooldown] = useState(0);

    const [verifyCooldown, setVerifyCooldown] = useState(0);

    useEffect(() => {
        if (nameCooldown > 0 || verifyCooldown > 0 || linkCooldown > 0) {
            const timer = setTimeout(() => {
                nameCooldown > 0 && setNameCooldown(nameCooldown - 1);
                verifyCooldown > 0 && setVerifyCooldown(verifyCooldown - 1);
                linkCooldown > 0 && setLinkCooldown(linkCooldown - 1);
            }, 1000);

            return () => clearTimeout(timer);
        }
    }, [verifyCooldown, nameCooldown, linkCooldown]);

    const handleNameChange = async () => {
        // TODO: Add logic to update username in Firestore or Auth
        console.log("Change username to:", username);

        await writeDoc("users", { displayName: username }, user.uid, true)
        setUser({ ...user, displayName: username })

        setNameCooldown(5); // start 60-second cooldown
    };

    function handleVerify() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                console.log("email sent");
                setVerifyCooldown(60)
            });
    };

    const handleLinkChange = async () => {
        // TODO: Add logic to update link in Firestore
        console.log("Change link to:", link);

        await writeDoc("users", { link: link }, user.uid, true)
        setUser({ ...user, link: link })

        setLinkCooldown(5); // start 60-second cooldown
    };

    return (
        <Card className="flex-col mx-auto p-6 text-center bg-gray-800">
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            <img src={user.photoURL} onError={({ currentTarget }) => {
                currentTarget.onerror = null;
                currentTarget.src = "https://placehold.co/32x32";
            }} alt="avatar" className="w-16 h-16 rounded-full mx-auto mb-3" />
            <p className="text-lg font-medium">{user.displayName} ({user.emailVerified ? "verified" : "unverified"})</p>
            <p className="text-gray-400 mb-3">{user.email}</p>
            <p className="text-gray-400 mb-4">Credits: {" " + user.credits}</p>
            {user.emailVerified && <div className="py-4">
                <h2 className="text-lg font-semibold mb-3">Verify Email</h2>
                <button
                    onClick={handleVerify}
                    disabled={verifyCooldown > 0}
                    className={` px-4 py-2 rounded-lg font-medium transition ${verifyCooldown > 0
                        ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700 text-white"
                        }`}
                >{verifyCooldown > 0 ? verifyCooldown + "s" : "Send Verification Email"}</button>

            </div>}
            <div className="py-4">
                <h2 className="text-lg font-semibold mb-3">Change Username</h2>
                <div className="flex flex-wrap items-center justify-evenly gap-2">
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter new username"
                        className=" px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleNameChange}
                        disabled={nameCooldown > 0 || !username.trim()}
                        className={` px-4 py-2 rounded-lg font-medium transition ${nameCooldown > 0 || !username.trim()
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >{nameCooldown > 0 ? nameCooldown + "s" : "Change"}</button>
                </div>
            </div>

            <div className="py-4">
                <h2 className="text-lg font-semibold mb-3">Change Link</h2>
                <div className="flex flex-wrap items-center justify-evenly gap-2">
                    <input
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        placeholder="Enter new link"
                        className=" px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleLinkChange}
                        disabled={linkCooldown > 0 || !link.trim()}
                        className={` px-4 py-2 rounded-lg font-medium transition ${linkCooldown > 0 || !link.trim()
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700 text-white"
                            }`}
                    >{linkCooldown > 0 ? linkCooldown + "s" : "Change"}</button>
                </div>
            </div>
            <Link to="/" className="text-blue-500 mt-4">Back to Dashboard</Link>
        </Card>

    );
}

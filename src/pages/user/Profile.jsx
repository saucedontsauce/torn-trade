import { useApp } from "@/context/AppContext";
import { Card } from '@/components/ui/Card'
import { Link } from 'react-router'

import { getAuth, sendEmailVerification } from "firebase/auth";



export default function Profile() {

    const auth = getAuth();
    const user = auth.currentUser;

    console.log(user)

    function handleVerify() {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                // Email verification sent!
                // ...
                console.log("email sent")
            });
    }


    return (
        <Card className="p-6 w-80 text-center bg-gray-800">
            <h1 className="text-2xl font-semibold mb-4">Profile</h1>
            <img src={user.photoURL} alt="avatar" className="w-16 h-16 rounded-full mx-auto mb-3" />
            <p className="text-lg font-medium">{user.displayName} ({user.verified ? "verified" : "unverified"})</p>
            <p className="text-gray-600 mb-4">{user.email}</p>
            <Link to="/" className="text-blue-500">Back to Dashboard</Link>
        </Card>

    );
}

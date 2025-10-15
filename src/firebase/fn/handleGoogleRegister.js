import { useNavigate } from "react-router";
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '@/firebase/config'
import { initializeUserData } from "@/firebase/initUserData";


const handleGoogleRegister = async (setError) => {
    const navigate = useNavigate()

    const provider = new GoogleAuthProvider()
    try {
        const result = await signInWithPopup(auth, provider)
        await initializeUserData(result.user)
        navigate('/')
    } catch (err) {
        setError(err.message)
    }
}
export default handleGoogleRegister
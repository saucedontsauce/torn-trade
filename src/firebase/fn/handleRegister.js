import { useNavigate } from "react-router";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from '@/firebase/config';
import { initializeUserData } from "@/firebase/initUserData";

const handleRegister = async (e, setError, name, email, password) => {
    e.preventDefault()
    const navigate = useNavigate()
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        await updateProfile(userCredential.user, { displayName: name })
        await initializeUserData(userCredential.user)
        navigate('/')
    } catch (err) {
        setError(err.message)
    }
}

export default handleRegister
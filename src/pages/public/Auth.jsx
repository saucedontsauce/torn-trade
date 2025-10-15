import { useState } from 'react'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '@/firebase/config'
import { initializeUserData } from '@/firebase/initUserData'
import { Card } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { Link, useNavigate } from 'react-router'

import handleRegister from '@/firebase/fn/handleRegister'
import handleGoogleRegister from '@/firebase/fn/handleGoogleRegister'


export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')

    return (
        <Card className="p-6 w-80 bg-gray-800 mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={(e) => handleRegister(e, setError, name, email, password)} className="space-y-3">
                <Input
                    autoComplete="username"
                    type="text"
                    placeholder="Display Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                <Input
                    autoComplete="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    autoComplete="new-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">Register</Button>
            </form>
            <Button onClick={() => handleGoogleRegister(setError)} className="w-full mt-3">
                Sign up with Google
            </Button>
            <p className="text-sm mt-3 text-center">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-500">Login</Link>
            </p>
        </Card>
    )
};

export function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password)
            await initializeUserData(userCredential.user)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider()
        try {
            const result = await signInWithPopup(auth, provider)
            await initializeUserData(result.user)
            navigate('/')
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <Card className="p-6 w-80 bg-gray-800 mx-auto">
            <h1 className="text-2xl font-semibold mb-4 text-center">Login</h1>
            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
            <form onSubmit={handleLogin} className="space-y-3">
                <Input
                    autoComplete="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    autoComplete="current-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit" className="w-full">Login</Button>
            </form>
            <Button onClick={handleGoogleLogin} className="w-full mt-3">
                Sign in with Google
            </Button>
            <p className="text-sm mt-3 text-center">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500">Register</Link>
            </p>
        </Card>
    )
}

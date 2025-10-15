import { db } from './config'
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'
import writeDoc from '@/firebase/fn/writeDoc'
import readDoc from '@/firebase/fn/readDoc'

export async function initializeUserData(user, setUser) {
    console.log("init user data called")

    const userRef = doc(db, 'users', user.uid)
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) {
        await writeDoc("users",
            {
                displayName: user.displayName || 'Anonymous',
                email: user.email,
                credits: 0,
                photoURL: user.photoURL || '',
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp()
            },
            user.uid);

        const userDoc = await readDoc("users", user.uid)
        setUser(userDoc)

        await addDoc(collection(db, 'messages'), {
            text: `👋 ${user.displayName || 'User'} joined the chat!`,
            uid: 'System',
            displayName: 'System',
            photoURL: '',
            lastLogin: serverTimestamp(),
            createdAt: serverTimestamp()
        })

        await addDoc(collection(db, 'lists'), {
            text: `👋 Hi and welcome to ${user.displayName || 'User'}'s price sheet!`,
            uid: 'System',
            displayName: 'System',
            visible: false,
            order: [],
            prices: {},
            photoURL: '',
            createdAt: serverTimestamp()
        })

    } else {
        await writeDoc("users",
            {
                uid: user.uid,
                email: user.email,
                emailVerified: user.emailVerified,
                phoneNumber: user.phoneNumber,
                lastLogin: serverTimestamp()
            },
            user.uid, true);
        const userDoc = await readDoc("users", user.uid)
        setUser(userDoc)
    }
}

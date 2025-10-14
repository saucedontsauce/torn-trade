import { db } from './config'
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore'

export async function initializeUserData(user) {
    const userRef = doc(db, 'users', user.uid)
    const snapshot = await getDoc(userRef)
    if (!snapshot.exists()) {
        await setDoc(userRef, {
            displayName: user.displayName || 'Anonymous',
            email: user.email,
            listRef: userRef,
            credits: 0,
            photoURL: user.photoURL || '',
            createdAt: serverTimestamp()
        })

        await addDoc(collection(db, 'messages'), {
            text: `👋 ${user.displayName || 'User'} joined the chat!`,
            uid: 'System',
            displayName: 'System',
            photoURL: '',
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

    }
}

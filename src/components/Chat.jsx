import { useEffect, useState } from 'react'
import { auth, db } from '@/firebase/config'
import { collection, addDoc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore'
import { Card, CardHeader, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function Chat() {
    const user = auth.currentUser
    const [messages, setMessages] = useState([])
    const [newMsg, setNewMsg] = useState('')

    useEffect(() => {
        const q = query(collection(db, 'messages'), orderBy('createdAt', 'asc'))
        const unsub = onSnapshot(q, snapshot => {
            setMessages(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })))
        })
        return unsub
    }, [])

    const sendMessage = async (e) => {
        e.preventDefault()
        if (!newMsg.trim()) return
        await addDoc(collection(db, 'messages'), {
            text: newMsg,
            uid: user.uid,
            photoURL: user.photoURL,
            displayName: user.displayName,
            createdAt: serverTimestamp()
        })
        setNewMsg('')
    }

    return (
        <Card className="p-4 h-full flex flex-col">
            <CardHeader className="font-semibold text-lg">Chat Room</CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-2">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.uid === user.uid ? 'justify-end' : 'justify-start'}`}>
                        <div className={`p-2 rounded-lg ${msg.uid === user.uid ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
                            {msg.uid !== user.uid && <p className="text-sm bold">{msg.displayName}</p>}
                            <p className="text-sm">{msg.text}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
            <form onSubmit={sendMessage} className="flex gap-2 mt-2">
                <Input value={newMsg} onChange={e => setNewMsg(e.target.value)} placeholder="Type message..." />
                <Button type="submit">Send</Button>
            </form>
        </Card>
    )
}

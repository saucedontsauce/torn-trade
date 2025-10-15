import { db } from "@/firebase/config"
import { doc, setDoc } from "firebase/firestore"

export default async function writeDoc(col, data, id, merge) {
    const ref = doc(db, col, id)
    await setDoc(ref, data, merge && { merge: true })
}
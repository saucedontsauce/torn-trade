import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"

export default async function readDoc(col, id) {
    const ref = doc(db, col, id)
    try {
        const docSnap = await getDoc(ref);
        if (docSnap.exists()) {
            console.log("data", docSnap.data());
            return docSnap.data()
        } else {
            console.log("Document does not exist")
        }
    } catch (error) {
        console.log(error)
    }
}
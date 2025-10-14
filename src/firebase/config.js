import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyCifPSCAi3xjzRJVK7mNpctuqjgj3Q1DzQ",
    authDomain: "torn-trading.firebaseapp.com",
    projectId: "torn-trading",
    storageBucket: "torn-trading.firebasestorage.app",
    messagingSenderId: "455485576469",
    appId: "1:455485576469:web:fd6a93ac1085a91b33051c",
    measurementId: "G-G6GV97H932"
};

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const analytics = getAnalytics(app);

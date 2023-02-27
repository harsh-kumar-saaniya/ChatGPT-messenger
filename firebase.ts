import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCjumOPP8cFpOzdHywrNQFMHZ1nJHwuaO8",
    authDomain: "chatgpt-harish.firebaseapp.com",
    projectId: "chatgpt-harish",
    storageBucket: "chatgpt-harish.appspot.com",
    messagingSenderId: "887820671401",
    appId: "1:887820671401:web:4a4809833c0cd1ee3a0cb8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app)

export { db };
// lib/firebase.js
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { 
    apiKey: "AIzaSyCGPt6ytfKTE94C93N-BM34JuAsKmqwdsE",
  authDomain: "optimal-shopping.firebaseapp.com",
  projectId: "optimal-shopping",
  storageBucket: "optimal-shopping.firebasestorage.app",
  messagingSenderId: "96494812467",
  appId: "1:96494812467:web:6291b0f88f197255315246",
  measurementId: "G-NJ23QLTYNW"};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);

export { db };

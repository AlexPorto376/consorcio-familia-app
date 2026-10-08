import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDpro8_3PiQarOunhp0CN53ka4qvbZ_49c",
    authDomain: "consorciofamilia.firebaseapp.com",
    projectId: "consorciofamilia",
    storageBucket: "consorciofamilia.firebasestorage.app",
    messagingSenderId: "127161021458",
    appId: "1:127161021458:web:ea827823e3af42578994cb",
    measurementId: "G-FS95BGPVSG"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
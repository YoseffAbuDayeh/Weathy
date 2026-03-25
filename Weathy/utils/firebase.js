// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBqgGXXvJwaeyW6QoVyluanTJ1Xi_OoYUY",
  authDomain: "weathy-d2d1a.firebaseapp.com",
  projectId: "weathy-d2d1a",
  storageBucket: "weathy-d2d1a.firebasestorage.app",
  messagingSenderId: "777322303093",
  appId: "1:777322303093:web:c497fa234db7c5daa6323c",
  measurementId: "G-KZD76XPF5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
// TODO : Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5lsKgLRaZvVkCddbA0geEzEGvjkVzEqY",
  authDomain: "healthify-5c2c1.firebaseapp.com",
  projectId: "healthify-5c2c1",
  storageBucket: "healthify-5c2c1.firebasestorage.app",
  messagingSenderId: "729074524454",
  appId: "1:729074524454:web:0265b69ebb5ebbcad361e7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;
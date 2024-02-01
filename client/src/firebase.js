// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-ca93d.firebaseapp.com",
  projectId: "mern-blog-ca93d",
  storageBucket: "mern-blog-ca93d.appspot.com",
  messagingSenderId: "12545423552",
  appId: "1:12545423552:web:b5f82a345429ba5113d525"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
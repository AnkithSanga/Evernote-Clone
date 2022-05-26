// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB_Yd8UD-IOZG8Y58yiXGM4iv7g6sYVfo",
  authDomain: "evernoteclone-c669c.firebaseapp.com",
  projectId: "evernoteclone-c669c",
  storageBucket: "evernoteclone-c669c.appspot.com",
  messagingSenderId: "151890482973",
  appId: "1:151890482973:web:d074ad7612c9496e99f3f4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
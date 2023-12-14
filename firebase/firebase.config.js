// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import firestore from "@react-native-firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCstNEv-P87_Z3MOo9CtyS_oRndruyFX9A",
  authDomain: "rail-app-efa08.firebaseapp.com",
  projectId: "rail-app-efa08",
  storageBucket: "rail-app-efa08.appspot.com",
  messagingSenderId: "909493050364",
  appId: "1:909493050364:web:3404ce022e843a183b3079",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
// console.log(db.toJSON())

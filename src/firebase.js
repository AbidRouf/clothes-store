// firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyDgV8Y-uOiqnCYQGtBqHFaG8f2RMSMQwHQ",
  authDomain: "khafor-fec92.firebaseapp.com",
  projectId: "khafor-fec92",
  storageBucket: "khafor-fec92.appspot.com",
  messagingSenderId: "294798409512",
  appId: "1:294798409512:web:16f3008deb95c10e489a1d",
  measurementId: "G-4MQB00BNY9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };

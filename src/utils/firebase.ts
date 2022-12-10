import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

const firebaseConfig = {
    apiKey: "AIzaSyB4y16NDbvnczf0AS3Vb3q9dsJdgX-adPI",
    authDomain: "lights-out-7f416.firebaseapp.com",
    projectId: "lights-out-7f416",
    storageBucket: "lights-out-7f416.appspot.com",
    messagingSenderId: "757272040675",
    appId: "1:757272040675:web:4b656eec15308db13a61d6"
  };
  
const app = initializeApp(firebaseConfig);
export const db = getFirestore();


// Get a list of cities from your database

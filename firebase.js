import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBQeyC89bahQi66yomWWbDAkmEY4TQCAPA",
  authDomain: "farmly-9f22c.firebaseapp.com",
  projectId: "farmly-9f22c",
  storageBucket: "farmly-9f22c.appspot.com",
  messagingSenderId: "158072228214",
  appId: "1:158072228214:web:c945188feb2257ce9e9257"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = initializeFirestore(app, {experimentalForceLongPolling: true});

export {db, auth}
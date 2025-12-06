import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırması (ruyavip-free project)
const firebaseConfig = {
  apiKey: "AIzaSyBF1B41pC47dVHXEahC4yndzKqMGMm9ygQ",
  authDomain: "ruyavip-free.firebaseapp.com",
  projectId: "ruyavip-free",
  storageBucket: "ruyavip-free.firebasestorage.app",
  messagingSenderId: "44458847938",
  appId: "1:44458847938:web:4637b7092ebceb6c1cd55b"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Servisleri dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyBVEt-kHSj0ao43yZBZGzHdxBFk7cdl5cU",
  authDomain: "ruyavip-production.firebaseapp.com",
  projectId: "ruyavip-production",
  storageBucket: "ruyavip-production.firebasestorage.app",
  messagingSenderId: "1069267301859",
  appId: "1:1069267301859:web:00fac72e05e4bec6d5dbe9"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Servisleri dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

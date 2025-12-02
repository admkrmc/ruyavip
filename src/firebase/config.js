import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDVj4p1PuGWyGzRwKYDTFTc7nWND4GJhyk",
  authDomain: "ruyavip-production.firebaseapp.com",
  projectId: "ruyavip-production",
  storageBucket: "ruyavip-production.firebasestorage.app",
  messagingSenderId: "582927040920",
  appId: "1:582927040920:web:9678ca4d845175c6d9ebed"
};

// Firebase başlat
const app = initializeApp(firebaseConfig);

// Servisleri dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export default app;

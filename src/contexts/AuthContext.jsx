import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [currentInstitution, setCurrentInstitution] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rememberedUsers, setRememberedUsers] = useState(() => {
    const saved = localStorage.getItem('rememberedUsers');
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);

      if (user) {
        // Kullanıcı profilini Firestore'dan al
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const profile = userDoc.data();
          setUserProfile(profile);

          // İlk kurumu otomatik seç
          if (profile.institutions && profile.institutions.length > 0) {
            setCurrentInstitution(profile.institutions[0]);
          }
        }
      } else {
        setUserProfile(null);
        setCurrentInstitution(null);
      }

      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signIn = async (email, password) => {
    return await signInWithEmailAndPassword(auth, email, password);
  };

  const signOut = async () => {
    await firebaseSignOut(auth);
    setUserProfile(null);
    setCurrentInstitution(null);
  };

  const switchInstitution = async (institutionId, password) => {
    // Şifre kontrolü (demo için basit kontrol)
    if (password !== '123456' && !rememberedUsers[institutionId]) {
      throw new Error('Şifre yanlış');
    }

    // Kurumu değiştir
    const institution = userProfile.institutions.find(inst => inst.id === institutionId);
    if (institution) {
      setCurrentInstitution(institution);
      return true;
    }
    return false;
  };

  const switchUser = async (userId, password) => {
    // Kullanıcı geçişi (demo için basit kontrol)
    if (password !== '123456' && !rememberedUsers[userId]) {
      throw new Error('Şifre yanlış');
    }

    // Kullanıcı bilgilerini güncelle
    const userDoc = await getDoc(doc(db, 'users', userId));
    if (userDoc.exists()) {
      setUserProfile(userDoc.data());
      return true;
    }
    return false;
  };

  const rememberUser = (userId) => {
    const updated = { ...rememberedUsers, [userId]: true };
    setRememberedUsers(updated);
    localStorage.setItem('rememberedUsers', JSON.stringify(updated));
  };

  const value = {
    currentUser,
    userProfile,
    currentInstitution,
    loading,
    signIn,
    signOut,
    switchInstitution,
    switchUser,
    rememberUser,
    rememberedUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

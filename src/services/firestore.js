/**
 * Firestore Service Layer
 * Merkezi CRUD operasyonları ve Firebase Firestore entegrasyonu
 *
 * @module services/firestore
 */

import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  Timestamp
} from 'firebase/firestore';
import { db } from '../firebase/config';

/**
 * Generic CRUD Operations
 */

/**
 * Koleksiyondaki tüm dökümanları getirir
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {Object} options - Query seçenekleri (where, orderBy, limit)
 * @returns {Promise<Array>} Döküman listesi
 */
export const getAll = async (collectionName, options = {}) => {
  try {
    let q = collection(db, collectionName);

    // Where clause
    if (options.where) {
      const [field, operator, value] = options.where;
      q = query(q, where(field, operator, value));
    }

    // Order by
    if (options.orderBy) {
      const [field, direction = 'asc'] = Array.isArray(options.orderBy)
        ? options.orderBy
        : [options.orderBy];
      q = query(q, orderBy(field, direction));
    }

    // Limit
    if (options.limit) {
      q = query(q, limit(options.limit));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
      updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
    }));
  } catch (error) {
    console.error(`Error fetching ${collectionName}:`, error);
    throw error;
  }
};

/**
 * ID'ye göre tek bir döküman getirir
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {string} id - Döküman ID'si
 * @returns {Promise<Object|null>} Döküman verisi veya null
 */
export const getById = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || docSnap.data().createdAt,
        updatedAt: docSnap.data().updatedAt?.toDate?.() || docSnap.data().updatedAt
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching document ${id} from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Yeni döküman ekler
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {Object} data - Eklenecek veri
 * @returns {Promise<string>} Oluşturulan döküman ID'si
 */
export const create = async (collectionName, data) => {
  try {
    const docData = {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, collectionName), docData);
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Mevcut dökümanı günceller
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {string} id - Döküman ID'si
 * @param {Object} data - Güncellenecek veri
 * @returns {Promise<void>}
 */
export const update = async (collectionName, id, data) => {
  try {
    const docRef = doc(db, collectionName, id);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp()
    });
  } catch (error) {
    console.error(`Error updating document ${id} in ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Dökümanı siler
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {string} id - Döküman ID'si
 * @returns {Promise<void>}
 */
export const remove = async (collectionName, id) => {
  try {
    const docRef = doc(db, collectionName, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(`Error deleting document ${id} from ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Real-time listener ekler
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {Function} callback - Veri değişikliğinde çağrılacak fonksiyon
 * @param {Object} options - Query seçenekleri
 * @returns {Function} Unsubscribe fonksiyonu
 */
export const subscribe = (collectionName, callback, options = {}) => {
  try {
    let q = collection(db, collectionName);

    // Where clause
    if (options.where) {
      const [field, operator, value] = options.where;
      q = query(q, where(field, operator, value));
    }

    // Order by
    if (options.orderBy) {
      const [field, direction = 'asc'] = Array.isArray(options.orderBy)
        ? options.orderBy
        : [options.orderBy];
      q = query(q, orderBy(field, direction));
    }

    return onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || doc.data().createdAt,
        updatedAt: doc.data().updatedAt?.toDate?.() || doc.data().updatedAt
      }));
      callback(data);
    }, (error) => {
      console.error(`Error in subscription for ${collectionName}:`, error);
    });
  } catch (error) {
    console.error(`Error setting up subscription for ${collectionName}:`, error);
    throw error;
  }
};

/**
 * Modül-Spesifik Service Fonksiyonları
 */

// Students (Öğrenciler)
export const studentsService = {
  getAll: (options) => getAll('students', options),
  getById: (id) => getById('students', id),
  create: (data) => create('students', data),
  update: (id, data) => update('students', id, data),
  delete: (id) => remove('students', id),
  subscribe: (callback, options) => subscribe('students', callback, options),

  // Özel metodlar
  getByClass: (className) => getAll('students', {
    where: ['className', '==', className]
  }),
  getActive: () => getAll('students', {
    where: ['status', '==', 'active']
  })
};

// Parents (Veliler)
export const parentsService = {
  getAll: (options) => getAll('parents', options),
  getById: (id) => getById('parents', id),
  create: (data) => create('parents', data),
  update: (id, data) => update('parents', id, data),
  delete: (id) => remove('parents', id),
  subscribe: (callback, options) => subscribe('parents', callback, options)
};

// Payments (Ödemeler)
export const paymentsService = {
  getAll: (options) => getAll('payments', options),
  getById: (id) => getById('payments', id),
  create: (data) => create('payments', data),
  update: (id, data) => update('payments', id, data),
  delete: (id) => remove('payments', id),
  subscribe: (callback, options) => subscribe('payments', callback, options),

  // Özel metodlar
  getByStatus: (status) => getAll('payments', {
    where: ['status', '==', status]
  }),
  getOverdue: () => getAll('payments', {
    where: ['status', '==', 'overdue'],
    orderBy: ['dueDate', 'asc']
  })
};

// Attendance (Yoklama)
export const attendanceService = {
  getAll: (options) => getAll('attendance', options),
  getById: (id) => getById('attendance', id),
  create: (data) => create('attendance', data),
  update: (id, data) => update('attendance', id, data),
  delete: (id) => remove('attendance', id),
  subscribe: (callback, options) => subscribe('attendance', callback, options),

  // Özel metodlar
  getByDate: (date) => getAll('attendance', {
    where: ['date', '==', date]
  })
};

// Gallery (Galeri)
export const galleryService = {
  getAll: (options) => getAll('gallery', options),
  getById: (id) => getById('gallery', id),
  create: (data) => create('gallery', data),
  update: (id, data) => update('gallery', id, data),
  delete: (id) => remove('gallery', id),
  subscribe: (callback, options) => subscribe('gallery', callback, options)
};

// Announcements (Duyurular)
export const announcementsService = {
  getAll: (options) => getAll('announcements', options),
  getById: (id) => getById('announcements', id),
  create: (data) => create('announcements', data),
  update: (id, data) => update('announcements', id, data),
  delete: (id) => remove('announcements', id),
  subscribe: (callback, options) => subscribe('announcements', callback, options),

  // Özel metodlar
  getPublished: () => getAll('announcements', {
    where: ['status', '==', 'published'],
    orderBy: ['publishDate', 'desc']
  })
};

// Daily Reports (Günlük Raporlar)
export const dailyReportsService = {
  getAll: (options) => getAll('dailyReports', options),
  getById: (id) => getById('dailyReports', id),
  create: (data) => create('dailyReports', data),
  update: (id, data) => update('dailyReports', id, data),
  delete: (id) => remove('dailyReports', id),
  subscribe: (callback, options) => subscribe('dailyReports', callback, options),

  // Özel metodlar
  getByDate: (date) => getAll('dailyReports', {
    where: ['date', '==', date]
  }),
  getByStudent: (studentId) => getAll('dailyReports', {
    where: ['studentId', '==', studentId],
    orderBy: ['date', 'desc']
  })
};

// Food Menu (Yemek Menüsü)
export const foodMenuService = {
  getAll: (options) => getAll('foodMenu', options),
  getById: (id) => getById('foodMenu', id),
  create: (data) => create('foodMenu', data),
  update: (id, data) => update('foodMenu', id, data),
  delete: (id) => remove('foodMenu', id),
  subscribe: (callback, options) => subscribe('foodMenu', callback, options),

  // Özel metodlar
  getByWeek: (weekStart) => getAll('foodMenu', {
    where: ['weekStart', '==', weekStart]
  })
};

// Medicine Tracking (İlaç Takibi)
export const medicineService = {
  getAll: (options) => getAll('medicine', options),
  getById: (id) => getById('medicine', id),
  create: (data) => create('medicine', data),
  update: (id, data) => update('medicine', id, data),
  delete: (id) => remove('medicine', id),
  subscribe: (callback, options) => subscribe('medicine', callback, options),

  // Özel metodlar
  getByStudent: (studentId) => getAll('medicine', {
    where: ['studentId', '==', studentId]
  }),
  getActive: () => getAll('medicine', {
    where: ['status', '==', 'active']
  })
};

// Shuttle Tracking (Servis Takibi)
export const shuttleService = {
  getAll: (options) => getAll('shuttle', options),
  getById: (id) => getById('shuttle', id),
  create: (data) => create('shuttle', data),
  update: (id, data) => update('shuttle', id, data),
  delete: (id) => remove('shuttle', id),
  subscribe: (callback, options) => subscribe('shuttle', callback, options),

  // Özel metodlar
  getActive: () => getAll('shuttle', {
    where: ['status', '==', 'active']
  })
};

// Staff Management (Personel Yönetimi)
export const staffService = {
  getAll: (options) => getAll('staff', options),
  getById: (id) => getById('staff', id),
  create: (data) => create('staff', data),
  update: (id, data) => update('staff', id, data),
  delete: (id) => remove('staff', id),
  subscribe: (callback, options) => subscribe('staff', callback, options),

  // Özel metodlar
  getActive: () => getAll('staff', {
    where: ['status', '==', 'active']
  }),
  getByRole: (role) => getAll('staff', {
    where: ['role', '==', role]
  })
};

// Newsletter (Veli Bülteni)
export const newsletterService = {
  getAll: (options) => getAll('newsletter', options),
  getById: (id) => getById('newsletter', id),
  create: (data) => create('newsletter', data),
  update: (id, data) => update('newsletter', id, data),
  delete: (id) => remove('newsletter', id),
  subscribe: (callback, options) => subscribe('newsletter', callback, options),

  // Özel metodlar
  getSent: () => getAll('newsletter', {
    where: ['status', '==', 'sent'],
    orderBy: ['sentDate', 'desc']
  })
};

// Approval System (Onay Sistemi)
export const approvalService = {
  getAll: (options) => getAll('approvals', options),
  getById: (id) => getById('approvals', id),
  create: (data) => create('approvals', data),
  update: (id, data) => update('approvals', id, data),
  delete: (id) => remove('approvals', id),
  subscribe: (callback, options) => subscribe('approvals', callback, options),

  // Özel metodlar
  getPending: () => getAll('approvals', {
    where: ['status', '==', 'pending'],
    orderBy: ['requestDate', 'asc']
  })
};

// Messages (Mesajlaşma)
export const messagesService = {
  getAll: (options) => getAll('messages', options),
  getById: (id) => getById('messages', id),
  create: (data) => create('messages', data),
  update: (id, data) => update('messages', id, data),
  delete: (id) => remove('messages', id),
  subscribe: (callback, options) => subscribe('messages', callback, options),

  // Özel metodlar
  getConversation: (conversationId) => getAll('messages', {
    where: ['conversationId', '==', conversationId],
    orderBy: ['timestamp', 'asc']
  })
};

export default {
  // Generic CRUD
  getAll,
  getById,
  create,
  update,
  remove,
  subscribe,

  // Module-specific services
  students: studentsService,
  parents: parentsService,
  payments: paymentsService,
  attendance: attendanceService,
  gallery: galleryService,
  announcements: announcementsService,
  dailyReports: dailyReportsService,
  foodMenu: foodMenuService,
  medicine: medicineService,
  shuttle: shuttleService,
  staff: staffService,
  newsletter: newsletterService,
  approvals: approvalService,
  messages: messagesService
};

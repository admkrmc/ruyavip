/**
 * Custom Hook: useFirestore
 * Firestore CRUD operasyonlarını React component'lerde kullanmak için hook
 *
 * @module hooks/useFirestore
 */

import { useState, useEffect, useCallback } from 'react';
import firestoreService from '../services/firestore';

/**
 * Firestore CRUD işlemleri için custom hook
 * @param {string} collectionName - Firestore koleksiyon adı
 * @param {Object} options - Query seçenekleri ve yapılandırma
 * @returns {Object} CRUD metodları ve state
 */
export const useFirestore = (collectionName, options = {}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Real-time subscription kullan
  const { realtime = false, ...queryOptions } = options;

  // Veri yükleme fonksiyonu
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await firestoreService.getAll(collectionName, queryOptions);
      setData(result);
    } catch (err) {
      setError(err.message);
      console.error(`Error loading ${collectionName}:`, err);
    } finally {
      setLoading(false);
    }
  }, [collectionName, JSON.stringify(queryOptions)]);

  // Real-time subscription
  useEffect(() => {
    if (realtime) {
      setLoading(true);
      const unsubscribe = firestoreService.subscribe(
        collectionName,
        (newData) => {
          setData(newData);
          setLoading(false);
        },
        queryOptions
      );

      return () => unsubscribe();
    } else {
      loadData();
    }
  }, [realtime, collectionName, loadData]);

  // Create
  const add = useCallback(async (newData) => {
    try {
      setError(null);
      const id = await firestoreService.create(collectionName, newData);
      if (!realtime) {
        await loadData(); // Reload if not using realtime
      }
      return id;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName, realtime, loadData]);

  // Update
  const update = useCallback(async (id, updatedData) => {
    try {
      setError(null);
      await firestoreService.update(collectionName, id, updatedData);
      if (!realtime) {
        await loadData(); // Reload if not using realtime
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName, realtime, loadData]);

  // Delete
  const remove = useCallback(async (id) => {
    try {
      setError(null);
      await firestoreService.remove(collectionName, id);
      if (!realtime) {
        await loadData(); // Reload if not using realtime
      }
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName, realtime, loadData]);

  // Get by ID
  const getById = useCallback(async (id) => {
    try {
      setError(null);
      return await firestoreService.getById(collectionName, id);
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [collectionName]);

  // Refresh
  const refresh = useCallback(() => {
    return loadData();
  }, [loadData]);

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    getById,
    refresh
  };
};

/**
 * Form modal yönetimi için custom hook
 * @param {Object} initialData - Form'un başlangıç verileri
 * @returns {Object} Form state ve metodlar
 */
export const useFormModal = (initialData = {}) => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState(initialData);
  const [selectedItem, setSelectedItem] = useState(null);
  const [errors, setErrors] = useState({});

  // Modal'ı aç (yeni ekleme)
  const openAddModal = useCallback(() => {
    setSelectedItem(null);
    setFormData(initialData);
    setErrors({});
    setShowModal(true);
  }, [initialData]);

  // Modal'ı aç (düzenleme)
  const openEditModal = useCallback((item) => {
    setSelectedItem(item);
    setFormData(item);
    setErrors({});
    setShowModal(true);
  }, []);

  // Modal'ı kapat
  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedItem(null);
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  // Form alanını güncelle
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  }, [errors]);

  // Tüm form'u güncelle
  const updateForm = useCallback((data) => {
    setFormData(data);
  }, []);

  // Validation error'ı set et
  const setFieldError = useCallback((field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  }, []);

  // Tüm error'ları set et
  const setFormErrors = useCallback((newErrors) => {
    setErrors(newErrors);
  }, []);

  // Form'u resetle
  const resetForm = useCallback(() => {
    setFormData(initialData);
    setErrors({});
  }, [initialData]);

  return {
    // Modal state
    showModal,
    setShowModal,
    openAddModal,
    openEditModal,
    closeModal,

    // Form state
    formData,
    setFormData,
    updateField,
    updateForm,
    resetForm,

    // Selection
    selectedItem,
    setSelectedItem,
    isEditing: !!selectedItem,

    // Validation
    errors,
    setFieldError,
    setFormErrors,
    hasErrors: Object.keys(errors).length > 0
  };
};

/**
 * Confirmation modal yönetimi için custom hook
 * @returns {Object} Confirmation modal state ve metodlar
 */
export const useConfirmModal = () => {
  const [confirmModal, setConfirmModal] = useState({
    show: false,
    title: '',
    message: '',
    type: 'warning',
    onConfirm: null
  });

  const showConfirm = useCallback((config) => {
    setConfirmModal({
      show: true,
      ...config
    });
  }, []);

  const hideConfirm = useCallback(() => {
    setConfirmModal(prev => ({ ...prev, show: false }));
  }, []);

  const handleConfirm = useCallback(async () => {
    if (confirmModal.onConfirm) {
      await confirmModal.onConfirm();
    }
    hideConfirm();
  }, [confirmModal, hideConfirm]);

  return {
    confirmModal,
    showConfirm,
    hideConfirm,
    handleConfirm
  };
};

export default useFirestore;

/**
 * Form Validation Utilities
 * Form alanları için validation fonksiyonları ve kuralları
 *
 * @module utils/validation
 */

/**
 * Validators - Her biri bir validation fonksiyonu döner
 */
export const validators = {
  /**
   * Required field validator
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  required: (message = 'Bu alan zorunludur') => (value) => {
    if (!value || (typeof value === 'string' && value.trim() === '')) {
      return message;
    }
    return null;
  },

  /**
   * Email format validator
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  email: (message = 'Geçerli bir email adresi girin') => (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : message;
  },

  /**
   * Türk telefon numarası validator
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  phone: (message = 'Geçerli bir telefon numarası girin (05XX XXX XXXX)') => (value) => {
    if (!value) return null;
    // 05XX XXX XXXX formatı veya 5XXXXXXXXX
    const phoneRegex = /^(05\d{9}|05\d{2}\s?\d{3}\s?\d{4})$/;
    const cleanedPhone = value.replace(/\s/g, '');
    return phoneRegex.test(cleanedPhone) ? null : message;
  },

  /**
   * Minimum length validator
   * @param {number} min - Minimum karakter sayısı
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  minLength: (min, message) => (value) => {
    if (!value) return null;
    const msg = message || `En az ${min} karakter olmalıdır`;
    return value.length >= min ? null : msg;
  },

  /**
   * Maximum length validator
   * @param {number} max - Maximum karakter sayısı
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  maxLength: (max, message) => (value) => {
    if (!value) return null;
    const msg = message || `En fazla ${max} karakter olmalıdır`;
    return value.length <= max ? null : msg;
  },

  /**
   * Numeric value validator
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  numeric: (message = 'Sadece rakam girebilirsiniz') => (value) => {
    if (!value) return null;
    const numericRegex = /^\d+$/;
    return numericRegex.test(value) ? null : message;
  },

  /**
   * Minimum value validator (number)
   * @param {number} min - Minimum değer
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  min: (min, message) => (value) => {
    if (!value) return null;
    const msg = message || `En az ${min} olmalıdır`;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue >= min ? null : msg;
  },

  /**
   * Maximum value validator (number)
   * @param {number} max - Maximum değer
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  max: (max, message) => (value) => {
    if (!value) return null;
    const msg = message || `En fazla ${max} olmalıdır`;
    const numValue = Number(value);
    return !isNaN(numValue) && numValue <= max ? null : msg;
  },

  /**
   * Date validator (past dates only)
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  pastDate: (message = 'Geçmiş bir tarih seçin') => (value) => {
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(23, 59, 59, 999);
    return selectedDate <= today ? null : message;
  },

  /**
   * Date validator (future dates only)
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  futureDate: (message = 'Gelecek bir tarih seçin') => (value) => {
    if (!value) return null;
    const selectedDate = new Date(value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return selectedDate >= today ? null : message;
  },

  /**
   * Custom regex validator
   * @param {RegExp} regex - Regular expression
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  pattern: (regex, message = 'Geçersiz format') => (value) => {
    if (!value) return null;
    return regex.test(value) ? null : message;
  },

  /**
   * Match another field validator (e.g., password confirmation)
   * @param {string} otherValue - Karşılaştırılacak değer
   * @param {string} message - Hata mesajı
   * @returns {Function} Validator fonksiyonu
   */
  match: (otherValue, message = 'Değerler eşleşmiyor') => (value) => {
    if (!value) return null;
    return value === otherValue ? null : message;
  }
};

/**
 * Çoklu validator çalıştırma
 * @param {*} value - Validate edilecek değer
 * @param {Array<Function>} validatorsList - Validator fonksiyonları array'i
 * @returns {string|null} İlk hata mesajı veya null
 */
export const validate = (value, validatorsList = []) => {
  for (const validator of validatorsList) {
    const error = validator(value);
    if (error) return error;
  }
  return null;
};

/**
 * Tüm form'u validate et
 * @param {Object} formData - Form verileri
 * @param {Object} rules - Her field için validation kuralları
 * @returns {Object} Hata obje (field: errorMessage)
 */
export const validateForm = (formData, rules) => {
  const errors = {};

  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const fieldValidators = rules[field];
    const error = validate(value, fieldValidators);
    if (error) {
      errors[field] = error;
    }
  });

  return errors;
};

/**
 * Form valid mi kontrol et
 * @param {Object} errors - Hata objesi
 * @returns {boolean} Form geçerli mi
 */
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

/**
 * Hazır validation şemaları
 */
export const validationSchemas = {
  // Öğrenci formu
  student: {
    name: [
      validators.required('Öğrenci adı zorunludur'),
      validators.minLength(3, 'En az 3 karakter olmalıdır')
    ],
    age: [
      validators.required('Yaş zorunludur'),
      validators.numeric(),
      validators.min(2, 'Yaş en az 2 olmalıdır'),
      validators.max(7, 'Yaş en fazla 7 olmalıdır')
    ],
    parent: [
      validators.required('Veli adı zorunludur'),
      validators.minLength(3, 'En az 3 karakter olmalıdır')
    ],
    phone: [
      validators.required('Telefon zorunludur'),
      validators.phone()
    ],
    className: [
      validators.required('Sınıf seçimi zorunludur')
    ]
  },

  // Veli formu
  parent: {
    name: [
      validators.required('Veli adı zorunludur'),
      validators.minLength(3, 'En az 3 karakter olmalıdır')
    ],
    email: [
      validators.required('Email zorunludur'),
      validators.email()
    ],
    phone: [
      validators.required('Telefon zorunludur'),
      validators.phone()
    ],
    relation: [
      validators.required('Yakınlık derecesi zorunludur')
    ]
  },

  // Ödeme formu
  payment: {
    studentName: [
      validators.required('Öğrenci seçimi zorunludur')
    ],
    amount: [
      validators.required('Tutar zorunludur'),
      validators.numeric(),
      validators.min(0, 'Tutar sıfırdan büyük olmalıdır')
    ],
    dueDate: [
      validators.required('Vade tarihi zorunludur')
    ],
    method: [
      validators.required('Ödeme yöntemi seçimi zorunludur')
    ]
  },

  // Personel formu
  staff: {
    name: [
      validators.required('Ad soyad zorunludur'),
      validators.minLength(3, 'En az 3 karakter olmalıdır')
    ],
    role: [
      validators.required('Rol zorunludur')
    ],
    email: [
      validators.required('Email zorunludur'),
      validators.email()
    ],
    phone: [
      validators.required('Telefon zorunludur'),
      validators.phone()
    ],
    startDate: [
      validators.required('Başlangıç tarihi zorunludur'),
      validators.pastDate()
    ]
  },

  // İlaç formu
  medicine: {
    studentId: [
      validators.required('Öğrenci seçimi zorunludur')
    ],
    medicineName: [
      validators.required('İlaç adı zorunludur'),
      validators.minLength(2, 'En az 2 karakter olmalıdır')
    ],
    dosage: [
      validators.required('Dozaj zorunludur')
    ],
    frequency: [
      validators.required('Kullanım sıklığı zorunludur')
    ],
    parentName: [
      validators.required('Veli adı zorunludur')
    ]
  },

  // Servis formu
  shuttle: {
    routeName: [
      validators.required('Rota adı zorunludur'),
      validators.minLength(3, 'En az 3 karakter olmalıdır')
    ],
    driverName: [
      validators.required('Şoför adı zorunludur')
    ],
    driverPhone: [
      validators.required('Şoför telefonu zorunludur'),
      validators.phone()
    ],
    vehiclePlate: [
      validators.required('Araç plakası zorunludur'),
      validators.pattern(/^[0-9]{2}\s?[A-Z]{1,3}\s?[0-9]{2,4}$/, 'Geçerli bir plaka girin (34 ABC 1234)')
    ],
    capacity: [
      validators.required('Kapasite zorunludur'),
      validators.numeric(),
      validators.min(1, 'Kapasite en az 1 olmalıdır')
    ]
  },

  // Duyuru formu
  announcement: {
    title: [
      validators.required('Başlık zorunludur'),
      validators.minLength(5, 'En az 5 karakter olmalıdır'),
      validators.maxLength(100, 'En fazla 100 karakter olmalıdır')
    ],
    content: [
      validators.required('İçerik zorunludur'),
      validators.minLength(10, 'En az 10 karakter olmalıdır')
    ],
    type: [
      validators.required('Duyuru türü seçimi zorunludur')
    ],
    targetAudience: [
      validators.required('Hedef kitle seçimi zorunludur')
    ]
  },

  // Newsletter formu
  newsletter: {
    title: [
      validators.required('Bülten başlığı zorunludur'),
      validators.minLength(5, 'En az 5 karakter olmalıdır')
    ],
    type: [
      validators.required('Bülten türü seçimi zorunludur')
    ],
    template: [
      validators.required('Şablon seçimi zorunludur')
    ],
    content: [
      validators.required('İçerik zorunludur'),
      validators.minLength(20, 'En az 20 karakter olmalıdır')
    ]
  }
};

export default {
  validators,
  validate,
  validateForm,
  isFormValid,
  validationSchemas
};

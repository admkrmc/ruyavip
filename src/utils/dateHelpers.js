/**
 * Date Helper Utilities
 * Tarih formatlama ve işlemleri için yardımcı fonksiyonlar
 *
 * @module utils/dateHelpers
 */

/**
 * Tarih formatla
 * @param {Date|string|number} date - Tarih objesi, string veya timestamp
 * @param {string} format - Format tipi (short, long, time, datetime, iso)
 * @returns {string} Formatlanmış tarih
 */
export const formatDate = (date, format = 'short') => {
  if (!date) return '-';

  const d = new Date(date);
  if (isNaN(d.getTime())) return '-';

  const formats = {
    // 11.12.2025
    short: d.toLocaleDateString('tr-TR'),

    // 11 Aralık 2025
    long: d.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),

    // 14:30
    time: d.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    }),

    // 11.12.2025 14:30
    datetime: `${d.toLocaleDateString('tr-TR')} ${d.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    })}`,

    // 2025-12-11
    iso: d.toISOString().split('T')[0],

    // 11 Ara 2025
    medium: d.toLocaleDateString('tr-TR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }),

    // Perşembe, 11 Aralık 2025
    full: d.toLocaleDateString('tr-TR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  };

  return formats[format] || formats.short;
};

/**
 * Bugün mü kontrol et
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Bugün mü
 */
export const isToday = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const today = new Date();

  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
};

/**
 * Geçmiş tarih mi kontrol et
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Geçmiş tarih mi
 */
export const isPast = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return d < today;
};

/**
 * Gelecek tarih mi kontrol et
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Gelecek tarih mi
 */
export const isFuture = (date) => {
  if (!date) return false;
  const d = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999);
  return d > today;
};

/**
 * İki tarih arasındaki gün farkı
 * @param {Date|string|number} date1 - İlk tarih
 * @param {Date|string|number} date2 - İkinci tarih
 * @returns {number} Gün farkı
 */
export const daysBetween = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Tarihe gün ekle
 * @param {Date|string|number} date - Tarih
 * @param {number} days - Eklenecek gün sayısı
 * @returns {Date} Yeni tarih
 */
export const addDays = (date, days) => {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
};

/**
 * Tarihten gün çıkar
 * @param {Date|string|number} date - Tarih
 * @param {number} days - Çıkarılacak gün sayısı
 * @returns {Date} Yeni tarih
 */
export const subtractDays = (date, days) => {
  return addDays(date, -days);
};

/**
 * Haftanın başlangıcını getir (Pazartesi)
 * @param {Date|string|number} date - Tarih
 * @returns {Date} Haftanın başlangıcı
 */
export const getWeekStart = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Pazartesi
  return new Date(d.setDate(diff));
};

/**
 * Haftanın sonunu getir (Pazar)
 * @param {Date|string|number} date - Tarih
 * @returns {Date} Haftanın sonu
 */
export const getWeekEnd = (date = new Date()) => {
  const weekStart = getWeekStart(date);
  return addDays(weekStart, 6);
};

/**
 * Ayın başlangıcını getir
 * @param {Date|string|number} date - Tarih
 * @returns {Date} Ayın başlangıcı
 */
export const getMonthStart = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth(), 1);
};

/**
 * Ayın sonunu getir
 * @param {Date|string|number} date - Tarih
 * @returns {Date} Ayın sonu
 */
export const getMonthEnd = (date = new Date()) => {
  const d = new Date(date);
  return new Date(d.getFullYear(), d.getMonth() + 1, 0);
};

/**
 * Relative time (kaç saat/gün önce)
 * @param {Date|string|number} date - Tarih
 * @returns {string} Göreceli zaman (örn: "2 saat önce")
 */
export const getRelativeTime = (date) => {
  if (!date) return '-';

  const d = new Date(date);
  const now = new Date();
  const diffMs = now - d;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 60) return 'Az önce';
  if (diffMin < 60) return `${diffMin} dakika önce`;
  if (diffHour < 24) return `${diffHour} saat önce`;
  if (diffDay < 7) return `${diffDay} gün önce`;
  if (diffWeek < 4) return `${diffWeek} hafta önce`;
  if (diffMonth < 12) return `${diffMonth} ay önce`;
  return `${diffYear} yıl önce`;
};

/**
 * Yaş hesapla (doğum tarihinden)
 * @param {Date|string|number} birthDate - Doğum tarihi
 * @returns {number} Yaş
 */
export const calculateAge = (birthDate) => {
  if (!birthDate) return 0;

  const today = new Date();
  const birth = new Date(birthDate);
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
};

/**
 * Tarih aralığı oluştur
 * @param {Date|string|number} startDate - Başlangıç tarihi
 * @param {Date|string|number} endDate - Bitiş tarihi
 * @returns {Array<Date>} Tarih array'i
 */
export const getDateRange = (startDate, endDate) => {
  const dates = [];
  let currentDate = new Date(startDate);
  const end = new Date(endDate);

  while (currentDate <= end) {
    dates.push(new Date(currentDate));
    currentDate = addDays(currentDate, 1);
  }

  return dates;
};

/**
 * Hafta içi mi kontrol et (Pazartesi-Cuma)
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Hafta içi mi
 */
export const isWeekday = (date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  return day >= 1 && day <= 5;
};

/**
 * Hafta sonu mu kontrol et (Cumartesi-Pazar)
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Hafta sonu mu
 */
export const isWeekend = (date = new Date()) => {
  return !isWeekday(date);
};

/**
 * Time input için değer formatla (HH:MM)
 * @param {Date|string|number} date - Tarih/saat
 * @returns {string} HH:MM formatı
 */
export const formatTimeInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const hours = String(d.getHours()).padStart(2, '0');
  const minutes = String(d.getMinutes()).padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * Date input için değer formatla (YYYY-MM-DD)
 * @param {Date|string|number} date - Tarih
 * @returns {string} YYYY-MM-DD formatı
 */
export const formatDateInput = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Tarih geçerli mi kontrol et
 * @param {Date|string|number} date - Tarih
 * @returns {boolean} Geçerli mi
 */
export const isValidDate = (date) => {
  const d = new Date(date);
  return !isNaN(d.getTime());
};

export default {
  formatDate,
  isToday,
  isPast,
  isFuture,
  daysBetween,
  addDays,
  subtractDays,
  getWeekStart,
  getWeekEnd,
  getMonthStart,
  getMonthEnd,
  getRelativeTime,
  calculateAge,
  getDateRange,
  isWeekday,
  isWeekend,
  formatTimeInput,
  formatDateInput,
  isValidDate
};

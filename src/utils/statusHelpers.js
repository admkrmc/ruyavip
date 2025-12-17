/**
 * Status Helper Utilities
 * Durum badge'leri, renkler ve ikonlar için yardımcı fonksiyonlar
 *
 * @module utils/statusHelpers
 */

import {
  CheckCircle,
  Clock,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Info,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';

/**
 * Status Konfigürasyonları
 */
export const statusConfig = {
  // Ödeme durumları
  payment: {
    paid: {
      color: 'green',
      label: 'Ödendi',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    pending: {
      color: 'yellow',
      label: 'Bekliyor',
      icon: Clock,
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-700',
      borderClass: 'border-yellow-200',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    },
    overdue: {
      color: 'red',
      label: 'Gecikmiş',
      icon: AlertCircle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      badgeClass: 'bg-red-100 text-red-700'
    },
    scheduled: {
      color: 'blue',
      label: 'Planlandı',
      icon: Info,
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeClass: 'bg-blue-100 text-blue-700'
    }
  },

  // Yoklama durumları
  attendance: {
    present: {
      color: 'green',
      label: 'Mevcut',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    absent: {
      color: 'red',
      label: 'Devamsız',
      icon: XCircle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      badgeClass: 'bg-red-100 text-red-700'
    },
    late: {
      color: 'yellow',
      label: 'Geç',
      icon: Clock,
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-700',
      borderClass: 'border-yellow-200',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    }
  },

  // Genel durum (active/passive)
  general: {
    active: {
      color: 'green',
      label: 'Aktif',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    passive: {
      color: 'gray',
      label: 'Pasif',
      icon: Minus,
      bgClass: 'bg-gray-50',
      textClass: 'text-gray-700',
      borderClass: 'border-gray-200',
      badgeClass: 'bg-gray-100 text-gray-700'
    },
    inactive: {
      color: 'gray',
      label: 'İnaktif',
      icon: XCircle,
      bgClass: 'bg-gray-50',
      textClass: 'text-gray-700',
      borderClass: 'border-gray-200',
      badgeClass: 'bg-gray-100 text-gray-700'
    }
  },

  // Onay durumları
  approval: {
    pending: {
      color: 'yellow',
      label: 'Bekliyor',
      icon: Clock,
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-700',
      borderClass: 'border-yellow-200',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    },
    approved: {
      color: 'green',
      label: 'Onaylandı',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    rejected: {
      color: 'red',
      label: 'Reddedildi',
      icon: XCircle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      badgeClass: 'bg-red-100 text-red-700'
    }
  },

  // Duyuru/Newsletter durumları
  publication: {
    draft: {
      color: 'gray',
      label: 'Taslak',
      icon: Info,
      bgClass: 'bg-gray-50',
      textClass: 'text-gray-700',
      borderClass: 'border-gray-200',
      badgeClass: 'bg-gray-100 text-gray-700'
    },
    scheduled: {
      color: 'blue',
      label: 'Zamanlandı',
      icon: Clock,
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeClass: 'bg-blue-100 text-blue-700'
    },
    published: {
      color: 'green',
      label: 'Yayınlandı',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    sent: {
      color: 'purple',
      label: 'Gönderildi',
      icon: CheckCircle,
      bgClass: 'bg-purple-50',
      textClass: 'text-purple-700',
      borderClass: 'border-purple-200',
      badgeClass: 'bg-purple-100 text-purple-700'
    }
  },

  // İlaç durumları
  medicine: {
    active: {
      color: 'green',
      label: 'Aktif',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    },
    pendingApproval: {
      color: 'yellow',
      label: 'Onay Bekliyor',
      icon: Clock,
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-700',
      borderClass: 'border-yellow-200',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    },
    overdue: {
      color: 'red',
      label: 'Gecikmiş',
      icon: AlertTriangle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      badgeClass: 'bg-red-100 text-red-700'
    },
    completed: {
      color: 'blue',
      label: 'Tamamlandı',
      icon: CheckCircle,
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeClass: 'bg-blue-100 text-blue-700'
    },
    asNeeded: {
      color: 'purple',
      label: 'İhtiyaç Halinde',
      icon: Info,
      bgClass: 'bg-purple-50',
      textClass: 'text-purple-700',
      borderClass: 'border-purple-200',
      badgeClass: 'bg-purple-100 text-purple-700'
    }
  },

  // Servis durumları
  shuttle: {
    waiting: {
      color: 'yellow',
      label: 'Bekliyor',
      icon: Clock,
      bgClass: 'bg-yellow-50',
      textClass: 'text-yellow-700',
      borderClass: 'border-yellow-200',
      badgeClass: 'bg-yellow-100 text-yellow-700'
    },
    onRoute: {
      color: 'blue',
      label: 'Yolda',
      icon: TrendingUp,
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeClass: 'bg-blue-100 text-blue-700'
    },
    completed: {
      color: 'green',
      label: 'Tamamlandı',
      icon: CheckCircle,
      bgClass: 'bg-green-50',
      textClass: 'text-green-700',
      borderClass: 'border-green-200',
      badgeClass: 'bg-green-100 text-green-700'
    }
  },

  // Öncelik seviyeleri
  priority: {
    low: {
      color: 'gray',
      label: 'Düşük',
      icon: Minus,
      bgClass: 'bg-gray-50',
      textClass: 'text-gray-700',
      borderClass: 'border-gray-200',
      badgeClass: 'bg-gray-100 text-gray-700'
    },
    normal: {
      color: 'blue',
      label: 'Normal',
      icon: Info,
      bgClass: 'bg-blue-50',
      textClass: 'text-blue-700',
      borderClass: 'border-blue-200',
      badgeClass: 'bg-blue-100 text-blue-700'
    },
    high: {
      color: 'orange',
      label: 'Yüksek',
      icon: AlertTriangle,
      bgClass: 'bg-orange-50',
      textClass: 'text-orange-700',
      borderClass: 'border-orange-200',
      badgeClass: 'bg-orange-100 text-orange-700'
    },
    urgent: {
      color: 'red',
      label: 'Acil',
      icon: AlertCircle,
      bgClass: 'bg-red-50',
      textClass: 'text-red-700',
      borderClass: 'border-red-200',
      badgeClass: 'bg-red-100 text-red-700'
    }
  }
};

/**
 * Status bilgisi getir
 * @param {string} type - Status tipi (payment, attendance, vb.)
 * @param {string} status - Status değeri
 * @returns {Object|null} Status konfigürasyonu
 */
export const getStatusConfig = (type, status) => {
  return statusConfig[type]?.[status] || null;
};

/**
 * Status badge class'ları getir
 * @param {string} type - Status tipi
 * @param {string} status - Status değeri
 * @returns {string} Tailwind class'ları
 */
export const getStatusClasses = (type, status) => {
  const config = getStatusConfig(type, status);
  if (!config) return 'bg-gray-100 text-gray-700';
  return config.badgeClass;
};

/**
 * Status label getir
 * @param {string} type - Status tipi
 * @param {string} status - Status değeri
 * @returns {string} Görüntülenecek label
 */
export const getStatusLabel = (type, status) => {
  const config = getStatusConfig(type, status);
  return config?.label || status;
};

/**
 * Status icon getir
 * @param {string} type - Status tipi
 * @param {string} status - Status değeri
 * @returns {Component|null} Lucide icon component
 */
export const getStatusIcon = (type, status) => {
  const config = getStatusConfig(type, status);
  return config?.icon || null;
};

/**
 * Trend icon ve color getir (artış/azalış)
 * @param {number} value - Değer (pozitif = artış, negatif = azalış)
 * @returns {Object} { icon, color, text }
 */
export const getTrendInfo = (value) => {
  if (value > 0) {
    return {
      icon: TrendingUp,
      color: 'text-green-600',
      text: `+${value}%`,
      bgClass: 'bg-green-50',
      label: 'Artış'
    };
  } else if (value < 0) {
    return {
      icon: TrendingDown,
      color: 'text-red-600',
      text: `${value}%`,
      bgClass: 'bg-red-50',
      label: 'Azalış'
    };
  } else {
    return {
      icon: Minus,
      color: 'text-gray-600',
      text: '0%',
      bgClass: 'bg-gray-50',
      label: 'Sabit'
    };
  }
};

/**
 * Yüzdeye göre renk getir (0-100)
 * @param {number} percentage - Yüzde değeri
 * @returns {Object} { color, bgClass, textClass }
 */
export const getPercentageColor = (percentage) => {
  if (percentage >= 80) {
    return {
      color: 'green',
      bgClass: 'bg-green-100',
      textClass: 'text-green-700',
      label: 'Mükemmel'
    };
  } else if (percentage >= 60) {
    return {
      color: 'blue',
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-700',
      label: 'İyi'
    };
  } else if (percentage >= 40) {
    return {
      color: 'yellow',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-700',
      label: 'Orta'
    };
  } else {
    return {
      color: 'red',
      bgClass: 'bg-red-100',
      textClass: 'text-red-700',
      label: 'Düşük'
    };
  }
};

/**
 * Performans skoruna göre renk getir
 * @param {string} performance - Performans seviyesi (excellent, good, average, poor)
 * @returns {Object} Status config
 */
export const getPerformanceColor = (performance) => {
  const performanceMap = {
    excellent: {
      color: 'green',
      label: 'Mükemmel',
      bgClass: 'bg-green-100',
      textClass: 'text-green-700',
      icon: CheckCircle
    },
    good: {
      color: 'blue',
      label: 'İyi',
      bgClass: 'bg-blue-100',
      textClass: 'text-blue-700',
      icon: TrendingUp
    },
    average: {
      color: 'yellow',
      label: 'Orta',
      bgClass: 'bg-yellow-100',
      textClass: 'text-yellow-700',
      icon: Minus
    },
    poor: {
      color: 'red',
      label: 'Kötü',
      bgClass: 'bg-red-100',
      textClass: 'text-red-700',
      icon: TrendingDown
    }
  };

  return performanceMap[performance] || performanceMap.average;
};

export default {
  statusConfig,
  getStatusConfig,
  getStatusClasses,
  getStatusLabel,
  getStatusIcon,
  getTrendInfo,
  getPercentageColor,
  getPerformanceColor
};

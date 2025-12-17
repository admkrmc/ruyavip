import React from 'react';
import { AlertCircle, CheckCircle, Info, AlertTriangle, X } from 'lucide-react';
import { Button } from './Button';

/**
 * Modern Confirmation Modal Component
 * Replaces browser's native alert() and confirm() dialogs
 *
 * @param {boolean} isOpen - Modal açık mı
 * @param {function} onClose - Modal kapanma callback
 * @param {function} onConfirm - Onay butonu callback
 * @param {string} title - Modal başlığı
 * @param {string} message - Modal mesajı
 * @param {string} type - Modal tipi: 'info' | 'success' | 'warning' | 'danger'
 * @param {string} confirmText - Onay butonu metni (varsayılan: "Onayla")
 * @param {string} cancelText - İptal butonu metni (varsayılan: "İptal")
 * @param {boolean} showCancel - İptal butonu gösterilsin mi (varsayılan: true)
 */
const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'warning',
  confirmText = 'Onayla',
  cancelText = 'İptal',
  showCancel = true
}) => {
  if (!isOpen) return null;

  // Tip konfigürasyonu
  const typeConfig = {
    info: {
      icon: Info,
      color: 'blue',
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
      buttonVariant: 'primary'
    },
    success: {
      icon: CheckCircle,
      color: 'green',
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
      buttonVariant: 'success'
    },
    warning: {
      icon: AlertTriangle,
      color: 'yellow',
      bgColor: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      buttonVariant: 'primary'
    },
    danger: {
      icon: AlertCircle,
      color: 'red',
      bgColor: 'bg-red-100',
      iconColor: 'text-red-600',
      buttonVariant: 'danger'
    }
  };

  const config = typeConfig[type] || typeConfig.warning;
  const Icon = config.icon;

  const handleConfirm = () => {
    if (onConfirm) {
      onConfirm();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fadeIn"
        onClick={showCancel ? onClose : undefined}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full animate-scaleIn">
        {/* Close button (sadece showCancel true ise) */}
        {showCancel && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-gray-600" />
          </button>
        )}

        {/* Content */}
        <div className="p-6">
          {/* Icon */}
          <div className={`inline-flex p-3 rounded-full ${config.bgColor} mb-4`}>
            <Icon className={`w-8 h-8 ${config.iconColor}`} />
          </div>

          {/* Title */}
          <h3 className="text-xl font-bold text-gray-800 mb-2">
            {title}
          </h3>

          {/* Message */}
          <p className="text-gray-600 mb-6">
            {message}
          </p>

          {/* Actions */}
          <div className="flex gap-3">
            {showCancel && (
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-1"
              >
                {cancelText}
              </Button>
            )}
            <Button
              variant={config.buttonVariant}
              onClick={handleConfirm}
              className="flex-1"
            >
              {confirmText}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ConfirmationModal };
export default ConfirmationModal;

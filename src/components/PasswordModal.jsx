import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Lock, AlertCircle } from 'lucide-react';

const PasswordModal = ({ type, target, onClose, onSuccess }) => {
  const { switchInstitution, switchUser, rememberUser } = useAuth();
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (type === 'institution') {
        await switchInstitution(target.id, password);
      } else {
        await switchUser(target.id, password);
      }

      if (remember) {
        rememberUser(target.id);
      }

      onSuccess();
    } catch (err) {
      setError(err.message || 'Şifre yanlış');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="text-center mb-6">
          <div className="inline-block p-3 bg-purple-100 rounded-full mb-3">
            <Lock className="w-8 h-8 text-purple-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Şifre Gerekli</h3>
          <p className="text-gray-600">
            <span className="font-semibold">{target?.name}</span> için geçiş yapıyorsunuz
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2 text-red-700">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Şifre
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              placeholder="••••••••"
              autoFocus
              required
            />
            <p className="text-xs text-gray-500 mt-1">Demo şifre: 123456</p>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              checked={remember}
              onChange={(e) => setRemember(e.target.checked)}
              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
            />
            <label htmlFor="remember" className="text-sm text-gray-700">
              Beni Hatırla (bir daha şifre sorma)
            </label>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 btn-secondary"
            >
              İptal
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 btn-primary disabled:opacity-50"
            >
              {loading ? 'Kontrol ediliyor...' : 'Onayla'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;

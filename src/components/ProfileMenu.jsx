import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Building2, Users, LogOut } from 'lucide-react';

const ProfileMenu = ({ onClose, onSwitchRequest, onLogout }) => {
  const { userProfile } = useAuth();

  // Demo verisi - gerçek uygulamada Firebase'den gelecek
  const institutions = [
    { id: '1', name: 'Gökkuşağı Anaokulu', studentCount: 45 },
    { id: '2', name: 'Güneş Anaokulu', studentCount: 38 },
    { id: '3', name: 'Yıldız Kreş', studentCount: 28 }
  ];

  const users = [
    { id: '1', name: 'Ayşe Yılmaz', role: 'Müdür' },
    { id: '2', name: 'Mehmet Demir', role: 'Öğretmen' },
    { id: '3', name: 'Fatma Kaya', role: 'Öğretmen' }
  ];

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
      />

      {/* Menu */}
      <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 z-50">
        {/* Kurumlar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-800">KURUMLAR</h4>
          </div>
          <div className="space-y-2">
            {institutions.map((inst) => (
              <button
                key={inst.id}
                onClick={() => onSwitchRequest('institution', inst)}
                className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200"
              >
                <p className="font-medium text-gray-800">{inst.name}</p>
                <p className="text-sm text-gray-500">{inst.studentCount} öğrenci</p>
              </button>
            ))}
          </div>
        </div>

        {/* Kullanıcılar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-800">KULLANICILAR</h4>
          </div>
          <div className="space-y-2">
            {users.map((user) => (
              <button
                key={user.id}
                onClick={() => onSwitchRequest('user', user)}
                className="w-full text-left p-3 rounded-lg hover:bg-purple-50 transition-colors border border-gray-200"
              >
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.role}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Çıkış */}
        <div className="p-4">
          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileMenu;

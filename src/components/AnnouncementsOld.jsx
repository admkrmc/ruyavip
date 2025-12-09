import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { Plus, Calendar, Users, MapPin, Clock, AlertCircle } from 'lucide-react';

const Announcements = () => {
  const { currentInstitution } = useAuth();
  const [activeTab, setActiveTab] = useState('general');
  const [showNewForm, setShowNewForm] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    type: 'general',
    title: '',
    message: '',
    date: '',
    time: '',
    location: '',
    participants: []
  });
  const [errors, setErrors] = useState({});

  const tabs = [
    { id: 'general', label: 'Genel Duyurular' },
    { id: 'parent', label: 'Veli Duyuruları' },
    { id: 'meeting', label: 'Toplantılar' },
    { id: 'special-day', label: 'Özel Günler' },
    { id: 'birthday', label: 'Doğum Günleri' },
    { id: 'event', label: 'Etkinlikler' }
  ];

  const participantOptions = [
    { id: 'all-parents', label: 'Tüm Veliler' },
    { id: 'all-teachers', label: 'Tüm Öğretmenler' },
    { id: 'age-4-parents', label: '4 Yaş Sınıfı Velileri' },
    { id: 'age-5-parents', label: '5 Yaş Sınıfı Velileri' },
    { id: 'main-teachers', label: 'Ana Öğretmenler' },
    { id: 'assistant-teachers', label: 'Yardımcı Öğretmenler' }
  ];

  useEffect(() => {
    if (currentInstitution) {
      loadAnnouncements();
    }
  }, [activeTab, currentInstitution]);

  const loadAnnouncements = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'announcements'),
        where('institutionId', '==', currentInstitution.id),
        where('type', '==', activeTab),
        orderBy('createdAt', 'desc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setAnnouncements(data);
    } catch (error) {
      console.error('Duyurular yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Başlık zorunludur';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Mesaj içeriği zorunludur';
    }

    if (formData.type === 'meeting') {
      if (!formData.date) newErrors.date = 'Toplantı tarihi zorunludur';
      if (!formData.time) newErrors.time = 'Toplantı saati zorunludur';
      if (!formData.location) newErrors.location = 'Toplantı yeri zorunludur';
      if (formData.participants.length === 0) {
        newErrors.participants = 'En az bir katılımcı grubu seçmelisiniz';
      }
    }

    if (formData.type === 'event') {
      if (!formData.date) newErrors.date = 'Etkinlik tarihi zorunludur';
      if (!formData.time) newErrors.time = 'Etkinlik saati zorunludur';
      if (!formData.location) newErrors.location = 'Etkinlik yeri zorunludur';
    }

    if (formData.type === 'special-day') {
      if (!formData.date) newErrors.date = 'Özel gün tarihi zorunludur';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await addDoc(collection(db, 'announcements'), {
        ...formData,
        institutionId: currentInstitution.id,
        createdAt: new Date(),
        type: activeTab
      });

      // Formu sıfırla
      setFormData({
        type: activeTab,
        title: '',
        message: '',
        date: '',
        time: '',
        location: '',
        participants: []
      });
      setErrors({});
      setShowNewForm(false);

      // Duyuruları yeniden yükle
      await loadAnnouncements();
    } catch (error) {
      console.error('Duyuru eklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleParticipantToggle = (participantId) => {
    setFormData(prev => ({
      ...prev,
      participants: prev.participants.includes(participantId)
        ? prev.participants.filter(p => p !== participantId)
        : [...prev.participants, participantId]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Duyurular</h2>
        <button
          onClick={() => setShowNewForm(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Yeni Duyuru
        </button>
      </div>

      {/* Sekmeler */}
      <div className="border-b border-gray-200">
        <div className="flex gap-4 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium whitespace-nowrap border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Duyuru Listesi */}
      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : announcements.length === 0 ? (
          <div className="card text-center py-8">
            <p className="text-gray-500">Henüz duyuru bulunmuyor</p>
          </div>
        ) : (
          announcements.map(announcement => (
            <div key={announcement.id} className="card hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold mb-2">{announcement.title}</h3>
              <p className="text-gray-600 mb-4">{announcement.message}</p>

              {announcement.date && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{announcement.date}</span>
                  {announcement.time && (
                    <>
                      <Clock className="w-4 h-4 ml-2" />
                      <span>{announcement.time}</span>
                    </>
                  )}
                </div>
              )}

              {announcement.location && (
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{announcement.location}</span>
                </div>
              )}

              {announcement.participants && announcement.participants.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  <span>
                    {announcement.participants.map(p =>
                      participantOptions.find(opt => opt.id === p)?.label
                    ).join(', ')}
                  </span>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Yeni Duyuru Formu Modal */}
      {showNewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4">Yeni Duyuru Oluştur</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duyuru Başlığı *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                    placeholder="Örn: Veli Toplantısı"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.title}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mesaj İçeriği *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`input-field ${errors.message ? 'border-red-500' : ''}`}
                    rows="4"
                    placeholder="Duyuru mesajınızı buraya yazın..."
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.message}
                    </p>
                  )}
                </div>

                {(activeTab === 'meeting' || activeTab === 'event' || activeTab === 'special-day') && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Tarih *
                      </label>
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className={`input-field ${errors.date ? 'border-red-500' : ''}`}
                      />
                      {errors.date && (
                        <p className="text-red-500 text-sm mt-1">{errors.date}</p>
                      )}
                    </div>

                    {(activeTab === 'meeting' || activeTab === 'event') && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Saat *
                        </label>
                        <input
                          type="time"
                          value={formData.time}
                          onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                          className={`input-field ${errors.time ? 'border-red-500' : ''}`}
                        />
                        {errors.time && (
                          <p className="text-red-500 text-sm mt-1">{errors.time}</p>
                        )}
                      </div>
                    )}
                  </div>
                )}

                {(activeTab === 'meeting' || activeTab === 'event') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Yer *
                    </label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className={`input-field ${errors.location ? 'border-red-500' : ''}`}
                      placeholder="Örn: Okul Konferans Salonu"
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm mt-1">{errors.location}</p>
                    )}
                  </div>
                )}

                {activeTab === 'meeting' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Katılımcılar * (Birden fazla seçim yapabilirsiniz)
                    </label>
                    <div className="space-y-2">
                      {participantOptions.map(option => (
                        <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={formData.participants.includes(option.id)}
                            onChange={() => handleParticipantToggle(option.id)}
                            className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.participants && (
                      <p className="text-red-500 text-sm mt-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.participants}
                      </p>
                    )}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowNewForm(false);
                      setErrors({});
                    }}
                    className="flex-1 btn-secondary"
                  >
                    İptal
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 btn-primary disabled:opacity-50"
                  >
                    {loading ? 'Gönderiliyor...' : 'Duyuru Gönder'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;

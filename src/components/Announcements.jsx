import React, { useState } from 'react';
import { Search, Plus, Bell, Calendar, Users, Image as ImageIcon, Video, Eye, ThumbsUp, MessageCircle, Send, Download, Filter, Trash2, Edit2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const AnnouncementsEnhanced = () => {
  const [announcements, setAnnouncements] = useState([
    {
      id: 1,
      title: 'Veli Toplantısı',
      content: 'Bu ayın 15\'inde saat 14:00\'da veli toplantısı yapılacaktır. Tüm velilerimizin katılımını bekliyoruz.',
      type: 'meeting',
      targetAudience: ['all-parents'],
      author: 'Müdür',
      date: '2025-01-07',
      publishDate: '2025-01-15 14:00',
      media: [],
      views: 48,
      likes: 12,
      comments: 5,
      readBy: 34,
      priority: 'high',
      status: 'published'
    },
    {
      id: 2,
      title: 'Yeni Yıl Etkinliği Fotoğrafları',
      content: 'Yılbaşı etkinliğinde çekilen fotoğraflar galeride yayınlandı. Ayrıca etkinlik videosu eklendi.',
      type: 'event',
      targetAudience: ['all-parents'],
      author: 'Öğretmen Elif',
      date: '2025-01-05',
      publishDate: '2025-01-05 10:00',
      media: [
        { type: 'photo', count: 25 },
        { type: 'video', count: 1 }
      ],
      views: 67,
      likes: 34,
      comments: 12,
      readBy: 56,
      priority: 'normal',
      status: 'published'
    },
    {
      id: 3,
      title: 'Ödeme Hatırlatması',
      content: 'Ocak ayı ödemelerinin son günü 15 Ocak\'tır. Lütfen ödemenizi zamanında yapınız.',
      type: 'payment',
      targetAudience: ['all-parents'],
      author: 'Muhasebe',
      date: '2025-01-03',
      publishDate: '2025-01-03 09:00',
      media: [],
      views: 89,
      likes: 5,
      comments: 2,
      readBy: 78,
      priority: 'urgent',
      status: 'published'
    },
    {
      id: 4,
      title: 'Yeni Personel İlanı - Taslak',
      content: 'Yeni yardımcı öğretmen alımı yapılacaktır. Başvurular için...',
      type: 'announcement',
      targetAudience: ['all-teachers'],
      author: 'Müdür',
      date: '2025-01-07',
      publishDate: null,
      media: [],
      views: 0,
      likes: 0,
      comments: 0,
      readBy: 0,
      priority: 'normal',
      status: 'draft'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('published');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: '',
    targetAudience: [],
    priority: 'normal',
    publishNow: true,
    scheduledDate: '',
    scheduledTime: ''
  });

  const announcementTypes = [
    { value: 'general', label: 'Genel Duyuru', icon: '📢' },
    { value: 'meeting', label: 'Toplantı', icon: '👥' },
    { value: 'event', label: 'Etkinlik', icon: '🎉' },
    { value: 'payment', label: 'Ödeme', icon: '💳' },
    { value: 'announcement', label: 'İlan', icon: '📋' },
    { value: 'holiday', label: 'Tatil', icon: '🏖️' }
  ];

  const targetGroups = [
    { value: 'all-parents', label: 'Tüm Veliler', icon: '👨‍👩‍👧‍👦' },
    { value: 'all-teachers', label: 'Tüm Öğretmenler', icon: '👨‍🏫' },
    { value: 'class-papatyalar', label: 'Papatyalar Sınıfı', icon: '🌼' },
    { value: 'class-guller', label: 'Güller Sınıfı', icon: '🌹' },
    { value: 'class-laleler', label: 'Laleler Sınıfı', icon: '🌷' }
  ];

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch = ann.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ann.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || ann.type === filterType;
    const matchesStatus = !filterStatus || ann.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: announcements.filter(a => a.status === 'published').length,
    drafts: announcements.filter(a => a.status === 'draft').length,
    totalViews: announcements.reduce((sum, a) => sum + a.views, 0),
    avgReadRate: announcements.length > 0
      ? (announcements.reduce((sum, a) => sum + (a.views > 0 ? (a.readBy / a.views * 100) : 0), 0) / announcements.length).toFixed(1)
      : 0
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      default:
        return 'bg-blue-100 text-blue-700 border-blue-200';
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'urgent':
        return 'Acil';
      case 'high':
        return 'Yüksek';
      default:
        return 'Normal';
    }
  };

  const handleTargetAudienceToggle = (groupValue) => {
    setFormData(prev => ({
      ...prev,
      targetAudience: prev.targetAudience.includes(groupValue)
        ? prev.targetAudience.filter(g => g !== groupValue)
        : [...prev.targetAudience, groupValue]
    }));
  };

  const handleNewAnnouncement = () => {
    setFormData({
      title: '',
      content: '',
      type: '',
      targetAudience: [],
      priority: 'normal',
      publishNow: true,
      scheduledDate: '',
      scheduledTime: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const now = new Date();
    const newAnnouncement = {
      id: Date.now(),
      ...formData,
      author: 'Müdür',
      date: now.toISOString().split('T')[0],
      publishDate: formData.publishNow
        ? now.toISOString()
        : `${formData.scheduledDate} ${formData.scheduledTime}`,
      media: [],
      views: 0,
      likes: 0,
      comments: 0,
      readBy: 0,
      status: formData.publishNow ? 'published' : 'draft'
    };
    setAnnouncements([newAnnouncement, ...announcements]);
    setShowModal(false);
    setConfirmModal({
      isOpen: true,
      type: 'success',
      title: 'Başarılı',
      message: formData.publishNow
        ? 'Duyuru yayınlandı ve hedef kitleye bildirim gönderildi!'
        : 'Duyuru taslak olarak kaydedildi.',
      onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
      showCancel: false
    });
  };

  const handleViewDetails = (announcement) => {
    setSelectedAnnouncement(announcement);
    setShowDetailModal(true);
  };

  const handleDelete = (id) => {
    setConfirmModal({
      isOpen: true,
      type: 'danger',
      title: 'Duyuruyu Sil',
      message: 'Bu duyuruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
      onConfirm: () => {
        setAnnouncements(announcements.filter(a => a.id !== id));
        setConfirmModal({ ...confirmModal, isOpen: false });
      }
    });
  };

  const handlePublish = (id) => {
    setAnnouncements(announcements.map(a =>
      a.id === id ? { ...a, status: 'published', publishDate: new Date().toISOString() } : a
    ));
    setConfirmModal({
      isOpen: true,
      type: 'success',
      title: 'Başarılı',
      message: 'Duyuru yayınlandı ve bildirimler gönderildi!',
      onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
      showCancel: false
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Duyurular</h2>
          <p className="text-gray-600">Hedef kitleye özel duyurular oluşturun ve yönetin</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Rapor İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleNewAnnouncement}>
            Yeni Duyuru
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Duyuru ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Select
            placeholder="Tür"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={announcementTypes}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'published', label: 'Yayınlananlar' },
              { value: 'draft', label: 'Taslaklar' },
              { value: 'scheduled', label: 'Zamanlanmış' }
            ]}
          />
          <Button variant="outline" icon={Filter}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Toplam Duyuru</p>
              <p className="text-3xl font-bold text-purple-700">{stats.total}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <Bell size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Taslaklar</p>
              <p className="text-3xl font-bold text-blue-700">{stats.drafts}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <Edit2 size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Toplam Görüntüleme</p>
              <p className="text-3xl font-bold text-green-700">{stats.totalViews}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <Eye size={24} className="text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Okuma Oranı</p>
              <p className="text-3xl font-bold text-orange-700">%{stats.avgReadRate}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <Users size={24} className="text-orange-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Duyuru Listesi */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredAnnouncements.map((announcement, index) => {
          const typeInfo = announcementTypes.find(t => t.value === announcement.type);
          return (
            <Card
              key={announcement.id}
              hover
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {typeInfo && <span className="text-xl">{typeInfo.icon}</span>}
                      <span className={`px-2 py-1 rounded-lg text-xs font-semibold border ${getPriorityColor(announcement.priority)}`}>
                        {getPriorityText(announcement.priority)}
                      </span>
                      {announcement.status === 'draft' && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                          Taslak
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">{announcement.title}</h3>
                    <p className="text-sm text-gray-500">
                      {announcement.author} • {new Date(announcement.date).toLocaleDateString('tr-TR')}
                    </p>
                  </div>
                </div>

                {/* Content */}
                <p className="text-gray-700 text-sm line-clamp-3">{announcement.content}</p>

                {/* Media */}
                {announcement.media.length > 0 && (
                  <div className="flex items-center gap-3">
                    {announcement.media.map((media, idx) => (
                      <div key={idx} className="flex items-center gap-1 text-sm text-purple-600">
                        {media.type === 'photo' ? <ImageIcon size={16} /> : <Video size={16} />}
                        <span>{media.count} {media.type === 'photo' ? 'Fotoğraf' : 'Video'}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Target Audience */}
                <div className="flex flex-wrap gap-2">
                  {announcement.targetAudience.map((target, idx) => {
                    const group = targetGroups.find(g => g.value === target);
                    return group ? (
                      <span key={idx} className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                        <span>{group.icon}</span>
                        <span>{group.label}</span>
                      </span>
                    ) : null;
                  })}
                </div>

                {/* Stats */}
                {announcement.status === 'published' && (
                  <div className="flex items-center gap-4 pt-3 border-t border-gray-200 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye size={16} />
                      <span>{announcement.views}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <ThumbsUp size={16} />
                      <span>{announcement.likes}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageCircle size={16} />
                      <span>{announcement.comments}</span>
                    </div>
                    <div className="flex-1 text-right text-xs">
                      <span className="text-green-600 font-semibold">
                        {announcement.views > 0 ? ((announcement.readBy / announcement.views * 100).toFixed(1)) : 0}% okundu
                      </span>
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                    onClick={() => handleViewDetails(announcement)}
                  >
                    Detay
                  </button>
                  {announcement.status === 'draft' && (
                    <button
                      className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors"
                      onClick={() => handlePublish(announcement.id)}
                    >
                      Yayınla
                    </button>
                  )}
                  <button
                    className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                    onClick={() => handleDelete(announcement.id)}
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal - Yeni Duyuru */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Yeni Duyuru Oluştur"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Başlık"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            placeholder="Duyuru başlığı"
            required
          />

          <TextArea
            label="İçerik"
            value={formData.content}
            onChange={(e) => setFormData({...formData, content: e.target.value})}
            placeholder="Duyuru içeriği..."
            rows={4}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Tür"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              options={announcementTypes}
              required
            />
            <Select
              label="Öncelik"
              value={formData.priority}
              onChange={(e) => setFormData({...formData, priority: e.target.value})}
              options={[
                { value: 'normal', label: 'Normal' },
                { value: 'high', label: 'Yüksek' },
                { value: 'urgent', label: 'Acil' }
              ]}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hedef Kitle (Çoklu seçim yapabilirsiniz)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {targetGroups.map(group => (
                <label key={group.value} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.targetAudience.includes(group.value)}
                    onChange={() => handleTargetAudienceToggle(group.value)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm">{group.icon} {group.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="border-t pt-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.publishNow}
                onChange={(e) => setFormData({...formData, publishNow: e.target.checked})}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm font-medium">Hemen yayınla ve bildirim gönder</span>
            </label>

            {!formData.publishNow && (
              <div className="grid grid-cols-2 gap-4 mt-4">
                <Input
                  label="Yayın Tarihi"
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({...formData, scheduledDate: e.target.value})}
                />
                <Input
                  label="Yayın Saati"
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                />
              </div>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={Send} onClick={handleSave}>
              {formData.publishNow ? 'Yayınla' : 'Taslak Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedAnnouncement && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="Duyuru Detayı"
          size="lg"
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{selectedAnnouncement.title}</h3>
              <p className="text-sm text-gray-500">
                {selectedAnnouncement.author} • {new Date(selectedAnnouncement.date).toLocaleDateString('tr-TR')}
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{selectedAnnouncement.content}</p>
            </div>

            {selectedAnnouncement.status === 'published' && (
              <div className="grid grid-cols-4 gap-4">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Eye className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-blue-700">{selectedAnnouncement.views}</p>
                  <p className="text-xs text-blue-600">Görüntüleme</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <ThumbsUp className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-green-700">{selectedAnnouncement.likes}</p>
                  <p className="text-xs text-green-600">Beğeni</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <MessageCircle className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-purple-700">{selectedAnnouncement.comments}</p>
                  <p className="text-xs text-purple-600">Yorum</p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg">
                  <Users className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <p className="text-2xl font-bold text-orange-700">{selectedAnnouncement.readBy}</p>
                  <p className="text-xs text-orange-600">Okuyan</p>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        onClose={() => setConfirmModal({ ...confirmModal, isOpen: false })}
        onConfirm={confirmModal.onConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        showCancel={confirmModal.showCancel !== false}
      />
    </div>
  );
};

export default AnnouncementsEnhanced;

import React, { useState } from 'react';
import {
  Newspaper,
  Plus,
  Send,
  Calendar,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Image,
  CheckCircle,
  Clock,
  Mail,
  Users,
  TrendingUp,
  Copy,
  Download
} from 'lucide-react';
import { Card, StatCard } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const Newsletter = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedNewsletter, setSelectedNewsletter] = useState(null);
  const [editingNewsletter, setEditingNewsletter] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [deleteModal, setDeleteModal] = useState({ show: false, itemId: null, itemName: '' });
  const [successModal, setSuccessModal] = useState({ show: false, message: '' });

  // Mock data - Gerçek uygulamada API'den gelecek
  const [newsletters, setNewsletters] = useState([
    {
      id: 1,
      title: 'Haftalık Bülten - 4-8 Aralık 2025',
      type: 'weekly',
      content: 'Bu hafta okulumuzda çok heyecan verici etkinlikler gerçekleştirdik. Öğrencilerimiz sanat atölyesinde harika çalışmalar yaptı...',
      template: 'standard',
      targetAudience: ['Tüm Veliler'],
      status: 'sent',
      scheduledDate: '2025-12-08',
      sentDate: '2025-12-08 09:00',
      createdBy: 'Ayşe Demir',
      stats: {
        sent: 145,
        opened: 128,
        clicked: 89,
        openRate: 88
      },
      images: 3,
      hasAttachment: true
    },
    {
      id: 2,
      title: 'Aralık Ayı Aylık Bülteni',
      type: 'monthly',
      content: 'Sevgili velilerimiz, Aralık ayında yılbaşı kutlamaları ve karne heyecanı ile dolu bir ay geçireceğiz...',
      template: 'festive',
      targetAudience: ['Tüm Veliler'],
      status: 'scheduled',
      scheduledDate: '2025-12-15',
      sentDate: null,
      createdBy: 'Mehmet Yılmaz',
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        openRate: 0
      },
      images: 5,
      hasAttachment: false
    },
    {
      id: 3,
      title: 'Özel Duyuru - Kış Şenliği',
      type: 'special',
      content: '22 Aralık tarihinde düzenleyeceğimiz Kış Şenliği için hazırlıklarımız tüm hızıyla devam ediyor...',
      template: 'event',
      targetAudience: ['Tüm Veliler'],
      status: 'sent',
      scheduledDate: '2025-12-05',
      sentDate: '2025-12-05 14:30',
      createdBy: 'Ayşe Demir',
      stats: {
        sent: 145,
        opened: 142,
        clicked: 115,
        openRate: 98
      },
      images: 8,
      hasAttachment: true
    },
    {
      id: 4,
      title: 'Papatyalar Sınıfı Haftalık Özet',
      type: 'weekly',
      content: 'Papatyalar sınıfı bu hafta doğa gezisi yaptı ve birçok yeni şey öğrendi...',
      template: 'class',
      targetAudience: ['Papatyalar'],
      status: 'draft',
      scheduledDate: null,
      sentDate: null,
      createdBy: 'Elif Yılmaz',
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        openRate: 0
      },
      images: 2,
      hasAttachment: false
    },
    {
      id: 5,
      title: 'Haftalık Bülten - 27 Kasım - 1 Aralık',
      type: 'weekly',
      content: 'Geçtiğimiz hafta 29 Kasım Öğretmenler Günü\'nü coşkuyla kutladık. Tüm öğretmenlerimize teşekkür ederiz...',
      template: 'standard',
      targetAudience: ['Tüm Veliler'],
      status: 'sent',
      scheduledDate: '2025-12-01',
      sentDate: '2025-12-01 10:00',
      createdBy: 'Mehmet Yılmaz',
      stats: {
        sent: 143,
        opened: 135,
        clicked: 98,
        openRate: 94
      },
      images: 4,
      hasAttachment: true
    }
  ]);

  const templates = [
    { value: 'standard', label: 'Standart Bülten' },
    { value: 'festive', label: 'Kutlama/Bayram' },
    { value: 'event', label: 'Etkinlik Duyurusu' },
    { value: 'class', label: 'Sınıf Özel' },
    { value: 'educational', label: 'Eğitsel İçerik' },
    { value: 'custom', label: 'Özel Tasarım' }
  ];

  const typeOptions = [
    { value: 'weekly', label: 'Haftalık Bülten' },
    { value: 'monthly', label: 'Aylık Bülten' },
    { value: 'special', label: 'Özel Duyuru' }
  ];

  const classOptions = [
    'Tüm Veliler',
    'Papatyalar',
    'Güller',
    'Laleler',
    'Menekşeler'
  ];

  const handleAddNewsletter = () => {
    setEditingNewsletter(null);
    setShowModal(true);
  };

  const handleEdit = (newsletter) => {
    setEditingNewsletter(newsletter);
    setShowModal(true);
  };

  const handleDelete = (newsletter) => {
    setDeleteModal({ show: true, itemId: newsletter.id, itemName: newsletter.title });
  };

  const confirmDelete = () => {
    setNewsletters(newsletters.filter(n => n.id !== deleteModal.itemId));
    setDeleteModal({ show: false, itemId: null, itemName: '' });
    setSuccessModal({ show: true, message: 'Bülten başarıyla silindi!' });
  };

  const handlePreview = (newsletter) => {
    setSelectedNewsletter(newsletter);
    setShowPreviewModal(true);
  };

  const handleDuplicate = (newsletter) => {
    const newNewsletter = {
      ...newsletter,
      id: Date.now(),
      title: `${newsletter.title} (Kopya)`,
      status: 'draft',
      scheduledDate: null,
      sentDate: null,
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        openRate: 0
      }
    };
    setNewsletters([newNewsletter, ...newsletters]);
    setSuccessModal({ show: true, message: 'Bülten kopyalandı!' });
  };

  const getStatusBadge = (status) => {
    const badges = {
      draft: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Taslak' },
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Zamanlandı' },
      sent: { bg: 'bg-green-100', text: 'text-green-700', label: 'Gönderildi' }
    };
    const badge = badges[status];
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  const getTypeBadge = (type) => {
    const types = {
      weekly: { bg: 'bg-purple-100', text: 'text-purple-700', label: 'Haftalık' },
      monthly: { bg: 'bg-pink-100', text: 'text-pink-700', label: 'Aylık' },
      special: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Özel' }
    };
    const badge = types[type];
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  // Filtreleme
  const filteredNewsletters = newsletters.filter(newsletter => {
    const matchesSearch = newsletter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         newsletter.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || newsletter.status === filterStatus;
    const matchesType = filterType === 'all' || newsletter.type === filterType;
    return matchesSearch && matchesStatus && matchesType;
  });

  // İstatistikler
  const totalSent = newsletters.filter(n => n.status === 'sent').length;
  const totalDraft = newsletters.filter(n => n.status === 'draft').length;
  const totalScheduled = newsletters.filter(n => n.status === 'scheduled').length;
  const avgOpenRate = newsletters.filter(n => n.status === 'sent').reduce((sum, n) => sum + n.stats.openRate, 0) / (totalSent || 1);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık ve Aksiyon Butonu */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-purple-600" />
            Veli Bülteni
          </h1>
          <p className="text-gray-600 mt-1">Haftalık ve aylık bülten yönetimi</p>
        </div>
        <Button onClick={handleAddNewsletter} icon={Plus}>
          Yeni Bülten Oluştur
        </Button>
      </div>

      {/* İstatistik Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Bülten"
          value={newsletters.length}
          icon={Newspaper}
          gradient="from-purple-600 to-pink-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Gönderilen"
          value={totalSent}
          icon={Send}
          gradient="from-green-600 to-emerald-600"
        />
        <StatCard
          title="Taslaklar"
          value={totalDraft}
          icon={FileText}
          gradient="from-gray-600 to-gray-700"
        />
        <StatCard
          title="Ortalama Açılma"
          value={`${avgOpenRate.toFixed(0)}%`}
          icon={TrendingUp}
          gradient="from-blue-600 to-cyan-600"
          trend={{ value: 5, isPositive: true }}
        />
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Arama"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Başlık veya içerik ara..."
          />
          <Select
            label="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="all">Tüm Durumlar</option>
            <option value="draft">Taslak</option>
            <option value="scheduled">Zamanlandı</option>
            <option value="sent">Gönderildi</option>
          </Select>
          <Select
            label="Tür"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">Tüm Türler</option>
            <option value="weekly">Haftalık</option>
            <option value="monthly">Aylık</option>
            <option value="special">Özel Duyuru</option>
          </Select>
        </div>
      </Card>

      {/* Bülten Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredNewsletters.map((newsletter, index) => (
          <Card key={newsletter.id} className="hover:shadow-lg transition-all" delay={index * 50}>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{newsletter.title}</h3>
                  {getTypeBadge(newsletter.type)}
                  {getStatusBadge(newsletter.status)}
                </div>

                <p className="text-gray-600 mb-3 line-clamp-2">{newsletter.content}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{newsletter.targetAudience.join(', ')}</span>
                  </div>

                  {newsletter.images > 0 && (
                    <div className="flex items-center gap-1">
                      <Image className="w-4 h-4" />
                      <span>{newsletter.images} Fotoğraf</span>
                    </div>
                  )}

                  {newsletter.scheduledDate && (
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(newsletter.scheduledDate).toLocaleDateString('tr-TR')}</span>
                    </div>
                  )}

                  {newsletter.sentDate && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>Gönderildi: {newsletter.sentDate}</span>
                    </div>
                  )}
                </div>

                {/* İstatistikler (Sadece gönderilen bültenler için) */}
                {newsletter.status === 'sent' && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-gray-900">{newsletter.stats.sent}</div>
                        <div className="text-xs text-gray-500">Gönderildi</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">{newsletter.stats.opened}</div>
                        <div className="text-xs text-gray-500">Açıldı</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{newsletter.stats.clicked}</div>
                        <div className="text-xs text-gray-500">Tıklandı</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">{newsletter.stats.openRate}%</div>
                        <div className="text-xs text-gray-500">Açılma Oranı</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Aksiyon Butonları */}
              <div className="flex flex-col gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePreview(newsletter)}
                  icon={Eye}
                >
                  Önizle
                </Button>

                {newsletter.status !== 'sent' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(newsletter)}
                    icon={Edit2}
                  >
                    Düzenle
                  </Button>
                )}

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDuplicate(newsletter)}
                  icon={Copy}
                >
                  Kopyala
                </Button>

                {newsletter.status === 'sent' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    icon={Download}
                  >
                    İndir
                  </Button>
                )}

                {newsletter.status === 'draft' && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(newsletter)}
                    icon={Trash2}
                    className="text-red-600 hover:bg-red-50"
                  >
                    Sil
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}

        {filteredNewsletters.length === 0 && (
          <Card className="text-center py-12">
            <Newspaper className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Bülten Bulunamadı</h3>
            <p className="text-gray-600 mb-4">Arama kriterlerinize uygun bülten bulunmuyor.</p>
            <Button onClick={handleAddNewsletter} icon={Plus}>
              Yeni Bülten Oluştur
            </Button>
          </Card>
        )}
      </div>

      {/* Bülten Ekleme/Düzenleme Modal */}
      {showModal && (
        <NewsletterModal
          newsletter={editingNewsletter}
          templates={templates}
          typeOptions={typeOptions}
          classOptions={classOptions}
          onClose={() => {
            setShowModal(false);
            setEditingNewsletter(null);
          }}
          onSave={(newsletter) => {
            if (editingNewsletter) {
              setNewsletters(newsletters.map(n => n.id === newsletter.id ? newsletter : n));
            } else {
              setNewsletters([{ ...newsletter, id: Date.now() }, ...newsletters]);
            }
            setShowModal(false);
            setEditingNewsletter(null);
          }}
        />
      )}

      {/* Önizleme Modal */}
      {showPreviewModal && selectedNewsletter && (
        <PreviewModal
          newsletter={selectedNewsletter}
          onClose={() => {
            setShowPreviewModal(false);
            setSelectedNewsletter(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, itemId: null, itemName: '' })}
        onConfirm={confirmDelete}
        title="Bülteni Sil"
        message={`"${deleteModal.itemName}" bültenini silmek istediğinizden emin misiniz?`}
        type="danger"
        confirmText="Evet, Sil"
        cancelText="İptal"
      />

      {/* Success Modal */}
      <ConfirmationModal
        isOpen={successModal.show}
        onClose={() => setSuccessModal({ show: false, message: '' })}
        onConfirm={() => setSuccessModal({ show: false, message: '' })}
        title="Başarılı"
        message={successModal.message}
        type="success"
        confirmText="Tamam"
        showCancel={false}
      />
    </div>
  );
};

// Bülten Ekleme/Düzenleme Modal Komponenti
const NewsletterModal = ({ newsletter, templates, typeOptions, classOptions, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    newsletter || {
      title: '',
      type: 'weekly',
      content: '',
      template: 'standard',
      targetAudience: ['Tüm Veliler'],
      status: 'draft',
      scheduledDate: '',
      createdBy: 'Mevcut Kullanıcı',
      stats: {
        sent: 0,
        opened: 0,
        clicked: 0,
        openRate: 0
      },
      images: 0,
      hasAttachment: false
    }
  );
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleAudienceChange = (className) => {
    if (className === 'Tüm Veliler') {
      setFormData({ ...formData, targetAudience: ['Tüm Veliler'] });
    } else {
      const newAudience = formData.targetAudience.includes(className)
        ? formData.targetAudience.filter(c => c !== className && c !== 'Tüm Veliler')
        : [...formData.targetAudience.filter(c => c !== 'Tüm Veliler'), className];

      setFormData({
        ...formData,
        targetAudience: newAudience.length === 0 ? ['Tüm Veliler'] : newAudience
      });
    }
  };

  const handleScheduleNow = () => {
    setFormData({
      ...formData,
      status: 'sent',
      scheduledDate: new Date().toISOString().split('T')[0],
      sentDate: new Date().toLocaleString('tr-TR')
    });
  };

  const handleScheduleLater = () => {
    if (formData.scheduledDate) {
      setFormData({ ...formData, status: 'scheduled' });
    } else {
      setErrorModal({ show: true, message: 'Lütfen bir tarih seçin' });
    }
  };

  return (
    <Modal title={newsletter ? 'Bülten Düzenle' : 'Yeni Bülten Oluştur'} onClose={onClose} size="xl">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Bülten Başlığı"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            required
            placeholder="örn: Haftalık Bülten - 11-15 Aralık"
          />

          <Select
            label="Bülten Türü"
            value={formData.type}
            onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            required
          >
            {typeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
        </div>

        <Select
          label="Şablon Seçin"
          value={formData.template}
          onChange={(e) => setFormData({ ...formData, template: e.target.value })}
          required
        >
          {templates.map(template => (
            <option key={template.value} value={template.value}>{template.label}</option>
          ))}
        </Select>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hedef Kitle *
          </label>
          <div className="flex flex-wrap gap-2">
            {classOptions.map(className => (
              <button
                key={className}
                type="button"
                onClick={() => handleAudienceChange(className)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  formData.targetAudience.includes(className)
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {className}
              </button>
            ))}
          </div>
        </div>

        <TextArea
          label="Bülten İçeriği"
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          required
          rows={8}
          placeholder="Bülten içeriğinizi buraya yazın..."
        />

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Image className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-semibold text-blue-900 mb-1">Medya Ekle</h4>
              <p className="text-sm text-blue-700 mb-3">Bülteninize fotoğraf ve dosya ekleyebilirsiniz</p>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" icon={Image}>
                  Fotoğraf Ekle
                </Button>
                <Button type="button" variant="outline" size="sm" icon={FileText}>
                  Dosya Ekle
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Gönderim Zamanlaması
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="date"
              label="Tarih Seç (İsteğe Bağlı)"
              value={formData.scheduledDate}
              onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
            />
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleScheduleNow}
                icon={Send}
                className="flex-1"
              >
                Hemen Gönder
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleScheduleLater}
                icon={Calendar}
                className="flex-1"
              >
                Zamanla
              </Button>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            İptal
          </Button>
          <Button
            type="submit"
            className="flex-1"
            icon={formData.status === 'sent' ? Send : FileText}
          >
            {formData.status === 'sent' ? 'Gönder' : 'Taslak Olarak Kaydet'}
          </Button>
        </div>
      </form>

      {/* Error Modal */}
      <ConfirmationModal
        isOpen={errorModal.show}
        onClose={() => setErrorModal({ show: false, message: '' })}
        onConfirm={() => setErrorModal({ show: false, message: '' })}
        title="Uyarı"
        message={errorModal.message}
        type="warning"
        confirmText="Tamam"
        showCancel={false}
      />
    </Modal>
  );
};

// Önizleme Modal Komponenti
const PreviewModal = ({ newsletter, onClose }) => {
  return (
    <Modal title="Bülten Önizleme" onClose={onClose} size="xl">
      <div className="space-y-4">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Newspaper className="w-6 h-6" />
            <span className="text-sm font-semibold">Rüya VİP Anaokulu</span>
          </div>
          <h1 className="text-2xl font-bold mb-2">{newsletter.title}</h1>
          <div className="flex items-center gap-4 text-sm opacity-90">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(newsletter.scheduledDate).toLocaleDateString('tr-TR')}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{newsletter.targetAudience.join(', ')}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <p className="text-gray-700 whitespace-pre-wrap">{newsletter.content}</p>
          </div>
        </div>

        {/* Images Placeholder */}
        {newsletter.images > 0 && (
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <div className="flex items-center gap-2 mb-4">
              <Image className="w-5 h-5 text-gray-600" />
              <span className="font-semibold text-gray-900">{newsletter.images} Fotoğraf</span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[...Array(Math.min(newsletter.images, 6))].map((_, i) => (
                <div key={i} className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                  <Image className="w-8 h-8 text-gray-400" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-gray-50 p-4 rounded-lg text-center text-sm text-gray-600">
          <p>Rüya VİP Anaokulu - www.tadpop.site</p>
          <p className="mt-1">Bu bülten {newsletter.createdBy} tarafından hazırlanmıştır.</p>
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Kapat
          </Button>
          {newsletter.status === 'sent' && (
            <Button icon={Download} className="flex-1">
              PDF İndir
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default Newsletter;

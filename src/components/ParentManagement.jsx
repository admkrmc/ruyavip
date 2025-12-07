import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Phone, Mail, MessageSquare, UserPlus, Filter, Download } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';

const ParentManagement = () => {
  const [parents, setParents] = useState([
    {
      id: 1,
      name: 'Ayşe Yılmaz',
      email: 'ayse@email.com',
      phone: '0532 111 2233',
      students: ['Zeynep Yılmaz'],
      relationship: 'Anne',
      address: 'Kadıköy, İstanbul',
      status: 'active'
    },
    {
      id: 2,
      name: 'Fatma Demir',
      email: 'fatma@email.com',
      phone: '0533 222 3344',
      students: ['Mehmet Demir'],
      relationship: 'Anne',
      address: 'Beşiktaş, İstanbul',
      status: 'active'
    },
    {
      id: 3,
      name: 'Hasan Kaya',
      email: 'hasan@email.com',
      phone: '0534 333 4455',
      students: ['Ali Kaya'],
      relationship: 'Baba',
      address: 'Üsküdar, İstanbul',
      status: 'passive'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedParent, setSelectedParent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship: '',
    address: '',
    workPhone: '',
    emergencyContact: '',
    emergencyPhone: '',
    notes: ''
  });

  const relationships = [
    { value: 'anne', label: 'Anne' },
    { value: 'baba', label: 'Baba' },
    { value: 'buyukanne', label: 'Büyükanne' },
    { value: 'buyukbaba', label: 'Büyükbaba' },
    { value: 'vasi', label: 'Vasi' }
  ];

  const filteredParents = parents.filter(parent => {
    const matchesSearch = parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         parent.phone.includes(searchTerm);
    const matchesStatus = !filterStatus || parent.status === filterStatus;

    return matchesSearch && matchesStatus;
  });

  const handleAddParent = () => {
    setSelectedParent(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      relationship: '',
      address: '',
      workPhone: '',
      emergencyContact: '',
      emergencyPhone: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEditParent = (parent) => {
    setSelectedParent(parent);
    setFormData({
      name: parent.name,
      email: parent.email,
      phone: parent.phone,
      relationship: parent.relationship,
      address: parent.address || '',
      workPhone: parent.workPhone || '',
      emergencyContact: parent.emergencyContact || '',
      emergencyPhone: parent.emergencyPhone || '',
      notes: parent.notes || ''
    });
    setShowModal(true);
  };

  const handleDeleteParent = (id) => {
    if (confirm('Bu veliyi silmek istediğinizden emin misiniz?')) {
      setParents(parents.filter(p => p.id !== id));
    }
  };

  const handleSave = () => {
    if (selectedParent) {
      setParents(parents.map(p =>
        p.id === selectedParent.id
          ? { ...p, ...formData }
          : p
      ));
    } else {
      setParents([...parents, {
        id: Date.now(),
        ...formData,
        students: [],
        status: 'active'
      }]);
    }
    setShowModal(false);
  };

  const handleSendMessage = (parent) => {
    alert(`${parent.name} ile mesajlaşma başlatılıyor...`);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık ve Aksiyon Butonları */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Veli Yönetimi</h2>
          <p className="text-gray-600">Tüm velileri görüntüleyin ve yönetin</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Excel İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleAddParent}>
            Yeni Veli Ekle
          </Button>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Veli, email veya telefon ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
            className="md:col-span-2"
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'active', label: 'Aktif' },
              { value: 'passive', label: 'Pasif' }
            ]}
          />
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Toplam Veli</p>
          <p className="text-3xl font-bold text-purple-700">{parents.length}</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Aktif Veli</p>
          <p className="text-3xl font-bold text-green-700">
            {parents.filter(p => p.status === 'active').length}
          </p>
        </Card>
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Mesaj Gönderildi</p>
          <p className="text-3xl font-bold text-blue-700">87</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <p className="text-sm text-orange-600 font-medium">Yanıt Oranı</p>
          <p className="text-3xl font-bold text-orange-700">%92</p>
        </Card>
      </div>

      {/* Veli Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredParents.map((parent, index) => (
          <Card
            key={parent.id}
            hover
            className="animate-scaleIn"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className="space-y-4">
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg">
                    {parent.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">{parent.name}</h3>
                    <span className="text-xs text-gray-500">{parent.relationship}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  parent.status === 'active'
                    ? 'bg-green-100 text-green-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {parent.status === 'active' ? 'Aktif' : 'Pasif'}
                </span>
              </div>

              {/* İletişim Bilgileri */}
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone size={16} className="text-purple-600" />
                  <span>{parent.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail size={16} className="text-purple-600" />
                  <span className="truncate">{parent.email}</span>
                </div>
              </div>

              {/* Öğrenciler */}
              {parent.students.length > 0 && (
                <div className="pt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Öğrenciler:</p>
                  <div className="flex flex-wrap gap-2">
                    {parent.students.map((student, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                        {student}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Aksiyon Butonları */}
              <div className="flex items-center gap-2 pt-2 border-t border-gray-100">
                <button
                  onClick={() => handleCall(parent.phone)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors text-sm font-medium"
                  title="Ara"
                >
                  <Phone size={16} />
                  Ara
                </button>
                <button
                  onClick={() => handleSendMessage(parent)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors text-sm font-medium"
                  title="Mesaj"
                >
                  <MessageSquare size={16} />
                  Mesaj
                </button>
                <button
                  onClick={() => handleEditParent(parent)}
                  className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                  title="Düzenle"
                >
                  <Edit2 size={18} className="text-purple-600" />
                </button>
                <button
                  onClick={() => handleDeleteParent(parent.id)}
                  className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Sil"
                >
                  <Trash2 size={18} className="text-red-600" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Modal - Veli Ekle/Düzenle */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedParent ? 'Veli Düzenle' : 'Yeni Veli Ekle'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Veli Adı Soyadı"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Örn: Ayşe Yılmaz"
              required
            />
            <Select
              label="Yakınlık Derecesi"
              value={formData.relationship}
              onChange={(e) => setFormData({...formData, relationship: e.target.value})}
              options={relationships}
              required
            />
            <Input
              label="Cep Telefonu"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="0532 111 2233"
              icon={Phone}
              required
            />
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="ornek@email.com"
              icon={Mail}
              required
            />
            <Input
              label="İş Telefonu"
              value={formData.workPhone}
              onChange={(e) => setFormData({...formData, workPhone: e.target.value})}
              placeholder="0212 333 4455"
            />
            <Input
              label="Acil Durum Kişisi"
              value={formData.emergencyContact}
              onChange={(e) => setFormData({...formData, emergencyContact: e.target.value})}
              placeholder="İsim Soyisim"
            />
          </div>

          <Input
            label="Acil Durum Telefonu"
            value={formData.emergencyPhone}
            onChange={(e) => setFormData({...formData, emergencyPhone: e.target.value})}
            placeholder="0535 444 5566"
          />

          <Input
            label="Adres"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="Tam adres"
          />

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {selectedParent ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ParentManagement;

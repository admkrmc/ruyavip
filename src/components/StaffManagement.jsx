import React, { useState } from 'react';
import { Users, Plus, Search, Filter, Phone, Mail, Calendar, Clock, CheckCircle, X, Eye, Edit2, Award, FileText, UserCheck, UserX } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const StaffManagement = () => {
  const [staff, setStaff] = useState([
    {
      id: 1,
      firstName: 'Elif',
      lastName: 'Yılmaz',
      role: 'Baş Öğretmen',
      email: 'elif.yilmaz@ruyavip.com',
      phone: '0532 111 2233',
      assignedClasses: ['Papatyalar', 'Güller'],
      startDate: '2020-09-01',
      schedule: 'Pazartesi-Cuma 08:00-17:00',
      status: 'active',
      leaveBalance: 15,
      usedLeave: 5,
      performance: 'excellent',
      specializations: ['Okul Öncesi Eğitim', 'Çocuk Gelişimi'],
      documents: ['Diploma', 'Sağlık Raporu', 'Sabıka Kaydı']
    },
    {
      id: 2,
      firstName: 'Ayşe',
      lastName: 'Demir',
      role: 'Öğretmen',
      email: 'ayse.demir@ruyavip.com',
      phone: '0533 444 5566',
      assignedClasses: ['Laleler'],
      startDate: '2021-02-15',
      schedule: 'Pazartesi-Cuma 08:30-17:30',
      status: 'active',
      leaveBalance: 12,
      usedLeave: 8,
      performance: 'good',
      specializations: ['Müzik Eğitimi', 'Drama'],
      documents: ['Diploma', 'Sağlık Raporu']
    },
    {
      id: 3,
      firstName: 'Mehmet',
      lastName: 'Kaya',
      role: 'Yardımcı Öğretmen',
      email: 'mehmet.kaya@ruyavip.com',
      phone: '0534 777 8899',
      assignedClasses: ['Papatyalar'],
      startDate: '2022-09-01',
      schedule: 'Pazartesi-Cuma 09:00-18:00',
      status: 'active',
      leaveBalance: 10,
      usedLeave: 2,
      performance: 'good',
      specializations: ['Beden Eğitimi'],
      documents: ['Diploma', 'Sağlık Raporu', 'Sabıka Kaydı']
    },
    {
      id: 4,
      firstName: 'Fatma',
      lastName: 'Arslan',
      role: 'Temizlik Personeli',
      email: 'fatma.arslan@ruyavip.com',
      phone: '0535 222 3344',
      assignedClasses: [],
      startDate: '2019-06-01',
      schedule: 'Pazartesi-Cumartesi 07:00-15:00',
      status: 'on-leave',
      leaveBalance: 5,
      usedLeave: 15,
      performance: 'excellent',
      specializations: [],
      documents: ['Sağlık Raporu']
    }
  ]);

  const [leaveRequests, setLeaveRequests] = useState([
    {
      id: 1,
      staffId: 1,
      staffName: 'Elif Yılmaz',
      type: 'Yıllık İzin',
      startDate: '2025-12-20',
      endDate: '2025-12-24',
      days: 3,
      reason: 'Aile ziyareti',
      status: 'pending',
      requestedAt: '2025-12-05'
    },
    {
      id: 2,
      staffId: 3,
      staffName: 'Mehmet Kaya',
      type: 'Sağlık İzni',
      startDate: '2025-12-10',
      endDate: '2025-12-10',
      days: 1,
      reason: 'Doktor randevusu',
      status: 'approved',
      requestedAt: '2025-12-08',
      approvedBy: 'Müdür',
      approvedAt: '2025-12-08'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [successModal, setSuccessModal] = useState({ show: false, message: '' });
  const [errorModal, setErrorModal] = useState({ show: false, message: '' });

  const [staffFormData, setStaffFormData] = useState({
    firstName: '',
    lastName: '',
    role: '',
    email: '',
    phone: '',
    assignedClasses: [],
    startDate: '',
    schedule: '',
    specializations: ''
  });

  const [leaveFormData, setLeaveFormData] = useState({
    staffId: '',
    type: '',
    startDate: '',
    endDate: '',
    reason: ''
  });

  const roles = [
    { value: 'Baş Öğretmen', label: 'Baş Öğretmen' },
    { value: 'Öğretmen', label: 'Öğretmen' },
    { value: 'Yardımcı Öğretmen', label: 'Yardımcı Öğretmen' },
    { value: 'Müdür Yardımcısı', label: 'Müdür Yardımcısı' },
    { value: 'Temizlik Personeli', label: 'Temizlik Personeli' },
    { value: 'Aşçı', label: 'Aşçı' },
    { value: 'Güvenlik', label: 'Güvenlik' }
  ];

  const leaveTypes = [
    { value: 'Yıllık İzin', label: 'Yıllık İzin' },
    { value: 'Sağlık İzni', label: 'Sağlık İzni' },
    { value: 'Mazeret İzni', label: 'Mazeret İzni' },
    { value: 'Ücretsiz İzin', label: 'Ücretsiz İzin' }
  ];

  const classes = ['Papatyalar', 'Güller', 'Laleler', 'Menekşeler'];

  const filteredStaff = staff.filter(person => {
    const matchesSearch = person.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         person.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = !filterRole || person.role === filterRole;
    const matchesStatus = !filterStatus || person.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const stats = {
    total: staff.length,
    active: staff.filter(s => s.status === 'active').length,
    onLeave: staff.filter(s => s.status === 'on-leave').length,
    pendingLeave: leaveRequests.filter(r => r.status === 'pending').length
  };

  const handleNewStaff = () => {
    setStaffFormData({
      firstName: '',
      lastName: '',
      role: '',
      email: '',
      phone: '',
      assignedClasses: [],
      startDate: '',
      schedule: '',
      specializations: ''
    });
    setShowStaffModal(true);
  };

  const handleClassToggle = (className) => {
    setStaffFormData(prev => ({
      ...prev,
      assignedClasses: prev.assignedClasses.includes(className)
        ? prev.assignedClasses.filter(c => c !== className)
        : [...prev.assignedClasses, className]
    }));
  };

  const handleSaveStaff = () => {
    if (!staffFormData.firstName || !staffFormData.lastName || !staffFormData.role) {
      setErrorModal({ show: true, message: 'Lütfen zorunlu alanları doldurun' });
      return;
    }

    const newStaff = {
      id: Date.now(),
      firstName: staffFormData.firstName,
      lastName: staffFormData.lastName,
      role: staffFormData.role,
      email: staffFormData.email,
      phone: staffFormData.phone,
      assignedClasses: staffFormData.assignedClasses,
      startDate: staffFormData.startDate,
      schedule: staffFormData.schedule,
      status: 'active',
      leaveBalance: 20,
      usedLeave: 0,
      performance: 'good',
      specializations: staffFormData.specializations.split(',').map(s => s.trim()).filter(s => s),
      documents: []
    };

    setStaff([newStaff, ...staff]);
    setShowStaffModal(false);
    setSuccessModal({ show: true, message: 'Personel kaydı oluşturuldu!' });
  };

  const handleNewLeaveRequest = () => {
    setLeaveFormData({
      staffId: '',
      type: '',
      startDate: '',
      endDate: '',
      reason: ''
    });
    setShowLeaveModal(true);
  };

  const handleSaveLeaveRequest = () => {
    const selectedStaff = staff.find(s => s.id === parseInt(leaveFormData.staffId));
    if (!selectedStaff) {
      setErrorModal({ show: true, message: 'Lütfen personel seçin' });
      return;
    }

    const start = new Date(leaveFormData.startDate);
    const end = new Date(leaveFormData.endDate);
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1;

    const newLeaveRequest = {
      id: Date.now(),
      staffId: selectedStaff.id,
      staffName: `${selectedStaff.firstName} ${selectedStaff.lastName}`,
      type: leaveFormData.type,
      startDate: leaveFormData.startDate,
      endDate: leaveFormData.endDate,
      days: days,
      reason: leaveFormData.reason,
      status: 'pending',
      requestedAt: new Date().toISOString().split('T')[0]
    };

    setLeaveRequests([newLeaveRequest, ...leaveRequests]);
    setShowLeaveModal(false);
    setSuccessModal({ show: true, message: 'İzin talebi oluşturuldu!' });
  };

  const handleApproveLeave = (requestId) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === requestId
        ? { ...req, status: 'approved', approvedBy: 'Müdür', approvedAt: new Date().toISOString().split('T')[0] }
        : req
    ));
    setSuccessModal({ show: true, message: 'İzin talebi onaylandı!' });
  };

  const handleRejectLeave = (requestId) => {
    setLeaveRequests(leaveRequests.map(req =>
      req.id === requestId
        ? { ...req, status: 'rejected', rejectedBy: 'Müdür', rejectedAt: new Date().toISOString().split('T')[0] }
        : req
    ));
    setSuccessModal({ show: true, message: 'İzin talebi reddedildi!' });
  };

  const handleViewDetails = (person) => {
    setSelectedStaff(person);
    setShowDetailModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'green';
      case 'on-leave':
        return 'yellow';
      case 'inactive':
        return 'gray';
      default:
        return 'gray';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'active':
        return 'Aktif';
      case 'on-leave':
        return 'İzinli';
      case 'inactive':
        return 'Pasif';
      default:
        return status;
    }
  };

  const getPerformanceBadge = (performance) => {
    switch (performance) {
      case 'excellent':
        return { label: 'Mükemmel', color: 'green', icon: '⭐' };
      case 'good':
        return { label: 'İyi', color: 'blue', icon: '👍' };
      case 'average':
        return { label: 'Orta', color: 'yellow', icon: '➖' };
      default:
        return { label: 'Değerlendirilmedi', color: 'gray', icon: '❓' };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Personel Yönetimi</h2>
          <p className="text-gray-600">Öğretmen ve personel yönetimi</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={FileText} onClick={handleNewLeaveRequest}>
            İzin Talebi
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleNewStaff}>
            Personel Ekle
          </Button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam Personel</p>
              <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <Users size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Aktif</p>
              <p className="text-3xl font-bold text-green-700">{stats.active}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <UserCheck size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">İzinli</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.onLeave}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <UserX size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">İzin Talebi</p>
              <p className="text-3xl font-bold text-orange-700">{stats.pendingLeave}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <Clock size={24} className="text-orange-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Personel ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Select
            placeholder="Görev"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            options={roles}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: '', label: 'Tümü' },
              { value: 'active', label: 'Aktif' },
              { value: 'on-leave', label: 'İzinli' },
              { value: 'inactive', label: 'Pasif' }
            ]}
          />
          <Button variant="outline" icon={Filter} onClick={() => {
            setSearchTerm('');
            setFilterRole('');
            setFilterStatus('active');
          }}>
            Temizle
          </Button>
        </div>
      </Card>

      {/* Personel Listesi */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {filteredStaff.map((person, index) => {
          const statusColor = getStatusColor(person.status);
          const performanceBadge = getPerformanceBadge(person.performance);
          return (
            <Card
              key={person.id}
              hover
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {person.firstName[0]}{person.lastName[0]}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        {person.firstName} {person.lastName}
                      </h3>
                      <p className="text-sm text-gray-600">{person.role}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 bg-${statusColor}-100 text-${statusColor}-700 rounded-lg text-xs font-medium`}>
                    {getStatusLabel(person.status)}
                  </span>
                </div>

                {/* İletişim */}
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail size={14} />
                    <span className="truncate">{person.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone size={14} />
                    <span>{person.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock size={14} />
                    <span className="text-xs">{person.schedule}</span>
                  </div>
                </div>

                {/* Sınıflar */}
                {person.assignedClasses.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2">Atandığı Sınıflar</p>
                    <div className="flex flex-wrap gap-2">
                      {person.assignedClasses.map((className, idx) => (
                        <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {className}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Performans */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Award size={16} className={`text-${performanceBadge.color}-600`} />
                    <span className="text-sm font-medium text-gray-700">Performans</span>
                  </div>
                  <span className={`px-2 py-1 bg-${performanceBadge.color}-100 text-${performanceBadge.color}-700 rounded text-xs font-semibold`}>
                    {performanceBadge.icon} {performanceBadge.label}
                  </span>
                </div>

                {/* İzin Bilgisi */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-blue-50 rounded">
                    <p className="text-xs text-blue-600">Kalan İzin</p>
                    <p className="font-semibold text-blue-700">{person.leaveBalance} gün</p>
                  </div>
                  <div className="p-2 bg-orange-50 rounded">
                    <p className="text-xs text-orange-600">Kullanılan</p>
                    <p className="font-semibold text-orange-700">{person.usedLeave} gün</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleViewDetails(person)}
                  >
                    <Eye size={16} />
                    Detay
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <Edit2 size={18} className="text-gray-600" />
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* İzin Talepleri */}
      {leaveRequests.length > 0 && (
        <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">İzin Talepleri</h3>
          <div className="grid grid-cols-1 gap-3">
            {leaveRequests.filter(r => r.status === 'pending').map((request) => (
              <Card key={request.id}>
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-800">{request.staffName}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {request.type}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                      <div>
                        <p className="text-xs text-gray-500">Başlangıç</p>
                        <p className="font-medium">{new Date(request.startDate).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Bitiş</p>
                        <p className="font-medium">{new Date(request.endDate).toLocaleDateString('tr-TR')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Süre</p>
                        <p className="font-medium">{request.days} gün</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-2">{request.reason}</p>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button variant="primary" size="sm" onClick={() => handleApproveLeave(request.id)}>
                      <CheckCircle size={16} className="mr-1" />
                      Onayla
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleRejectLeave(request.id)}>
                      <X size={16} className="mr-1" />
                      Reddet
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Modal - Yeni Personel */}
      <Modal
        isOpen={showStaffModal}
        onClose={() => setShowStaffModal(false)}
        title="Yeni Personel Ekle"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Ad"
              value={staffFormData.firstName}
              onChange={(e) => setStaffFormData({...staffFormData, firstName: e.target.value})}
              placeholder="Ad"
              required
            />
            <Input
              label="Soyad"
              value={staffFormData.lastName}
              onChange={(e) => setStaffFormData({...staffFormData, lastName: e.target.value})}
              placeholder="Soyad"
              required
            />
          </div>

          <Select
            label="Görev"
            value={staffFormData.role}
            onChange={(e) => setStaffFormData({...staffFormData, role: e.target.value})}
            options={roles}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="E-posta"
              type="email"
              value={staffFormData.email}
              onChange={(e) => setStaffFormData({...staffFormData, email: e.target.value})}
              placeholder="ornek@ruyavip.com"
              required
            />
            <Input
              label="Telefon"
              value={staffFormData.phone}
              onChange={(e) => setStaffFormData({...staffFormData, phone: e.target.value})}
              placeholder="0532 XXX XX XX"
              required
            />
          </div>

          <Input
            label="Başlangıç Tarihi"
            type="date"
            value={staffFormData.startDate}
            onChange={(e) => setStaffFormData({...staffFormData, startDate: e.target.value})}
            required
          />

          <Input
            label="Çalışma Saatleri"
            value={staffFormData.schedule}
            onChange={(e) => setStaffFormData({...staffFormData, schedule: e.target.value})}
            placeholder="Pazartesi-Cuma 08:00-17:00"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Atanacağı Sınıflar (Opsiyonel)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {classes.map(className => (
                <label key={className} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={staffFormData.assignedClasses.includes(className)}
                    onChange={() => handleClassToggle(className)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm">{className}</span>
                </label>
              ))}
            </div>
          </div>

          <Input
            label="Uzmanlık Alanları (virgülle ayırın)"
            value={staffFormData.specializations}
            onChange={(e) => setStaffFormData({...staffFormData, specializations: e.target.value})}
            placeholder="Okul Öncesi Eğitim, Çocuk Gelişimi"
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowStaffModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSaveStaff}>
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - İzin Talebi */}
      <Modal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="Yeni İzin Talebi"
        size="md"
      >
        <div className="space-y-4">
          <Select
            label="Personel"
            value={leaveFormData.staffId}
            onChange={(e) => setLeaveFormData({...leaveFormData, staffId: e.target.value})}
            options={staff.filter(s => s.status === 'active').map(s => ({
              value: s.id,
              label: `${s.firstName} ${s.lastName} (${s.role})`
            }))}
            required
          />

          <Select
            label="İzin Türü"
            value={leaveFormData.type}
            onChange={(e) => setLeaveFormData({...leaveFormData, type: e.target.value})}
            options={leaveTypes}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Başlangıç Tarihi"
              type="date"
              value={leaveFormData.startDate}
              onChange={(e) => setLeaveFormData({...leaveFormData, startDate: e.target.value})}
              required
            />
            <Input
              label="Bitiş Tarihi"
              type="date"
              value={leaveFormData.endDate}
              onChange={(e) => setLeaveFormData({...leaveFormData, endDate: e.target.value})}
              required
            />
          </div>

          <TextArea
            label="Sebep"
            value={leaveFormData.reason}
            onChange={(e) => setLeaveFormData({...leaveFormData, reason: e.target.value})}
            placeholder="İzin sebebini açıklayın"
            rows={3}
            required
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowLeaveModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSaveLeaveRequest}>
              Talep Oluştur
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedStaff && showDetailModal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`${selectedStaff.firstName} ${selectedStaff.lastName} - Detaylar`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Görev</p>
                <p className="font-semibold text-gray-800">{selectedStaff.role}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Durum</p>
                <p className="font-semibold text-gray-800">{getStatusLabel(selectedStaff.status)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">E-posta</p>
                <p className="font-semibold text-gray-800">{selectedStaff.email}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-semibold text-gray-800">{selectedStaff.phone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Başlangıç Tarihi</p>
                <p className="font-semibold text-gray-800">
                  {new Date(selectedStaff.startDate).toLocaleDateString('tr-TR')}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Çalışma Saatleri</p>
                <p className="font-semibold text-gray-800">{selectedStaff.schedule}</p>
              </div>
            </div>

            {selectedStaff.assignedClasses.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Atandığı Sınıflar</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStaff.assignedClasses.map((className, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">
                      {className}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {selectedStaff.specializations.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Uzmanlık Alanları</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStaff.specializations.map((spec, idx) => (
                    <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-blue-700">{selectedStaff.leaveBalance}</p>
                <p className="text-xs text-blue-600">Kalan İzin (Gün)</p>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <Clock className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-orange-700">{selectedStaff.usedLeave}</p>
                <p className="text-xs text-orange-600">Kullanılan İzin</p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg text-center">
                <Award className="w-6 h-6 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-bold text-green-700">
                  {getPerformanceBadge(selectedStaff.performance).label}
                </p>
                <p className="text-xs text-green-600">Performans</p>
              </div>
            </div>

            {selectedStaff.documents.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Dökümanlar</h4>
                <div className="space-y-2">
                  {selectedStaff.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">{doc}</span>
                      </div>
                      <CheckCircle size={16} className="text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </Modal>
      )}

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
    </div>
  );
};

export default StaffManagement;

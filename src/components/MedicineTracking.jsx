import React, { useState } from 'react';
import { Pill, Plus, Clock, CheckCircle, AlertTriangle, User, Calendar, Bell, FileText, Eye, Edit2, X } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';

const MedicineTracking = () => {
  const [medicines, setMedicines] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: 'Ayşe Yılmaz',
      studentClass: 'Papatyalar',
      medicineName: 'Augmentin Şurup',
      dosage: '5 ml',
      frequency: '2x1',
      times: ['09:00', '17:00'],
      startDate: '2025-12-05',
      endDate: '2025-12-15',
      reason: 'Boğaz enfeksiyonu',
      sideEffects: 'Mide bulantısı olabilir',
      parentApproved: true,
      parentApprovedAt: '2025-12-05 08:30',
      parentName: 'Fatma Yılmaz',
      prescriptionFile: 'recete_ayse.pdf',
      logs: [
        { date: '2025-12-09', time: '09:00', given: true, givenBy: 'Öğretmen Elif', note: '' },
        { date: '2025-12-09', time: '17:00', given: false, givenBy: null, note: '' }
      ],
      active: true
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Mehmet Demir',
      studentClass: 'Güller',
      medicineName: 'Ventolin İnhaler',
      dosage: '2 puf',
      frequency: 'İhtiyaç halinde',
      times: [],
      startDate: '2025-09-01',
      endDate: '2026-06-30',
      reason: 'Astım',
      sideEffects: 'Kalp çarpıntısı, titreme',
      parentApproved: true,
      parentApprovedAt: '2025-09-01 10:00',
      parentName: 'Ayşe Demir',
      prescriptionFile: 'recete_mehmet.pdf',
      logs: [
        { date: '2025-12-08', time: '14:30', given: true, givenBy: 'Öğretmen Ayşe', note: 'Koşu sonrası nefes darlığı' }
      ],
      active: true
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Zeynep Kaya',
      studentClass: 'Laleler',
      medicineName: 'Calpol Şurup',
      dosage: '7.5 ml',
      frequency: '3x1',
      times: ['08:00', '14:00', '20:00'],
      startDate: '2025-12-09',
      endDate: '2025-12-11',
      reason: 'Ateş (38.5°C)',
      sideEffects: '',
      parentApproved: false,
      parentApprovedAt: null,
      parentName: 'Mehmet Kaya',
      prescriptionFile: null,
      logs: [],
      active: true
    }
  ]);

  const [students] = useState([
    { id: 1, name: 'Ayşe Yılmaz', class: 'Papatyalar' },
    { id: 2, name: 'Mehmet Demir', class: 'Güller' },
    { id: 3, name: 'Zeynep Kaya', class: 'Laleler' },
    { id: 4, name: 'Ali Çelik', class: 'Papatyalar' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('active');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [formData, setFormData] = useState({
    studentId: '',
    medicineName: '',
    dosage: '',
    frequency: '',
    times: [''],
    startDate: '',
    endDate: '',
    reason: '',
    sideEffects: '',
    parentName: '',
    prescriptionFile: null
  });

  const [logFormData, setLogFormData] = useState({
    medicineId: null,
    time: '',
    given: true,
    note: ''
  });

  const frequencyOptions = [
    { value: '1x1', label: '1x1 (Günde 1 kez)' },
    { value: '2x1', label: '2x1 (Günde 2 kez)' },
    { value: '3x1', label: '3x1 (Günde 3 kez)' },
    { value: '4x1', label: '4x1 (Günde 4 kez)' },
    { value: 'İhtiyaç halinde', label: 'İhtiyaç halinde' }
  ];

  const filteredMedicines = medicines.filter(med => {
    const matchesSearch = med.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         med.medicineName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && med.active) ||
                         (filterStatus === 'approved' && med.parentApproved) ||
                         (filterStatus === 'pending' && !med.parentApproved);
    return matchesSearch && matchesStatus;
  });

  const today = new Date().toISOString().split('T')[0];
  const now = new Date().toTimeString().slice(0, 5);

  const todayMedications = medicines.filter(med => {
    if (!med.active || !med.parentApproved) return false;
    const start = new Date(med.startDate);
    const end = new Date(med.endDate);
    const todayDate = new Date(today);
    return todayDate >= start && todayDate <= end;
  });

  const dueMedications = todayMedications.filter(med => {
    if (med.frequency === 'İhtiyaç halinde') return false;
    return med.times.some(time => {
      const todayLog = med.logs.find(log => log.date === today && log.time === time);
      return !todayLog || !todayLog.given;
    });
  });

  const overdueMedications = dueMedications.filter(med => {
    return med.times.some(time => {
      const todayLog = med.logs.find(log => log.date === today && log.time === time);
      return time < now && (!todayLog || !todayLog.given);
    });
  });

  const stats = {
    total: medicines.filter(m => m.active).length,
    approved: medicines.filter(m => m.parentApproved).length,
    pendingApproval: medicines.filter(m => !m.parentApproved && m.active).length,
    todayDue: dueMedications.length,
    overdue: overdueMedications.length
  };

  const handleNewMedicine = () => {
    setFormData({
      studentId: '',
      medicineName: '',
      dosage: '',
      frequency: '',
      times: [''],
      startDate: '',
      endDate: '',
      reason: '',
      sideEffects: '',
      parentName: '',
      prescriptionFile: null
    });
    setShowModal(true);
  };

  const handleAddTime = () => {
    setFormData(prev => ({
      ...prev,
      times: [...prev.times, '']
    }));
  };

  const handleRemoveTime = (index) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.filter((_, i) => i !== index)
    }));
  };

  const handleTimeChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      times: prev.times.map((time, i) => i === index ? value : time)
    }));
  };

  const handleSave = () => {
    const student = students.find(s => s.id === parseInt(formData.studentId));
    if (!student) {
      alert('Lütfen bir öğrenci seçin');
      return;
    }

    const newMedicine = {
      id: Date.now(),
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      medicineName: formData.medicineName,
      dosage: formData.dosage,
      frequency: formData.frequency,
      times: formData.times.filter(t => t),
      startDate: formData.startDate,
      endDate: formData.endDate,
      reason: formData.reason,
      sideEffects: formData.sideEffects,
      parentApproved: false,
      parentApprovedAt: null,
      parentName: formData.parentName,
      prescriptionFile: formData.prescriptionFile,
      logs: [],
      active: true
    };

    setMedicines([newMedicine, ...medicines]);
    setShowModal(false);
    alert('İlaç kaydı oluşturuldu! Veli onayı bekleniyor.');
  };

  const handleApprove = (medicineId) => {
    setMedicines(medicines.map(m =>
      m.id === medicineId
        ? { ...m, parentApproved: true, parentApprovedAt: new Date().toISOString() }
        : m
    ));
    alert('İlaç kaydı onaylandı! SMS bildirimi gönderildi.');
  };

  const handleLogMedication = (medicine) => {
    setSelectedMedicine(medicine);
    const nextTime = medicine.times.find(time => {
      const todayLog = medicine.logs.find(log => log.date === today && log.time === time);
      return !todayLog || !todayLog.given;
    });
    setLogFormData({
      medicineId: medicine.id,
      time: nextTime || medicine.times[0] || '',
      given: true,
      note: ''
    });
    setShowLogModal(true);
  };

  const handleSaveLog = () => {
    const medicine = medicines.find(m => m.id === logFormData.medicineId);
    if (!medicine) return;

    const newLog = {
      date: today,
      time: logFormData.time,
      given: logFormData.given,
      givenBy: 'Öğretmen', // Should come from auth context
      note: logFormData.note
    };

    setMedicines(medicines.map(m =>
      m.id === logFormData.medicineId
        ? { ...m, logs: [...m.logs, newLog] }
        : m
    ));

    setShowLogModal(false);
    alert(logFormData.given ? 'İlaç verildi olarak kaydedildi!' : 'İlaç verilmedi olarak kaydedildi.');
  };

  const handleViewDetails = (medicine) => {
    setSelectedMedicine(medicine);
    setShowDetailModal(true);
  };

  const getMedicineStatus = (medicine) => {
    if (!medicine.parentApproved) return { label: 'Onay Bekliyor', color: 'yellow' };
    if (!medicine.active) return { label: 'Pasif', color: 'gray' };

    const start = new Date(medicine.startDate);
    const end = new Date(medicine.endDate);
    const todayDate = new Date(today);

    if (todayDate < start) return { label: 'Henüz Başlamadı', color: 'blue' };
    if (todayDate > end) return { label: 'Tamamlandı', color: 'green' };

    if (medicine.frequency === 'İhtiyaç halinde') return { label: 'İhtiyaç Halinde', color: 'purple' };

    const overdueTime = medicine.times.find(time => {
      const todayLog = medicine.logs.find(log => log.date === today && log.time === time);
      return time < now && (!todayLog || !todayLog.given);
    });

    if (overdueTime) return { label: 'Gecikmiş', color: 'red' };

    return { label: 'Aktif', color: 'green' };
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">İlaç Takibi</h2>
          <p className="text-gray-600">Öğrenci ilaç yönetimi ve uygulama takibi</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleNewMedicine}>
          İlaç Ekle
        </Button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam İlaç</p>
              <p className="text-3xl font-bold text-blue-700">{stats.total}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <Pill size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Onaylı</p>
              <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <CheckCircle size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Onay Bekleyen</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pendingApproval}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <Clock size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Bugün Verilecek</p>
              <p className="text-3xl font-bold text-purple-700">{stats.todayDue}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <Calendar size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Gecikmiş</p>
              <p className="text-3xl font-bold text-red-700">{stats.overdue}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <AlertTriangle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Öğrenci veya ilaç ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Pill}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: 'Tümü' },
              { value: 'active', label: 'Aktif' },
              { value: 'approved', label: 'Onaylı' },
              { value: 'pending', label: 'Onay Bekleyen' }
            ]}
          />
          <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('active'); }}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* İlaç Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredMedicines.map((medicine, index) => {
          const status = getMedicineStatus(medicine);
          return (
            <Card
              key={medicine.id}
              hover
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold">
                      <Pill size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{medicine.medicineName}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {medicine.studentName}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {medicine.studentClass}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 bg-${status.color}-100 text-${status.color}-700 rounded-lg text-sm font-medium`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* İlaç Bilgileri */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Dozaj</p>
                    <p className="font-semibold text-gray-800">{medicine.dosage}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Sıklık</p>
                    <p className="font-semibold text-gray-800">{medicine.frequency}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-xs text-orange-600 mb-1">Süre</p>
                    <p className="font-semibold text-gray-800 text-xs">
                      {new Date(medicine.startDate).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })} - {new Date(medicine.endDate).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 mb-1">Saatler</p>
                    <p className="font-semibold text-gray-800 text-xs">
                      {medicine.times.length > 0 ? medicine.times.join(', ') : 'İhtiyaç halinde'}
                    </p>
                  </div>
                </div>

                {/* Sebep */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-600 mb-1">Kullanım Sebebi</p>
                  <p className="text-sm text-gray-700">{medicine.reason}</p>
                </div>

                {/* Yan Etkiler */}
                {medicine.sideEffects && (
                  <div className="bg-yellow-50 rounded-lg p-3 border border-yellow-200">
                    <div className="flex items-start gap-2">
                      <AlertTriangle size={16} className="text-yellow-600 mt-0.5" />
                      <div>
                        <p className="text-xs text-yellow-700 font-semibold mb-1">Olası Yan Etkiler</p>
                        <p className="text-sm text-yellow-700">{medicine.sideEffects}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Veli Onayı */}
                {!medicine.parentApproved && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Clock size={18} className="text-yellow-600" />
                        <span className="text-sm font-medium text-yellow-700">
                          Veli onayı bekleniyor ({medicine.parentName})
                        </span>
                      </div>
                      <Button variant="primary" size="sm" onClick={() => handleApprove(medicine.id)}>
                        Onayla (Simüle)
                      </Button>
                    </div>
                  </div>
                )}

                {/* Bugünkü Uygulama */}
                {medicine.parentApproved && medicine.active && (
                  <div className="border-t pt-3">
                    <h4 className="text-sm font-semibold text-gray-700 mb-2">Bugünkü Uygulama</h4>
                    <div className="flex flex-wrap gap-2">
                      {medicine.frequency === 'İhtiyaç halinde' ? (
                        <span className="text-sm text-gray-600 italic">İhtiyaç halinde verilecek</span>
                      ) : (
                        medicine.times.map((time, idx) => {
                          const todayLog = medicine.logs.find(log => log.date === today && log.time === time);
                          const isGiven = todayLog?.given;
                          const isPast = time < now;

                          return (
                            <div key={idx} className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                              isGiven
                                ? 'bg-green-100 text-green-700'
                                : isPast
                                ? 'bg-red-100 text-red-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              <Clock size={14} />
                              <span className="font-medium">{time}</span>
                              {isGiven ? (
                                <CheckCircle size={14} />
                              ) : isPast ? (
                                <AlertTriangle size={14} />
                              ) : null}
                            </div>
                          );
                        })
                      )}
                    </div>
                  </div>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleViewDetails(medicine)}
                  >
                    <Eye size={16} />
                    Detay
                  </button>
                  {medicine.parentApproved && medicine.active && (
                    <button
                      className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      onClick={() => handleLogMedication(medicine)}
                    >
                      <Pill size={16} />
                      İlaç Ver
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal - Yeni İlaç */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Yeni İlaç Kaydı"
        size="xl"
      >
        <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
          <Select
            label="Öğrenci"
            value={formData.studentId}
            onChange={(e) => setFormData({...formData, studentId: e.target.value})}
            options={students.map(s => ({ value: s.id, label: `${s.name} (${s.class})` }))}
            required
          />

          <Input
            label="İlaç Adı"
            value={formData.medicineName}
            onChange={(e) => setFormData({...formData, medicineName: e.target.value})}
            placeholder="Örn: Augmentin Şurup"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Dozaj"
              value={formData.dosage}
              onChange={(e) => setFormData({...formData, dosage: e.target.value})}
              placeholder="Örn: 5 ml, 1 tablet"
              required
            />
            <Select
              label="Kullanım Sıklığı"
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              options={frequencyOptions}
              required
            />
          </div>

          {formData.frequency !== 'İhtiyaç halinde' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Kullanım Saatleri
              </label>
              {formData.times.map((time, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <Input
                    type="time"
                    value={time}
                    onChange={(e) => handleTimeChange(index, e.target.value)}
                    className="flex-1"
                  />
                  {formData.times.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => handleRemoveTime(index)}>
                      <X size={16} />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={handleAddTime}>
                <Plus size={16} className="mr-1" />
                Saat Ekle
              </Button>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Başlangıç Tarihi"
              type="date"
              value={formData.startDate}
              onChange={(e) => setFormData({...formData, startDate: e.target.value})}
              required
            />
            <Input
              label="Bitiş Tarihi"
              type="date"
              value={formData.endDate}
              onChange={(e) => setFormData({...formData, endDate: e.target.value})}
              required
            />
          </div>

          <TextArea
            label="Kullanım Sebebi"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="Örn: Boğaz enfeksiyonu"
            rows={2}
            required
          />

          <TextArea
            label="Olası Yan Etkiler (Opsiyonel)"
            value={formData.sideEffects}
            onChange={(e) => setFormData({...formData, sideEffects: e.target.value})}
            placeholder="Örn: Mide bulantısı, baş ağrısı"
            rows={2}
          />

          <Input
            label="Veli Adı Soyadı"
            value={formData.parentName}
            onChange={(e) => setFormData({...formData, parentName: e.target.value})}
            placeholder="Onay verecek veli"
            required
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reçete/Rapor (Opsiyonel)
            </label>
            <Input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({...formData, prescriptionFile: e.target.files[0]?.name})}
            />
            <p className="text-xs text-gray-500 mt-1">PDF, JPG veya PNG formatında</p>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <Bell size={18} className="text-yellow-600 mt-0.5" />
              <div className="text-sm text-yellow-700">
                <p className="font-semibold mb-1">Veli Onayı Gerekli</p>
                <p>İlaç kaydı oluşturulduktan sonra veliye SMS gönderilecek ve onay beklenecektir.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Kaydet ve Onay İste
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedMedicine && showDetailModal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`${selectedMedicine.medicineName} - Detaylar`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Öğrenci</p>
                <p className="font-semibold text-gray-800">{selectedMedicine.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sınıf</p>
                <p className="font-semibold text-gray-800">{selectedMedicine.studentClass}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Dozaj</p>
                <p className="font-semibold text-gray-800">{selectedMedicine.dosage}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Sıklık</p>
                <p className="font-semibold text-gray-800">{selectedMedicine.frequency}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-2">Kullanım Sebebi</p>
              <p className="text-gray-800">{selectedMedicine.reason}</p>
            </div>

            {selectedMedicine.sideEffects && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-yellow-700 mb-1">Olası Yan Etkiler</p>
                <p className="text-sm text-yellow-700">{selectedMedicine.sideEffects}</p>
              </div>
            )}

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Uygulama Geçmişi</h4>
              {selectedMedicine.logs.length > 0 ? (
                <div className="space-y-2">
                  {selectedMedicine.logs.slice().reverse().map((log, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-800">
                          {new Date(log.date).toLocaleDateString('tr-TR')} - {log.time}
                        </p>
                        <p className="text-sm text-gray-600">{log.givenBy}</p>
                        {log.note && <p className="text-sm text-gray-500 italic">{log.note}</p>}
                      </div>
                      {log.given ? (
                        <CheckCircle size={20} className="text-green-600" />
                      ) : (
                        <X size={20} className="text-red-600" />
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Henüz uygulama kaydı yok</p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal - İlaç Verme */}
      {showLogModal && selectedMedicine && (
        <Modal
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          title={`${selectedMedicine.medicineName} - Uygulama Kaydı`}
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">{selectedMedicine.studentName}</p>
              <p className="text-sm text-gray-600">Dozaj: {selectedMedicine.dosage}</p>
            </div>

            <Input
              label="Saat"
              type="time"
              value={logFormData.time}
              onChange={(e) => setLogFormData({...logFormData, time: e.target.value})}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Durum
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLogFormData({...logFormData, given: true})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    logFormData.given
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <CheckCircle className={`w-8 h-8 mx-auto mb-2 ${logFormData.given ? 'text-green-600' : 'text-gray-400'}`} />
                  <p className="font-medium text-gray-700">Verildi</p>
                </button>
                <button
                  type="button"
                  onClick={() => setLogFormData({...logFormData, given: false})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    !logFormData.given
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <X className={`w-8 h-8 mx-auto mb-2 ${!logFormData.given ? 'text-red-600' : 'text-gray-400'}`} />
                  <p className="font-medium text-gray-700">Verilmedi</p>
                </button>
              </div>
            </div>

            <TextArea
              label="Not (Opsiyonel)"
              value={logFormData.note}
              onChange={(e) => setLogFormData({...logFormData, note: e.target.value})}
              placeholder="Örn: Öğrenci uyuyordu, sonra verilecek"
              rows={2}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowLogModal(false)}>
                İptal
              </Button>
              <Button variant="primary" onClick={handleSaveLog}>
                Kaydet
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default MedicineTracking;

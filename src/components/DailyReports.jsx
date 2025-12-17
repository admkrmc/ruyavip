import React, { useState } from 'react';
import { Calendar, Clock, Camera, Send, Filter, Search, Plus, Edit2, Eye, Smile, Meh, Frown, Coffee, Utensils, Apple, Moon, Sun, Activity, MessageCircle } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const DailyReports = () => {
  const [reports, setReports] = useState([
    {
      id: 1,
      studentId: 1,
      studentName: 'Ayşe Yılmaz',
      studentClass: 'Papatyalar',
      date: '2025-12-09',
      activities: 'Bugün resim aktivitesinde çok güzel bir kelebek çizdi. Müzik dersinde dans etti ve çok eğlendi.',
      meals: {
        breakfast: { eaten: true, amount: 'Hepsi', note: 'İştahla yedi' },
        lunch: { eaten: true, amount: 'Çoğu', note: 'Sebzeleri sevmedi' },
        snack: { eaten: true, amount: 'Hepsi', note: '' }
      },
      sleep: {
        slept: true,
        startTime: '13:00',
        endTime: '14:30',
        quality: 'İyi'
      },
      mood: 'happy',
      bathroom: { count: 3, note: 'Normal' },
      health: { status: 'Sağlıklı', note: '' },
      photos: 2,
      sentToParent: true,
      sentAt: '2025-12-09 15:30',
      createdBy: 'Öğretmen Elif'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Mehmet Demir',
      studentClass: 'Güller',
      date: '2025-12-09',
      activities: 'Lego oyunu oynadı, arkadaşlarıyla iyi iletişim kurdu. Bahçede top oynadı.',
      meals: {
        breakfast: { eaten: true, amount: 'Hepsi', note: '' },
        lunch: { eaten: true, amount: 'Hepsi', note: 'Çok beğendi' },
        snack: { eaten: true, amount: 'Yarısı', note: '' }
      },
      sleep: {
        slept: false,
        startTime: '',
        endTime: '',
        quality: 'Uyumadı'
      },
      mood: 'energetic',
      bathroom: { count: 2, note: 'Normal' },
      health: { status: 'Sağlıklı', note: '' },
      photos: 1,
      sentToParent: false,
      createdBy: 'Öğretmen Ayşe'
    }
  ]);

  const [students] = useState([
    { id: 1, name: 'Ayşe Yılmaz', class: 'Papatyalar' },
    { id: 2, name: 'Mehmet Demir', class: 'Güller' },
    { id: 3, name: 'Zeynep Kaya', class: 'Laleler' },
    { id: 4, name: 'Ali Çelik', class: 'Papatyalar' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, type: 'info', title: '', message: '', onConfirm: null });
  const [formData, setFormData] = useState({
    studentId: '',
    date: new Date().toISOString().split('T')[0],
    activities: '',
    meals: {
      breakfast: { eaten: true, amount: 'Hepsi', note: '' },
      lunch: { eaten: true, amount: 'Hepsi', note: '' },
      snack: { eaten: true, amount: 'Hepsi', note: '' }
    },
    sleep: {
      slept: true,
      startTime: '',
      endTime: '',
      quality: 'İyi'
    },
    mood: 'happy',
    bathroom: { count: 0, note: '' },
    health: { status: 'Sağlıklı', note: '' }
  });

  const moodOptions = [
    { value: 'happy', label: 'Mutlu', emoji: '😊', color: 'green' },
    { value: 'energetic', label: 'Enerjik', emoji: '😄', color: 'blue' },
    { value: 'calm', label: 'Sakin', emoji: '😌', color: 'purple' },
    { value: 'tired', label: 'Yorgun', emoji: '😴', color: 'gray' },
    { value: 'sad', label: 'Üzgün', emoji: '😢', color: 'yellow' },
    { value: 'cranky', label: 'Huysuz', emoji: '😠', color: 'red' }
  ];

  const mealAmounts = ['Hepsi', 'Çoğu', 'Yarısı', 'Azı', 'Hiç'];
  const sleepQualities = ['Çok İyi', 'İyi', 'Normal', 'Huzursuz', 'Uyumadı'];

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.studentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDate = !filterDate || report.date === filterDate;
    const matchesClass = !filterClass || report.studentClass === filterClass;
    return matchesSearch && matchesDate && matchesClass;
  });

  const stats = {
    totalReports: reports.filter(r => r.date === new Date().toISOString().split('T')[0]).length,
    sentReports: reports.filter(r => r.sentToParent && r.date === new Date().toISOString().split('T')[0]).length,
    pendingReports: reports.filter(r => !r.sentToParent && r.date === new Date().toISOString().split('T')[0]).length,
    avgMood: '😊' // Simplified
  };

  const getMoodInfo = (moodValue) => {
    return moodOptions.find(m => m.value === moodValue) || moodOptions[0];
  };

  const handleNewReport = () => {
    setFormData({
      studentId: '',
      date: new Date().toISOString().split('T')[0],
      activities: '',
      meals: {
        breakfast: { eaten: true, amount: 'Hepsi', note: '' },
        lunch: { eaten: true, amount: 'Hepsi', note: '' },
        snack: { eaten: true, amount: 'Hepsi', note: '' }
      },
      sleep: {
        slept: true,
        startTime: '',
        endTime: '',
        quality: 'İyi'
      },
      mood: 'happy',
      bathroom: { count: 0, note: '' },
      health: { status: 'Sağlıklı', note: '' }
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const student = students.find(s => s.id === parseInt(formData.studentId));
    if (!student) {
      setConfirmModal({
        isOpen: true,
        type: 'warning',
        title: 'Uyarı',
        message: 'Lütfen bir öğrenci seçin',
        onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
        showCancel: false
      });
      return;
    }

    const newReport = {
      id: Date.now(),
      studentId: student.id,
      studentName: student.name,
      studentClass: student.class,
      date: formData.date,
      activities: formData.activities,
      meals: formData.meals,
      sleep: formData.sleep,
      mood: formData.mood,
      bathroom: formData.bathroom,
      health: formData.health,
      photos: 0,
      sentToParent: false,
      createdBy: 'Öğretmen'
    };

    setReports([newReport, ...reports]);
    setShowModal(false);
    setConfirmModal({
      isOpen: true,
      type: 'success',
      title: 'Başarılı',
      message: 'Günlük rapor oluşturuldu!',
      onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
      showCancel: false
    });
  };

  const handleSendToParent = (reportId) => {
    setReports(reports.map(r =>
      r.id === reportId
        ? { ...r, sentToParent: true, sentAt: new Date().toISOString() }
        : r
    ));
    setConfirmModal({
      isOpen: true,
      type: 'success',
      title: 'Başarılı',
      message: 'Rapor veliye gönderildi!',
      onConfirm: () => setConfirmModal({ ...confirmModal, isOpen: false }),
      showCancel: false
    });
  };

  const handleViewDetails = (report) => {
    setSelectedReport(report);
    setShowDetailModal(true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Günlük Raporlar</h2>
          <p className="text-gray-600">Öğrencilerin günlük aktivite, yemek ve uyku raporları</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleNewReport}>
          Yeni Rapor
        </Button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Bugünkü Raporlar</p>
              <p className="text-3xl font-bold text-blue-700">{stats.totalReports}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <Activity size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Gönderilen</p>
              <p className="text-3xl font-bold text-green-700">{stats.sentReports}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <Send size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Bekleyen</p>
              <p className="text-3xl font-bold text-orange-700">{stats.pendingReports}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <Clock size={24} className="text-orange-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Genel Ruh Hali</p>
              <p className="text-3xl font-bold text-purple-700">{stats.avgMood}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <Smile size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Öğrenci ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Input
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            icon={Calendar}
          />
          <Select
            placeholder="Sınıf"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            options={[
              { value: 'Papatyalar', label: 'Papatyalar' },
              { value: 'Güller', label: 'Güller' },
              { value: 'Laleler', label: 'Laleler' }
            ]}
          />
          <Button variant="outline" icon={Filter} onClick={() => {
            setSearchTerm('');
            setFilterDate('');
            setFilterClass('');
          }}>
            Temizle
          </Button>
        </div>
      </Card>

      {/* Rapor Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredReports.map((report, index) => {
          const moodInfo = getMoodInfo(report.mood);
          return (
            <Card
              key={report.id}
              hover
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                      {report.studentName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{report.studentName}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {report.studentClass}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(report.date).toLocaleDateString('tr-TR')}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {report.sentToParent ? (
                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium flex items-center gap-1">
                        <Send size={14} />
                        Gönderildi
                      </span>
                    ) : (
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                        Bekliyor
                      </span>
                    )}
                  </div>
                </div>

                {/* Quick Info */}
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {/* Ruh Hali */}
                  <div className={`p-3 bg-${moodInfo.color}-50 rounded-lg text-center`}>
                    <div className="text-2xl mb-1">{moodInfo.emoji}</div>
                    <p className="text-xs text-gray-600">Ruh Hali</p>
                    <p className="text-sm font-semibold text-gray-800">{moodInfo.label}</p>
                  </div>

                  {/* Kahvaltı */}
                  <div className="p-3 bg-yellow-50 rounded-lg text-center">
                    <Coffee className={`w-6 h-6 mx-auto mb-1 ${report.meals.breakfast.eaten ? 'text-yellow-600' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-600">Kahvaltı</p>
                    <p className="text-sm font-semibold text-gray-800">{report.meals.breakfast.amount}</p>
                  </div>

                  {/* Öğle Yemeği */}
                  <div className="p-3 bg-orange-50 rounded-lg text-center">
                    <Utensils className={`w-6 h-6 mx-auto mb-1 ${report.meals.lunch.eaten ? 'text-orange-600' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-600">Öğle</p>
                    <p className="text-sm font-semibold text-gray-800">{report.meals.lunch.amount}</p>
                  </div>

                  {/* Meyve */}
                  <div className="p-3 bg-red-50 rounded-lg text-center">
                    <Apple className={`w-6 h-6 mx-auto mb-1 ${report.meals.snack.eaten ? 'text-red-600' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-600">Meyve</p>
                    <p className="text-sm font-semibold text-gray-800">{report.meals.snack.amount}</p>
                  </div>

                  {/* Uyku */}
                  <div className="p-3 bg-indigo-50 rounded-lg text-center">
                    <Moon className={`w-6 h-6 mx-auto mb-1 ${report.sleep.slept ? 'text-indigo-600' : 'text-gray-400'}`} />
                    <p className="text-xs text-gray-600">Uyku</p>
                    <p className="text-sm font-semibold text-gray-800">{report.sleep.quality}</p>
                  </div>
                </div>

                {/* Aktiviteler */}
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 line-clamp-2">{report.activities}</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleViewDetails(report)}
                  >
                    <Eye size={16} />
                    Detay
                  </button>
                  {!report.sentToParent && (
                    <button
                      className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                      onClick={() => handleSendToParent(report.id)}
                    >
                      <Send size={16} />
                      Veliye Gönder
                    </button>
                  )}
                  {report.photos > 0 && (
                    <button className="px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
                      <Camera size={16} />
                      {report.photos}
                    </button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal - Yeni Rapor */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Günlük Rapor Oluştur"
        size="xl"
      >
        <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
          {/* Öğrenci ve Tarih */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Öğrenci"
              value={formData.studentId}
              onChange={(e) => setFormData({...formData, studentId: e.target.value})}
              options={students.map(s => ({ value: s.id, label: `${s.name} (${s.class})` }))}
              required
            />
            <Input
              label="Tarih"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
          </div>

          {/* Ruh Hali */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Ruh Hali</label>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
              {moodOptions.map(mood => (
                <button
                  key={mood.value}
                  type="button"
                  onClick={() => setFormData({...formData, mood: mood.value})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    formData.mood === mood.value
                      ? `border-${mood.color}-500 bg-${mood.color}-50`
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-1">{mood.emoji}</div>
                  <p className="text-xs font-medium text-gray-700">{mood.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Öğünler */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-gray-700">Öğünler</label>

            {['breakfast', 'lunch', 'snack'].map((mealType) => {
              const mealNames = { breakfast: 'Kahvaltı', lunch: 'Öğle Yemeği', snack: 'Ara Öğün/Meyve' };
              return (
                <div key={mealType} className="p-4 bg-gray-50 rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.meals[mealType].eaten}
                        onChange={(e) => setFormData({
                          ...formData,
                          meals: {
                            ...formData.meals,
                            [mealType]: { ...formData.meals[mealType], eaten: e.target.checked }
                          }
                        })}
                        className="w-4 h-4 text-purple-600 rounded"
                      />
                      <span className="font-medium text-gray-700">{mealNames[mealType]}</span>
                    </label>
                  </div>
                  {formData.meals[mealType].eaten && (
                    <div className="grid grid-cols-2 gap-3">
                      <Select
                        label="Miktar"
                        value={formData.meals[mealType].amount}
                        onChange={(e) => setFormData({
                          ...formData,
                          meals: {
                            ...formData.meals,
                            [mealType]: { ...formData.meals[mealType], amount: e.target.value }
                          }
                        })}
                        options={mealAmounts.map(a => ({ value: a, label: a }))}
                      />
                      <Input
                        label="Not"
                        value={formData.meals[mealType].note}
                        onChange={(e) => setFormData({
                          ...formData,
                          meals: {
                            ...formData.meals,
                            [mealType]: { ...formData.meals[mealType], note: e.target.value }
                          }
                        })}
                        placeholder="Opsiyonel"
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Uyku */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={formData.sleep.slept}
                onChange={(e) => setFormData({
                  ...formData,
                  sleep: { ...formData.sleep, slept: e.target.checked }
                })}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <span className="font-medium text-gray-700">Uyudu</span>
            </label>
            {formData.sleep.slept && (
              <div className="grid grid-cols-3 gap-3">
                <Input
                  label="Başlangıç"
                  type="time"
                  value={formData.sleep.startTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    sleep: { ...formData.sleep, startTime: e.target.value }
                  })}
                />
                <Input
                  label="Bitiş"
                  type="time"
                  value={formData.sleep.endTime}
                  onChange={(e) => setFormData({
                    ...formData,
                    sleep: { ...formData.sleep, endTime: e.target.value }
                  })}
                />
                <Select
                  label="Kalite"
                  value={formData.sleep.quality}
                  onChange={(e) => setFormData({
                    ...formData,
                    sleep: { ...formData.sleep, quality: e.target.value }
                  })}
                  options={sleepQualities.map(q => ({ value: q, label: q }))}
                />
              </div>
            )}
          </div>

          {/* Aktiviteler */}
          <TextArea
            label="Günlük Aktiviteler ve Notlar"
            value={formData.activities}
            onChange={(e) => setFormData({...formData, activities: e.target.value})}
            placeholder="Öğrencinin gün içinde yaptığı aktiviteleri, davranışlarını ve önemli notları yazın..."
            rows={4}
            required
          />

          {/* Tuvalet */}
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Tuvalet Kullanımı (Sayı)"
              type="number"
              value={formData.bathroom.count}
              onChange={(e) => setFormData({
                ...formData,
                bathroom: { ...formData.bathroom, count: parseInt(e.target.value) || 0 }
              })}
              min="0"
            />
            <Input
              label="Tuvalet Notu"
              value={formData.bathroom.note}
              onChange={(e) => setFormData({
                ...formData,
                bathroom: { ...formData.bathroom, note: e.target.value }
              })}
              placeholder="Normal, kabızlık, vb."
            />
          </div>

          {/* Sağlık */}
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Sağlık Durumu"
              value={formData.health.status}
              onChange={(e) => setFormData({
                ...formData,
                health: { ...formData.health, status: e.target.value }
              })}
              options={[
                { value: 'Sağlıklı', label: 'Sağlıklı' },
                { value: 'Hafif Hasta', label: 'Hafif Hasta' },
                { value: 'İlaç Verildi', label: 'İlaç Verildi' },
                { value: 'Özel Durum', label: 'Özel Durum' }
              ]}
            />
            <Input
              label="Sağlık Notu"
              value={formData.health.note}
              onChange={(e) => setFormData({
                ...formData,
                health: { ...formData.health, note: e.target.value }
              })}
              placeholder="Opsiyonel"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={Send} onClick={handleSave}>
              Rapor Oluştur
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedReport && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`${selectedReport.studentName} - Günlük Rapor`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b">
              <div>
                <p className="text-sm text-gray-500">
                  {new Date(selectedReport.date).toLocaleDateString('tr-TR', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Oluşturan: {selectedReport.createdBy}
                </p>
              </div>
              {selectedReport.sentToParent && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                  Veliye gönderildi
                </span>
              )}
            </div>

            {/* Ruh Hali */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Ruh Hali</h4>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-3xl">{getMoodInfo(selectedReport.mood).emoji}</span>
                <span className="font-medium">{getMoodInfo(selectedReport.mood).label}</span>
              </div>
            </div>

            {/* Öğünler */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Öğünler</h4>
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <Coffee className="w-6 h-6 text-yellow-600 mb-2" />
                  <p className="text-xs text-gray-600">Kahvaltı</p>
                  <p className="font-semibold">{selectedReport.meals.breakfast.amount}</p>
                  {selectedReport.meals.breakfast.note && (
                    <p className="text-xs text-gray-500 mt-1">{selectedReport.meals.breakfast.note}</p>
                  )}
                </div>
                <div className="p-3 bg-orange-50 rounded-lg">
                  <Utensils className="w-6 h-6 text-orange-600 mb-2" />
                  <p className="text-xs text-gray-600">Öğle</p>
                  <p className="font-semibold">{selectedReport.meals.lunch.amount}</p>
                  {selectedReport.meals.lunch.note && (
                    <p className="text-xs text-gray-500 mt-1">{selectedReport.meals.lunch.note}</p>
                  )}
                </div>
                <div className="p-3 bg-red-50 rounded-lg">
                  <Apple className="w-6 h-6 text-red-600 mb-2" />
                  <p className="text-xs text-gray-600">Meyve</p>
                  <p className="font-semibold">{selectedReport.meals.snack.amount}</p>
                  {selectedReport.meals.snack.note && (
                    <p className="text-xs text-gray-500 mt-1">{selectedReport.meals.snack.note}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Uyku */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Uyku</h4>
              <div className="p-3 bg-indigo-50 rounded-lg">
                {selectedReport.sleep.slept ? (
                  <div className="space-y-2">
                    <p className="font-medium">Uyudu - {selectedReport.sleep.quality}</p>
                    {selectedReport.sleep.startTime && selectedReport.sleep.endTime && (
                      <p className="text-sm text-gray-600">
                        {selectedReport.sleep.startTime} - {selectedReport.sleep.endTime}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="font-medium">Uyumadı</p>
                )}
              </div>
            </div>

            {/* Aktiviteler */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Günlük Aktiviteler</h4>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">{selectedReport.activities}</p>
              </div>
            </div>

            {/* Sağlık & Tuvalet */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Sağlık</h4>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="font-medium">{selectedReport.health.status}</p>
                  {selectedReport.health.note && (
                    <p className="text-sm text-gray-600 mt-1">{selectedReport.health.note}</p>
                  )}
                </div>
              </div>
              <div>
                <h4 className="text-sm font-semibold text-gray-700 mb-2">Tuvalet</h4>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="font-medium">{selectedReport.bathroom.count} kez</p>
                  {selectedReport.bathroom.note && (
                    <p className="text-sm text-gray-600 mt-1">{selectedReport.bathroom.note}</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              {!selectedReport.sentToParent && (
                <Button
                  variant="primary"
                  icon={Send}
                  onClick={() => {
                    handleSendToParent(selectedReport.id);
                    setShowDetailModal(false);
                  }}
                >
                  Veliye Gönder
                </Button>
              )}
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

export default DailyReports;

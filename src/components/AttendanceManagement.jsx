import React, { useState } from 'react';
import { Search, Calendar, Download, QrCode, CheckCircle, XCircle, Clock, AlertTriangle, Filter, Users, TrendingUp } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';

const AttendanceManagement = () => {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendanceRecords, setAttendanceRecords] = useState([
    {
      id: 1,
      studentName: 'Zeynep Yılmaz',
      className: 'Papatyalar Sınıfı',
      date: '2025-01-07',
      status: 'present',
      checkInTime: '08:15',
      checkOutTime: '16:30',
      checkInMethod: 'qr',
      parentName: 'Ayşe Yılmaz',
      notes: ''
    },
    {
      id: 2,
      studentName: 'Mehmet Demir',
      className: 'Güller Sınıfı',
      date: '2025-01-07',
      status: 'present',
      checkInTime: '08:45',
      checkOutTime: null,
      checkInMethod: 'manual',
      parentName: 'Fatma Demir',
      notes: ''
    },
    {
      id: 3,
      studentName: 'Ali Kaya',
      className: 'Laleler Sınıfı',
      date: '2025-01-07',
      status: 'absent',
      checkInTime: null,
      checkOutTime: null,
      checkInMethod: null,
      parentName: 'Hasan Kaya',
      notes: 'Hasta'
    },
    {
      id: 4,
      studentName: 'Elif Özkan',
      className: 'Papatyalar Sınıfı',
      date: '2025-01-07',
      status: 'late',
      checkInTime: '09:30',
      checkOutTime: null,
      checkInMethod: 'qr',
      parentName: 'Zeynep Özkan',
      notes: 'Trafik nedeniyle geç geldi'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showQRModal, setShowQRModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);

  const classes = [
    { value: 'papatyalar', label: 'Papatyalar Sınıfı' },
    { value: 'guller', label: 'Güller Sınıfı' },
    { value: 'laleler', label: 'Laleler Sınıfı' }
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesSearch = record.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.parentName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || record.className.toLowerCase().includes(filterClass);
    const matchesStatus = !filterStatus || record.status === filterStatus;
    const matchesDate = record.date === selectedDate;

    return matchesSearch && matchesClass && matchesStatus && matchesDate;
  });

  const stats = {
    total: attendanceRecords.filter(r => r.date === selectedDate).length,
    present: attendanceRecords.filter(r => r.date === selectedDate && r.status === 'present').length,
    absent: attendanceRecords.filter(r => r.date === selectedDate && r.status === 'absent').length,
    late: attendanceRecords.filter(r => r.date === selectedDate && r.status === 'late').length
  };

  const attendanceRate = stats.total > 0 ? ((stats.present + stats.late) / stats.total * 100).toFixed(1) : 0;

  const getStatusColor = (status) => {
    switch (status) {
      case 'present':
        return 'bg-green-100 text-green-700';
      case 'absent':
        return 'bg-red-100 text-red-700';
      case 'late':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'present':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'absent':
        return <XCircle size={16} className="text-red-600" />;
      case 'late':
        return <AlertTriangle size={16} className="text-yellow-600" />;
      default:
        return <Clock size={16} className="text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'present':
        return 'Mevcut';
      case 'absent':
        return 'Devamsız';
      case 'late':
        return 'Geç Geldi';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleStatusChange = (recordId, newStatus) => {
    setAttendanceRecords(attendanceRecords.map(record => {
      if (record.id === recordId) {
        const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
        return {
          ...record,
          status: newStatus,
          checkInTime: newStatus !== 'absent' && !record.checkInTime ? now : record.checkInTime,
          checkInMethod: newStatus !== 'absent' && !record.checkInMethod ? 'manual' : record.checkInMethod
        };
      }
      return record;
    }));
  };

  const handleCheckOut = (recordId) => {
    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setAttendanceRecords(attendanceRecords.map(record =>
      record.id === recordId ? { ...record, checkOutTime: now } : record
    ));
  };

  const handleBulkCheckIn = () => {
    const now = new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' });
    setAttendanceRecords(attendanceRecords.map(record => {
      if (record.date === selectedDate && record.status !== 'present') {
        return {
          ...record,
          status: 'present',
          checkInTime: now,
          checkInMethod: 'manual'
        };
      }
      return record;
    }));
    setShowBulkModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Yoklama Sistemi</h2>
          <p className="text-gray-600">Öğrenci devam takibi ve QR kod check-in</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={QrCode} onClick={() => setShowQRModal(true)}>
            QR Yoklama
          </Button>
          <Button variant="outline" icon={Download}>
            Rapor İndir
          </Button>
          <Button variant="primary" icon={CheckCircle} onClick={() => setShowBulkModal(true)}>
            Toplu İşlem
          </Button>
        </div>
      </div>

      {/* Tarih ve Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Input
            type="date"
            label="Tarih"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            icon={Calendar}
          />
          <Input
            placeholder="Öğrenci veya veli ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Select
            placeholder="Sınıf Seç"
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            options={classes}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'present', label: 'Mevcut' },
              { value: 'absent', label: 'Devamsız' },
              { value: 'late', label: 'Geç Geldi' }
            ]}
          />
          <Button variant="outline" icon={Filter} className="h-10">
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam Öğrenci</p>
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
              <p className="text-sm text-green-600 font-medium">Mevcut</p>
              <p className="text-3xl font-bold text-green-700">{stats.present}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <CheckCircle size={24} className="text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Devamsız</p>
              <p className="text-3xl font-bold text-red-700">{stats.absent}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <XCircle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Geç Geldi</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.late}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <AlertTriangle size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Devam Oranı</p>
              <p className="text-3xl font-bold text-purple-700">%{attendanceRate}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <TrendingUp size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Yoklama Tablosu */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Öğrenci</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sınıf</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Veli</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Giriş</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Çıkış</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Yöntem</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((record, index) => (
                <tr
                  key={record.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {record.studentName.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{record.studentName}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{record.className}</td>
                  <td className="py-4 px-4 text-gray-600">{record.parentName}</td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${record.checkInTime ? 'text-green-700' : 'text-gray-400'}`}>
                      {record.checkInTime || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`font-medium ${record.checkOutTime ? 'text-blue-700' : 'text-gray-400'}`}>
                      {record.checkOutTime || '-'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {record.checkInMethod === 'qr' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold">
                        <QrCode size={12} />
                        QR
                      </span>
                    )}
                    {record.checkInMethod === 'manual' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-semibold">
                        Manuel
                      </span>
                    )}
                    {!record.checkInMethod && <span className="text-gray-400">-</span>}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(record.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(record.status)}`}>
                        {getStatusText(record.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {record.status !== 'present' && (
                        <button
                          className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors"
                          onClick={() => handleStatusChange(record.id, 'present')}
                        >
                          Mevcut
                        </button>
                      )}
                      {record.status !== 'absent' && (
                        <button
                          className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors"
                          onClick={() => handleStatusChange(record.id, 'absent')}
                        >
                          Devamsız
                        </button>
                      )}
                      {record.checkInTime && !record.checkOutTime && (
                        <button
                          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                          onClick={() => handleCheckOut(record.id)}
                        >
                          Çıkış
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal - QR Yoklama */}
      <Modal
        isOpen={showQRModal}
        onClose={() => setShowQRModal(false)}
        title="QR Kod ile Yoklama"
        size="md"
      >
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-8">
            <div className="bg-white rounded-lg p-6 mx-auto w-64 h-64 flex items-center justify-center">
              <QrCode size={200} className="text-purple-600" />
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="font-semibold text-gray-800">QR Kodu Taratın</p>
            <p className="text-sm text-gray-600">
              Veliler mobil uygulamadan bu QR kodu taratarak çocuklarının girişini yapabilir
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Nasıl Çalışır:</strong><br />
              1. Veli QR kodu taratır<br />
              2. Öğrenci otomatik check-in olur<br />
              3. Veli anlık bildirim alır
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowQRModal(false)}>
              Kapat
            </Button>
            <Button variant="primary" icon={Download}>
              QR Kodu İndir
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Toplu İşlem */}
      <Modal
        isOpen={showBulkModal}
        onClose={() => setShowBulkModal(false)}
        title="Toplu Yoklama İşlemi"
        size="md"
      >
        <div className="space-y-4">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-700">
              Bu işlem, seçili tarihteki tüm öğrencileri "Mevcut" olarak işaretleyecektir.
            </p>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-semibold text-gray-700">
              Tarih: {new Date(selectedDate).toLocaleDateString('tr-TR')}
            </p>
            <p className="text-sm text-gray-600">
              {stats.total} öğrenci mevcut olarak işaretlenecek
            </p>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowBulkModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={CheckCircle} onClick={handleBulkCheckIn}>
              Onayla
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AttendanceManagement;

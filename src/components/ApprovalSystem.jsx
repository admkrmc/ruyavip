import React, { useState } from 'react';
import { Search, Plus, CheckCircle, XCircle, Clock, AlertCircle, Calendar, FileText, Download, Filter, Send } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const ApprovalSystem = () => {
  const [approvalRequests, setApprovalRequests] = useState([
    {
      id: 1,
      studentName: 'Zeynep Yılmaz',
      parentName: 'Ayşe Yılmaz',
      type: 'health',
      reason: 'Doktor randevusu',
      date: '2025-01-10',
      startTime: '10:00',
      endTime: '12:00',
      status: 'pending',
      requestedAt: '2025-01-07 09:30',
      approvedBy: null,
      approvedAt: null,
      notes: 'Çocuk doktoru randevusu için izin',
      documents: []
    },
    {
      id: 2,
      studentName: 'Mehmet Demir',
      parentName: 'Fatma Demir',
      type: 'early-leave',
      reason: 'Aile ziyareti',
      date: '2025-01-08',
      startTime: '14:00',
      endTime: '16:30',
      status: 'approved',
      requestedAt: '2025-01-06 15:20',
      approvedBy: 'Müdür',
      approvedAt: '2025-01-06 16:00',
      notes: 'Büyükanne ziyareti için erken çıkış',
      documents: []
    },
    {
      id: 3,
      studentName: 'Ali Kaya',
      parentName: 'Hasan Kaya',
      type: 'absence',
      reason: 'Hastalık',
      date: '2025-01-09',
      startTime: null,
      endTime: null,
      status: 'rejected',
      requestedAt: '2025-01-08 08:00',
      approvedBy: 'Müdür',
      approvedAt: '2025-01-08 09:00',
      notes: 'Sağlık raporu eksik',
      rejectionReason: 'Lütfen doktor raporu ekleyiniz',
      documents: []
    },
    {
      id: 4,
      studentName: 'Elif Özkan',
      parentName: 'Zeynep Özkan',
      type: 'field-trip',
      reason: 'Aile gezisi',
      date: '2025-01-12',
      startTime: null,
      endTime: null,
      status: 'pending',
      requestedAt: '2025-01-07 11:00',
      approvedBy: null,
      approvedAt: null,
      notes: '3 gün sürecek tatil için izin',
      documents: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [successModal, setSuccessModal] = useState({ show: false, message: '' });
  const [rejectModal, setRejectModal] = useState({ show: false, requestId: null });
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    type: '',
    reason: '',
    date: '',
    startTime: '',
    endTime: '',
    notes: ''
  });

  const requestTypes = [
    { value: 'health', label: 'Sağlık', icon: '🏥' },
    { value: 'early-leave', label: 'Erken Çıkış', icon: '⏰' },
    { value: 'absence', label: 'Devamsızlık', icon: '📅' },
    { value: 'field-trip', label: 'Gezi/Tatil', icon: '✈️' },
    { value: 'other', label: 'Diğer', icon: '📝' }
  ];

  const filteredRequests = approvalRequests.filter(request => {
    const matchesSearch = request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.reason.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filterType || request.type === filterType;
    const matchesStatus = !filterStatus || request.status === filterStatus;

    return matchesSearch && matchesType && matchesStatus;
  });

  const stats = {
    total: approvalRequests.length,
    pending: approvalRequests.filter(r => r.status === 'pending').length,
    approved: approvalRequests.filter(r => r.status === 'approved').length,
    rejected: approvalRequests.filter(r => r.status === 'rejected').length
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-700';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'approved':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'rejected':
        return <XCircle size={16} className="text-red-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      default:
        return <AlertCircle size={16} className="text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      case 'pending':
        return 'Bekliyor';
      default:
        return 'Bilinmiyor';
    }
  };

  const getTypeInfo = (type) => {
    const typeInfo = requestTypes.find(t => t.value === type);
    return typeInfo || { label: 'Bilinmiyor', icon: '❓' };
  };

  const handleApprove = (requestId) => {
    setApprovalRequests(approvalRequests.map(request => {
      if (request.id === requestId) {
        return {
          ...request,
          status: 'approved',
          approvedBy: 'Müdür',
          approvedAt: new Date().toISOString()
        };
      }
      return request;
    }));
    setSuccessModal({ show: true, message: 'İzin talebi onaylandı. Veli bilgilendirildi.' });
  };

  const handleReject = (requestId) => {
    setRejectModal({ show: true, requestId });
  };

  const confirmReject = (reason) => {
    setApprovalRequests(approvalRequests.map(request => {
      if (request.id === rejectModal.requestId) {
        return {
          ...request,
          status: 'rejected',
          approvedBy: 'Müdür',
          approvedAt: new Date().toISOString(),
          rejectionReason: reason
        };
      }
      return request;
    }));
    setRejectModal({ show: false, requestId: null });
    setSuccessModal({ show: true, message: 'İzin talebi reddedildi. Veli bilgilendirildi.' });
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setShowDetailModal(true);
  };

  const handleNewRequest = () => {
    setFormData({
      studentName: '',
      parentName: '',
      type: '',
      reason: '',
      date: '',
      startTime: '',
      endTime: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleSave = () => {
    const newRequest = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      requestedAt: new Date().toISOString(),
      approvedBy: null,
      approvedAt: null,
      documents: []
    };
    setApprovalRequests([newRequest, ...approvalRequests]);
    setShowModal(false);
    setSuccessModal({ show: true, message: 'İzin talebi oluşturuldu.' });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Onay/İzin Sistemi</h2>
          <p className="text-gray-600">Öğrenci izin talepleri ve onay işlemleri</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Rapor İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleNewRequest}>
            Yeni Talep
          </Button>
        </div>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Öğrenci, veli veya sebep ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Search}
          />
          <Select
            placeholder="İzin Türü"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            options={requestTypes}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'pending', label: 'Bekliyor' },
              { value: 'approved', label: 'Onaylandı' },
              { value: 'rejected', label: 'Reddedildi' }
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
              <p className="text-sm text-purple-600 font-medium">Toplam Talep</p>
              <p className="text-3xl font-bold text-purple-700">{stats.total}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <FileText size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Bekliyor</p>
              <p className="text-3xl font-bold text-yellow-700">{stats.pending}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <Clock size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Onaylandı</p>
              <p className="text-3xl font-bold text-green-700">{stats.approved}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <CheckCircle size={24} className="text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Reddedildi</p>
              <p className="text-3xl font-bold text-red-700">{stats.rejected}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <XCircle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Talep Listesi */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Öğrenci</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Veli</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tür</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sebep</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tarih</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredRequests.map((request, index) => {
                const typeInfo = getTypeInfo(request.type);
                return (
                  <tr
                    key={request.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fadeIn"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                          {request.studentName.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-800">{request.studentName}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{request.parentName}</td>
                    <td className="py-4 px-4">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">
                        <span>{typeInfo.icon}</span>
                        <span>{typeInfo.label}</span>
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-600 max-w-xs truncate">{request.reason}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-1 text-gray-700">
                        <Calendar size={14} />
                        <span className="text-sm">{new Date(request.date).toLocaleDateString('tr-TR')}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(request.status)}
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                          {getStatusText(request.status)}
                        </span>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          className="px-3 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors"
                          onClick={() => handleViewDetails(request)}
                        >
                          Detay
                        </button>
                        {request.status === 'pending' && (
                          <>
                            <button
                              className="px-3 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors"
                              onClick={() => handleApprove(request.id)}
                            >
                              Onayla
                            </button>
                            <button
                              className="px-3 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-sm font-medium transition-colors"
                              onClick={() => handleReject(request.id)}
                            >
                              Reddet
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal - Yeni Talep */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Yeni İzin Talebi"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Öğrenci Adı"
              value={formData.studentName}
              onChange={(e) => setFormData({...formData, studentName: e.target.value})}
              placeholder="Öğrenci seçin"
              required
            />
            <Input
              label="Veli Adı"
              value={formData.parentName}
              onChange={(e) => setFormData({...formData, parentName: e.target.value})}
              placeholder="Veli adı"
              required
            />
            <Select
              label="İzin Türü"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
              options={requestTypes}
              required
            />
            <Input
              label="Tarih"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <Input
              label="Başlangıç Saati"
              type="time"
              value={formData.startTime}
              onChange={(e) => setFormData({...formData, startTime: e.target.value})}
            />
            <Input
              label="Bitiş Saati"
              type="time"
              value={formData.endTime}
              onChange={(e) => setFormData({...formData, endTime: e.target.value})}
            />
          </div>

          <Input
            label="Sebep"
            value={formData.reason}
            onChange={(e) => setFormData({...formData, reason: e.target.value})}
            placeholder="İzin sebebi"
            required
          />

          <TextArea
            label="Notlar"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Ek açıklama..."
            rows={3}
          />

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" icon={Send} onClick={handleSave}>
              Talep Oluştur
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedRequest && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title="İzin Talebi Detayı"
          size="lg"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Öğrenci</p>
                <p className="font-semibold text-gray-800">{selectedRequest.studentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Veli</p>
                <p className="font-semibold text-gray-800">{selectedRequest.parentName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">İzin Türü</p>
                <p className="font-semibold text-gray-800">{getTypeInfo(selectedRequest.type).label}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Tarih</p>
                <p className="font-semibold text-gray-800">
                  {new Date(selectedRequest.date).toLocaleDateString('tr-TR')}
                </p>
              </div>
              {selectedRequest.startTime && (
                <div>
                  <p className="text-sm text-gray-500">Saat Aralığı</p>
                  <p className="font-semibold text-gray-800">
                    {selectedRequest.startTime} - {selectedRequest.endTime || 'Belirtilmedi'}
                  </p>
                </div>
              )}
              <div>
                <p className="text-sm text-gray-500">Talep Tarihi</p>
                <p className="font-semibold text-gray-800">
                  {new Date(selectedRequest.requestedAt).toLocaleString('tr-TR')}
                </p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Sebep</p>
              <p className="text-gray-800">{selectedRequest.reason}</p>
            </div>

            {selectedRequest.notes && (
              <div>
                <p className="text-sm text-gray-500 mb-1">Notlar</p>
                <p className="text-gray-700">{selectedRequest.notes}</p>
              </div>
            )}

            <div className={`p-4 rounded-lg border-2 ${
              selectedRequest.status === 'approved' ? 'bg-green-50 border-green-200' :
              selectedRequest.status === 'rejected' ? 'bg-red-50 border-red-200' :
              'bg-yellow-50 border-yellow-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {getStatusIcon(selectedRequest.status)}
                <p className="font-semibold text-gray-800">
                  {getStatusText(selectedRequest.status)}
                </p>
              </div>
              {selectedRequest.approvedBy && (
                <p className="text-sm text-gray-600">
                  {selectedRequest.approvedBy} tarafından {new Date(selectedRequest.approvedAt).toLocaleString('tr-TR')} tarihinde işlendi
                </p>
              )}
              {selectedRequest.rejectionReason && (
                <p className="text-sm text-red-700 mt-2">
                  <strong>Ret Sebebi:</strong> {selectedRequest.rejectionReason}
                </p>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
              {selectedRequest.status === 'pending' && (
                <>
                  <Button variant="danger" onClick={() => {
                    handleReject(selectedRequest.id);
                    setShowDetailModal(false);
                  }}>
                    Reddet
                  </Button>
                  <Button variant="success" onClick={() => {
                    handleApprove(selectedRequest.id);
                    setShowDetailModal(false);
                  }}>
                    Onayla
                  </Button>
                </>
              )}
            </div>
          </div>
        </Modal>
      )}

      {/* Reject Modal with Reason Input */}
      {rejectModal.show && (
        <Modal
          isOpen={rejectModal.show}
          onClose={() => setRejectModal({ show: false, requestId: null })}
          title="İzin Talebini Reddet"
          size="md"
        >
          <div className="space-y-4">
            <p className="text-gray-700">Lütfen ret sebebini belirtin:</p>
            <TextArea
              label="Ret Sebebi"
              id="rejection-reason"
              placeholder="Örn: Lütfen doktor raporu ekleyiniz"
              rows={3}
              required
            />
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setRejectModal({ show: false, requestId: null })}>
                İptal
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  const reason = document.getElementById('rejection-reason').value;
                  if (reason) {
                    confirmReject(reason);
                  }
                }}
              >
                Reddet
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
    </div>
  );
};

export default ApprovalSystem;

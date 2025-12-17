import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Download, Filter, CreditCard, Clock, CheckCircle, AlertCircle, Send, FileText, Calendar, DollarSign } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const PaymentManagement = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      studentName: 'Zeynep Yılmaz',
      parentName: 'Ayşe Yılmaz',
      amount: 5000,
      dueDate: '2025-01-15',
      paidDate: '2025-01-10',
      status: 'paid',
      method: 'Banka Transferi',
      invoiceNo: 'INV-2025-001',
      period: 'Ocak 2025'
    },
    {
      id: 2,
      studentName: 'Mehmet Demir',
      parentName: 'Fatma Demir',
      amount: 5000,
      dueDate: '2025-01-15',
      paidDate: null,
      status: 'pending',
      method: null,
      invoiceNo: 'INV-2025-002',
      period: 'Ocak 2025'
    },
    {
      id: 3,
      studentName: 'Ali Kaya',
      parentName: 'Hasan Kaya',
      amount: 5000,
      dueDate: '2025-01-05',
      paidDate: null,
      status: 'overdue',
      method: null,
      invoiceNo: 'INV-2025-003',
      period: 'Ocak 2025'
    },
    {
      id: 4,
      studentName: 'Zeynep Yılmaz',
      parentName: 'Ayşe Yılmaz',
      amount: 5000,
      dueDate: '2025-02-15',
      paidDate: null,
      status: 'scheduled',
      method: null,
      invoiceNo: 'INV-2025-004',
      period: 'Şubat 2025'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [filterPeriod, setFilterPeriod] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showReminderModal, setShowReminderModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    parentName: '',
    amount: '',
    dueDate: '',
    period: '',
    notes: ''
  });
  const [reminderModal, setReminderModal] = useState({ show: false, parentName: '' });
  const [deletePaymentModal, setDeletePaymentModal] = useState({ show: false, paymentId: null, invoiceNo: '' });
  const [downloadModal, setDownloadModal] = useState({ show: false, invoiceNo: '' });

  const paymentMethods = [
    { value: 'nakit', label: 'Nakit' },
    { value: 'banka', label: 'Banka Transferi' },
    { value: 'kredi_karti', label: 'Kredi Kartı' },
    { value: 'havale', label: 'Havale/EFT' }
  ];

  const periods = [
    { value: '2025-01', label: 'Ocak 2025' },
    { value: '2025-02', label: 'Şubat 2025' },
    { value: '2025-03', label: 'Mart 2025' },
    { value: '2025-04', label: 'Nisan 2025' }
  ];

  const filteredPayments = payments.filter(payment => {
    const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.invoiceNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filterStatus || payment.status === filterStatus;
    const matchesPeriod = !filterPeriod || payment.period.includes(filterPeriod);

    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const stats = {
    total: payments.reduce((sum, p) => sum + p.amount, 0),
    paid: payments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0),
    pending: payments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0),
    overdue: payments.filter(p => p.status === 'overdue').reduce((sum, p) => sum + p.amount, 0)
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-700';
      case 'pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'overdue':
        return 'bg-red-100 text-red-700';
      case 'scheduled':
        return 'bg-blue-100 text-blue-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="text-green-600" />;
      case 'pending':
        return <Clock size={16} className="text-yellow-600" />;
      case 'overdue':
        return <AlertCircle size={16} className="text-red-600" />;
      case 'scheduled':
        return <Calendar size={16} className="text-blue-600" />;
      default:
        return <CreditCard size={16} className="text-gray-600" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Ödendi';
      case 'pending':
        return 'Bekliyor';
      case 'overdue':
        return 'Gecikmiş';
      case 'scheduled':
        return 'Planlandı';
      default:
        return 'Bilinmiyor';
    }
  };

  const handleAddPayment = () => {
    setSelectedPayment(null);
    setFormData({
      studentName: '',
      parentName: '',
      amount: '',
      dueDate: '',
      period: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEditPayment = (payment) => {
    setSelectedPayment(payment);
    setFormData({
      studentName: payment.studentName,
      parentName: payment.parentName,
      amount: payment.amount,
      dueDate: payment.dueDate,
      period: payment.period,
      notes: payment.notes || ''
    });
    setShowModal(true);
  };

  const handleMarkAsPaid = (payment) => {
    const today = new Date().toISOString().split('T')[0];
    setPayments(payments.map(p =>
      p.id === payment.id
        ? { ...p, status: 'paid', paidDate: today, method: 'Banka Transferi' }
        : p
    ));
  };

  const handleSendReminder = (payment) => {
    setSelectedPayment(payment);
    setShowReminderModal(true);
  };

  const handleSendReminderConfirm = () => {
    setReminderModal({ show: true, parentName: selectedPayment.parentName });
    setShowReminderModal(false);
  };

  const handleDeletePayment = (payment) => {
    setDeletePaymentModal({ show: true, paymentId: payment.id, invoiceNo: payment.invoiceNo });
  };

  const confirmDeletePayment = () => {
    setPayments(payments.filter(p => p.id !== deletePaymentModal.paymentId));
    setDeletePaymentModal({ show: false, paymentId: null, invoiceNo: '' });
  };

  const handleSave = () => {
    if (selectedPayment) {
      setPayments(payments.map(p =>
        p.id === selectedPayment.id
          ? { ...p, ...formData }
          : p
      ));
    } else {
      setPayments([...payments, {
        id: Date.now(),
        ...formData,
        paidDate: null,
        status: 'scheduled',
        method: null,
        invoiceNo: `INV-2025-${String(payments.length + 1).padStart(3, '0')}`
      }]);
    }
    setShowModal(false);
  };

  const handleDownloadInvoice = (payment) => {
    setDownloadModal({ show: true, invoiceNo: payment.invoiceNo });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık ve Aksiyon Butonları */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Ödeme Yönetimi</h2>
          <p className="text-gray-600">Tüm ödemeleri takip edin ve yönetin</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Rapor İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleAddPayment}>
            Yeni Ödeme Ekle
          </Button>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input
            placeholder="Öğrenci, veli veya fatura no ara..."
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
              { value: 'paid', label: 'Ödendi' },
              { value: 'pending', label: 'Bekliyor' },
              { value: 'overdue', label: 'Gecikmiş' },
              { value: 'scheduled', label: 'Planlandı' }
            ]}
          />
          <Select
            placeholder="Dönem"
            value={filterPeriod}
            onChange={(e) => setFilterPeriod(e.target.value)}
            options={periods}
          />
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Toplam Tutar</p>
              <p className="text-3xl font-bold text-purple-700">₺{stats.total.toLocaleString('tr-TR')}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <DollarSign size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Tahsil Edilen</p>
              <p className="text-3xl font-bold text-green-700">₺{stats.paid.toLocaleString('tr-TR')}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <CheckCircle size={24} className="text-green-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 font-medium">Bekleyen</p>
              <p className="text-3xl font-bold text-yellow-700">₺{stats.pending.toLocaleString('tr-TR')}</p>
            </div>
            <div className="p-3 bg-yellow-200 rounded-lg">
              <Clock size={24} className="text-yellow-700" />
            </div>
          </div>
        </Card>
        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Gecikmiş</p>
              <p className="text-3xl font-bold text-red-700">₺{stats.overdue.toLocaleString('tr-TR')}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <AlertCircle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Ödeme Listesi */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Fatura No</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Öğrenci</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Veli</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dönem</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tutar</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Vade Tarihi</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment, index) => (
                <tr
                  key={payment.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} className="text-purple-600" />
                      <span className="font-medium text-gray-800">{payment.invoiceNo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{payment.studentName}</td>
                  <td className="py-4 px-4 text-gray-700">{payment.parentName}</td>
                  <td className="py-4 px-4 text-gray-600">{payment.period}</td>
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-800">₺{payment.amount.toLocaleString('tr-TR')}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">
                    {new Date(payment.dueDate).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(payment.status)}
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(payment.status)}`}>
                        {getStatusText(payment.status)}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      {payment.status !== 'paid' && (
                        <>
                          <button
                            className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                            onClick={() => handleMarkAsPaid(payment)}
                            title="Ödendi Olarak İşaretle"
                          >
                            <CheckCircle size={18} className="text-green-600" />
                          </button>
                          <button
                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                            onClick={() => handleSendReminder(payment)}
                            title="Hatırlatma Gönder"
                          >
                            <Send size={18} className="text-blue-600" />
                          </button>
                        </>
                      )}
                      <button
                        className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => handleDownloadInvoice(payment)}
                        title="Fatura İndir"
                      >
                        <Download size={18} className="text-purple-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-orange-50 rounded-lg transition-colors"
                        onClick={() => handleEditPayment(payment)}
                        title="Düzenle"
                      >
                        <Edit2 size={18} className="text-orange-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeletePayment(payment)}
                        title="Sil"
                      >
                        <Trash2 size={18} className="text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal - Ödeme Ekle/Düzenle */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedPayment ? 'Ödeme Düzenle' : 'Yeni Ödeme Ekle'}
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
            <Input
              label="Tutar (₺)"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({...formData, amount: e.target.value})}
              placeholder="5000"
              required
            />
            <Input
              label="Vade Tarihi"
              type="date"
              value={formData.dueDate}
              onChange={(e) => setFormData({...formData, dueDate: e.target.value})}
              required
            />
            <Select
              label="Dönem"
              value={formData.period}
              onChange={(e) => setFormData({...formData, period: e.target.value})}
              options={periods}
              required
            />
          </div>

          <Input
            label="Notlar"
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Ek bilgiler..."
          />

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {selectedPayment ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Hatırlatma Gönder */}
      <Modal
        isOpen={showReminderModal}
        onClose={() => setShowReminderModal(false)}
        title="Ödeme Hatırlatması Gönder"
        size="md"
      >
        {selectedPayment && (
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Veli:</span> {selectedPayment.parentName}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Öğrenci:</span> {selectedPayment.studentName}
              </p>
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold">Tutar:</span> ₺{selectedPayment.amount.toLocaleString('tr-TR')}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Vade Tarihi:</span> {new Date(selectedPayment.dueDate).toLocaleDateString('tr-TR')}
              </p>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-xs text-gray-500 mb-2">Gönderilecek Mesaj:</p>
              <p className="text-sm text-gray-700">
                Sayın {selectedPayment.parentName}, {selectedPayment.studentName} öğrencimiz için
                {new Date(selectedPayment.dueDate).toLocaleDateString('tr-TR')} tarihinde vadesi dolan
                ₺{selectedPayment.amount.toLocaleString('tr-TR')} tutarındaki ödemenizi hatırlatmak isteriz.
              </p>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowReminderModal(false)}>
                İptal
              </Button>
              <Button variant="primary" icon={Send} onClick={handleSendReminderConfirm}>
                SMS & Email Gönder
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Reminder Sent Confirmation Modal */}
      <ConfirmationModal
        isOpen={reminderModal.show}
        onClose={() => setReminderModal({ show: false, parentName: '' })}
        onConfirm={() => setReminderModal({ show: false, parentName: '' })}
        title="Hatırlatma Gönderildi"
        message={`${reminderModal.parentName} velisine ödeme hatırlatma SMS/Email gönderildi.`}
        type="success"
        confirmText="Tamam"
        showCancel={false}
      />

      {/* Delete Payment Confirmation Modal */}
      <ConfirmationModal
        isOpen={deletePaymentModal.show}
        onClose={() => setDeletePaymentModal({ show: false, paymentId: null, invoiceNo: '' })}
        onConfirm={confirmDeletePayment}
        title="Ödeme Kaydını Sil"
        message={`${deletePaymentModal.invoiceNo} numaralı ödeme kaydını silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        type="danger"
        confirmText="Evet, Sil"
        cancelText="İptal"
      />

      {/* Download Invoice Confirmation Modal */}
      <ConfirmationModal
        isOpen={downloadModal.show}
        onClose={() => setDownloadModal({ show: false, invoiceNo: '' })}
        onConfirm={() => setDownloadModal({ show: false, invoiceNo: '' })}
        title="Fatura İndiriliyor"
        message={`${downloadModal.invoiceNo} numaralı fatura indiriliyor...`}
        type="info"
        confirmText="Tamam"
        showCancel={false}
      />
    </div>
  );
};

export default PaymentManagement;

import React, { useState, useEffect } from 'react';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { Search, Download } from 'lucide-react';

const Payments = () => {
  const { currentInstitution } = useAuth();
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (currentInstitution) {
      loadPayments();
    }
  }, [currentInstitution]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'payments'),
        where('institutionId', '==', currentInstitution.id),
        orderBy('dueDate', 'asc')
      );

      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      setPayments(data);
    } catch (error) {
      // Production: Error tracking service can be added here
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment =>
    payment.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    payment.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exportToExcel = () => {
    // Excel export mantığı buraya eklenecek
    alert('Excel export özelliği yakında eklenecek');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Ödeme Takip</h2>
        <button
          onClick={exportToExcel}
          className="btn-secondary flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Excel İndir
        </button>
      </div>

      {/* Arama */}
      <div className="card">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Veli veya öğrenci adı ile ara..."
            className="input-field pl-10"
          />
        </div>
      </div>

      {/* Tablo */}
      <div className="card overflow-x-auto">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Veli Adı Soyadı</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Öğrenci Adı</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Tutar</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Son Tarih</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    {searchTerm ? 'Sonuç bulunamadı' : 'Henüz ödeme kaydı bulunmuyor'}
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">{payment.parentName}</td>
                    <td className="py-3 px-4">
                      <span className="text-gray-600">({payment.studentName})</span>
                    </td>
                    <td className="py-3 px-4 font-semibold">{payment.amount} TL</td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          payment.status === 'paid'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {payment.status === 'paid' ? 'Ödendi' : 'Ödenmedi'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{payment.dueDate}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Payments;

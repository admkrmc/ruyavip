import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Upload, Download, Filter } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const StudentManagement = () => {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: 'Zeynep Yılmaz',
      className: 'Papatyalar Sınıfı',
      age: 4,
      parent: 'Ayşe Yılmaz',
      phone: '0532 111 2233',
      status: 'active',
      photo: null
    },
    {
      id: 2,
      name: 'Mehmet Demir',
      className: 'Güller Sınıfı',
      age: 5,
      parent: 'Fatma Demir',
      phone: '0533 222 3344',
      status: 'active',
      photo: null
    },
    {
      id: 3,
      name: 'Ali Kaya',
      className: 'Laleler Sınıfı',
      age: 3,
      parent: 'Hasan Kaya',
      phone: '0534 333 4455',
      status: 'passive',
      photo: null
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [deleteModal, setDeleteModal] = useState({ show: false, studentId: null, studentName: '' });
  const [formData, setFormData] = useState({
    name: '',
    className: '',
    age: '',
    parent: '',
    phone: '',
    address: '',
    birthDate: '',
    allergies: '',
    notes: ''
  });

  const classes = [
    { value: 'papatyalar', label: 'Papatyalar Sınıfı' },
    { value: 'guller', label: 'Güller Sınıfı' },
    { value: 'laleler', label: 'Laleler Sınıfı' }
  ];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parent.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || student.className.toLowerCase().includes(filterClass);
    const matchesStatus = !filterStatus || student.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  const handleAddStudent = () => {
    setSelectedStudent(null);
    setFormData({
      name: '',
      className: '',
      age: '',
      parent: '',
      phone: '',
      address: '',
      birthDate: '',
      allergies: '',
      notes: ''
    });
    setShowModal(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setFormData({
      name: student.name,
      className: student.className,
      age: student.age,
      parent: student.parent,
      phone: student.phone,
      address: student.address || '',
      birthDate: student.birthDate || '',
      allergies: student.allergies || '',
      notes: student.notes || ''
    });
    setShowModal(true);
  };

  const handleDeleteStudent = (student) => {
    setDeleteModal({
      show: true,
      studentId: student.id,
      studentName: student.name
    });
  };

  const confirmDelete = () => {
    setStudents(students.filter(s => s.id !== deleteModal.studentId));
    setDeleteModal({ show: false, studentId: null, studentName: '' });
  };

  const handleSave = () => {
    if (selectedStudent) {
      // Güncelleme
      setStudents(students.map(s =>
        s.id === selectedStudent.id
          ? { ...s, ...formData }
          : s
      ));
    } else {
      // Yeni ekleme
      setStudents([...students, {
        id: Date.now(),
        ...formData,
        status: 'active'
      }]);
    }
    setShowModal(false);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık ve Aksiyon Butonları */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Öğrenci Yönetimi</h2>
          <p className="text-gray-600">Tüm öğrencileri görüntüleyin ve yönetin</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            Excel İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleAddStudent}>
            Yeni Öğrenci Ekle
          </Button>
        </div>
      </div>

      {/* Filtreler ve Arama */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
              { value: 'active', label: 'Aktif' },
              { value: 'passive', label: 'Pasif' }
            ]}
          />
          <Button variant="outline" icon={Filter}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Toplam Öğrenci</p>
          <p className="text-3xl font-bold text-blue-700">{students.length}</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Aktif Öğrenci</p>
          <p className="text-3xl font-bold text-green-700">
            {students.filter(s => s.status === 'active').length}
          </p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Sınıf Sayısı</p>
          <p className="text-3xl font-bold text-purple-700">3</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <p className="text-sm text-orange-600 font-medium">Ortalama Yaş</p>
          <p className="text-3xl font-bold text-orange-700">4.2</p>
        </Card>
      </div>

      {/* Öğrenci Listesi */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Öğrenci Adı</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Sınıf</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Yaş</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Veli</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Telefon</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Durum</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {filteredStudents.map((student, index) => (
                <tr
                  key={student.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fadeIn"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                        {student.name.charAt(0)}
                      </div>
                      <span className="font-medium text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{student.className}</td>
                  <td className="py-4 px-4 text-gray-600">{student.age}</td>
                  <td className="py-4 px-4 text-gray-600">{student.parent}</td>
                  <td className="py-4 px-4 text-gray-600">{student.phone}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      student.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-700'
                    }`}>
                      {student.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Görüntüle"
                      >
                        <Eye size={18} className="text-blue-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-purple-50 rounded-lg transition-colors"
                        onClick={() => handleEditStudent(student)}
                        title="Düzenle"
                      >
                        <Edit2 size={18} className="text-purple-600" />
                      </button>
                      <button
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        onClick={() => handleDeleteStudent(student)}
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

      {/* Modal - Öğrenci Ekle/Düzenle */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title={selectedStudent ? 'Öğrenci Düzenle' : 'Yeni Öğrenci Ekle'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Öğrenci Adı Soyadı"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Örn: Zeynep Yılmaz"
              required
            />
            <Input
              label="Doğum Tarihi"
              type="date"
              value={formData.birthDate}
              onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
            />
            <Select
              label="Sınıf"
              value={formData.className}
              onChange={(e) => setFormData({...formData, className: e.target.value})}
              options={classes}
              required
            />
            <Input
              label="Yaş"
              type="number"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              placeholder="4"
              required
            />
            <Input
              label="Veli Adı Soyadı"
              value={formData.parent}
              onChange={(e) => setFormData({...formData, parent: e.target.value})}
              placeholder="Örn: Ayşe Yılmaz"
              required
            />
            <Input
              label="Telefon"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="0532 111 2233"
              required
            />
          </div>

          <Input
            label="Adres"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="Tam adres"
          />

          <Input
            label="Alerjiler / Özel Durumlar"
            value={formData.allergies}
            onChange={(e) => setFormData({...formData, allergies: e.target.value})}
            placeholder="Örn: Fıstık alerjisi, astım"
          />

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {selectedStudent ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={deleteModal.show}
        onClose={() => setDeleteModal({ show: false, studentId: null, studentName: '' })}
        onConfirm={confirmDelete}
        title="Öğrenciyi Sil"
        message={`${deleteModal.studentName} adlı öğrenciyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`}
        type="danger"
        confirmText="Evet, Sil"
        cancelText="İptal"
      />
    </div>
  );
};

export default StudentManagement;

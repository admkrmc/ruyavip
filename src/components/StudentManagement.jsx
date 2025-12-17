import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, Eye, Download, Filter, Loader2 } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';
import { useFirestore, useFormModal, useConfirmModal } from '../hooks/useFirestore';
import { validateForm, validationSchemas } from '../utils/validation';
import { getStatusClasses, getStatusLabel } from '../utils/statusHelpers';
import { calculateAge, formatDateInput } from '../utils/dateHelpers';

const StudentManagement = () => {
  // Firebase hooks
  const { data: students, loading, error, add, update, remove } = useFirestore('students');

  // Form modal hook
  const {
    showModal,
    openAddModal,
    openEditModal,
    closeModal,
    formData,
    updateField,
    selectedItem,
    isEditing,
    errors,
    setFormErrors
  } = useFormModal({
    name: '',
    className: '',
    age: '',
    parent: '',
    phone: '',
    address: '',
    birthDate: '',
    allergies: '',
    notes: '',
    status: 'active'
  });

  // Confirmation modal hook
  const { confirmModal, showConfirm, hideConfirm, handleConfirm } = useConfirmModal();

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [filterClass, setFilterClass] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const classes = [
    { value: 'papatyalar', label: 'Papatyalar Sınıfı' },
    { value: 'guller', label: 'Güller Sınıfı' },
    { value: 'laleler', label: 'Laleler Sınıfı' },
    { value: 'menekseler', label: 'Menekşeler Sınıfı' }
  ];

  // Filter students
  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.parent?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !filterClass || student.className?.toLowerCase().includes(filterClass);
    const matchesStatus = !filterStatus || student.status === filterStatus;

    return matchesSearch && matchesClass && matchesStatus;
  });

  // Calculate statistics
  const totalStudents = students.length;
  const activeStudents = students.filter(s => s.status === 'active').length;
  const uniqueClasses = [...new Set(students.map(s => s.className).filter(Boolean))].length;
  const averageAge = students.length > 0
    ? (students.reduce((sum, s) => {
        const age = s.birthDate ? calculateAge(s.birthDate) : (s.age || 0);
        return sum + Number(age);
      }, 0) / students.length).toFixed(1)
    : 0;

  // Handle add student
  const handleAddStudent = () => {
    openAddModal();
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    const editData = {
      ...student,
      birthDate: student.birthDate ? formatDateInput(student.birthDate) : '',
      age: student.age || (student.birthDate ? calculateAge(student.birthDate) : '')
    };
    openEditModal(editData);
  };

  // Handle delete student
  const handleDeleteStudent = (student) => {
    showConfirm({
      title: 'Öğrenciyi Sil',
      message: `${student.name} adlı öğrenciyi silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.`,
      type: 'danger',
      onConfirm: async () => {
        try {
          await remove(student.id);
        } catch (err) {
          console.error('Error deleting student:', err);
          alert('Öğrenci silinirken bir hata oluştu.');
        }
      }
    });
  };

  // Handle save student
  const handleSave = async () => {
    // Validate form
    const validationErrors = validateForm(formData, validationSchemas.student);

    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      // Calculate age from birthDate if provided
      const dataToSave = {
        ...formData,
        age: formData.birthDate ? calculateAge(formData.birthDate) : formData.age,
        status: formData.status || 'active'
      };

      if (isEditing) {
        // Update existing student
        await update(selectedItem.id, dataToSave);
      } else {
        // Add new student
        await add(dataToSave);
      }

      closeModal();
    } catch (err) {
      console.error('Error saving student:', err);
      alert('Öğrenci kaydedilirken bir hata oluştu.');
    }
  };

  // Clear filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setFilterClass('');
    setFilterStatus('');
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
          <Button variant="outline" icon={Filter} onClick={handleClearFilters}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <p className="text-sm text-blue-600 font-medium">Toplam Öğrenci</p>
          <p className="text-3xl font-bold text-blue-700">{totalStudents}</p>
        </Card>
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <p className="text-sm text-green-600 font-medium">Aktif Öğrenci</p>
          <p className="text-3xl font-bold text-green-700">{activeStudents}</p>
        </Card>
        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <p className="text-sm text-purple-600 font-medium">Sınıf Sayısı</p>
          <p className="text-3xl font-bold text-purple-700">{uniqueClasses}</p>
        </Card>
        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <p className="text-sm text-orange-600 font-medium">Ortalama Yaş</p>
          <p className="text-3xl font-bold text-orange-700">{averageAge}</p>
        </Card>
      </div>

      {/* Error State */}
      {error && (
        <Card className="bg-red-50 border-red-200">
          <p className="text-red-700">Hata: {error}</p>
        </Card>
      )}

      {/* Loading State */}
      {loading ? (
        <Card>
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-purple-600" />
            <span className="ml-3 text-gray-600">Öğrenciler yükleniyor...</span>
          </div>
        </Card>
      ) : (
        /* Öğrenci Listesi */
        <Card>
          <div className="overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Öğrenci bulunamadı</p>
                <p className="text-gray-400 text-sm mt-2">Yeni öğrenci eklemek için yukarıdaki butonu kullanın</p>
              </div>
            ) : (
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
                  {filteredStudents.map((student, index) => {
                    const studentAge = student.birthDate
                      ? calculateAge(student.birthDate)
                      : student.age || '-';

                    return (
                      <tr
                        key={student.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors animate-fadeIn"
                        style={{ animationDelay: `${index * 50}ms` }}
                      >
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
                              {student.name?.charAt(0) || '?'}
                            </div>
                            <span className="font-medium text-gray-800">{student.name || '-'}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-gray-600">{student.className || '-'}</td>
                        <td className="py-4 px-4 text-gray-600">{studentAge}</td>
                        <td className="py-4 px-4 text-gray-600">{student.parent || '-'}</td>
                        <td className="py-4 px-4 text-gray-600">{student.phone || '-'}</td>
                        <td className="py-4 px-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            getStatusClasses('general', student.status || 'active')
                          }`}>
                            {getStatusLabel('general', student.status || 'active')}
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
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </Card>
      )}

      {/* Modal - Öğrenci Ekle/Düzenle */}
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        title={isEditing ? 'Öğrenci Düzenle' : 'Yeni Öğrenci Ekle'}
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                label="Öğrenci Adı Soyadı"
                value={formData.name}
                onChange={(e) => updateField('name', e.target.value)}
                placeholder="Örn: Zeynep Yılmaz"
                required
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div>
              <Input
                label="Doğum Tarihi"
                type="date"
                value={formData.birthDate}
                onChange={(e) => updateField('birthDate', e.target.value)}
              />
            </div>

            <div>
              <Select
                label="Sınıf"
                value={formData.className}
                onChange={(e) => updateField('className', e.target.value)}
                options={classes}
                required
              />
              {errors.className && (
                <p className="text-red-600 text-sm mt-1">{errors.className}</p>
              )}
            </div>

            <div>
              <Input
                label="Yaş"
                type="number"
                value={formData.age}
                onChange={(e) => updateField('age', e.target.value)}
                placeholder="4"
                required={!formData.birthDate}
              />
              {errors.age && (
                <p className="text-red-600 text-sm mt-1">{errors.age}</p>
              )}
            </div>

            <div>
              <Input
                label="Veli Adı Soyadı"
                value={formData.parent}
                onChange={(e) => updateField('parent', e.target.value)}
                placeholder="Örn: Ayşe Yılmaz"
                required
              />
              {errors.parent && (
                <p className="text-red-600 text-sm mt-1">{errors.parent}</p>
              )}
            </div>

            <div>
              <Input
                label="Telefon"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
                placeholder="0532 111 2233"
                required
              />
              {errors.phone && (
                <p className="text-red-600 text-sm mt-1">{errors.phone}</p>
              )}
            </div>
          </div>

          <Input
            label="Adres"
            value={formData.address}
            onChange={(e) => updateField('address', e.target.value)}
            placeholder="Tam adres"
          />

          <Input
            label="Alerjiler / Özel Durumlar"
            value={formData.allergies}
            onChange={(e) => updateField('allergies', e.target.value)}
            placeholder="Örn: Fıstık alerjisi, astım"
          />

          <Input
            label="Notlar"
            value={formData.notes}
            onChange={(e) => updateField('notes', e.target.value)}
            placeholder="Ek notlar"
          />

          {isEditing && (
            <Select
              label="Durum"
              value={formData.status}
              onChange={(e) => updateField('status', e.target.value)}
              options={[
                { value: 'active', label: 'Aktif' },
                { value: 'passive', label: 'Pasif' }
              ]}
            />
          )}

          <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
            <Button variant="outline" onClick={closeModal}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              {isEditing ? 'Güncelle' : 'Kaydet'}
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.show}
        onClose={hideConfirm}
        onConfirm={handleConfirm}
        title={confirmModal.title}
        message={confirmModal.message}
        type={confirmModal.type}
        confirmText="Evet, Sil"
        cancelText="İptal"
      />
    </div>
  );
};

export default StudentManagement;

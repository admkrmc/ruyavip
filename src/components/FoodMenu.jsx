import React, { useState } from 'react';
import { Calendar, Plus, Edit2, Eye, Download, ChevronLeft, ChevronRight, AlertTriangle, Check, X, Leaf, Milk, Fish, Egg } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';
import { ConfirmationModal } from './ui/ConfirmationModal';

const FoodMenu = () => {
  const [currentWeek, setCurrentWeek] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [successModal, setSuccessModal] = useState({ show: false, message: '' });
  const [weeklyMenus, setWeeklyMenus] = useState([
    {
      week: '9-13 Aralık 2025',
      weekNumber: 0,
      days: [
        {
          day: 'Pazartesi',
          date: '9 Aralık',
          breakfast: {
            items: ['Beyaz peynir', 'Zeytin', 'Domates', 'Salatalık', 'Ekmek', 'Süt'],
            allergens: ['Süt'],
            calories: 320,
            approved: true
          },
          lunch: {
            items: ['Tavuk haşlama', 'Pilav', 'Mercimek çorbası', 'Ayran'],
            allergens: ['Süt'],
            calories: 450,
            approved: true
          },
          snack: {
            items: ['Muz', 'Elma dilimi', 'Su'],
            allergens: [],
            calories: 120,
            approved: true
          }
        },
        {
          day: 'Salı',
          date: '10 Aralık',
          breakfast: {
            items: ['Kaşar peynir', 'Haşlanmış yumurta', 'Domates', 'Ekmek', 'Çay'],
            allergens: ['Süt', 'Yumurta'],
            calories: 340,
            approved: true
          },
          lunch: {
            items: ['Köfte', 'Makarna', 'Cacık', 'Ekmek'],
            allergens: ['Süt', 'Gluten'],
            calories: 480,
            approved: false
          },
          snack: {
            items: ['Portakal', 'Kuru üzüm', 'Su'],
            allergens: [],
            calories: 110,
            approved: true
          }
        },
        {
          day: 'Çarşamba',
          date: '11 Aralık',
          breakfast: {
            items: ['Bal', 'Tereyağı', 'Ekmek', 'Süt'],
            allergens: ['Süt', 'Gluten'],
            calories: 300,
            approved: true
          },
          lunch: {
            items: ['Balık', 'Bulgur pilavı', 'Salata', 'Ayran'],
            allergens: ['Balık', 'Süt'],
            calories: 420,
            approved: true
          },
          snack: {
            items: ['Çilek', 'Kivi dilimi', 'Su'],
            allergens: [],
            calories: 90,
            approved: true
          }
        },
        {
          day: 'Perşembe',
          date: '12 Aralık',
          breakfast: {
            items: ['Yoğurt', 'Bal', 'Ceviz', 'Ekmek'],
            allergens: ['Süt', 'Gluten', 'Sert kabuklu'],
            calories: 330,
            approved: true
          },
          lunch: {
            items: ['Tavuk şinitzel', 'Patates kızartması', 'Çorba', 'Meyve suyu'],
            allergens: ['Gluten'],
            calories: 520,
            approved: true
          },
          snack: {
            items: ['Bisküvi', 'Süt', 'Muz'],
            allergens: ['Süt', 'Gluten'],
            calories: 150,
            approved: false
          }
        },
        {
          day: 'Cuma',
          date: '13 Aralık',
          breakfast: {
            items: ['Omlet', 'Sosis', 'Ekmek', 'Çay'],
            allergens: ['Yumurta', 'Gluten'],
            calories: 360,
            approved: true
          },
          lunch: {
            items: ['Mantı', 'Yoğurt', 'Salata'],
            allergens: ['Süt', 'Gluten', 'Yumurta'],
            calories: 470,
            approved: true
          },
          snack: {
            items: ['Armut', 'Üzüm', 'Su'],
            allergens: [],
            calories: 100,
            approved: true
          }
        }
      ]
    }
  ]);

  const [formData, setFormData] = useState({
    day: '',
    date: '',
    mealType: 'breakfast',
    items: '',
    allergens: [],
    calories: 0,
    dietaryOptions: []
  });

  const allergensList = [
    { value: 'Süt', label: 'Süt ve Süt Ürünleri', icon: Milk },
    { value: 'Yumurta', label: 'Yumurta', icon: Egg },
    { value: 'Balık', label: 'Balık', icon: Fish },
    { value: 'Sert kabuklu', label: 'Sert Kabuklu Yemişler', icon: Leaf },
    { value: 'Gluten', label: 'Gluten', icon: Leaf },
    { value: 'Soya', label: 'Soya', icon: Leaf },
    { value: 'Fındık', label: 'Fındık/Yer Fıstığı', icon: Leaf }
  ];

  const dietaryOptions = [
    { value: 'vegetarian', label: 'Vejetaryen', icon: '🥗' },
    { value: 'vegan', label: 'Vegan', icon: '🌱' },
    { value: 'gluten-free', label: 'Glutensiz', icon: '🌾' },
    { value: 'lactose-free', label: 'Laktozsuz', icon: '🥛' },
    { value: 'halal', label: 'Helal', icon: '☪️' }
  ];

  const mealTypes = [
    { value: 'breakfast', label: 'Kahvaltı', emoji: '☕' },
    { value: 'lunch', label: 'Öğle Yemeği', emoji: '🍽️' },
    { value: 'snack', label: 'Ara Öğün', emoji: '🍎' }
  ];

  const currentMenu = weeklyMenus[currentWeek];

  const stats = {
    totalMeals: currentMenu?.days.reduce((sum, day) => {
      return sum + (day.breakfast ? 1 : 0) + (day.lunch ? 1 : 0) + (day.snack ? 1 : 0);
    }, 0) || 0,
    approvedMeals: currentMenu?.days.reduce((sum, day) => {
      let approved = 0;
      if (day.breakfast?.approved) approved++;
      if (day.lunch?.approved) approved++;
      if (day.snack?.approved) approved++;
      return sum + approved;
    }, 0) || 0,
    avgCalories: Math.round(
      (currentMenu?.days.reduce((sum, day) => {
        return sum + (day.breakfast?.calories || 0) + (day.lunch?.calories || 0) + (day.snack?.calories || 0);
      }, 0) || 0) / (currentMenu?.days.length || 1) / 3
    ),
    allergenWarnings: currentMenu?.days.reduce((sum, day) => {
      let count = 0;
      if (day.breakfast?.allergens.length > 0) count++;
      if (day.lunch?.allergens.length > 0) count++;
      if (day.snack?.allergens.length > 0) count++;
      return sum + count;
    }, 0) || 0
  };

  const handlePreviousWeek = () => {
    if (currentWeek > 0) {
      setCurrentWeek(currentWeek - 1);
    }
  };

  const handleNextWeek = () => {
    if (currentWeek < weeklyMenus.length - 1) {
      setCurrentWeek(currentWeek + 1);
    }
  };

  const handleNewMenu = () => {
    setFormData({
      day: '',
      date: '',
      mealType: 'breakfast',
      items: '',
      allergens: [],
      calories: 0,
      dietaryOptions: []
    });
    setShowModal(true);
  };

  const handleAllergenToggle = (allergen) => {
    setFormData(prev => ({
      ...prev,
      allergens: prev.allergens.includes(allergen)
        ? prev.allergens.filter(a => a !== allergen)
        : [...prev.allergens, allergen]
    }));
  };

  const handleDietaryToggle = (option) => {
    setFormData(prev => ({
      ...prev,
      dietaryOptions: prev.dietaryOptions.includes(option)
        ? prev.dietaryOptions.filter(o => o !== option)
        : [...prev.dietaryOptions, option]
    }));
  };

  const handleSave = () => {
    setSuccessModal({ show: true, message: 'Menü kaydedildi! (Firebase entegrasyonu eklenecek)' });
    setShowModal(false);
  };

  const handleViewDetails = (day, mealType) => {
    setSelectedMeal({
      day: day.day,
      date: day.date,
      mealType,
      meal: day[mealType]
    });
    setShowDetailModal(true);
  };

  const getMealTypeLabel = (type) => {
    const meal = mealTypes.find(m => m.value === type);
    return meal ? `${meal.emoji} ${meal.label}` : type;
  };

  const getAllergenIcon = (allergen) => {
    const item = allergensList.find(a => a.value === allergen);
    return item?.icon || AlertTriangle;
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Yemek Menüsü</h2>
          <p className="text-gray-600">Haftalık menü planlama ve alerji yönetimi</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" icon={Download}>
            PDF İndir
          </Button>
          <Button variant="primary" icon={Plus} onClick={handleNewMenu}>
            Menü Ekle
          </Button>
        </div>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam Öğün</p>
              <p className="text-3xl font-bold text-blue-700">{stats.totalMeals}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <span className="text-2xl">🍽️</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Onaylı Öğün</p>
              <p className="text-3xl font-bold text-green-700">{stats.approvedMeals}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <Check size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Ort. Kalori</p>
              <p className="text-3xl font-bold text-orange-700">{stats.avgCalories}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <span className="text-2xl">🔥</span>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-red-600 font-medium">Alerji Uyarısı</p>
              <p className="text-3xl font-bold text-red-700">{stats.allergenWarnings}</p>
            </div>
            <div className="p-3 bg-red-200 rounded-lg">
              <AlertTriangle size={24} className="text-red-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Hafta Seçici */}
      <Card>
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            icon={ChevronLeft}
            onClick={handlePreviousWeek}
            disabled={currentWeek === 0}
          >
            Önceki Hafta
          </Button>
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-800">{currentMenu?.week}</h3>
            <p className="text-sm text-gray-500">Hafta {currentWeek + 1}</p>
          </div>
          <Button
            variant="ghost"
            icon={ChevronRight}
            onClick={handleNextWeek}
            disabled={currentWeek === weeklyMenus.length - 1}
          >
            Sonraki Hafta
          </Button>
        </div>
      </Card>

      {/* Haftalık Menü Tablosu */}
      <Card className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th className="text-left p-3 font-semibold text-gray-700">Gün</th>
              <th className="text-left p-3 font-semibold text-gray-700">☕ Kahvaltı</th>
              <th className="text-left p-3 font-semibold text-gray-700">🍽️ Öğle</th>
              <th className="text-left p-3 font-semibold text-gray-700">🍎 Ara Öğün</th>
            </tr>
          </thead>
          <tbody>
            {currentMenu?.days.map((day, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="p-3">
                  <div className="font-semibold text-gray-800">{day.day}</div>
                  <div className="text-sm text-gray-500">{day.date}</div>
                </td>

                {/* Kahvaltı */}
                <td className="p-3">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700">
                      {day.breakfast.items.slice(0, 3).join(', ')}
                      {day.breakfast.items.length > 3 && '...'}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {day.breakfast.calories} kcal
                      </span>
                      {day.breakfast.allergens.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded flex items-center gap-1">
                          <AlertTriangle size={12} />
                          {day.breakfast.allergens.length} alerjen
                        </span>
                      )}
                      {day.breakfast.approved ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <X size={16} className="text-red-600" />
                      )}
                    </div>
                    <button
                      onClick={() => handleViewDetails(day, 'breakfast')}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      <Eye size={12} />
                      Detay
                    </button>
                  </div>
                </td>

                {/* Öğle */}
                <td className="p-3">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700">
                      {day.lunch.items.slice(0, 3).join(', ')}
                      {day.lunch.items.length > 3 && '...'}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {day.lunch.calories} kcal
                      </span>
                      {day.lunch.allergens.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded flex items-center gap-1">
                          <AlertTriangle size={12} />
                          {day.lunch.allergens.length} alerjen
                        </span>
                      )}
                      {day.lunch.approved ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <X size={16} className="text-red-600" />
                      )}
                    </div>
                    <button
                      onClick={() => handleViewDetails(day, 'lunch')}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      <Eye size={12} />
                      Detay
                    </button>
                  </div>
                </td>

                {/* Ara Öğün */}
                <td className="p-3">
                  <div className="space-y-2">
                    <div className="text-sm text-gray-700">
                      {day.snack.items.slice(0, 3).join(', ')}
                      {day.snack.items.length > 3 && '...'}
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-orange-100 text-orange-700 rounded">
                        {day.snack.calories} kcal
                      </span>
                      {day.snack.allergens.length > 0 && (
                        <span className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded flex items-center gap-1">
                          <AlertTriangle size={12} />
                          {day.snack.allergens.length} alerjen
                        </span>
                      )}
                      {day.snack.approved ? (
                        <Check size={16} className="text-green-600" />
                      ) : (
                        <X size={16} className="text-red-600" />
                      )}
                    </div>
                    <button
                      onClick={() => handleViewDetails(day, 'snack')}
                      className="text-xs text-purple-600 hover:text-purple-700 font-medium flex items-center gap-1"
                    >
                      <Eye size={12} />
                      Detay
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Alerji Uyarı Kartı */}
      <Card className="bg-yellow-50 border-yellow-200">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-800 mb-2">Alerji Uyarısı</h4>
            <p className="text-sm text-gray-700 mb-3">
              Bu haftanın menüsünde aşağıdaki alerjenler bulunmaktadır. Alerjisi olan öğrenciler için alternatif menü hazırlanmalıdır.
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(currentMenu?.days.flatMap(day => [
                ...day.breakfast.allergens,
                ...day.lunch.allergens,
                ...day.snack.allergens
              ]))).map((allergen, index) => {
                const Icon = getAllergenIcon(allergen);
                return (
                  <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                    <Icon size={16} />
                    {allergen}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </Card>

      {/* Modal - Yeni Menü */}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        title="Yeni Menü Ekle"
        size="lg"
      >
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Select
              label="Gün"
              value={formData.day}
              onChange={(e) => setFormData({...formData, day: e.target.value})}
              options={[
                { value: 'Pazartesi', label: 'Pazartesi' },
                { value: 'Salı', label: 'Salı' },
                { value: 'Çarşamba', label: 'Çarşamba' },
                { value: 'Perşembe', label: 'Perşembe' },
                { value: 'Cuma', label: 'Cuma' }
              ]}
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

          <Select
            label="Öğün Türü"
            value={formData.mealType}
            onChange={(e) => setFormData({...formData, mealType: e.target.value})}
            options={mealTypes}
            required
          />

          <TextArea
            label="Yiyecekler (virgülle ayırın)"
            value={formData.items}
            onChange={(e) => setFormData({...formData, items: e.target.value})}
            placeholder="Örn: Beyaz peynir, Zeytin, Domates, Salatalık, Ekmek, Süt"
            rows={3}
            required
          />

          <Input
            label="Tahmini Kalori"
            type="number"
            value={formData.calories}
            onChange={(e) => setFormData({...formData, calories: parseInt(e.target.value) || 0})}
            placeholder="320"
          />

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Alerjenler (Varsa işaretleyin)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {allergensList.map(allergen => {
                const Icon = allergen.icon;
                return (
                  <label key={allergen.value} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.allergens.includes(allergen.value)}
                      onChange={() => handleAllergenToggle(allergen.value)}
                      className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                    />
                    <Icon size={16} className="text-gray-600" />
                    <span className="text-sm">{allergen.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Özel Diyet Seçenekleri
            </label>
            <div className="grid grid-cols-2 gap-2">
              {dietaryOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.dietaryOptions.includes(option.value)}
                    onChange={() => handleDietaryToggle(option.value)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <span>{option.icon}</span>
                  <span className="text-sm">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedMeal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`${selectedMeal.day} - ${getMealTypeLabel(selectedMeal.mealType)}`}
          size="md"
        >
          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-2">Yiyecekler</h4>
              <ul className="space-y-2">
                {selectedMeal.meal.items.map((item, index) => (
                  <li key={index} className="flex items-center gap-2 text-gray-700">
                    <span className="w-2 h-2 bg-purple-600 rounded-full"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-orange-50 rounded-lg text-center">
                <span className="text-3xl mb-2 block">🔥</span>
                <p className="text-2xl font-bold text-orange-700">{selectedMeal.meal.calories}</p>
                <p className="text-sm text-orange-600">Kalori</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg text-center">
                <span className="text-3xl mb-2 block">{selectedMeal.meal.approved ? '✅' : '⏳'}</span>
                <p className="text-sm font-semibold text-blue-700">
                  {selectedMeal.meal.approved ? 'Onaylandı' : 'Onay Bekliyor'}
                </p>
              </div>
            </div>

            {selectedMeal.meal.allergens.length > 0 && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <h4 className="text-sm font-semibold text-red-700 mb-3 flex items-center gap-2">
                  <AlertTriangle size={16} />
                  Alerji Uyarısı
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMeal.meal.allergens.map((allergen, index) => {
                    const Icon = getAllergenIcon(allergen);
                    return (
                      <span key={index} className="inline-flex items-center gap-1 px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">
                        <Icon size={14} />
                        {allergen}
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
              <Button variant="primary" icon={Edit2}>
                Düzenle
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

export default FoodMenu;

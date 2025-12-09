import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useAuth } from '../contexts/AuthContext';
import { Download, ChevronLeft, ChevronRight } from 'lucide-react';

const FoodMenu = () => {
  const { currentInstitution } = useAuth();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [menuData, setMenuData] = useState({});
  const [loading, setLoading] = useState(false);

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const monthNames = [
    'Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs', 'Haziran',
    'Temmuz', 'Ağustos', 'Eylül', 'Ekim', 'Kasım', 'Aralık'
  ];

  const dayNames = ['Paz', 'Pzt', 'Sal', 'Çar', 'Per', 'Cum', 'Cmt'];

  useEffect(() => {
    if (currentInstitution) {
      loadMenuData();
    }
  }, [currentDate, currentInstitution]);

  const loadMenuData = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, 'foodMenus'),
        where('institutionId', '==', currentInstitution.id),
        where('month', '==', currentDate.getMonth() + 1),
        where('year', '==', currentDate.getFullYear())
      );

      const snapshot = await getDocs(q);
      const data = {};
      snapshot.docs.forEach(doc => {
        const menuData = doc.data();
        data[menuData.day] = menuData;
      });

      setMenuData(data);
    } catch (error) {
      console.error('Menü yüklenirken hata:', error);
    } finally {
      setLoading(false);
    }
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const exportToExcel = () => {
    alert('Excel export özelliği yakında eklenecek');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Yemek Menüsü</h2>
        <button
          onClick={exportToExcel}
          className="btn-secondary flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Excel İndir
        </button>
      </div>

      {/* Ay Seçici */}
      <div className="card">
        <div className="flex items-center justify-between">
          <button onClick={previousMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <h3 className="text-xl font-semibold">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h3>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg">
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Takvim */}
      <div className="card">
        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Yükleniyor...</p>
          </div>
        ) : (
          <div className="grid grid-cols-7 gap-2">
            {/* Gün başlıkları */}
            {dayNames.map((day) => (
              <div key={day} className="text-center font-semibold text-gray-700 py-2">
                {day}
              </div>
            ))}

            {/* Boş hücreler */}
            {Array.from({ length: firstDayOfMonth }).map((_, index) => (
              <div key={`empty-${index}`} className="aspect-square" />
            ))}

            {/* Günler */}
            {Array.from({ length: daysInMonth }).map((_, index) => {
              const day = index + 1;
              const menu = menuData[day];
              const today = isToday(day);

              return (
                <div
                  key={day}
                  className={`aspect-square border rounded-lg p-2 ${
                    today ? 'border-purple-600 border-2 bg-purple-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`text-sm font-semibold mb-1 ${today ? 'text-purple-600' : 'text-gray-700'}`}>
                    {day}
                  </div>

                  {menu ? (
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="font-semibold">S:</span> {menu.breakfast || '-'}
                      </div>
                      <div>
                        <span className="font-semibold">Ö:</span> {menu.lunch || '-'}
                      </div>
                      <div>
                        <span className="font-semibold">İ:</span> {menu.snack || '-'}
                      </div>
                    </div>
                  ) : (
                    <div className="text-xs text-gray-400">Menü yok</div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="card bg-purple-50 border-purple-200">
        <div className="flex items-start gap-2">
          <div className="text-purple-600 font-semibold">ℹ️</div>
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-1">Kısaltmalar:</p>
            <p>S: Sabah Kahvaltısı | Ö: Öğle Yemeği | İ: İkindi Aperatifi</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodMenu;

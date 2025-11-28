import React from 'react';
import { Users, GraduationCap, Clock } from 'lucide-react';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Toplam Öğrenci',
      value: '45',
      icon: GraduationCap,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Toplam Öğretmen',
      value: '12',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Bekleyen Onay',
      value: '8',
      icon: Clock,
      color: 'from-yellow-500 to-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">{stat.title}</p>
                  <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`p-4 rounded-full bg-gradient-to-r ${stat.color}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <h3 className="text-lg font-semibold mb-4">Son Aktiviteler</h3>
        <div className="space-y-4">
          {[
            { text: 'Yeni veli kaydı: Ayşe Yılmaz', time: '5 dakika önce' },
            { text: 'Ödeme alındı: Mehmet Demir - 5000 TL', time: '1 saat önce' },
            { text: 'Yeni duyuru yayınlandı: Veli Toplantısı', time: '2 saat önce' },
            { text: 'Yemek menüsü güncellendi', time: '3 saat önce' }
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <p className="text-gray-700">{activity.text}</p>
              <span className="text-sm text-gray-500">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

import React from 'react';
import { Users, GraduationCap, Clock, TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { StatCard, Card } from './ui/Card';

const DashboardHome = () => {
  const stats = [
    {
      title: 'Toplam Öğrenci',
      value: '45',
      icon: GraduationCap,
      color: 'blue',
      trend: { direction: 'up', value: '5%' }
    },
    {
      title: 'Toplam Öğretmen',
      value: '12',
      icon: Users,
      color: 'green',
      trend: { direction: 'up', value: '2%' }
    },
    {
      title: 'Bekleyen Onay',
      value: '8',
      icon: Clock,
      color: 'orange',
      trend: { direction: 'down', value: '3%' }
    }
  ];

  const recentActivities = [
    {
      text: 'Yeni veli kaydı: Ayşe Yılmaz',
      time: '5 dakika önce',
      type: 'user'
    },
    {
      text: 'Ödeme alındı: Mehmet Demir - 5000 TL',
      time: '1 saat önce',
      type: 'payment'
    },
    {
      text: 'Yeni duyuru yayınlandı: Veli Toplantısı',
      time: '2 saat önce',
      type: 'announcement'
    },
    {
      text: 'Yemek menüsü güncellendi',
      time: '3 saat önce',
      type: 'update'
    }
  ];

  const quickStats = [
    { label: 'Bu Ay Toplanan', value: '₺125,000', icon: DollarSign, color: 'text-green-600' },
    { label: 'Bekleyen Ödeme', value: '₺35,000', icon: Clock, color: 'text-orange-600' },
    { label: 'Bu Hafta Devamsız', value: '3', icon: Calendar, color: 'text-red-600' },
    { label: 'Ortalama Katılım', value: '%94', icon: TrendingUp, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Genel Bakış</h2>
        <p className="text-gray-600">Kurumunuzun anlık durumunu görebilirsiniz</p>
      </div>

      {/* Ana İstatistikler - Gradient Kartlar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="animate-slideUp" style={{ animationDelay: `${index * 100}ms` }}>
            <StatCard {...stat} />
          </div>
        ))}
      </div>

      {/* Hızlı İstatistikler */}
      <Card className="animate-slideUp" style={{ animationDelay: '300ms' }}>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Hızlı İstatistikler</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className={`p-2 rounded-lg bg-white shadow-sm ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-xs text-gray-600">{stat.label}</p>
                  <p className="text-xl font-bold text-gray-800">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Son Aktiviteler */}
      <Card className="animate-slideUp" style={{ animationDelay: '400ms' }}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">Son Aktiviteler</h3>
          <button className="text-sm text-purple-600 hover:text-purple-700 font-medium">
            Tümünü Gör →
          </button>
        </div>
        <div className="space-y-3">
          {recentActivities.map((activity, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors border border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'payment' ? 'bg-green-500' :
                  activity.type === 'user' ? 'bg-blue-500' :
                  activity.type === 'announcement' ? 'bg-purple-500' :
                  'bg-gray-500'
                }`} />
                <p className="text-gray-700 font-medium">{activity.text}</p>
              </div>
              <span className="text-sm text-gray-500 whitespace-nowrap ml-4">{activity.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default DashboardHome;

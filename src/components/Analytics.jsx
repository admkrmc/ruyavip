import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Users,
  CreditCard,
  BookOpen,
  Brain,
  Download,
  Filter,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  Activity,
  Lightbulb,
  Target,
  Award
} from 'lucide-react';
import { Card, StatCard } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Input';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedMetric, setSelectedMetric] = useState('overview');

  // Mock data - Gerçek uygulamada API'den gelecek
  const overviewStats = {
    totalStudents: 145,
    studentGrowth: 8.5,
    attendanceRate: 94.2,
    attendanceTrend: 2.1,
    paymentRate: 89.7,
    paymentTrend: -1.3,
    avgPerformance: 87.5,
    performanceTrend: 5.2
  };

  const attendanceData = [
    { month: 'Ağustos', rate: 92, students: 138 },
    { month: 'Eylül', rate: 91.5, students: 141 },
    { month: 'Ekim', rate: 93, students: 143 },
    { month: 'Kasım', rate: 92.8, students: 144 },
    { month: 'Aralık', rate: 94.2, students: 145 }
  ];

  const paymentData = [
    { month: 'Ağustos', collected: 425000, expected: 450000, rate: 94.4 },
    { month: 'Eylül', collected: 438000, expected: 480000, rate: 91.2 },
    { month: 'Ekim', collected: 445000, expected: 490000, rate: 90.8 },
    { month: 'Kasım', collected: 452000, expected: 500000, rate: 90.4 },
    { month: 'Aralık', collected: 440000, expected: 490000, rate: 89.7 }
  ];

  const classPerformance = [
    { class: 'Papatyalar', attendance: 96, behavior: 92, participation: 88, overall: 92 },
    { class: 'Güller', attendance: 94, behavior: 90, participation: 86, overall: 90 },
    { class: 'Laleler', attendance: 93, behavior: 88, participation: 85, overall: 88.7 },
    { class: 'Menekşeler', attendance: 92, behavior: 85, participation: 82, overall: 86.3 }
  ];

  const aiInsights = [
    {
      id: 1,
      type: 'warning',
      category: 'Ödeme',
      title: 'Ödeme Tahsilat Oranı Düşüyor',
      description: 'Son 3 ayda ödeme tahsilat oranı %4.7 düştü. Hatırlatma sistemini aktifleştirmeniz önerilir.',
      priority: 'high',
      action: 'Hatırlatma Gönder',
      impact: 'Aylık ~50.000 TL ek tahsilat potansiyeli'
    },
    {
      id: 2,
      type: 'success',
      category: 'Devam',
      title: 'Devam Oranı Hedefin Üzerinde',
      description: 'Aralık ayı devam oranı %94.2 ile hedeflenen %90\'ın üzerinde. Mükemmel performans!',
      priority: 'low',
      action: null,
      impact: 'Veli memnuniyeti yüksek'
    },
    {
      id: 3,
      type: 'info',
      category: 'Öğrenci',
      title: 'Papatyalar Sınıfı Yüksek Performans',
      description: 'Papatyalar sınıfı tüm metriklerde okul ortalamasının %5 üzerinde performans gösteriyor.',
      priority: 'medium',
      action: 'Örnek Olarak Paylaş',
      impact: 'Diğer sınıflar için model oluşturabilir'
    },
    {
      id: 4,
      type: 'warning',
      category: 'Aktivite',
      title: 'Mesajlaşma Aktivitesi Düşük',
      description: 'Velilerle mesajlaşma aktivitesi son hafta %35 azaldı. İletişim stratejinizi gözden geçirin.',
      priority: 'medium',
      action: 'İletişim Planı Oluştur',
      impact: 'Veli bağlılığı artışı'
    },
    {
      id: 5,
      type: 'success',
      category: 'Gelir',
      title: 'Kayıt Trendi Pozitif',
      description: 'Son 5 ayda %8.5 öğrenci artışı kaydedildi. Mevcut trend devam ederse Ocak\'ta kapasite dolacak.',
      priority: 'high',
      action: 'Kapasite Planlaması Yap',
      impact: 'Gelir artışı ve kapasite optimizasyonu'
    },
    {
      id: 6,
      type: 'info',
      category: 'Operasyon',
      title: 'İlaç Takibi Düzenli',
      description: 'İlaç verme zamanında uyum oranı %98. Sağlık protokolleriniz mükemmel uygulanıyor.',
      priority: 'low',
      action: null,
      impact: 'Veli güveni yüksek'
    }
  ];

  const getTrendIcon = (trend) => {
    return trend > 0 ? (
      <TrendingUp className="w-5 h-5 text-green-600" />
    ) : (
      <TrendingDown className="w-5 h-5 text-red-600" />
    );
  };

  const getTrendColor = (trend) => {
    return trend > 0 ? 'text-green-600' : 'text-red-600';
  };

  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'warning':
        return <AlertCircle className="w-6 h-6 text-orange-600" />;
      case 'info':
        return <Lightbulb className="w-6 h-6 text-blue-600" />;
      default:
        return <Brain className="w-6 h-6 text-purple-600" />;
    }
  };

  const getInsightBg = (type) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-purple-50 border-purple-200';
    }
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { bg: 'bg-red-100', text: 'text-red-700', label: 'Yüksek Öncelik' },
      medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Orta Öncelik' },
      low: { bg: 'bg-gray-100', text: 'text-gray-700', label: 'Düşük Öncelik' }
    };
    const badge = badges[priority];
    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${badge.bg} ${badge.text}`}>
        {badge.label}
      </span>
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık ve Filtreler */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-600" />
            Analytics & AI
          </h1>
          <p className="text-gray-600 mt-1">Analitik raporlar ve yapay zeka önerileri</p>
        </div>
        <div className="flex gap-3">
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="week">Son 7 Gün</option>
            <option value="month">Son Ay</option>
            <option value="quarter">Son 3 Ay</option>
            <option value="year">Son Yıl</option>
          </Select>
          <Button icon={Download}>
            Rapor İndir
          </Button>
        </div>
      </div>

      {/* Genel Bakış İstatistikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Toplam Öğrenci"
          value={overviewStats.totalStudents}
          icon={Users}
          gradient="from-purple-600 to-pink-600"
          trend={{ value: overviewStats.studentGrowth, isPositive: true }}
        />
        <StatCard
          title="Devam Oranı"
          value={`${overviewStats.attendanceRate}%`}
          icon={CheckCircle}
          gradient="from-green-600 to-emerald-600"
          trend={{ value: overviewStats.attendanceTrend, isPositive: overviewStats.attendanceTrend > 0 }}
        />
        <StatCard
          title="Tahsilat Oranı"
          value={`${overviewStats.paymentRate}%`}
          icon={CreditCard}
          gradient="from-blue-600 to-cyan-600"
          trend={{ value: Math.abs(overviewStats.paymentTrend), isPositive: overviewStats.paymentTrend > 0 }}
        />
        <StatCard
          title="Genel Performans"
          value={`${overviewStats.avgPerformance}%`}
          icon={Award}
          gradient="from-orange-600 to-red-600"
          trend={{ value: overviewStats.performanceTrend, isPositive: true }}
        />
      </div>

      {/* Ana Metrik Seçimi */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {[
          { id: 'overview', label: 'Genel Bakış', icon: Activity },
          { id: 'attendance', label: 'Devam Analizi', icon: Users },
          { id: 'payment', label: 'Ödeme Analizi', icon: CreditCard },
          { id: 'performance', label: 'Performans', icon: Target },
          { id: 'ai', label: 'AI Önerileri', icon: Brain }
        ].map(metric => (
          <button
            key={metric.id}
            onClick={() => setSelectedMetric(metric.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
              selectedMetric === metric.id
                ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          >
            <metric.icon className="w-5 h-5" />
            {metric.label}
          </button>
        ))}
      </div>

      {/* Devam Analizi */}
      {(selectedMetric === 'overview' || selectedMetric === 'attendance') && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Users className="w-6 h-6 text-purple-600" />
              Devam Trendi (5 Aylık)
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Ortalama:</span>
              <span className="font-bold text-green-600">92.7%</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="space-y-4">
            {attendanceData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 w-24">{data.month}</span>
                  <span className="text-gray-600">{data.students} öğrenci</span>
                  <span className="font-bold text-purple-600 w-16 text-right">{data.rate}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${data.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900">92.7%</div>
                <div className="text-sm text-gray-600">Ortalama Devam</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">94.2%</div>
                <div className="text-sm text-gray-600">En Yüksek (Aralık)</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">91.5%</div>
                <div className="text-sm text-gray-600">En Düşük (Eylül)</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Ödeme Analizi */}
      {(selectedMetric === 'overview' || selectedMetric === 'payment') && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <CreditCard className="w-6 h-6 text-blue-600" />
              Ödeme & Tahsilat Analizi
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>Toplam Tahsilat:</span>
              <span className="font-bold text-blue-600">2.200.000 TL</span>
            </div>
          </div>

          {/* Payment Chart */}
          <div className="space-y-4">
            {paymentData.map((data, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700 w-24">{data.month}</span>
                  <div className="flex gap-4">
                    <span className="text-green-600">{(data.collected / 1000).toFixed(0)}K TL</span>
                    <span className="text-gray-400">/ {(data.expected / 1000).toFixed(0)}K TL</span>
                  </div>
                  <span className="font-bold text-blue-600 w-16 text-right">{data.rate}%</span>
                </div>
                <div className="relative w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${data.rate}%` }}
                  />
                  <div
                    className="absolute top-0 right-0 bg-red-200 h-3 rounded-r-full"
                    style={{ width: `${100 - data.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">91.3%</div>
                <div className="text-sm text-gray-600">Ort. Tahsilat</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">2.200K</div>
                <div className="text-sm text-gray-600">Toplam Tahsilat</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">210K</div>
                <div className="text-sm text-gray-600">Bekleyen</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-red-600">-4.7%</div>
                <div className="text-sm text-gray-600">Trend</div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Sınıf Performans Karşılaştırması */}
      {(selectedMetric === 'overview' || selectedMetric === 'performance') && (
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Target className="w-6 h-6 text-orange-600" />
              Sınıf Performans Karşılaştırması
            </h2>
            <span className="text-sm text-gray-600">Tüm metrikler (0-100)</span>
          </div>

          <div className="space-y-6">
            {classPerformance.map((classData, index) => (
              <div key={index}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{classData.class}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Genel:</span>
                    <span className="text-lg font-bold text-purple-600">{classData.overall}</span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-2">
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Devam</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${classData.attendance}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1">{classData.attendance}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Davranış</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: `${classData.behavior}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1">{classData.behavior}%</div>
                  </div>
                  <div>
                    <div className="text-xs text-gray-600 mb-1">Katılım</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-purple-600 h-2 rounded-full"
                        style={{ width: `${classData.participation}%` }}
                      />
                    </div>
                    <div className="text-xs font-medium text-gray-700 mt-1">{classData.participation}%</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* AI Önerileri ve İçgörüler */}
      {(selectedMetric === 'overview' || selectedMetric === 'ai') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Brain className="w-6 h-6 text-purple-600" />
              AI Önerileri ve İçgörüler
            </h2>
            <span className="text-sm text-gray-600">{aiInsights.length} öneri</span>
          </div>

          {aiInsights.map((insight, index) => (
            <Card key={insight.id} className={`border ${getInsightBg(insight.type)}`} delay={index * 50}>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 mt-1">
                  {getInsightIcon(insight.type)}
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase">
                          {insight.category}
                        </span>
                        {getPriorityBadge(insight.priority)}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">{insight.title}</h3>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-3">{insight.description}</p>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                      <span className="font-medium">Potansiyel Etki:</span> {insight.impact}
                    </div>

                    {insight.action && (
                      <Button variant="outline" size="sm" icon={ChevronRight}>
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Özet Rapor */}
      {selectedMetric === 'overview' && (
        <Card className="bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center flex-shrink-0">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-2">AI Özet Raporu</h3>
              <p className="text-gray-700 mb-4">
                Genel olarak işletmeniz sağlıklı bir büyüme gösteriyor. <strong>%94.2 devam oranı</strong> ile hedeflerinizin üzerindesiniz.
                Ancak <strong>ödeme tahsilat oranında</strong> son 3 ayda düşüş gözlemlendi. Hatırlatma sistemini aktifleştirerek
                aylık <strong>~50.000 TL</strong> ek tahsilat sağlayabilirsiniz. Papatyalar sınıfının yüksek performansı
                diğer sınıflar için model oluşturabilir.
              </p>
              <div className="flex gap-3">
                <Button variant="outline" size="sm" icon={Download}>
                  Detaylı Rapor İndir
                </Button>
                <Button size="sm" icon={Lightbulb}>
                  Tüm Önerileri Gör
                </Button>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Analytics;

import React, { useState } from 'react';
import { Bus, Plus, MapPin, User, Phone, Clock, CheckCircle, AlertTriangle, Navigation, Users, Eye, Edit2, X, Route } from 'lucide-react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Input, Select, TextArea } from './ui/Input';
import { Modal } from './ui/Modal';

const ShuttleTracking = () => {
  const [routes, setRoutes] = useState([
    {
      id: 1,
      name: 'Rota 1 - Merkez',
      driverName: 'Mehmet Yılmaz',
      driverPhone: '0532 111 2233',
      vehiclePlate: '34 ABC 123',
      capacity: 15,
      students: [
        { id: 1, name: 'Ayşe Yılmaz', address: 'Atatürk Cad. No:5', boardingTime: '07:30', departureTime: '16:30', status: 'active' },
        { id: 2, name: 'Mehmet Demir', address: 'İstiklal Sok. No:12', boardingTime: '07:45', departureTime: '16:45', status: 'active' },
        { id: 3, name: 'Zeynep Kaya', address: 'Cumhuriyet Mah. No:8', boardingTime: '08:00', departureTime: '17:00', status: 'active' }
      ],
      stops: [
        { id: 1, name: 'Atatürk Caddesi', time: '07:30', lat: 41.0082, lng: 28.9784 },
        { id: 2, name: 'İstiklal Sokak', time: '07:45', lat: 41.0112, lng: 28.9820 },
        { id: 3, name: 'Cumhuriyet Mahallesi', time: '08:00', lat: 41.0140, lng: 28.9860 },
        { id: 4, name: 'Okul', time: '08:15', lat: 41.0180, lng: 28.9900 }
      ],
      morningRoute: {
        status: 'completed',
        startTime: '07:15',
        endTime: '08:20',
        boardedStudents: 3,
        totalStudents: 3
      },
      eveningRoute: {
        status: 'pending',
        startTime: '16:15',
        endTime: null,
        boardedStudents: 0,
        totalStudents: 3
      },
      active: true
    },
    {
      id: 2,
      name: 'Rota 2 - Batı',
      driverName: 'Ali Demir',
      driverPhone: '0533 444 5566',
      vehiclePlate: '34 XYZ 789',
      capacity: 12,
      students: [
        { id: 4, name: 'Ali Çelik', address: 'Yeni Mah. No:45', boardingTime: '07:20', departureTime: '16:20', status: 'active' },
        { id: 5, name: 'Fatma Arslan', address: 'Gül Sok. No:7', boardingTime: '07:35', departureTime: '16:35', status: 'active' }
      ],
      stops: [
        { id: 1, name: 'Yeni Mahalle', time: '07:20', lat: 40.9980, lng: 28.9700 },
        { id: 2, name: 'Gül Sokak', time: '07:35', lat: 41.0020, lng: 28.9740 },
        { id: 3, name: 'Okul', time: '07:50', lat: 41.0180, lng: 28.9900 }
      ],
      morningRoute: {
        status: 'completed',
        startTime: '07:05',
        endTime: '07:55',
        boardedStudents: 2,
        totalStudents: 2
      },
      eveningRoute: {
        status: 'pending',
        startTime: '16:05',
        endTime: null,
        boardedStudents: 0,
        totalStudents: 2
      },
      active: true
    }
  ]);

  const [logs, setLogs] = useState([
    {
      id: 1,
      routeId: 1,
      routeName: 'Rota 1 - Merkez',
      studentId: 1,
      studentName: 'Ayşe Yılmaz',
      type: 'boarding',
      time: '2025-12-09 07:32',
      location: 'Atatürk Caddesi',
      loggedBy: 'Mehmet Yılmaz',
      note: ''
    },
    {
      id: 2,
      routeId: 1,
      routeName: 'Rota 1 - Merkez',
      studentId: 2,
      studentName: 'Mehmet Demir',
      type: 'boarding',
      time: '2025-12-09 07:47',
      location: 'İstiklal Sokak',
      loggedBy: 'Mehmet Yılmaz',
      note: ''
    }
  ]);

  const [students] = useState([
    { id: 1, name: 'Ayşe Yılmaz', class: 'Papatyalar', address: 'Atatürk Cad. No:5' },
    { id: 2, name: 'Mehmet Demir', class: 'Güller', address: 'İstiklal Sok. No:12' },
    { id: 3, name: 'Zeynep Kaya', class: 'Laleler', address: 'Cumhuriyet Mah. No:8' },
    { id: 4, name: 'Ali Çelik', class: 'Papatyalar', address: 'Yeni Mah. No:45' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showLogModal, setShowLogModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [routeFormData, setRouteFormData] = useState({
    name: '',
    driverName: '',
    driverPhone: '',
    vehiclePlate: '',
    capacity: 0,
    students: []
  });

  const [logFormData, setLogFormData] = useState({
    routeId: null,
    studentId: '',
    type: 'boarding',
    location: '',
    note: ''
  });

  const filteredRoutes = routes.filter(route => {
    const matchesSearch = route.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         route.driverName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' ||
                         (filterStatus === 'active' && route.active) ||
                         (filterStatus === 'inactive' && !route.active);
    return matchesSearch && matchesStatus;
  });

  const stats = {
    totalRoutes: routes.filter(r => r.active).length,
    totalStudents: routes.reduce((sum, r) => sum + r.students.length, 0),
    activeRoutes: routes.filter(r => r.morningRoute.status === 'in-progress' || r.eveningRoute.status === 'in-progress').length,
    completedToday: routes.filter(r => r.morningRoute.status === 'completed' && r.eveningRoute.status === 'completed').length
  };

  const handleNewRoute = () => {
    setRouteFormData({
      name: '',
      driverName: '',
      driverPhone: '',
      vehiclePlate: '',
      capacity: 0,
      students: []
    });
    setShowRouteModal(true);
  };

  const handleStudentToggle = (studentId) => {
    setRouteFormData(prev => ({
      ...prev,
      students: prev.students.includes(studentId)
        ? prev.students.filter(id => id !== studentId)
        : [...prev.students, studentId]
    }));
  };

  const handleSaveRoute = () => {
    if (!routeFormData.name || !routeFormData.driverName) {
      alert('Lütfen rota adı ve şoför adı girin');
      return;
    }

    const newRoute = {
      id: Date.now(),
      name: routeFormData.name,
      driverName: routeFormData.driverName,
      driverPhone: routeFormData.driverPhone,
      vehiclePlate: routeFormData.vehiclePlate,
      capacity: routeFormData.capacity,
      students: students.filter(s => routeFormData.students.includes(s.id)).map(s => ({
        id: s.id,
        name: s.name,
        address: s.address,
        boardingTime: '07:30',
        departureTime: '16:30',
        status: 'active'
      })),
      stops: [],
      morningRoute: {
        status: 'pending',
        startTime: null,
        endTime: null,
        boardedStudents: 0,
        totalStudents: routeFormData.students.length
      },
      eveningRoute: {
        status: 'pending',
        startTime: null,
        endTime: null,
        boardedStudents: 0,
        totalStudents: routeFormData.students.length
      },
      active: true
    };

    setRoutes([newRoute, ...routes]);
    setShowRouteModal(false);
    alert('Servis rotası oluşturuldu!');
  };

  const handleLogBoarding = (route) => {
    setSelectedRoute(route);
    setLogFormData({
      routeId: route.id,
      studentId: '',
      type: 'boarding',
      location: '',
      note: ''
    });
    setShowLogModal(true);
  };

  const handleSaveLog = () => {
    const student = students.find(s => s.id === parseInt(logFormData.studentId));
    if (!student) {
      alert('Lütfen bir öğrenci seçin');
      return;
    }

    const newLog = {
      id: Date.now(),
      routeId: logFormData.routeId,
      routeName: selectedRoute.name,
      studentId: student.id,
      studentName: student.name,
      type: logFormData.type,
      time: new Date().toISOString().replace('T', ' ').slice(0, 16),
      location: logFormData.location,
      loggedBy: selectedRoute.driverName,
      note: logFormData.note
    };

    setLogs([newLog, ...logs]);
    setShowLogModal(false);
    alert(`Öğrenci ${logFormData.type === 'boarding' ? 'biniş' : 'iniş'} kaydı yapıldı!`);
  };

  const handleViewDetails = (route) => {
    setSelectedRoute(route);
    setShowDetailModal(true);
  };

  const handleViewMap = (route) => {
    setSelectedRoute(route);
    setShowMapModal(true);
  };

  const getRouteStatus = (route) => {
    const now = new Date().getHours();

    if (now >= 7 && now < 9) {
      // Sabah servisi
      if (route.morningRoute.status === 'completed') {
        return { label: 'Sabah Tamamlandı', color: 'green' };
      } else if (route.morningRoute.status === 'in-progress') {
        return { label: 'Yolda (Sabah)', color: 'blue' };
      } else {
        return { label: 'Sabah Bekliyor', color: 'yellow' };
      }
    } else if (now >= 16 && now < 18) {
      // Akşam servisi
      if (route.eveningRoute.status === 'completed') {
        return { label: 'Akşam Tamamlandı', color: 'green' };
      } else if (route.eveningRoute.status === 'in-progress') {
        return { label: 'Yolda (Akşam)', color: 'blue' };
      } else {
        return { label: 'Akşam Bekliyor', color: 'yellow' };
      }
    } else {
      if (route.morningRoute.status === 'completed' && route.eveningRoute.status === 'completed') {
        return { label: 'Tamamlandı', color: 'green' };
      }
      return { label: 'Bekleniyor', color: 'gray' };
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Başlık */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Servis Takibi</h2>
          <p className="text-gray-600">Okul servisi rotaları ve öğrenci takibi</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={handleNewRoute}>
          Rota Ekle
        </Button>
      </div>

      {/* İstatistikler */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Toplam Rota</p>
              <p className="text-3xl font-bold text-blue-700">{stats.totalRoutes}</p>
            </div>
            <div className="p-3 bg-blue-200 rounded-lg">
              <Route size={24} className="text-blue-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Servis Öğrencisi</p>
              <p className="text-3xl font-bold text-purple-700">{stats.totalStudents}</p>
            </div>
            <div className="p-3 bg-purple-200 rounded-lg">
              <Users size={24} className="text-purple-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Aktif Sefer</p>
              <p className="text-3xl font-bold text-green-700">{stats.activeRoutes}</p>
            </div>
            <div className="p-3 bg-green-200 rounded-lg">
              <Bus size={24} className="text-green-700" />
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Bugün Tamamlandı</p>
              <p className="text-3xl font-bold text-orange-700">{stats.completedToday}</p>
            </div>
            <div className="p-3 bg-orange-200 rounded-lg">
              <CheckCircle size={24} className="text-orange-700" />
            </div>
          </div>
        </Card>
      </div>

      {/* Filtreler */}
      <Card>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            placeholder="Rota veya şoför ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            icon={Bus}
          />
          <Select
            placeholder="Durum"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            options={[
              { value: 'all', label: 'Tümü' },
              { value: 'active', label: 'Aktif' },
              { value: 'inactive', label: 'Pasif' }
            ]}
          />
          <Button variant="outline" onClick={() => { setSearchTerm(''); setFilterStatus('all'); }}>
            Filtreleri Temizle
          </Button>
        </div>
      </Card>

      {/* Rota Listesi */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRoutes.map((route, index) => {
          const status = getRouteStatus(route);
          return (
            <Card
              key={route.id}
              hover
              className="animate-scaleIn"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 flex items-center justify-center text-white">
                      <Bus size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{route.name}</h3>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <User size={14} />
                          {route.driverName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Phone size={14} />
                          {route.driverPhone}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-3 py-1 bg-${status.color}-100 text-${status.color}-700 rounded-lg text-sm font-medium`}>
                      {status.label}
                    </span>
                  </div>
                </div>

                {/* Araç Bilgileri */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <p className="text-xs text-gray-600 mb-1">Plaka</p>
                    <p className="font-semibold text-gray-800">{route.vehiclePlate}</p>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-xs text-blue-600 mb-1">Kapasite</p>
                    <p className="font-semibold text-gray-800">{route.students.length} / {route.capacity}</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-xs text-green-600 mb-1">Durak Sayısı</p>
                    <p className="font-semibold text-gray-800">{route.stops.length}</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-xs text-purple-600 mb-1">Öğrenci</p>
                    <p className="font-semibold text-gray-800">{route.students.length}</p>
                  </div>
                </div>

                {/* Sabah ve Akşam Sefer Durumu */}
                <div className="grid grid-cols-2 gap-3">
                  <div className={`p-3 rounded-lg border-2 ${
                    route.morningRoute.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : route.morningRoute.status === 'in-progress'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">☀️ Sabah Servisi</p>
                      {route.morningRoute.status === 'completed' && <CheckCircle size={18} className="text-green-600" />}
                    </div>
                    <p className="text-xs text-gray-600">
                      {route.morningRoute.startTime} - {route.morningRoute.endTime || '---'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      Binen: {route.morningRoute.boardedStudents} / {route.morningRoute.totalStudents}
                    </p>
                  </div>

                  <div className={`p-3 rounded-lg border-2 ${
                    route.eveningRoute.status === 'completed'
                      ? 'bg-green-50 border-green-200'
                      : route.eveningRoute.status === 'in-progress'
                      ? 'bg-blue-50 border-blue-200'
                      : 'bg-gray-50 border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold text-gray-700">🌙 Akşam Servisi</p>
                      {route.eveningRoute.status === 'completed' && <CheckCircle size={18} className="text-green-600" />}
                    </div>
                    <p className="text-xs text-gray-600">
                      {route.eveningRoute.startTime || '---'} - {route.eveningRoute.endTime || '---'}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      İnen: {route.eveningRoute.boardedStudents} / {route.eveningRoute.totalStudents}
                    </p>
                  </div>
                </div>

                {/* Öğrenci Listesi */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Öğrenciler</h4>
                  <div className="flex flex-wrap gap-2">
                    {route.students.slice(0, 5).map((student) => (
                      <span key={student.id} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-medium">
                        {student.name}
                      </span>
                    ))}
                    {route.students.length > 5 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium">
                        +{route.students.length - 5} daha
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2 border-t">
                  <button
                    className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleViewDetails(route)}
                  >
                    <Eye size={16} />
                    Detay
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleLogBoarding(route)}
                  >
                    <CheckCircle size={16} />
                    Biniş/İniş Kaydet
                  </button>
                  <button
                    className="flex-1 px-3 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2"
                    onClick={() => handleViewMap(route)}
                  >
                    <MapPin size={16} />
                    Harita
                  </button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Modal - Yeni Rota */}
      <Modal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        title="Yeni Servis Rotası"
        size="lg"
      >
        <div className="space-y-4">
          <Input
            label="Rota Adı"
            value={routeFormData.name}
            onChange={(e) => setRouteFormData({...routeFormData, name: e.target.value})}
            placeholder="Örn: Rota 1 - Merkez"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Şoför Adı"
              value={routeFormData.driverName}
              onChange={(e) => setRouteFormData({...routeFormData, driverName: e.target.value})}
              placeholder="Ad Soyad"
              required
            />
            <Input
              label="Şoför Telefon"
              value={routeFormData.driverPhone}
              onChange={(e) => setRouteFormData({...routeFormData, driverPhone: e.target.value})}
              placeholder="0532 XXX XX XX"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Araç Plakası"
              value={routeFormData.vehiclePlate}
              onChange={(e) => setRouteFormData({...routeFormData, vehiclePlate: e.target.value})}
              placeholder="34 ABC 123"
              required
            />
            <Input
              label="Kapasite"
              type="number"
              value={routeFormData.capacity}
              onChange={(e) => setRouteFormData({...routeFormData, capacity: parseInt(e.target.value) || 0})}
              placeholder="15"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Öğrenciler (Çoklu seçim yapabilirsiniz)
            </label>
            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
              {students.map(student => (
                <label key={student.id} className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={routeFormData.students.includes(student.id)}
                    onChange={() => handleStudentToggle(student.id)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                  <div className="text-sm">
                    <p className="font-medium">{student.name}</p>
                    <p className="text-xs text-gray-500">{student.address}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button variant="outline" onClick={() => setShowRouteModal(false)}>
              İptal
            </Button>
            <Button variant="primary" onClick={handleSaveRoute}>
              Kaydet
            </Button>
          </div>
        </div>
      </Modal>

      {/* Modal - Detay */}
      {selectedRoute && showDetailModal && (
        <Modal
          isOpen={showDetailModal}
          onClose={() => setShowDetailModal(false)}
          title={`${selectedRoute.name} - Detaylar`}
          size="lg"
        >
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Şoför</p>
                <p className="font-semibold text-gray-800">{selectedRoute.driverName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Telefon</p>
                <p className="font-semibold text-gray-800">{selectedRoute.driverPhone}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Plaka</p>
                <p className="font-semibold text-gray-800">{selectedRoute.vehiclePlate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Kapasite</p>
                <p className="font-semibold text-gray-800">{selectedRoute.students.length} / {selectedRoute.capacity}</p>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Duraklar</h4>
              {selectedRoute.stops.length > 0 ? (
                <div className="space-y-2">
                  {selectedRoute.stops.map((stop, idx) => (
                    <div key={stop.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold text-sm">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="font-medium text-gray-800">{stop.name}</p>
                          <p className="text-xs text-gray-500">Lat: {stop.lat}, Lng: {stop.lng}</p>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{stop.time}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">Durak tanımlanmamış</p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Öğrenciler ({selectedRoute.students.length})</h4>
              <div className="space-y-2">
                {selectedRoute.students.map((student) => (
                  <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.address}</p>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <p>Biniş: {student.boardingTime}</p>
                      <p>İniş: {student.departureTime}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowDetailModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal - Biniş/İniş Kaydı */}
      {showLogModal && selectedRoute && (
        <Modal
          isOpen={showLogModal}
          onClose={() => setShowLogModal(false)}
          title={`${selectedRoute.name} - Biniş/İniş Kaydı`}
          size="md"
        >
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="font-semibold text-gray-800">{selectedRoute.name}</p>
              <p className="text-sm text-gray-600">Şoför: {selectedRoute.driverName}</p>
            </div>

            <Select
              label="Öğrenci"
              value={logFormData.studentId}
              onChange={(e) => setLogFormData({...logFormData, studentId: e.target.value})}
              options={selectedRoute.students.map(s => ({ value: s.id, label: s.name }))}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                İşlem Tipi
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setLogFormData({...logFormData, type: 'boarding'})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    logFormData.type === 'boarding'
                      ? 'border-green-500 bg-green-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🚌</div>
                  <p className="font-medium text-gray-700">Biniş</p>
                </button>
                <button
                  type="button"
                  onClick={() => setLogFormData({...logFormData, type: 'departure'})}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    logFormData.type === 'departure'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <div className="text-3xl mb-2">🏠</div>
                  <p className="font-medium text-gray-700">İniş</p>
                </button>
              </div>
            </div>

            <Input
              label="Konum"
              value={logFormData.location}
              onChange={(e) => setLogFormData({...logFormData, location: e.target.value})}
              placeholder="Durak adı veya adres"
              required
            />

            <TextArea
              label="Not (Opsiyonel)"
              value={logFormData.note}
              onChange={(e) => setLogFormData({...logFormData, note: e.target.value})}
              placeholder="Ek bilgi..."
              rows={2}
            />

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowLogModal(false)}>
                İptal
              </Button>
              <Button variant="primary" onClick={handleSaveLog}>
                Kaydet
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal - Harita (Placeholder) */}
      {showMapModal && selectedRoute && (
        <Modal
          isOpen={showMapModal}
          onClose={() => setShowMapModal(false)}
          title={`${selectedRoute.name} - Canlı Konum`}
          size="xl"
        >
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-8 text-center border-2 border-dashed border-gray-300">
              <MapPin size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-lg font-semibold text-gray-700 mb-2">Google Maps Entegrasyonu</p>
              <p className="text-sm text-gray-600 mb-4">
                Canlı konum takibi için Google Maps API entegrasyonu eklenecek
              </p>
              <div className="space-y-2 text-left max-w-md mx-auto">
                <p className="text-sm text-gray-700"><strong>Özellikler:</strong></p>
                <ul className="text-sm text-gray-600 space-y-1 ml-4">
                  <li>• Gerçek zamanlı servis konumu</li>
                  <li>• Rota haritası ve duraklar</li>
                  <li>• Tahmini varış süreleri</li>
                  <li>• Trafik bilgisi</li>
                </ul>
              </div>
            </div>

            {/* Duraklar Listesi */}
            <div>
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Rota Durakları</h4>
              <div className="space-y-2">
                {selectedRoute.stops.map((stop, idx) => (
                  <div key={stop.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center font-semibold text-sm">
                      {idx + 1}
                    </span>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">{stop.name}</p>
                      <p className="text-xs text-gray-500">Lat: {stop.lat}, Lng: {stop.lng}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-600">{stop.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowMapModal(false)}>
                Kapat
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default ShuttleTracking;

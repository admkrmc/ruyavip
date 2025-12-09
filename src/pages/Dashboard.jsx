import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  LayoutDashboard,
  Bell,
  CreditCard,
  MessageSquare,
  Images,
  CheckCircle,
  UtensilsCrossed,
  FileText,
  Pill,
  UserX,
  Bus,
  Newspaper,
  ClipboardCheck,
  ChevronDown,
  User,
  LogOut,
  Users,
  Building2,
  GraduationCap
} from 'lucide-react';

// Bileşen importları
import DashboardHome from '../components/DashboardHome';
import Announcements from '../components/Announcements';
import Payments from '../components/Payments';
import Messages from '../components/Messages';
import FoodMenu from '../components/FoodMenu';
import StudentManagement from '../components/StudentManagement';
import ParentManagement from '../components/ParentManagement';
import PaymentManagement from '../components/PaymentManagement';
import MessagingSystem from '../components/MessagingSystem';
import Gallery from '../components/Gallery';
import AttendanceManagement from '../components/AttendanceManagement';
import ApprovalSystem from '../components/ApprovalSystem';
import DailyReports from '../components/DailyReports';
import MedicineTracking from '../components/MedicineTracking';
import ComingSoon from '../components/ComingSoon';
import ProfileMenu from '../components/ProfileMenu';
import PasswordModal from '../components/PasswordModal';

const Dashboard = () => {
  const { currentUser, userProfile, currentInstitution, signOut } = useAuth();
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [switchType, setSwitchType] = useState(null);
  const [switchTarget, setSwitchTarget] = useState(null);

  const menuItems = [
    { id: 'dashboard', label: 'Gösterge Paneli', icon: LayoutDashboard },
    { id: 'students', label: 'Öğrenci Yönetimi', icon: GraduationCap },
    { id: 'parents', label: 'Veli Yönetimi', icon: Users },
    { id: 'announcements', label: 'Duyurular', icon: Bell },
    { id: 'payments', label: 'Ödeme Takip', icon: CreditCard },
    { id: 'messages', label: 'Mesajlar', icon: MessageSquare, badge: 5 },
    { id: 'gallery', label: 'Galeri', icon: Images },
    { id: 'approvals', label: 'Onay İzin', icon: CheckCircle },
    { id: 'food-menu', label: 'Yemek Menüsü', icon: UtensilsCrossed },
    { id: 'student-report', label: 'Öğrenci Raporu', icon: FileText },
    { id: 'medicine', label: 'İlaç', icon: Pill },
    { id: 'absence', label: 'Devamsızlık', icon: UserX },
    { id: 'shuttle', label: 'Okul Servisi', icon: Bus },
    { id: 'newsletter', label: 'Veli Bülteni', icon: Newspaper },
    { id: 'daily-evaluation', label: 'Günlük Değerlendirme', icon: ClipboardCheck }
  ];

  const handleMenuClick = (menuId) => {
    setActiveMenu(menuId);
  };

  const handleSwitchRequest = (type, target) => {
    setSwitchType(type);
    setSwitchTarget(target);
    setShowProfileMenu(false);
    setShowPasswordModal(true);
  };

  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <DashboardHome />;
      case 'students':
        return <StudentManagement />;
      case 'parents':
        return <ParentManagement />;
      case 'announcements':
        return <Announcements />;
      case 'payments':
        return <PaymentManagement />;
      case 'messages':
        return <MessagingSystem />;
      case 'gallery':
        return <Gallery />;
      case 'approvals':
        return <ApprovalSystem />;
      case 'absence':
        return <AttendanceManagement />;
      case 'food-menu':
        return <FoodMenu />;
      case 'student-report':
        return <DailyReports />;
      case 'medicine':
        return <MedicineTracking />;
      default:
        return <ComingSoon title={menuItems.find(m => m.id === activeMenu)?.label} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sol Menü */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Rüya VİP
          </h1>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleMenuClick(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg mb-1 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    isActive ? 'bg-white text-purple-600' : 'bg-purple-600 text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Ana İçerik Alanı */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Üst Menü */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6 text-purple-600" />
              <h2 className="text-xl font-semibold text-gray-800">
                {currentInstitution?.name || 'Kurum Seçilmedi'}
              </h2>
            </div>

            {/* Profil Menüsü */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all"
              >
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-800">
                    {userProfile?.firstName} {userProfile?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">{userProfile?.role}</p>
                </div>
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                  {userProfile?.firstName?.[0]}{userProfile?.lastName?.[0]}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>

              {showProfileMenu && (
                <ProfileMenu
                  onClose={() => setShowProfileMenu(false)}
                  onSwitchRequest={handleSwitchRequest}
                  onLogout={signOut}
                />
              )}
            </div>
          </div>
        </header>

        {/* İçerik */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </main>
      </div>

      {/* Şifre Modal */}
      {showPasswordModal && (
        <PasswordModal
          type={switchType}
          target={switchTarget}
          onClose={() => setShowPasswordModal(false)}
          onSuccess={() => {
            setShowPasswordModal(false);
            // Sayfa yenilenecek veya state güncellenecek
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;

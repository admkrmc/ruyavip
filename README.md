# 🌟 Rüya VİP - Veli İletişim Platformu

Okul öncesi eğitim kurumları için geliştirilmiş tam özellikli SaaS yönetim platformu.

> **🚀 Hemen başlamak için:** [QUICKSTART.md](./QUICKSTART.md) dosyasına bakın!
>
> **📖 Detaylı rehberler:**
> - [Firebase Kurulumu](./FIREBASE_SETUP.md) - Adım adım Firebase yapılandırma
> - [DNS Ayarları](./DNS_SETUP.md) - Custom domain (tadpop.site) kurulumu

## ✨ Özellikler

- ✅ Çok kurumlu yapı (bir hesapta birden fazla okul yönetimi)
- ✅ Rol bazlı yetkilendirme (Kurum Yetkilisi, Müdür, Öğretmen, Veli)
- ✅ Güvenli kurum/kullanıcı geçiş sistemi (şifre korumalı)
- ✅ "Beni Hatırla" özelliği
- ✅ Akıllı duyuru sistemi (6 farklı duyuru tipi)
- ✅ Ödeme takip sistemi
- ✅ Mesajlaşma modülü
- ✅ Yemek menüsü yönetimi
- ✅ Dashboard ve analitik

## 🚀 Hızlı Başlangıç

### 1. Firebase Projesi Oluşturma

1. [Firebase Console](https://console.firebase.google.com/) adresine gidin
2. "Add project" butonuna tıklayın
3. Proje adı girin (örn: "ruyavip-prod")
4. Google Analytics'i isteğe bağlı olarak etkinleştirin
5. Projeyi oluşturun

### 2. Firebase Authentication Kurulumu

1. Sol menüden **Build > Authentication** seçin
2. "Get started" butonuna tıklayın
3. "Email/Password" seçeneğini etkinleştirin
4. Kaydedin

### 3. Firestore Database Kurulumu

1. Sol menüden **Build > Firestore Database** seçin
2. "Create database" butonuna tıklayın
3. Lokasyon seçin (örn: europe-west1)
4. "Start in test mode" seçin (daha sonra production kurallarını ekleyeceğiz)
5. "Enable" butonuna tıklayın

### 4. Firebase Storage Kurulumu

1. Sol menüden **Build > Storage** seçin
2. "Get started" butonuna tıklayın
3. Test modunda başlatın
4. "Done" butonuna tıklayın

### 5. Web App Kaydı

1. Firebase Console'da proje ayarlarına gidin (⚙️ Settings > Project settings)
2. "Your apps" bölümünde Web (</>)  ikonuna tıklayın
3. App nickname girin (örn: "Rüya VİP Web")
4. "Register app" butonuna tıklayın
5. Firebase SDK config bilgilerini kopyalayın

### 6. Environment Variables Ayarlama

1. `.env.example` dosyasını `.env` olarak kopyalayın:
   ```bash
   cp .env.example .env
   ```

2. `.env` dosyasını açın ve Firebase config bilgilerini girin:
   ```env
   VITE_FIREBASE_API_KEY=AIza...
   VITE_FIREBASE_AUTH_DOMAIN=ruyavip-prod.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=ruyavip-prod
   VITE_FIREBASE_STORAGE_BUCKET=ruyavip-prod.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
   VITE_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### 7. GitHub Secrets Ayarlama

1. GitHub repository'nize gidin
2. **Settings > Secrets and variables > Actions** menüsüne gidin
3. "New repository secret" butonuna tıklayarak aşağıdaki secret'ları ekleyin:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`

### 8. GitHub Pages Etkinleştirme

1. Repository **Settings > Pages** menüsüne gidin
2. Source: "GitHub Actions" seçin
3. Kaydedin

### 9. Demo Veri Ekleme (Firebase Console)

#### Firestore Collections Oluşturma:

**users** koleksiyonu:
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@ruyavip.com",
  "role": "Kurum Yetkilisi",
  "institutions": [
    {
      "id": "inst1",
      "name": "Gökkuşağı Anaokulu"
    }
  ]
}
```

**institutions** koleksiyonu:
```json
{
  "id": "inst1",
  "name": "Gökkuşağı Anaokulu",
  "studentCount": 45,
  "teacherCount": 12
}
```

#### Authentication Kullanıcısı Ekleme:
1. Firebase Console > Authentication > Users sekmesine gidin
2. "Add user" butonuna tıklayın
3. Email: `admin@ruyavip.com`
4. Password: `123456`
5. "Add user" butonuna tıklayın

## 🔧 Yerel Geliştirme

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat
npm run dev

# Production build
npm run build

# Build'i önizle
npm run preview
```

## 🌐 Custom Domain (tadpop.site) Yapılandırması

### Adım 1: GitHub Pages Custom Domain Ayarı

1. Repository **Settings > Pages** menüsüne gidin
2. "Custom domain" alanına `www.tadpop.site` girin
3. "Save" butonuna tıklayın
4. "Enforce HTTPS" kutucuğunu işaretleyin (DNS ayarları tamamlandıktan sonra)

### Adım 2: DNS Kayıtlarını Güncelleme

Domain sağlayıcınızın (GoDaddy, Namecheap, vb.) DNS yönetim paneline gidin ve aşağıdaki kayıtları ekleyin:

#### A Kayıtları (Root domain için):
```
Type: A
Host: @
Value: 185.199.108.153
TTL: 3600

Type: A
Host: @
Value: 185.199.109.153
TTL: 3600

Type: A
Host: @
Value: 185.199.110.153
TTL: 3600

Type: A
Host: @
Value: 185.199.111.153
TTL: 3600
```

#### CNAME Kaydı (www subdomain için):
```
Type: CNAME
Host: www
Value: admkrmc.github.io
TTL: 3600
```

### Adım 3: DNS Propagation Kontrolü

DNS değişikliklerinin yayılması 24-48 saat sürebilir. Kontrol etmek için:

```bash
# Windows
nslookup www.tadpop.site

# Mac/Linux
dig www.tadpop.site
```

## 📱 Demo Hesaplar

**Admin Girişi:**
- Email: admin@ruyavip.com
- Şifre: 123456

**Kurum/Kullanıcı Geçişi:**
- Şifre: 123456

## 🗂️ Proje Yapısı

```
ruyavip/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD
├── public/
├── src/
│   ├── components/             # React bileşenleri
│   │   ├── Announcements.jsx   # Duyurular modülü
│   │   ├── Payments.jsx        # Ödeme takip
│   │   ├── Messages.jsx        # Mesajlaşma
│   │   ├── FoodMenu.jsx        # Yemek menüsü
│   │   ├── DashboardHome.jsx   # Ana sayfa
│   │   ├── ProfileMenu.jsx     # Profil menüsü
│   │   ├── PasswordModal.jsx   # Şifre modalı
│   │   └── ComingSoon.jsx      # Yakında gelecek sayfalar
│   ├── contexts/
│   │   └── AuthContext.jsx     # Authentication context
│   ├── firebase/
│   │   └── config.js           # Firebase yapılandırması
│   ├── pages/
│   │   ├── Login.jsx           # Login sayfası
│   │   └── Dashboard.jsx       # Ana dashboard
│   ├── App.jsx                 # Ana uygulama
│   ├── main.jsx                # Entry point
│   └── index.css               # Tailwind CSS
├── .env.example                # Environment variables şablonu
├── vite.config.js              # Vite yapılandırması
├── tailwind.config.js          # Tailwind yapılandırması
└── package.json
```

## 🔐 Güvenlik

- Firebase Security Rules'ı production ortamında mutlaka güncelleyin
- Environment variables'ı asla commit etmeyin
- GitHub Secrets kullanarak hassas bilgileri saklayın
- HTTPS'i her zaman etkinleştirin

## 🎯 Roadmap

- [x] Temel UI/UX
- [x] Authentication sistemi
- [x] Dashboard
- [x] Duyuru sistemi
- [x] Ödeme takip
- [x] Mesajlaşma
- [x] Yemek menüsü
- [ ] Galeri modülü
- [ ] İlaç takip
- [ ] Servis takip
- [ ] Mobil uygulama
- [ ] Email/SMS bildirimleri
- [ ] Gelişmiş raporlama

## 📞 Destek

Herhangi bir sorunla karşılaşırsanız:
1. GitHub Issues kullanın
2. [Firebase Docs](https://firebase.google.com/docs) kontrol edin
3. [Vite Docs](https://vitejs.dev) inceleyın

## 📄 Lisans

© 2025 Rüya VİP - Tüm hakları saklıdır

---

**Live URL:** https://admkrmc.github.io/ruyavip/
**Custom Domain:** https://www.tadpop.site (DNS ayarları sonrası)

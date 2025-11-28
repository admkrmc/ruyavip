# 🔥 Firebase Kurulum Rehberi - Rüya VİP

Bu rehber, Rüya VİP platformunu Firebase ile entegre etmek için adım adım yönergeleri içerir.

## 📋 İçindekiler

1. [Firebase Projesi Oluşturma](#1-firebase-projesi-oluşturma)
2. [Authentication Kurulumu](#2-authentication-kurulumu)
3. [Firestore Database Kurulumu](#3-firestore-database-kurulumu)
4. [Firebase Storage Kurulumu](#4-firebase-storage-kurulumu)
5. [Web App Kaydı](#5-web-app-kaydı)
6. [Environment Variables](#6-environment-variables)
7. [GitHub Secrets Yapılandırması](#7-github-secrets-yapılandırması)
8. [Demo Veri Ekleme](#8-demo-veri-ekleme)
9. [Güvenlik Kuralları](#9-güvenlik-kuralları)

---

## 1. Firebase Projesi Oluşturma

### Adımlar:

1. **Firebase Console'a giriş yapın**
   - https://console.firebase.google.com/ adresine gidin
   - Google hesabınızla giriş yapın

2. **Yeni proje oluşturun**
   - "Add project" veya "Proje ekle" butonuna tıklayın
   - Proje adı girin: `ruyavip-production` (veya istediğiniz bir ad)
   - "Continue" butonuna tıklayın

3. **Google Analytics (Opsiyonel)**
   - Google Analytics'i etkinleştirmek istiyorsanız "Enable"
   - İstemiyorsanız devre dışı bırakın
   - "Create project" butonuna tıklayın

4. **Proje hazır olana kadar bekleyin**
   - Yaklaşık 30-60 saniye sürer
   - "Your new project is ready" mesajını gördüğünüzde "Continue"

---

## 2. Authentication Kurulumu

### Adımlar:

1. **Authentication sayfasına gidin**
   - Sol menüden **Build > Authentication** seçin
   - "Get started" butonuna tıklayın

2. **Email/Password provider'ı etkinleştirin**
   - "Sign-in method" sekmesinde
   - "Email/Password" satırına tıklayın
   - "Enable" toggle'ını aktif edin
   - "Save" butonuna tıklayın

3. **Demo kullanıcı oluşturun**
   - "Users" sekmesine gidin
   - "Add user" butonuna tıklayın
   - Email: `admin@ruyavip.com`
   - Password: `123456`
   - "Add user" butonuna tıklayın

---

## 3. Firestore Database Kurulumu

### Adımlar:

1. **Firestore Database sayfasına gidin**
   - Sol menüden **Build > Firestore Database** seçin
   - "Create database" butonuna tıklayın

2. **Lokasyon seçin**
   - Production mode: "Start in production mode" (güvenli)
   - Test mode: "Start in test mode" (geliştirme için)
   - **Önerilen:** Test mode ile başlayın, sonra production kurallarını ekleyin
   - "Next" butonuna tıklayın

3. **Cloud Firestore location seçin**
   - Europe: `europe-west1` (Amsterdam)
   - US: `us-central1` (Iowa)
   - **Önerilen:** `europe-west1` (Türkiye için daha yakın)
   - "Enable" butonuna tıklayın

4. **Database oluşturulana kadar bekleyin**
   - Yaklaşık 1-2 dakika sürer

---

## 4. Firebase Storage Kurulumu

### Adımlar:

1. **Storage sayfasına gidin**
   - Sol menüden **Build > Storage** seçin
   - "Get started" butonuna tıklayın

2. **Security rules seçin**
   - Test mode: "Start in test mode" (geliştirme için)
   - Production mode: "Start in production mode" (güvenli)
   - **Önerilen:** Test mode ile başlayın
   - "Next" butonuna tıklayın

3. **Location seçin**
   - Firestore ile aynı location'ı seçin (örn: `europe-west1`)
   - "Done" butonuna tıklayın

---

## 5. Web App Kaydı

### Adımlar:

1. **Project Settings'e gidin**
   - Sol menüde ayar ikonu (⚙️) > "Project settings"
   - Veya direkt: https://console.firebase.google.com/project/[PROJECT_ID]/settings/general

2. **Web app ekleyin**
   - "Your apps" bölümüne inin
   - Web platform ikonu (</>) butonuna tıklayın

3. **App bilgilerini girin**
   - App nickname: `Rüya VİP Web`
   - Firebase Hosting: İşaretlemeyin (GitHub Pages kullanacağız)
   - "Register app" butonuna tıklayın

4. **Firebase SDK configuration**
   - SDK setup and configuration bölümünde config bilgileri görünecek
   - Bu bilgileri kaydedin (bir sonraki adımda kullanacağız)

**Config örneği:**
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyB...",
  authDomain: "ruyavip-prod.firebaseapp.com",
  projectId: "ruyavip-prod",
  storageBucket: "ruyavip-prod.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abc123def456"
};
```

5. **"Continue to console" butonuna tıklayın**

---

## 6. Environment Variables

### Yerel Geliştirme için .env Dosyası

1. **`.env` dosyası oluşturun** (proje kök dizininde)
   ```bash
   cp .env.example .env
   ```

2. **Firebase config bilgilerini girin**
   ```env
   VITE_FIREBASE_API_KEY=AIzaSyB...
   VITE_FIREBASE_AUTH_DOMAIN=ruyavip-prod.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=ruyavip-prod
   VITE_FIREBASE_STORAGE_BUCKET=ruyavip-prod.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
   VITE_FIREBASE_APP_ID=1:123456789012:web:abc123def456
   ```

3. **`.env` dosyasının `.gitignore`'da olduğundan emin olun**
   - Zaten ekli, kontrol etmeniz yeterli

---

## 7. GitHub Secrets Yapılandırması

### Adımlar:

1. **GitHub repository'nize gidin**
   - https://github.com/admkrmc/ruyavip

2. **Settings > Secrets and variables > Actions**
   - "Settings" sekmesine tıklayın
   - Sol menüden "Secrets and variables" > "Actions"

3. **Her bir Firebase config değeri için secret ekleyin**

   **"New repository secret" butonuna tıklayarak sırayla ekleyin:**

   | Name | Value |
   |------|-------|
   | `VITE_FIREBASE_API_KEY` | `AIzaSyB...` |
   | `VITE_FIREBASE_AUTH_DOMAIN` | `ruyavip-prod.firebaseapp.com` |
   | `VITE_FIREBASE_PROJECT_ID` | `ruyavip-prod` |
   | `VITE_FIREBASE_STORAGE_BUCKET` | `ruyavip-prod.appspot.com` |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | `123456789012` |
   | `VITE_FIREBASE_APP_ID` | `1:123456789012:web:abc123def456` |

4. **Her secret için:**
   - Name alanına yukarıdaki tablodaki ismi girin
   - Secret alanına kendi Firebase config değerinizi girin
   - "Add secret" butonuna tıklayın

---

## 8. Demo Veri Ekleme

### Firestore Collections Oluşturma

#### 8.1. users Collection

1. **Firestore Database'e gidin**
2. **"Start collection" butonuna tıklayın**
3. **Collection ID:** `users`
4. **İlk belgeyi ekleyin:**

**Document ID:** (Firebase Authentication'dan aldığınız User UID'yi kullanın)

Veya "Auto-ID" kullanın ve sonra Authentication UID ile eşleştirin.

**Fields:**
```json
{
  "firstName": "Admin",
  "lastName": "User",
  "email": "admin@ruyavip.com",
  "role": "Kurum Yetkilisi",
  "phone": "+90 555 123 4567",
  "institutions": [
    {
      "id": "inst1",
      "name": "Gökkuşağı Anaokulu"
    },
    {
      "id": "inst2",
      "name": "Güneş Anaokulu"
    }
  ],
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Manuel ekleme adımları:**
- Add field butonuna tıklayın
- Field: `firstName`, Type: `string`, Value: `Admin`
- Add field butonuna tıklayın
- Field: `lastName`, Type: `string`, Value: `User`
- ... (diğer alanlar için tekrarlayın)
- `institutions` için Type: `array` seçin
- Array içine `map` ekleyin

#### 8.2. institutions Collection

1. **"Start collection" butonuna tıklayın**
2. **Collection ID:** `institutions`
3. **Belgeler ekleyin:**

**Document ID:** `inst1`
```json
{
  "id": "inst1",
  "name": "Gökkuşağı Anaokulu",
  "address": "Atatürk Mah. Okul Sok. No:123 İstanbul",
  "phone": "+90 212 555 1234",
  "email": "info@gokkusagi.com",
  "studentCount": 45,
  "teacherCount": 12,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Document ID:** `inst2`
```json
{
  "id": "inst2",
  "name": "Güneş Anaokulu",
  "address": "Cumhuriyet Cad. No:456 İstanbul",
  "phone": "+90 212 555 5678",
  "email": "info@gunes.com",
  "studentCount": 38,
  "teacherCount": 10,
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### 8.3. payments Collection (Demo Data)

**Collection ID:** `payments`

**Document 1:**
```json
{
  "institutionId": "inst1",
  "parentName": "Ayşe Yılmaz",
  "studentName": "Zeynep Yılmaz",
  "amount": "5000",
  "status": "paid",
  "dueDate": "2025-01-15",
  "paidDate": "2025-01-10",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

**Document 2:**
```json
{
  "institutionId": "inst1",
  "parentName": "Mehmet Demir",
  "studentName": "Ali Demir",
  "amount": "5000",
  "status": "unpaid",
  "dueDate": "2025-01-15",
  "createdAt": "2025-01-01T00:00:00.000Z"
}
```

#### 8.4. announcements Collection (Demo Data)

**Collection ID:** `announcements`

**Document 1:**
```json
{
  "institutionId": "inst1",
  "type": "general",
  "title": "Yeni Dönem Başlangıcı",
  "message": "Sevgili velilerimiz, yeni dönemimiz 15 Ocak'ta başlıyor.",
  "createdAt": "2025-01-01T00:00:00.000Z",
  "createdBy": "Admin User"
}
```

---

## 9. Güvenlik Kuralları

### Firestore Security Rules

1. **Firestore Database > Rules** sekmesine gidin
2. **Aşağıdaki kuralları yapıştırın:**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Helper function - kullanıcı authenticated mi?
    function isAuthenticated() {
      return request.auth != null;
    }

    // Helper function - kullanıcı belge sahibi mi?
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }

    // Users collection
    match /users/{userId} {
      // Okuma: Sadece kendi profilini okuyabilir
      allow read: if isOwner(userId);

      // Yazma: Sadece kendi profilini güncelleyebilir
      allow write: if isOwner(userId);
    }

    // Institutions collection
    match /institutions/{institutionId} {
      // Okuma: Authenticate olmuş herkes okuyabilir
      allow read: if isAuthenticated();

      // Yazma: Sadece admin rolündekiler yazabilir
      allow write: if isAuthenticated() &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "Kurum Yetkilisi";
    }

    // Announcements collection
    match /announcements/{announcementId} {
      // Okuma: Authenticate olmuş herkes okuyabilir
      allow read: if isAuthenticated();

      // Yazma: Öğretmen ve admin rolündekiler yazabilir
      allow write: if isAuthenticated();
    }

    // Payments collection
    match /payments/{paymentId} {
      // Okuma: Authenticate olmuş herkes okuyabilir
      allow read: if isAuthenticated();

      // Yazma: Admin ve öğretmenler yazabilir
      allow write: if isAuthenticated();
    }

    // Food Menus collection
    match /foodMenus/{menuId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }

    // Messages collection
    match /messages/{messageId} {
      allow read: if isAuthenticated();
      allow write: if isAuthenticated();
    }
  }
}
```

3. **"Publish" butonuna tıklayın**

### Storage Security Rules

1. **Storage > Rules** sekmesine gidin
2. **Aşağıdaki kuralları yapıştırın:**

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {

    // Images klasörü
    match /images/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.resource.size < 5 * 1024 * 1024  // Max 5MB
        && request.resource.contentType.matches('image/.*');
    }

    // Documents klasörü
    match /documents/{allPaths=**} {
      allow read: if request.auth != null;
      allow write: if request.auth != null
        && request.resource.size < 10 * 1024 * 1024;  // Max 10MB
    }
  }
}
```

3. **"Publish" butonuna tıklayın**

---

## ✅ Kontrol Listesi

Firebase kurulumunuzu tamamladıktan sonra:

- [ ] Firebase projesi oluşturuldu
- [ ] Authentication etkinleştirildi
- [ ] Demo kullanıcı eklendi (`admin@ruyavip.com`)
- [ ] Firestore Database oluşturuldu
- [ ] Demo collections eklendi (users, institutions, payments, announcements)
- [ ] Firebase Storage etkinleştirildi
- [ ] Web app kaydedildi
- [ ] `.env` dosyası oluşturuldu ve config eklendi
- [ ] GitHub Secrets eklendi (6 adet)
- [ ] Firestore Security Rules yapılandırıldı
- [ ] Storage Security Rules yapılandırıldı

---

## 🚀 Test Etme

1. **Yerel olarak test edin:**
   ```bash
   npm run dev
   ```
   - http://localhost:5173 adresine gidin
   - `admin@ruyavip.com` / `123456` ile giriş yapın

2. **GitHub Pages'de test edin:**
   - GitHub Actions workflow'unun tamamlanmasını bekleyin
   - https://admkrmc.github.io/ruyavip/ adresine gidin
   - Giriş yapın ve özellikleri test edin

---

## 🔍 Sorun Giderme

### Login çalışmıyor
- Firebase Authentication etkinleştirildi mi?
- Demo kullanıcı eklendi mi?
- Environment variables doğru mu?
- Console'da hata var mı? (F12)

### Veri görünmüyor
- Firestore collections oluşturuldu mu?
- Security rules doğru mu?
- InstitutionId eşleşiyor mu?

### GitHub Actions hata veriyor
- GitHub Secrets doğru eklendi mi?
- Tüm 6 secret var mı?
- Secret isimleri doğru mu? (VITE_ prefix'i var mı?)

---

## 📞 Destek

- [Firebase Documentation](https://firebase.google.com/docs)
- [GitHub Issues](https://github.com/admkrmc/ruyavip/issues)

---

**Kurulumu tamamladıktan sonra README.md'deki diğer adımlara devam edin!**

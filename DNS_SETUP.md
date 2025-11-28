# 🌐 Custom Domain (tadpop.site) Kurulum Rehberi

Bu rehber, Rüya VİP platformunu **www.tadpop.site** domain'i ile kullanabilmek için gerekli DNS ayarlarını içerir.

---

## 📋 İçindekiler

1. [GitHub Pages Custom Domain Ayarı](#1-github-pages-custom-domain-ayarı)
2. [DNS Kayıtlarını Güncelleme](#2-dns-kayıtlarını-güncelleme)
3. [SSL/HTTPS Etkinleştirme](#3-sslhttps-etkinleştirme)
4. [DNS Propagation Kontrolü](#4-dns-propagation-kontrolü)
5. [Sorun Giderme](#5-sorun-giderme)

---

## 1. GitHub Pages Custom Domain Ayarı

### Adımlar:

1. **GitHub repository'ye gidin**
   - https://github.com/admkrmc/ruyavip

2. **Settings > Pages**
   - Repository sayfasında üst menüden "Settings" sekmesine tıklayın
   - Sol menüden "Pages" seçeneğine tıklayın

3. **Custom domain ayarı**
   - "Custom domain" alanına `www.tadpop.site` yazın
   - "Save" butonuna tıklayın

4. **CNAME dosyası otomatik oluşturulacak**
   - GitHub otomatik olarak repository'ye `CNAME` dosyası ekleyecek
   - Bu dosyayı silmeyin veya değiştirmeyin

---

## 2. DNS Kayıtlarını Güncelleme

### Domain Sağlayıcınıza Giriş Yapın

tadpop.site domain'ini aldığınız servise giriş yapın:
- **GoDaddy**: https://dcc.godaddy.com/manage/
- **Namecheap**: https://ap.www.namecheap.com/domains/list/
- **Cloudflare**: https://dash.cloudflare.com/
- Diğer sağlayıcılar için DNS yönetim paneline gidin

---

### DNS Kayıtlarını Ekleyin

#### ✅ Seçenek 1: www Subdomain (Önerilen)

Sadece `www.tadpop.site` için:

| Type | Host/Name | Value/Points to | TTL |
|------|-----------|-----------------|-----|
| CNAME | www | admkrmc.github.io | 3600 |

**Notlar:**
- Host alanı bazı sağlayıcılarda `www`, bazılarında `www.tadpop.site` olabilir
- TTL değeri 3600 (1 saat) veya Auto olabilir

---

#### ✅ Seçenek 2: Root Domain + www (Tam Kurulum)

Hem `tadpop.site` hem de `www.tadpop.site` için:

**A Kayıtları (Root domain için):**

| Type | Host/Name | Value | TTL |
|------|-----------|-------|-----|
| A | @ | 185.199.108.153 | 3600 |
| A | @ | 185.199.109.153 | 3600 |
| A | @ | 185.199.110.153 | 3600 |
| A | @ | 185.199.111.153 | 3600 |

**CNAME Kaydı (www subdomain için):**

| Type | Host/Name | Value | TTL |
|------|-----------|-------|-----|
| CNAME | www | admkrmc.github.io | 3600 |

**Notlar:**
- `@` sembolü root domain'i temsil eder (tadpop.site)
- 4 A kaydını da eklemeniz gerekir (GitHub Pages sunucuları)
- www CNAME kaydı ile A kayıtları birlikte çalışır

---

### Popüler Sağlayıcılar için Özel Talimatlar

#### GoDaddy

1. **DNS Management** sayfasına gidin
2. Mevcut A ve CNAME kayıtlarını silin veya düzenleyin
3. **Add** butonuna tıklayarak yeni kayıtları ekleyin
4. **Type** dropdown'ından A veya CNAME seçin
5. **Name** alanına @ veya www girin
6. **Value** alanına IP veya domain girin
7. **Save** butonuna tıklayın

#### Namecheap

1. **Advanced DNS** sekmesine gidin
2. **Add New Record** butonuna tıklayın
3. Yukarıdaki tablodaki değerleri girin
4. **Save All Changes** butonuna tıklayın

#### Cloudflare

1. **DNS** sekmesine gidin
2. **Add record** butonuna tıklayın
3. Proxy status'u **DNS only** (gri bulut) seçin
4. Değerleri girin ve **Save** butonuna tıklayın

**Cloudflare için önemli:**
- Proxy (turuncu bulut) kullanırsanız SSL/TLS ayarlarını "Full" yapın
- Firewall kurallarını kontrol edin

---

## 3. SSL/HTTPS Etkinleştirme

### GitHub Pages HTTPS Ayarı

1. **GitHub repository > Settings > Pages**
2. DNS ayarlarının yayılmasını bekleyin (15-60 dakika)
3. "Enforce HTTPS" kutucuğunu işaretleyin

**Notlar:**
- DNS propagation tamamlanmadan HTTPS etkinleştirilemez
- "Enforce HTTPS" seçeneği gri ise DNS henüz yayılmamış demektir
- 24 saat içinde aktif olmazsa DNS kayıtlarını kontrol edin

---

## 4. DNS Propagation Kontrolü

DNS değişikliklerinin dünya çapında yayılması **24-48 saat** sürebilir.

### Kontrol Araçları

#### 1. Command Line (Hızlı Test)

**Windows:**
```bash
nslookup www.tadpop.site
```

**Mac/Linux:**
```bash
dig www.tadpop.site
```

**Beklenen sonuç:**
```
www.tadpop.site     CNAME   admkrmc.github.io
admkrmc.github.io   A       185.199.108.153
```

#### 2. Online Araçlar

- **DNS Checker**: https://dnschecker.org/
  - Domain: `www.tadpop.site` girin
  - Record Type: `A` veya `CNAME` seçin
  - Dünya genelindeki sonuçları görün

- **What's My DNS**: https://www.whatsmydns.net/
  - Benzer şekilde çalışır

- **DNS Propagation Checker**: https://www.dnswatch.info/

---

## 5. Sorun Giderme

### ❌ Sorun: "www.tadpop.site" çalışmıyor

**Çözüm:**
1. DNS kayıtlarını kontrol edin
2. CNAME kaydının doğru olduğundan emin olun: `admkrmc.github.io`
3. 24-48 saat bekleyin (DNS propagation)
4. Tarayıcı cache'ini temizleyin: Ctrl+Shift+Delete

### ❌ Sorun: "tadpop.site" (www olmadan) çalışmıyor

**Çözüm:**
1. A kayıtlarının tümünü eklediğinizden emin olun (4 adet)
2. DNS propagation için bekleyin
3. Domain sağlayıcınızın GitHub Pages'i desteklediğini doğrulayın

### ❌ Sorun: SSL Certificate hatası

**Çözüm:**
1. DNS propagation tamamlanana kadar bekleyin
2. GitHub Pages > "Enforce HTTPS" seçeneğini kaldırıp tekrar ekleyin
3. 24 saat bekleyin

### ❌ Sorun: 404 Not Found

**Çözüm:**
1. `CNAME` dosyasının repository'de olduğundan emin olun
2. GitHub Actions workflow'unun başarılı olduğunu kontrol edin
3. `vite.config.js` içinde `base: '/ruyavip/'` ayarını kontrol edin

### ❌ Sorun: Sayfa yüklenmiyor, boş ekran

**Çözüm:**
1. Tarayıcı Console'u açın (F12)
2. 404 hatası varsa dosya yollarını kontrol edin
3. Firebase config'in doğru olduğundan emin olun
4. GitHub Secrets'ı kontrol edin

---

## 📊 DNS Kayıt Özeti

### Minimum Kurulum (Sadece www)
```
www.tadpop.site  →  CNAME  →  admkrmc.github.io
```

### Tam Kurulum (Root + www)
```
tadpop.site      →  A      →  185.199.108.153
tadpop.site      →  A      →  185.199.109.153
tadpop.site      →  A      →  185.199.110.153
tadpop.site      →  A      →  185.199.111.153
www.tadpop.site  →  CNAME  →  admkrmc.github.io
```

---

## ✅ Kontrol Listesi

- [ ] GitHub Pages'de custom domain ayarlandı (`www.tadpop.site`)
- [ ] DNS sağlayıcısında CNAME kaydı eklendi
- [ ] (Opsiyonel) DNS sağlayıcısında A kayıtları eklendi
- [ ] DNS propagation başladı (15-60 dakika)
- [ ] DNS test edildi (`nslookup` veya online araç)
- [ ] HTTPS etkinleştirildi (DNS propagation sonrası)
- [ ] Site test edildi: https://www.tadpop.site

---

## 🎯 Beklenen Sonuç

Tüm adımları doğru tamamladığınızda:

1. **https://www.tadpop.site** → Rüya VİP login sayfası açılır
2. **https://tadpop.site** → www'ya yönlendirir (A kayıtları eklediyseniz)
3. SSL kilidi görünür (yeşil kilit ikonu)
4. Firebase authentication çalışır
5. Tüm özellikler normal şekilde çalışır

---

## 📞 Destek

Sorun yaşıyorsanız:

1. DNS ayarlarınızı ekran görüntüsü ile kaydedin
2. `nslookup` veya `dig` komut çıktısını alın
3. GitHub Issues'da yeni bir konu açın: https://github.com/admkrmc/ruyavip/issues

---

## 🔗 Faydalı Linkler

- [GitHub Pages Custom Domain Docs](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Pages DNS Verification](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages)
- [DNS Propagation Checker](https://dnschecker.org/)

---

**DNS kurulumunu tamamladıktan sonra Firebase kurulumuna geçin!**

# TCMB Döviz Kurları Chrome Extension

Türkiye Cumhuriyet Merkez Bankası (TCMB) döviz kurlarını gerçek zamanlı olarak takip etmenizi sağlayan, hafif ve kullanıcı dostu bir Chrome tarayıcı eklentisi.

## 🎯 Proje Amacı

Bu eklenti, günlük döviz kuru takibi yapan kullanıcılar için hızlı ve kolay erişim sağlar. TCMB'nin resmi API'sinden veri çekerek, kullanıcıların döviz kurlarını tarayıcıdan ayrılmadan takip etmelerine olanak tanır.

## ✨ Özellikler

### Temel Özellikler
- **Gerçek Zamanlı Veri**: TCMB'nin resmi XML API'sinden anlık döviz kurları
- **Tarih Seçimi**: İstediğiniz tarihin kurlarını görüntüleme imkanı
- **Karşılaştırmalı Görünüm**: Bugünün kurları yanında dünün kurlarını da gösterir
- **Değişim Göstergeleri**: Artış/azalış durumunu görsel olarak gösterir

### Gelişmiş Özellikler
- **Akıllı Filtreleme**: Sadece takip etmek istediğiniz dövizleri seçebilirsiniz
- **Favori Dövizler**: Sık kullandığınız dövizleri favorilere ekleyin, hızlı erişim sağlayın
- **Excel Export**: Döviz kurlarını gerçek Excel formatında (.xls) dışa aktarın
- **Arama Fonksiyonu**: Döviz kodu veya adına göre hızlı arama
- **Popüler Döviz Vurgusu**: USD, EUR, GBP gibi popüler dövizler otomatik olarak öne çıkarılır
- **Dark Mode**: Göz yormayan karanlık tema desteği
- **Çoklu Dil Desteği**: Türkçe ve İngilizce dil seçenekleri
- **Modern Tasarım**: Temiz, minimal ve profesyonel arayüz
- **Hata Yönetimi**: Ağ hatalarında otomatik yeniden deneme mekanizması
- **Kalıcı Ayarlar**: Filtre, favori, tema ve dil tercihleriniz otomatik olarak kaydedilir

### Kullanıcı Deneyimi
- **Hızlı Erişim**: Tek tıkla tüm kurlara erişim
- **Temiz Arayüz**: Karmaşık olmayan, sade tasarım
- **Performans**: Optimize edilmiş kod yapısı ile hızlı yükleme
- **Offline Desteği**: Son yüklenen verileri hatırlama

## 🚀 Kurulum

### Gereksinimler
- Google Chrome tarayıcısı (v88 veya üzeri)
- İnternet bağlantısı (veri çekmek için)

### Adım Adım Kurulum

1. **Projeyi İndirin**
   ```bash
   git clone <repository-url>
   cd cxcxxc
   ```

2. **Chrome'da Geliştirici Modunu Aktifleştirin**
   - Chrome'u açın
   - Adres çubuğuna `chrome://extensions/` yazın
   - Sağ üst köşedeki "Geliştirici modu" toggle'ını açın

3. **Eklentiyi Yükleyin**
   - "Paketlenmemiş uzantı yükle" butonuna tıklayın
   - Proje klasörünü seçin
   - Eklenti otomatik olarak yüklenecektir

4. **İkon Ayarları (Opsiyonel)**
   - `icons` klasörüne aşağıdaki boyutlarda PNG dosyaları ekleyebilirsiniz:
     - `icon16.png` (16x16 px)
     - `icon48.png` (48x48 px)
     - `icon128.png` (128x128 px)
   - İkon eklenmezse Chrome varsayılan ikon kullanır

## 📖 Kullanım Kılavuzu

### Temel Kullanım

1. **Eklentiyi Açma**
   - Tarayıcı araç çubuğundaki eklenti ikonuna tıklayın
   - Popup penceresi açılacaktır

2. **Tarih Seçimi**
   - Header'daki tarih seçici ile istediğiniz tarihi seçin
   - "Bugün" butonu ile hızlıca bugünün kurlarına dönebilirsiniz

3. **Döviz Arama**
   - Arama kutusuna döviz kodu (USD, EUR) veya adı (Dolar, Euro) yazın
   - Sonuçlar anlık olarak filtrelenir

### Gelişmiş Kullanım

1. **Filtreleme**
   - Sağ üstteki ayarlar ikonuna tıklayın
   - Açılan modal'dan görmek istediğiniz dövizleri seçin
   - "Tümünü Seç" / "Tümünü Kaldır" butonları ile hızlı seçim yapın

2. **Favori Dövizler**
   - Her döviz satırının yanındaki yıldız (☆) ikonuna tıklayarak favorilere ekleyin
   - Favori dövizler tabloda en üstte gösterilir ve sarı arka planla vurgulanır
   - Favori dövizleriniz kalıcı olarak kaydedilir

3. **Excel Export**
   - Sağ üstteki indirme (↓) ikonuna tıklayın
   - Mevcut görüntülenen döviz kurları Excel formatında (.xls) indirilir
   - Excel dosyası Microsoft Excel, LibreOffice Calc ve diğer tablo programlarında açılabilir
   - Dosya adı otomatik olarak tarih içerir (örn: tcmb-doviz-kurlari-2024-01-15.xls)
   - Formatlanmış başlıklar ve sayı formatları ile profesyonel görünüm

4. **Karşılaştırma**
   - Her döviz için bugünün kuru büyük, dünün kuru parantez içinde gösterilir
   - Artış durumunda ↑ (yeşil), azalış durumunda ↓ (kırmızı) işareti görünür

5. **Popüler Dövizler**
   - USD, EUR, GBP gibi popüler dövizler mavi arka planla vurgulanır
   - Tabloda otomatik olarak en üstte gösterilir

6. **Dark Mode**
   - Sağ üstteki ay/güneş ikonuna tıklayarak karanlık tema aktif edilir
   - Tema tercihiniz otomatik olarak kaydedilir
   - Göz dostu renkler ve modern gradyanlar

7. **Dil Değiştirme**
   - Sağ üstteki dil butonu (TR/EN) ile Türkçe ve İngilizce arasında geçiş yapın
   - Tüm arayüz metinleri, tablo başlıkları ve mesajlar değişir
   - Excel export dosya isimleri ve içeriği seçili dile göre oluşturulur
   - Dil tercihiniz kalıcı olarak kaydedilir

## 🏗️ Mimari ve Teknik Detaylar

### Teknoloji Stack
- **Manifest Version**: 3 (Chrome Extension)
- **JavaScript**: ES6+ (Vanilla JS, Class-based architecture)
- **CSS**: CSS3 (Modern flexbox/grid layout)
- **API**: TCMB XML API

### Kod Yapısı

Eklenti, SOLID prensiplerine uygun modüler bir yapıda geliştirilmiştir:

```
popup.js
├── StorageService           # Chrome storage abstraction
├── FilterRepository         # Filtre veri yönetimi
├── FavoriteRepository       # Favori veri yönetimi
├── FilterService            # Filtre iş mantığı
├── FavoriteService          # Favori iş mantığı
├── LanguageService          # Çoklu dil yönetimi
├── ThemeService             # Dark mode yönetimi
├── ExportService            # Excel export
├── Currency                 # Döviz domain modeli
├── CurrencyApiService       # TCMB API işlemleri
├── DateFormatter            # Tarih formatlama
├── NumberFormatter          # Sayı formatlama
├── UIManager                # DOM yönetimi
├── CurrencyRenderer         # Tablo render
├── FilterRenderer           # Filtre UI render
├── ModalManager             # Modal yönetimi
└── ExchangeRateApp          # Ana uygulama sınıfı

languages.js
└── LANGUAGES                # TR ve EN dil dosyaları
```

### Önemli Özellikler

- **Modüler Mimari**: Her sınıf tek bir sorumluluğa sahiptir
- **Separation of Concerns**: İş mantığı ve UI ayrılmıştır
- **Error Handling**: Kapsamlı hata yönetimi mekanizması
- **Performance**: Async/await ile optimize edilmiş API çağrıları
- **Maintainability**: Temiz kod prensipleri ile bakımı kolay

### API Entegrasyonu

Eklenti, TCMB'nin resmi XML API'sini kullanır:
- **Bugün**: `https://www.tcmb.gov.tr/kurlar/today.xml`
- **Geçmiş Tarih**: `https://www.tcmb.gov.tr/kurlar/YYYYMM/DDMMYYYY.xml`

API'den gelen veriler parse edilerek kullanıcı dostu bir formatta gösterilir.

## 🔧 Geliştirme

### Proje Yapısı
```
tcmb-kur-extension/
├── manifest.json        # Chrome extension manifest
├── popup.html          # Ana popup arayüzü
├── popup.js            # Ana JavaScript dosyası
├── popup.css           # Stil dosyası
├── languages.js        # Çoklu dil dosyaları (TR, EN)
├── xlsx.min.js         # SheetJS kütüphanesi
├── icons/              # İkon dosyaları (opsiyonel)
└── README.md           # Bu dosya
```

### Geliştirme Notları

- Kod, profesyonel yazılım geliştirme standartlarına uygun yazılmıştır
- SOLID prensipleri ve clean code yaklaşımı benimsenmiştir
- IIFE pattern ile namespace koruması sağlanmıştır
- Class-based architecture ile OOP prensipleri uygulanmıştır

## 📝 Kullanım Senaryoları

### Senaryo 1: Günlük Takip
Kullanıcı her sabah eklentiyi açarak güncel döviz kurlarını kontrol eder. Popüler dövizler otomatik olarak öne çıkarıldığı için hızlıca bilgi alabilir.

### Senaryo 2: Belirli Döviz Takibi
Kullanıcı sadece USD ve EUR'u takip etmek istiyor. Filtreleme özelliği ile sadece bu dövizleri seçer ve tabloda sadece bunlar görünür.

### Senaryo 3: Geçmiş Karşılaştırma
Kullanıcı bir hafta öncesinin kurlarını görmek istiyor. Tarih seçici ile o tarihi seçer ve bugünün kurlarıyla karşılaştırma yapabilir.

### Senaryo 4: Hızlı Arama
Kullanıcı belirli bir dövizi arıyor. Arama kutusuna döviz kodunu yazarak anında sonuca ulaşır.

## 🎨 Tasarım Prensipleri

- **Kurumsal Görünüm**: Profesyonel mavi tonları
- **Okunabilirlik**: Yüksek kontrast ve net tipografi
- **Kullanılabilirlik**: Sezgisel arayüz ve kolay navigasyon
- **Performans**: Minimal DOM manipülasyonu ve optimize render

## ⚠️ Bilinen Sınırlamalar

- Eklenti internet bağlantısı gerektirir
- TCMB API'sinin erişilebilir olması gerekir
- Geçmiş tarih verileri TCMB'nin arşivinde mevcut olmalıdır
- Hafta sonları ve resmi tatillerde güncel veri bulunmayabilir

## 🔮 Gelecek Geliştirmeler

- [ ] Bildirim sistemi (belirlenen eşik değerlerde uyarı)
- [ ] Grafik görünümü (zaman içindeki değişim)
- [x] Favori dövizler (hızlı erişim için)
- [x] Export özelliği (Excel .xlsx)
- [x] Çoklu dil desteği (TR/EN)
- [x] Dark mode
- [ ] Döviz çevirici (calculator)
- [ ] Kur alarm sistemi

## 📄 Lisans

Bu proje kişisel kullanım amaçlıdır. TCMB verileri resmi API üzerinden alınmaktadır.

## 👨‍💻 Geliştirici

**Kadirify**
- GitHub: [https://github.com/kadirify](https://github.com/kadirify)

## 🙏 Teşekkürler

- Türkiye Cumhuriyet Merkez Bankası (TCMB) - Veri sağlayıcısı
- Chrome Extensions API - Platform desteği

---

**Not**: Bu eklenti resmi bir TCMB ürünü değildir. Veriler TCMB'nin resmi API'sinden alınmakta olup, eklenti bağımsız bir geliştirici tarafından oluşturulmuştur.

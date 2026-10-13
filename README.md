# Karadeniz Ağız ve Diş Sağlığı Polikliniği (Samsun Atakum)

Samsun Atakum şubesi için sıfırdan, hiçbir harici kütüphane veya framework (Bootstrap, Tailwind, React, jQuery vb.) kullanılmaksızın, tamamen saf **Vanilla HTML5, CSS3 ve Vanilla JavaScript (ES6+)** ile geliştirilmiş, yayına hazır, modern ve çok sayfalı (multi-page) kurumsal sağlık web sitesi.

---

## 📁 Proje Dosya ve Klasör Yapısı

```text
dişci/
│
├── index.html                           # Ana Sayfa (Hero, Avantajlar, Hizmetler, Süreç, Yorumlar, Blog Özeti)
├── hakkimizda.html                      # Hakkımızda (Hikaye, Misyon/Vizyon, Değerler, Teknoloji, Sayaçlar)
├── hizmetler.html                       # Hizmetlerimiz Genel Kataloğu (8 Tedavi Kartı + Tedavi Öncesi Rehber)
├── doktorlarimiz.html                   # Hekim Kadrosu (4 Uzman Hekim Profili, Eğitim, Biyografi ve Randevu)
├── galeri.html                          # Klinik Galerisi (Önce/Sonra Karşılaştırma Slider'ları + Filtrelenebilir Lightbox)
├── blog.html                            # Ağız ve Diş Sağlığı Blogu (6 Makale Kartı, Kategoriler, Okuma Süreleri)
├── sss.html                             # Sıkça Sorulan Sorular (Kategorili Sekmeler, 14+ Akordeon Soru, FAQPage Schema)
├── randevu.html                         # Çok Adımlı Online Randevu Sihirbazı (Tedavi → Hekim/Zaman → Kişisel → Özet/Onay)
├── iletisim.html                        # İletişim & Ulaşım (Doğrulamalı Form, İletişim Kartları, Google Maps, Çalışma Saatleri)
├── kvkk.html                            # KVKK Aydınlatma Metni & Gizlilik/Çerez Politikası
├── 404.html                             # Özel Tasarımlı 404 Hata Sayfası (Popüler Linkler ve Ana Sayfa Yönlendirmesi)
├── sitemap.xml                          # Arama Motoru Site Haritası (Tüm 22 Sayfa URL'i)
├── robots.txt                           # Web Tarayıcı Yönergeleri
├── README.md                            # Proje Dokümantasyonu ve Placeholder Değiştirme Kılavuzu
│
├── css/
│   └── style.css                        # Ortak CSS Dosyası (Tasarım token'ları, Mobil-first, CSS Değişkenleri, WCAG AA)
│
├── js/
│   └── main.js                          # Ortak JavaScript Dosyası (Sihirbaz, Validasyon, Slider, Lightbox, Akordeon)
│
├── hizmetler/                           # Tedavi Detay Sayfaları (8 Adet Bağımsız Sayfa)
│   ├── implant-tedavisi.html            # İmplant Tedavisi Detayı
│   ├── ortodonti.html                   # Ortodonti & Şeffaf Plak Detayı
│   ├── dis-beyazlatma.html              # Diş Beyazlatma (Bleaching) Detayı
│   ├── gulus-tasarimi.html              # Gülüş Tasarımı (Hollywood Smile) Detayı
│   ├── kanal-tedavisi.html              # Kanal Tedavisi (Endodonti) Detayı
│   ├── cocuk-dis-hekimligi.html         # Çocuk Diş Hekimliği (Pedodonti) Detayı
│   ├── dis-eti-tedavisi.html            # Diş Eti Tedavisi (Periodontoloji) Detayı
│   └── protez-kaplama.html              # Zirkonyum & Porselen Kaplama Detayı
│
└── blog/                                # Blog Makale Sayfaları (400+ Kelimelik Özgün Makaleler)
    ├── dis-fircalama-hatalari.html      # En Sık Yapılan 7 Diş Fırçalama Hatası
    ├── implant-sonrasi-bakim.html       # İmplant Cerrahisi Sonrası İlk 48 Saat ve Bakım
    └── cocuklarda-sut-disi-bakimi.html  # Çocuklarda Süt Dişinin Önemi ve Koruyucu Bakım
```

---

## 🔧 Canlıya Alırken Değiştirilecek Placeholder Bilgiler

Sitede yer alan iletişim, adres ve hekim bilgileri kurumsal placeholder'lar olarak tanımlanmıştır. Sitenizi yayına alırken metin düzenleyicinizde (VS Code vb.) **Tüm Dosyalarda Bul ve Değiştir (Find and Replace in Files)** özelliğini kullanarak aşağıdaki değerleri gerçek klinik bilgilerinizle tek seferde güncelleyebilirsiniz:

| Alan Tanımı | Mevcut Placeholder Değer | Değiştirilecek Gerçek Bilgi | Bulunduğu Yerler |
| :--- | :--- | :--- | :--- |
| **Klinik Adı** | `Karadeniz Ağız ve Diş Sağlığı Polikliniği` | Gerçek Poliklinik Ünvanınız | Tüm HTML dosyaları (Header, Footer, Başlıklar) |
| **Şube Adı** | `Samsun Atakum Şubesi` | Şubeniz veya İlçe/İl | Logo altı, meta tag'ler, iletişim kartları |
| **Sabit Telefon** | `0 (362) 555 01 23` (`+903625550123`) | Gerçek Klinik Santral Telefonu | Topbar, Footer, İletişim, Mobil Çubuk (`tel:`) |
| **WhatsApp Numarası**| `0 (542) 555 01 23` (`905425550123`) | Gerçek WhatsApp İşletme Hattı | CTA butonları, İletişim kartı, Mobil Çubuk |
| **Genel E-Posta** | `bilgi@karadenizdis.com` | Gerçek Kurumsal E-posta | Topbar, Footer, İletişim sayfası |
| **Randevu E-Postası**| `randevu@karadenizdis.com` | Randevu Yetkilisi E-postası | İletişim kartları |
| **Fiziki Adres** | `Yeni Mahalle Mah. Ali Gaffar Okkan Cd. No:90, Atakum / Samsun` | Gerçek Klinik Adresiniz | Topbar, Footer, İletişim, JSON-LD Şeması |
| **Çalışma Saatleri** | `Pazartesi - Cumartesi: 09:00 - 20:00` | Kliniğinizin Açılış/Kapanış Saatleri | Topbar, İletişim kartları, Footer |
| **Google Maps** | `https://www.google.com/maps/embed?...` | Kliniğinizin Google Harita Embed Linki | `iletisim.html` içindeki iframe etiketi |
| **Web Sitesi Alan Adı** | `https://www.karadenizdis.com` | Yayındaki Gerçek Domaininiz | Canonical linkler, Open Graph, sitemap.xml |
| **1. Hekim Adı** | `Dt. Selim Aydın` (Çene Cerrahı) | Gerçek Hekim Adı / Unvanı | `doktorlarimiz.html`, `randevu.html`, Blog |
| **2. Hekim Adı** | `Dr. Dt. Melis Çelik` (Ortodontist) | Gerçek Hekim Adı / Unvanı | `doktorlarimiz.html`, `randevu.html` |
| **3. Hekim Adı** | `Dt. Burak Koçyiğit` (Estetik/Protez)| Gerçek Hekim Adı / Unvanı | `doktorlarimiz.html`, `randevu.html`, Blog |
| **4. Hekim Adı** | `Dt. Zeynep Kaya` (Pedodontist) | Gerçek Hekim Adı / Unvanı | `doktorlarimiz.html`, `randevu.html`, Blog |

---

## 🌟 Temel Teknik ve Tasarım Özellikleri

1. **Hiçbir Kütüphaneye Bağımlı Değildir:**
   - 0 npm paketi, 0 harici framework, 0 ağır eklenti.
   - Yalnızca tipografi için Google Fonts (`Inter` ve `Plus Jakarta Sans`) kullanılmıştır.
   - Sayfa yüklenme hızları anında ve PageSpeed skorları maksimum düzeydedir.

2. **Mobil-First & Duyarlı (Responsive) Tasarım:**
   - 360px cep telefonlarından 4K ultra geniş ekranlara kadar kusursuz uyum.
   - Mobilde sağdan kayarak açılan animasyonlu hamburger çekmecesi ve akordeon menü.
   - Mobilde ekran altına sabitlenen hızlı erişim şeridi (**Ara**, **WhatsApp**, **Randevu Al**).

3. **Gelişmiş Form Validasyonu & Maskeleme:**
   - Türkiye cep telefonu formatına uygun gerçek zamanlı otomatik maskeleme (`05XX XXX XX XX`).
   - E-posta regex doğrulaması, isim uzunluğu kontrolü, KVKK onay zorunluluğu.
   - Hata durumunda kırmızı çerçeve + açıklayıcı Türkçe uyarı; doğru girişte yeşil çerçeve.
   - Gönderim esnasında dönen yükleniyor (spinner) animasyonu ve sağ üstten kayan toast bildirimleri.

4. **4 Adımlı İnteraktif Randevu Sihirbazı (`randevu.html`):**
   - **Adım 1:** 8 farklı tedavi alanı için görsel radyo kartları.
   - **Adım 2:** Hekim tercihi, bugünden önceki günleri engelleyen akıllı takvim ve saat dilimleri.
   - **Adım 3:** Hasta kimlik, telefon, e-posta, not ve KVKK onayı.
   - **Adım 4:** Dinamik özet tablosu ve onaylama.
   - **Sonuç:** Rastgele üretilen KRD-XXXXXX referans kodlu şık onay ekranı.

5. **Klinik Galerisi & İnteraktif Karşılaştırma (`galeri.html`):**
   - Fare veya dokunmatik parmak hareketiyle sürüklenebilir 2 adet **Önce / Sonra (Before/After)** karşılaştırma slider'ı.
   - Kategori filtreleme butonları (Tümü, Klinik & Teknoloji, Tedavi Sonuçları).
   - Klavye yön tuşları (`Sol/Sağ`) ve `ESC` ile yönetilebilen, tam ekran Lightbox modalı.

6. **SEO & Yapısal Veri (Schema.org JSON-LD):**
   - Ana Sayfa ve İletişim sayfalarında **Dentist** ve **LocalBusiness** şemaları (Çalışma saatleri, koordinatlar, adres).
   - Blog sayfalarında **Article** şeması (Yazar hekim, yayın tarihi, yayıncı).
   - SSS sayfasında **FAQPage** şeması (Arama motoru doğrudan soru-cevap zengin sonuçları için).
   - Her sayfaya özel Türkçe `<title>`, `<meta description>`, Open Graph ve canonical etiketleri.

7. **Erişilebilirlik (WCAG AA):**
   - Ekran okuyucular için doğrudan ana içeriğe atlama bağlantısı (`.skip-link`).
   - Klavye navigasyonu için görünür odak halkaları (`:focus-visible`).
   - Kontrast standartlarına tam uygun renk skalası.
   - `prefers-reduced-motion` desteği (kullanıcı animasyonları kapattığında otomatik geçişler sıfırlanır).

---

## 🚀 Kurulum ve Yayınlama

Sitede herhangi bir derleme (build), Webpack veya Node.js adımı gerekmez. 

1. Klasördeki tüm dosyaları bir web sunucusuna (Apache, Nginx, cPanel, Plesk) veya statik barındırma servisine (Netlify, Vercel, GitHub Pages, Cloudflare Pages) yüklemeniz yeterlidir.
2. Web sunucunuzda kök dizin olarak `dişci/` klasörünü belirleyiniz.
3. Alan adınızı bağlayıp SSL sertifikanızı (HTTPS) etkinleştirdiğinizde siteniz anında yayına hazır olacaktır!

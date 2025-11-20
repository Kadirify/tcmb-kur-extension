const LANGUAGES = {
  tr: {
    code: 'tr',
    name: 'Türkçe',
    translations: {
      // Header
      title: 'TCMB Döviz Kurları',
      dateLabel: 'Tarih Seç:',
      todayBtn: 'Bugün',
      
      // Theme
      themeToggle: 'Tema Değiştir',
      exportBtn: 'Excel\'e Aktar',
      settingsBtn: 'Filtre Ayarları',
      
      // Loading & Errors
      loading: 'Kurlar yükleniyor...',
      errorTitle: 'Hata oluştu',
      errorMessage: 'Kurlar yüklenirken bir hata oluştu.',
      retryBtn: 'Tekrar Dene',
      
      // Search
      searchPlaceholder: 'Döviz ara (ör: USD, Euro, Dolar...)',
      
      // Filter Modal
      filterModalTitle: 'Döviz Filtreleri',
      selectAllBtn: 'Tümünü Seç',
      deselectAllBtn: 'Tümünü Kaldır',
      closeBtn: '×',
      
      // Table
      currencyHeader: 'Döviz',
      buyingHeader: 'Alış',
      sellingHeader: 'Satış',
      noData: 'Döviz kuru bulunamadı.',
      
      // Favorites
      addToFavorites: 'Favorilere ekle',
      removeFromFavorites: 'Favorilerden çıkar',
      
      // Date Info
      lastUpdate: 'TCMB Kur Tarihi:',
      ratesNotPublished: '(Bugünün kurları henüz yayınlanmadı - TCMB kurları hafta içi 15:30\'da güncellenir)',
      
      // Export
      exportSuccess: 'Excel dosyası başarıyla indirildi.',
      exportError: 'Export sırasında bir hata oluştu:',
      exportNoData: 'Export için görüntülenecek döviz bulunamadı.',
      exportLibraryError: 'Excel kütüphanesi yüklenemedi',
      exportFilePrefix: 'tcmb-doviz-kurlari',
      
      // Excel Headers
      excelHeaders: {
        code: 'Döviz Kodu',
        name: 'Döviz Adı',
        unit: 'Birim',
        buying: 'Alış',
        selling: 'Satış',
        banknoteBuying: 'Banknot Alış',
        banknoteSelling: 'Banknot Satış'
      },
      
      // Footer
      footerBy: 'tarafından',
      footerDeveloped: 'geliştirildi',
      
      // Language
      languageToggle: 'Dil Değiştir (Language)',
      currentLanguage: '🇹🇷',
      currentFlag: '🇹🇷',
      
      // Currency Names (TR - Keep original)
      currencyNames: {}
    }
  },
  
  en: {
    code: 'en',
    name: 'English',
    translations: {
      // Header
      title: 'CBRT Exchange Rates',
      dateLabel: 'Select Date:',
      todayBtn: 'Today',
      
      // Theme
      themeToggle: 'Change Theme',
      exportBtn: 'Export to Excel',
      settingsBtn: 'Filter Settings',
      
      // Loading & Errors
      loading: 'Loading exchange rates...',
      errorTitle: 'Error occurred',
      errorMessage: 'An error occurred while loading exchange rates.',
      retryBtn: 'Try Again',
      
      // Search
      searchPlaceholder: 'Search currency (e.g: USD, Euro, Dollar...)',
      
      // Filter Modal
      filterModalTitle: 'Currency Filters',
      selectAllBtn: 'Select All',
      deselectAllBtn: 'Deselect All',
      closeBtn: '×',
      
      // Table
      currencyHeader: 'Currency',
      buyingHeader: 'Buying',
      sellingHeader: 'Selling',
      noData: 'No exchange rate found.',
      
      // Favorites
      addToFavorites: 'Add to favorites',
      removeFromFavorites: 'Remove from favorites',
      
      // Date Info
      lastUpdate: 'CBRT Rate Date:',
      ratesNotPublished: '(Today\'s rates have not been published yet - CBRT rates are updated at 15:30 on weekdays)',
      
      // Export
      exportSuccess: 'Excel file downloaded successfully.',
      exportError: 'An error occurred during export:',
      exportNoData: 'No currency data found to export.',
      exportLibraryError: 'Excel library could not be loaded',
      exportFilePrefix: 'cbrt-exchange-rates',
      
      // Excel Headers
      excelHeaders: {
        code: 'Currency Code',
        name: 'Currency Name',
        unit: 'Unit',
        buying: 'Buying',
        selling: 'Selling',
        banknoteBuying: 'Banknote Buying',
        banknoteSelling: 'Banknote Selling'
      },
      
      // Footer
      footerBy: 'by',
      footerDeveloped: 'Developed',
      
      // Language
      languageToggle: 'Change Language (Dil)',
      currentLanguage: '🇬🇧',
      currentFlag: '🇬🇧',
      
      // Currency Names (EN translations)
      currencyNames: {
        'ABD DOLARI': 'US DOLLAR',
        'EURO': 'EURO',
        'AVUSTRALYA DOLARI': 'AUSTRALIAN DOLLAR',
        'DANİMARKA KRONU': 'DANISH KRONE',
        'İNGİLİZ STERLİNİ': 'BRITISH POUND',
        'İSVEÇ KRONU': 'SWEDISH KRONA',
        'İSVİÇRE FRANGI': 'SWISS FRANC',
        'KANADA DOLARI': 'CANADIAN DOLLAR',
        'KUVEYT DİNARI': 'KUWAITI DINAR',
        'NORVEÇ KRONU': 'NORWEGIAN KRONE',
        'SUUDİ ARABİSTAN RİYALİ': 'SAUDI RIYAL',
        'JAPON YENİ': 'JAPANESE YEN',
        'BULGAR LEVASI': 'BULGARIAN LEV',
        'RUMEN LEYİ': 'ROMANIAN LEU',
        'RUS RUBLESİ': 'RUSSIAN RUBLE',
        'İRAN RİYALİ': 'IRANIAN RIAL',
        'ÇİN YUANI': 'CHINESE YUAN',
        'PAKİSTAN RUPİSİ': 'PAKISTANI RUPEE',
        'KATAR RİYALİ': 'QATARI RIYAL',
        'GÜNEY KORE WONU': 'SOUTH KOREAN WON',
        'AZERBAYCAN YENİ MANATI': 'AZERBAIJANI MANAT',
        'BİRLEŞİK ARAP EMİRLİKLERİ DİRHEMİ': 'UAE DIRHAM',
        'KAZAKİSTAN TENGESİ': 'KAZAKHSTANI TENGE',
        'ÖZEL ÇEKME HAKKI (SDR)': 'SPECIAL DRAWING RIGHTS (SDR)',
        'YENİ ZELANDA DOLARI': 'NEW ZEALAND DOLLAR',
        'SİNGAPUR DOLARI': 'SINGAPORE DOLLAR',
        'HONG KONG DOLARI': 'HONG KONG DOLLAR',
        'MALEZYA RİNGGİTİ': 'MALAYSIAN RINGGIT',
        'ENDONEZYA RUPİSİ': 'INDONESIAN RUPIAH',
        'TAYLANDİYA BATI': 'THAI BAHT',
        'POLONYA ZLOTİSİ': 'POLISH ZLOTY',
        'UKRAYNA HRYVNYASI': 'UKRAINIAN HRYVNIA',
        'GÜRCÜSTAN LARİSİ': 'GEORGIAN LARI',
        'MACARİSTAN FORİNTİ': 'HUNGARIAN FORINT',
        'ÇEK KORUNASI': 'CZECH KORUNA',
        'ARNAVUTLUK LEKİ': 'ALBANIAN LEK',
        'LIBYA DİNARI': 'LIBYAN DINAR',
        'TUNUS DİNARI': 'TUNISIAN DINAR',
        'BAHREYİN DİNARI': 'BAHRAINI DINAR',
        'ÜRDÜN DİNARI': 'JORDANIAN DINAR',
        'MISIR LİRASI': 'EGYPTIAN POUND'
      }
    }
  }
};


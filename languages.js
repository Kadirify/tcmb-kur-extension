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
      exportBtnShort: 'Excel',
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

      // Calculator
      calculatorTitle: 'Döviz Çevirici',
      calculatorBtn: 'Döviz Çevirici',
      amountLabel: 'Miktar',
      fromCurrencyLabel: 'Dönüştürülecek',
      toCurrencyLabel: 'Hedef Döviz',
      resultLabel: 'Sonuç',
      swapCurrencies: 'Dövizleri değiştir',
      calculatorNote: '* Kurlar TCMB\'nin resmi verilerine göre hesaplanmaktadır.',

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
      exportBtnShort: 'Excel',
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

      // Calculator
      calculatorTitle: 'Currency Converter',
      calculatorBtn: 'Currency Converter',
      amountLabel: 'Amount',
      fromCurrencyLabel: 'From',
      toCurrencyLabel: 'To',
      resultLabel: 'Result',
      swapCurrencies: 'Swap currencies',
      calculatorNote: '* Rates are calculated according to CBRT official data.',

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
  },

  de: {
    code: 'de',
    name: 'Deutsch',
    translations: {
      // Header
      title: 'TCMB Wechselkurse',
      dateLabel: 'Datum wählen:',
      todayBtn: 'Heute',

      // Theme
      themeToggle: 'Thema ändern',
      exportBtn: 'Nach Excel exportieren',
      exportBtnShort: 'Excel',
      settingsBtn: 'Filtereinstellungen',

      // Loading & Errors
      loading: 'Kurse werden geladen...',
      errorTitle: 'Fehler aufgetreten',
      errorMessage: 'Beim Laden der Kurse ist ein Fehler aufgetreten.',
      retryBtn: 'Erneut versuchen',

      // Search
      searchPlaceholder: 'Währung suchen (z.B. USD, Euro...)',

      // Filter Modal
      filterModalTitle: 'Währungsfilter',
      selectAllBtn: 'Alle auswählen',
      deselectAllBtn: 'Alle abwählen',
      closeBtn: '×',

      // Table
      currencyHeader: 'Währung',
      buyingHeader: 'Ankauf',
      sellingHeader: 'Verkauf',
      noData: 'Keine Wechselkurse gefunden.',

      // Favorites
      addToFavorites: 'Zu Favoriten hinzufügen',
      removeFromFavorites: 'Aus Favoriten entfernen',

      // Date Info
      lastUpdate: 'TCMB Kursdatum:',
      ratesNotPublished: '(Die heutigen Kurse wurden noch nicht veröffentlicht - TCMB-Kurse werden werktags um 15:30 Uhr aktualisiert)',

      // Export
      exportSuccess: 'Excel-Datei erfolgreich heruntergeladen.',
      exportError: 'Fehler beim Export:',
      exportNoData: 'Keine Währungsdaten zum Exportieren gefunden.',
      exportLibraryError: 'Excel-Bibliothek konnte nicht geladen werden',
      exportFilePrefix: 'tcmb-wechselkurse',

      // Excel Headers
      excelHeaders: {
        code: 'Währungscode',
        name: 'Währungsname',
        unit: 'Einheit',
        buying: 'Ankauf',
        selling: 'Verkauf',
        banknoteBuying: 'Banknotenankauf',
        banknoteSelling: 'Banknotenverkauf'
      },

      // Footer
      footerBy: 'von',
      footerDeveloped: 'Entwickelt',

      // Calculator
      calculatorTitle: 'Währungsrechner',
      calculatorBtn: 'Währungsrechner',
      amountLabel: 'Betrag',
      fromCurrencyLabel: 'Von',
      toCurrencyLabel: 'Nach',
      resultLabel: 'Ergebnis',
      swapCurrencies: 'Währungen tauschen',
      calculatorNote: '* Die Kurse werden nach offiziellen TCMB-Daten berechnet.',

      // Language
      languageToggle: 'Sprache ändern (Language)',
      currentLanguage: '🇩🇪',
      currentFlag: '🇩🇪',

      // Currency Names (DE translations)
      currencyNames: {
        'ABD DOLARI': 'US-DOLLAR',
        'EURO': 'EURO',
        'AVUSTRALYA DOLARI': 'AUSTRALISCHER DOLLAR',
        'DANİMARKA KRONU': 'DÄNISCHE KRONE',
        'İNGİLİZ STERLİNİ': 'BRITISCHES PFUND',
        'İSVEÇ KRONU': 'SCHWEDISCHE KRONE',
        'İSVİÇRE FRANGI': 'SCHWEIZER FRANKEN',
        'KANADA DOLARI': 'KANADISCHER DOLLAR',
        'KUVEYT DİNARI': 'KUWAIT-DINAR',
        'NORVEÇ KRONU': 'NORWEGISCHE KRONE',
        'SUUDİ ARABİSTAN RİYALİ': 'SAUDI-RIYAL',
        'JAPON YENİ': 'JAPANISCHER YEN',
        'BULGAR LEVASI': 'BULGARISCHER LEW',
        'RUMEN LEYİ': 'RUMÄNISCHER LEU',
        'RUS RUBLESİ': 'RUSSISCHER RUBEL',
        'İRAN RİYALİ': 'IRANISCHER RIAL',
        'ÇİN YUANI': 'CHINESISCHER YUAN',
        'PAKİSTAN RUPİSİ': 'PAKISTANISCHE RUPIE',
        'KATAR RİYALİ': 'KATAR-RIYAL',
        'GÜNEY KORE WONU': 'SÜDKOREANISCHER WON',
        'AZERBAYCAN YENİ MANATI': 'ASERBAIDSCHAN-MANAT',
        'BİRLEŞİK ARAP EMİRLİKLERİ DİRHEMİ': 'VAE-DIRHAM',
        'KAZAKİSTAN TENGESİ': 'KASACHISCHER TENGE',
        'ÖZEL ÇEKME HAKKI (SDR)': 'SONDERZIEHUNGSRECHTE (SDR)',
        'YENİ ZELANDA DOLARI': 'NEUSEELAND-DOLLAR',
        'SİNGAPUR DOLARI': 'SINGAPUR-DOLLAR',
        'HONG KONG DOLARI': 'HONGKONG-DOLLAR',
        'MALEZYA RİNGGİTİ': 'MALAYISCHER RINGGIT',
        'ENDONEZYA RUPİSİ': 'INDONESISCHE RUPIAH',
        'TAYLANDİYA BATI': 'THAI-BAHT',
        'POLONYA ZLOTİSİ': 'POLNISCHER ZLOTY',
        'UKRAYNA HRYVNYASI': 'UKRAINISCHE HRYWNA',
        'GÜRCÜSTAN LARİSİ': 'GEORGISCHER LARI',
        'MACARİSTAN FORİNTİ': 'UNGARISCHER FORINT',
        'ÇEK KORUNASI': 'TSCHECHISCHE KRONE',
        'ARNAVUTLUK LEKİ': 'ALBANISCHER LEK',
        'LIBYA DİNARI': 'LIBYSCHER DINAR',
        'TUNUS DİNARI': 'TUNESISCHER DINAR',
        'BAHREYİN DİNARI': 'BAHRAIN-DINAR',
        'ÜRDÜN DİNARI': 'JORDANIEN-DINAR',
        'MISIR LİRASI': 'ÄGYPTISCHES PFUND'
      }
    }
  },

  fr: {
    code: 'fr',
    name: 'Français',
    translations: {
      // Header
      title: 'Taux de Change TCMB',
      dateLabel: 'Date:',
      todayBtn: 'Aujourd\'hui',

      // Theme
      themeToggle: 'Changer de Thème',
      exportBtn: 'Exporter vers Excel',
      exportBtnShort: 'Excel',
      settingsBtn: 'Filtres',

      // Loading & Errors
      loading: 'Chargement des taux...',
      errorTitle: 'Erreur survenue',
      errorMessage: 'Une erreur est survenue lors du chargement des taux.',
      retryBtn: 'Réessayer',

      // Search
      searchPlaceholder: 'Rechercher une devise (ex: USD, Euro...)',

      // Filter Modal
      filterModalTitle: 'Filtres de Devises',
      selectAllBtn: 'Tout Sélectionner',
      deselectAllBtn: 'Tout Désélectionner',
      closeBtn: '×',

      // Table
      currencyHeader: 'Devise',
      buyingHeader: 'Achat',
      sellingHeader: 'Vente',
      noData: 'Aucun taux de change trouvé.',

      // Favorites
      addToFavorites: 'Ajouter aux favoris',
      removeFromFavorites: 'Retirer des favoris',

      // Date Info
      lastUpdate: 'Date des Taux TCMB:',
      ratesNotPublished: '(Les taux d\'aujourd\'hui n\'ont pas encore été publiés - Les taux TCMB sont mis à jour à 15h30 en semaine)',

      // Export
      exportSuccess: 'Fichier Excel téléchargé avec succès.',
      exportError: 'Une erreur est survenue lors de l\'exportation:',
      exportNoData: 'Aucune donnée à exporter.',
      exportLibraryError: 'La bibliothèque Excel n\'a pas pu être chargée',
      exportFilePrefix: 'taux-change-tcmb',

      // Excel Headers
      excelHeaders: {
        code: 'Code Devise',
        name: 'Nom Devise',
        unit: 'Unité',
        buying: 'Achat',
        selling: 'Vente',
        banknoteBuying: 'Achat Billets',
        banknoteSelling: 'Vente Billets'
      },

      // Footer
      footerBy: 'par',
      footerDeveloped: 'Développé',

      // Calculator
      calculatorTitle: 'Convertisseur de Devises',
      calculatorBtn: 'Convertisseur',
      amountLabel: 'Montant',
      fromCurrencyLabel: 'De',
      toCurrencyLabel: 'À',
      resultLabel: 'Résultat',
      swapCurrencies: 'Échanger devises',
      calculatorNote: '* Les taux sont calculés selon les données officielles de la TCMB.',

      // Language
      languageToggle: 'Changer de Langue (Language)',
      currentLanguage: '🇫🇷',
      currentFlag: '🇫🇷',

      // Currency Names (FR translations)
      currencyNames: {
        'ABD DOLARI': 'DOLLAR AMÉRICAIN',
        'EURO': 'EURO',
        'AVUSTRALYA DOLARI': 'DOLLAR AUSTRALIEN',
        'DANİMARKA KRONU': 'COURONNE DANOISE',
        'İNGİLİZ STERLİNİ': 'LIVRE STERLING',
        'İSVEÇ KRONU': 'COURONNE SUÉDOISE',
        'İSVİÇRE FRANGI': 'FRANC SUISSE',
        'KANADA DOLARI': 'DOLLAR CANADIEN',
        'KUVEYT DİNARI': 'DINAR KOWEÏTIEN',
        'NORVEÇ KRONU': 'COURONNE NORVÉGIENNE',
        'SUUDİ ARABİSTAN RİYALİ': 'RIYAL SAOUDIEN',
        'JAPON YENİ': 'YEN JAPONAIS',
        'BULGAR LEVASI': 'LEV BULGARE',
        'RUMEN LEYİ': 'LEU ROUMAIN',
        'RUS RUBLESİ': 'ROUBLE RUSSE',
        'İRAN RİYALİ': 'RIAL IRANIEN',
        'ÇİN YUANI': 'YUAN CHINOIS',
        'PAKİSTAN RUPİSİ': 'ROUPIE PAKISTANAISE',
        'KATAR RİYALİ': 'RIYAL QATARIEN',
        'GÜNEY KORE WONU': 'WON SUD-CORÉEN',
        'AZERBAYCAN YENİ MANATI': 'MANAT AZERBAÏDJANAIS',
        'BİRLEŞİK ARAP EMİRLİKLERİ DİRHEMİ': 'DIRHAM EAU',
        'KAZAKİSTAN TENGESİ': 'TENGE KAZAKH',
        'ÖZEL ÇEKME HAKKI (SDR)': 'DROITS DE TIRAGE SPÉCIAUX (DTS)',
        'YENİ ZELANDA DOLARI': 'DOLLAR NÉO-ZÉLANDAIS',
        'SİNGAPUR DOLARI': 'DOLLAR DE SINGAPOUR',
        'HONG KONG DOLARI': 'DOLLAR DE HONG KONG',
        'MALEZYA RİNGGİTİ': 'RINGGIT MALAISIEN',
        'ENDONEZYA RUPİSİ': 'ROUPIE INDONÉSIENNE',
        'TAYLANDİYA BATI': 'BAHT THAÏLANDAIS',
        'POLONYA ZLOTİSİ': 'ZLOTY POLONAIS',
        'UKRAYNA HRYVNYASI': 'HRYVNIA UKRAINIENNE',
        'GÜRCÜSTAN LARİSİ': 'LARI GÉORGIEN',
        'MACARİSTAN FORİNTİ': 'FORINT HONGROIS',
        'ÇEK KORUNASI': 'COURONNE TCHÈQUE',
        'ARNAVUTLUK LEKİ': 'LEK ALBANAIS',
        'LIBYA DİNARI': 'DINAR LIBYEN',
        'TUNUS DİNARI': 'DINAR TUNISIEN',
        'BAHREYİN DİNARI': 'DINAR DE BAHREÏN',
        'ÜRDÜN DİNARI': 'DINAR JORDANIEN',
        'MISIR LİRASI': 'LIVRE ÉGYPTIENNE'
      }
    }
  },

  es: {
    code: 'es',
    name: 'Español',
    translations: {
      // Header
      title: 'Tipos de Cambio TCMB',
      dateLabel: 'Fecha:',
      todayBtn: 'Hoy',

      // Theme
      themeToggle: 'Cambiar Tema',
      exportBtn: 'Exportar a Excel',
      exportBtnShort: 'Excel',
      settingsBtn: 'Filtros',

      // Loading & Errors
      loading: 'Cargando tipos de cambio...',
      errorTitle: 'Ocurrió un error',
      errorMessage: 'Ocurrió un error al cargar los tipos de cambio.',
      retryBtn: 'Reintentar',

      // Search
      searchPlaceholder: 'Buscar moneda (ej: USD, Euro...)',

      // Filter Modal
      filterModalTitle: 'Filtros de Moneda',
      selectAllBtn: 'Seleccionar Todo',
      deselectAllBtn: 'Deseleccionar Todo',
      closeBtn: '×',

      // Table
      currencyHeader: 'Moneda',
      buyingHeader: 'Compra',
      sellingHeader: 'Venta',
      noData: 'No se encontraron tipos de cambio.',

      // Favorites
      addToFavorites: 'Añadir a favoritos',
      removeFromFavorites: 'Eliminar de favoritos',

      // Date Info
      lastUpdate: 'Fecha de Tasa TCMB:',
      ratesNotPublished: '(Las tasas de hoy aún no se han publicado - Las tasas del TCMB se actualizan a las 15:30 los días laborables)',

      // Export
      exportSuccess: 'Archivo Excel descargado con éxito.',
      exportError: 'Ocurrió un error durante la exportación:',
      exportNoData: 'No se encontraron datos para exportar.',
      exportLibraryError: 'No se pudo cargar la biblioteca de Excel',
      exportFilePrefix: 'tipos-cambio-tcmb',

      // Excel Headers
      excelHeaders: {
        code: 'Código de Moneda',
        name: 'Nombre de Moneda',
        unit: 'Unidad',
        buying: 'Compra',
        selling: 'Venta',
        banknoteBuying: 'Compra de Billetes',
        banknoteSelling: 'Venta de Billetes'
      },

      // Footer
      footerBy: 'por',
      footerDeveloped: 'Desarrollado',

      // Calculator
      calculatorTitle: 'Conversor de Divisas',
      calculatorBtn: 'Conversor',
      amountLabel: 'Cantidad',
      fromCurrencyLabel: 'De',
      toCurrencyLabel: 'A',
      resultLabel: 'Resultado',
      swapCurrencies: 'Intercambiar monedas',
      calculatorNote: '* Las tasas se calculan según los datos oficiales del TCMB.',

      // Language
      languageToggle: 'Cambiar Idioma (Language)',
      currentLanguage: '🇪🇸',
      currentFlag: '🇪🇸',

      // Currency Names (ES translations)
      currencyNames: {
        'ABD DOLARI': 'DÓLAR ESTADOUNIDENSE',
        'EURO': 'EURO',
        'AVUSTRALYA DOLARI': 'DÓLAR AUSTRALIANO',
        'DANİMARKA KRONU': 'CORONA DANESA',
        'İNGİLİZ STERLİNİ': 'LIBRA ESTERLINA',
        'İSVEÇ KRONU': 'CORONA SUECA',
        'İSVİÇRE FRANGI': 'FRANCO SUIZO',
        'KANADA DOLARI': 'DÓLAR CANADIENSE',
        'KUVEYT DİNARI': 'DINAR KUWAITÍ',
        'NORVEÇ KRONU': 'CORONA NORUEGA',
        'SUUDİ ARABİSTAN RİYALİ': 'RIYAL SAUDÍ',
        'JAPON YENİ': 'YEN JAPONÉS',
        'BULGAR LEVASI': 'LEV BÚLGARO',
        'RUMEN LEYİ': 'LEU RUMANO',
        'RUS RUBLESİ': 'RUBLO RUSO',
        'İRAN RİYALİ': 'RIAL IRANÍ',
        'ÇİN YUANI': 'YUAN CHINO',
        'PAKİSTAN RUPİSİ': 'RUPIA PAKISTANÍ',
        'KATAR RİYALİ': 'RIYAL CATARÍ',
        'GÜNEY KORE WONU': 'WON SURCOREANO',
        'AZERBAYCAN YENİ MANATI': 'MANAT AZERBAIYANO',
        'BİRLEŞİK ARAP EMİRLİKLERİ DİRHEMİ': 'DIRHAM EAU',
        'KAZAKİSTAN TENGESİ': 'TENGE KAZAJO',
        'ÖZEL ÇEKME HAKKI (SDR)': 'DERECHOS ESPECIALES DE GIRO (DEG)',
        'YENİ ZELANDA DOLARI': 'DÓLAR NEOZELANDÉS',
        'SİNGAPUR DOLARI': 'DÓLAR DE SINGAPUR',
        'HONG KONG DOLARI': 'DÓLAR DE HONG KONG',
        'MALEZYA RİNGGİTİ': 'RINGGIT MALAYO',
        'ENDONEZYA RUPİSİ': 'RUPIA INDONESIA',
        'TAYLANDİYA BATI': 'BAHT TAILANDÉS',
        'POLONYA ZLOTİSİ': 'ZLOTY POLACO',
        'UKRAYNA HRYVNYASI': 'GRIVNA UCRANIANA',
        'GÜRCÜSTAN LARİSİ': 'LARI GEORGIANO',
        'MACARİSTAN FORİNTİ': 'FORINTO HÚNGARO',
        'ÇEK KORUNASI': 'CORONA CHECA',
        'ARNAVUTLUK LEKİ': 'LEK ALBANÉS',
        'LIBYA DİNARI': 'DINAR LIBIO',
        'TUNUS DİNARI': 'DINAR TUNECINO',
        'BAHREYİN DİNARI': 'DINAR DE BAHREIN',
        'ÜRDÜN DİNARI': 'DINAR JORDANO',
        'MISIR LİRASI': 'LIBRA EGIPCIA'
      }
    }
  }
};


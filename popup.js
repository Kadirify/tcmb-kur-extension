(function () {
  'use strict';

  // ============================================================================
  // Configuration
  // ============================================================================
  const CONFIG = {
    API_BASE_URL: 'https://www.tcmb.gov.tr/kurlar',
    POPULAR_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'RUB', 'CNY', 'SAR', 'AED'],
    DATE_FORMAT: {
      INPUT: 'YYYY-MM-DD',
      TCMB: 'DD.MM.YYYY',
      API_PATH: 'YYYYMM/DDMMYYYY'
    },
    DECIMAL_PLACES: 4,
    DEFAULT_LANGUAGE: 'tr',
    STORAGE_KEYS: {
      SELECTED_CURRENCIES: 'selectedCurrencies',
      IS_INITIALIZED: 'isInitialized',
      FAVORITE_CURRENCIES: 'favoriteCurrencies',
      THEME: 'theme',
      LANGUAGE: 'language'
    },
    UI_IDS: {
      DATE_INPUT: 'dateInput',
      TODAY_BTN: 'todayBtn',
      RETRY_BTN: 'retryBtn',
      SEARCH_INPUT: 'searchInput',
      SETTINGS_BTN: 'settingsBtn',
      EXPORT_BTN: 'exportBtn',
      THEME_BTN: 'themeBtn',
      LANGUAGE_BTN: 'languageBtn',
      CALCULATOR_BTN: 'calculatorBtn',
      CLOSE_FILTER_BTN: 'closeFilterBtn',
      CLOSE_CALCULATOR_BTN: 'closeCalculatorBtn',
      CALCULATOR_MODAL_OVERLAY: 'calculatorModalOverlay',
      AMOUNT_INPUT: 'amountInput',
      FROM_CURRENCY: 'fromCurrency',
      TO_CURRENCY: 'toCurrency',
      RESULT_INPUT: 'resultInput',
      SWAP_BTN: 'swapBtn',
      FILTER_MODAL_OVERLAY: 'filterModalOverlay',
      SELECT_ALL_BTN: 'selectAllBtn',
      DESELECT_ALL_BTN: 'deselectAllBtn',
      FILTER_CHECKBOXES: 'filterCheckboxes',
      LOADING: 'loading',
      ERROR: 'error',
      LAST_UPDATE: 'lastUpdate',
      RATES_TABLE: 'ratesTable',
      CURRENCIES: 'currencies',
      SEARCH_CONTAINER: 'searchContainer',
      FILTER_MODAL: 'filterModal'
    }
  };

  // ============================================================================
  // Storage Abstraction Layer
  // ============================================================================
  class StorageService {
    constructor() {
      this._storage = this._getStorage();
    }

    _getStorage() {
      if (typeof chrome !== 'undefined' && chrome?.storage?.local) {
        return chrome.storage.local;
      }
      return null;
    }

    async get(keys) {
      if (!this._storage) {
        throw new Error('Storage API is not available');
      }
      return await this._storage.get(keys);
    }

    async set(data) {
      if (!this._storage) {
        throw new Error('Storage API is not available');
      }
      return await this._storage.set(data);
    }

    isAvailable() {
      return this._storage !== null;
    }
  }

  // ============================================================================
  // Repository Pattern: Filter Data Management
  // ============================================================================
  class FilterRepository {
    constructor(storageService) {
      this._storage = storageService;
      this._selectedCurrencies = new Set();
    }

    async load() {
      if (!this._storage.isAvailable()) {
        return new Set();
      }

      try {
        const result = await this._storage.get([CONFIG.STORAGE_KEYS.SELECTED_CURRENCIES]);
        const currencies = result[CONFIG.STORAGE_KEYS.SELECTED_CURRENCIES];

        if (Array.isArray(currencies)) {
          return new Set(currencies);
        }
        return new Set();
      } catch (error) {
        console.error('Failed to load filters:', error);
        return new Set();
      }
    }

    async save(selectedCurrencies) {
      if (!this._storage.isAvailable()) {
        return false;
      }

      try {
        const currenciesArray = Array.from(selectedCurrencies);
        await this._storage.set({
          [CONFIG.STORAGE_KEYS.SELECTED_CURRENCIES]: currenciesArray
        });
        this._selectedCurrencies = new Set(selectedCurrencies);
        return true;
      } catch (error) {
        console.error('Failed to save filters:', error);
        return false;
      }
    }

    async isInitialized() {
      if (!this._storage.isAvailable()) {
        return false;
      }

      try {
        const result = await this._storage.get([CONFIG.STORAGE_KEYS.IS_INITIALIZED]);
        return result[CONFIG.STORAGE_KEYS.IS_INITIALIZED] === true;
      } catch (error) {
        console.error('Failed to check initialization status:', error);
        return false;
      }
    }

    async markAsInitialized() {
      if (!this._storage.isAvailable()) {
        return false;
      }

      try {
        await this._storage.set({
          [CONFIG.STORAGE_KEYS.IS_INITIALIZED]: true
        });
        return true;
      } catch (error) {
        console.error('Failed to mark as initialized:', error);
        return false;
      }
    }

    getSelected() {
      return new Set(this._selectedCurrencies);
    }

    setSelected(selectedCurrencies) {
      this._selectedCurrencies = new Set(selectedCurrencies);
    }
  }

  // ============================================================================
  // Repository Pattern: Favorite Data Management
  // ============================================================================
  class FavoriteRepository {
    constructor(storageService) {
      this._storage = storageService;
      this._favoriteCurrencies = new Set();
    }

    async load() {
      if (!this._storage.isAvailable()) {
        return new Set();
      }

      try {
        const result = await this._storage.get([CONFIG.STORAGE_KEYS.FAVORITE_CURRENCIES]);
        const favorites = result[CONFIG.STORAGE_KEYS.FAVORITE_CURRENCIES];

        if (Array.isArray(favorites)) {
          return new Set(favorites);
        }
        return new Set();
      } catch (error) {
        console.error('Failed to load favorites:', error);
        return new Set();
      }
    }

    async save(favoriteCurrencies) {
      if (!this._storage.isAvailable()) {
        return false;
      }

      try {
        const favoritesArray = Array.from(favoriteCurrencies);
        await this._storage.set({
          [CONFIG.STORAGE_KEYS.FAVORITE_CURRENCIES]: favoritesArray
        });
        this._favoriteCurrencies = new Set(favoriteCurrencies);
        return true;
      } catch (error) {
        console.error('Failed to save favorites:', error);
        return false;
      }
    }

    getFavorites() {
      return new Set(this._favoriteCurrencies);
    }

    setFavorites(favoriteCurrencies) {
      this._favoriteCurrencies = new Set(favoriteCurrencies);
    }
  }

  // ============================================================================
  // Business Logic: Favorite Management
  // ============================================================================
  class FavoriteService {
    constructor(favoriteRepository) {
      this._repository = favoriteRepository;
    }

    async initialize() {
      const favorites = await this._repository.load();
      this._repository.setFavorites(favorites);
      return favorites;
    }

    async toggle(currencyCode) {
      const current = this._repository.getFavorites();

      if (current.has(currencyCode)) {
        current.delete(currencyCode);
      } else {
        current.add(currencyCode);
      }

      this._repository.setFavorites(current);
      await this._repository.save(current);
      return current;
    }

    isFavorite(currencyCode) {
      return this._repository.getFavorites().has(currencyCode);
    }

    getFavorites() {
      return this._repository.getFavorites();
    }

    async add(currencyCode) {
      const current = this._repository.getFavorites();
      current.add(currencyCode);
      this._repository.setFavorites(current);
      await this._repository.save(current);
    }

    async remove(currencyCode) {
      const current = this._repository.getFavorites();
      current.delete(currencyCode);
      this._repository.setFavorites(current);
      await this._repository.save(current);
    }
  }

  // ============================================================================
  // Business Logic: Filter Management
  // ============================================================================
  class FilterService {
    constructor(filterRepository) {
      this._repository = filterRepository;
      this._allCurrencies = [];
    }

    setCurrencies(currencies) {
      this._allCurrencies = currencies;
    }

    async initialize(currencies) {
      this.setCurrencies(currencies);

      const isInitialized = await this._repository.isInitialized();

      if (!isInitialized) {
        return await this._initializeFirstTime(currencies);
      }

      return await this._loadExistingFilters(currencies);
    }

    async _initializeFirstTime(currencies) {
      const allCodes = new Set(currencies.map(c => c.code));
      this._repository.setSelected(allCodes);

      await Promise.all([
        this._repository.save(allCodes),
        this._repository.markAsInitialized()
      ]);

      return allCodes;
    }

    async _loadExistingFilters(currencies) {
      const savedFilters = await this._repository.load();
      const validCodes = new Set(currencies.map(c => c.code));

      // Filter out invalid currency codes
      const filtered = Array.from(savedFilters).filter(code => validCodes.has(code));
      const filteredSet = new Set(filtered);

      // If no valid filters or all were invalid, select all
      if (filteredSet.size === 0) {
        const allCodes = new Set(currencies.map(c => c.code));
        this._repository.setSelected(allCodes);
        await this._repository.save(allCodes);
        return allCodes;
      }

      this._repository.setSelected(filteredSet);

      // Save if filters were modified
      if (filteredSet.size !== savedFilters.size) {
        await this._repository.save(filteredSet);
      }

      return filteredSet;
    }

    async selectAll() {
      const allCodes = new Set(this._allCurrencies.map(c => c.code));
      this._repository.setSelected(allCodes);
      await this._repository.save(allCodes);
    }

    async deselectAll() {
      const emptySet = new Set();
      this._repository.setSelected(emptySet);
      await this._repository.save(emptySet);
    }

    async toggle(currencyCode) {
      const current = this._repository.getSelected();

      if (current.has(currencyCode)) {
        current.delete(currencyCode);
      } else {
        current.add(currencyCode);
      }

      this._repository.setSelected(current);
      await this._repository.save(current);
    }

    isSelected(currencyCode) {
      return this._repository.getSelected().has(currencyCode);
    }

    filter(currencies, searchTerm = '') {
      const selected = this._repository.getSelected();
      const term = searchTerm.toLowerCase().trim();

      return currencies.filter(currency => {
        // Apply currency filter
        if (selected.size > 0 && !selected.has(currency.code)) {
          return false;
        }

        // Apply search filter
        if (term) {
          const code = currency.code.toLowerCase();
          const name = currency.name.toLowerCase();
          return code.includes(term) || name.includes(term);
        }

        return true;
      });
    }

    getAllCurrencies() {
      return this._allCurrencies;
    }
  }

  // ============================================================================
  // Domain Models
  // ============================================================================
  class Currency {
    constructor(data) {
      this.code = data.code;
      this.name = data.name;
      this.originalName = data.name;
      this.buying = parseFloat(data.buying);
      this.selling = parseFloat(data.selling);
      this.banknoteBuying = parseFloat(data.banknoteBuying);
      this.banknoteSelling = parseFloat(data.banknoteSelling);
      this.unit = parseInt(data.unit, 10);
      this.yesterdayBuying = data.yesterdayBuying ?? null;
      this.yesterdaySelling = data.yesterdaySelling ?? null;
    }

    getTranslatedName(languageService) {
      if (!languageService || languageService.getCurrentLanguage() === 'tr') {
        return this.originalName;
      }

      const translations = languageService.t('currencyNames');
      return translations[this.originalName] || this.originalName;
    }

    getDisplayCode() {
      return this.unit > 1 ? `${this.code} (${this.unit})` : this.code;
    }

    getBuyingChange() {
      return this._getChangeIndicator(this.buying, this.yesterdayBuying);
    }

    getSellingChange() {
      return this._getChangeIndicator(this.selling, this.yesterdaySelling);
    }

    _getChangeIndicator(today, yesterday) {
      if (!yesterday || yesterday === 0) return '';
      if (today > yesterday) return 'increase';
      if (today < yesterday) return 'decrease';
      return '';
    }
  }

  // ============================================================================
  // Data Access Layer: Currency API
  // ============================================================================
  class CurrencyApiService {
    static buildApiUrl(date = null) {
      if (!date) {
        return `${CONFIG.API_BASE_URL}/today.xml`;
      }

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');

      return `${CONFIG.API_BASE_URL}/${year}${month}/${day}${month}${year}.xml`;
    }

    static parseXmlResponse(xmlText) {
      const parser = new DOMParser();
      return parser.parseFromString(xmlText, 'text/xml');
    }

    static extractCurrencyData(xmlDoc) {
      const nodes = xmlDoc.querySelectorAll('Currency');
      const currencies = [];

      nodes.forEach(node => {
        const code = node.getAttribute('CurrencyCode');
        const name = node.querySelector('Isim')?.textContent || '';
        const buying = node.querySelector('ForexBuying')?.textContent || '0';
        const selling = node.querySelector('ForexSelling')?.textContent || '0';
        const banknoteBuying = node.querySelector('BanknoteBuying')?.textContent || buying;
        const banknoteSelling = node.querySelector('BanknoteSelling')?.textContent || selling;
        const unit = node.querySelector('Unit')?.textContent || '1';

        if (code && (buying !== '0' || selling !== '0')) {
          currencies.push(new Currency({
            code,
            name,
            buying,
            selling,
            banknoteBuying,
            banknoteSelling,
            unit
          }));
        }
      });

      return currencies;
    }

    static mergeWithPreviousDay(todayData, yesterdayData) {
      return todayData.map(today => {
        const yesterday = yesterdayData.find(y => y.code === today.code);
        today.yesterdayBuying = yesterday?.buying ?? null;
        today.yesterdaySelling = yesterday?.selling ?? null;
        return today;
      });
    }

    static sortByPopularity(currencies) {
      const popular = currencies.filter(c => CONFIG.POPULAR_CURRENCIES.includes(c.code));
      const others = currencies.filter(c => !CONFIG.POPULAR_CURRENCIES.includes(c.code));
      return [...popular, ...others];
    }
  }

  class ExportService {
    static exportToExcel(currencies, dateString = null, languageService = null) {
      const t = (key) => languageService ? languageService.t(key) : key;

      if (!currencies || currencies.length === 0) {
        throw new Error(t('exportNoData'));
      }

      if (typeof XLSX === 'undefined') {
        throw new Error(t('exportLibraryError'));
      }

      const date = dateString || new Date().toISOString().split('T')[0];
      const filePrefix = t('exportFilePrefix');

      const headers = [
        t('excelHeaders.code'),
        t('excelHeaders.name'),
        t('excelHeaders.unit'),
        t('excelHeaders.buying'),
        t('excelHeaders.selling'),
        t('excelHeaders.banknoteBuying'),
        t('excelHeaders.banknoteSelling')
      ];
      const data = [headers];

      currencies.forEach(currency => {
        data.push([
          currency.code,
          currency.name,
          currency.unit,
          currency.buying,
          currency.selling,
          currency.banknoteBuying,
          currency.banknoteSelling
        ]);
      });

      const ws = XLSX.utils.aoa_to_sheet(data);

      const wscols = [
        { wch: 12 },
        { wch: 25 },
        { wch: 8 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 },
        { wch: 12 }
      ];
      ws['!cols'] = wscols;

      const headerStyle = {
        font: { bold: true, color: { rgb: 'FFFFFF' } },
        fill: { fgColor: { rgb: '1e3a8a' } },
        alignment: { horizontal: 'center', vertical: 'center' }
      };

      const range = XLSX.utils.decode_range(ws['!ref']);
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = headerStyle;
      }

      const wb = XLSX.utils.book_new();
      const sheetName = languageService && languageService.getCurrentLanguage() === 'en'
        ? 'CBRT Exchange Rates'
        : 'TCMB Döviz Kurları';
      XLSX.utils.book_append_sheet(wb, ws, sheetName);

      const fileName = `${filePrefix}-${date}.xlsx`;
      XLSX.writeFile(wb, fileName);
    }
  }

  // ============================================================================
  // Business Logic: Language Management
  // ============================================================================
  class LanguageService {
    constructor(storageService) {
      this._storage = storageService;
      this._currentLanguage = CONFIG.DEFAULT_LANGUAGE;
      this._translations = null;
    }

    async initialize() {
      try {
        const result = await this._storage.get([CONFIG.STORAGE_KEYS.LANGUAGE]);
        const savedLanguage = result[CONFIG.STORAGE_KEYS.LANGUAGE];
        const language = savedLanguage || CONFIG.DEFAULT_LANGUAGE;
        this.setLanguage(language);
      } catch (error) {
        console.error('Failed to load language from storage:', error);
        this.setLanguage(CONFIG.DEFAULT_LANGUAGE);
      }
    }

    setLanguage(languageCode) {
      if (!LANGUAGES[languageCode]) {
        console.error('Language not found:', languageCode);
        languageCode = CONFIG.DEFAULT_LANGUAGE;
      }

      this._currentLanguage = languageCode;
      this._translations = LANGUAGES[languageCode].translations;

      this._storage.set({ [CONFIG.STORAGE_KEYS.LANGUAGE]: languageCode }).catch(error => {
        console.error('Failed to save language to storage:', error);
      });
    }

    async toggle() {
      const languages = ['tr', 'en', 'de', 'fr', 'es'];
      const currentIndex = languages.indexOf(this._currentLanguage);
      const nextIndex = (currentIndex + 1) % languages.length;
      const newLanguage = languages[nextIndex];

      this.setLanguage(newLanguage);
      return newLanguage;
    }

    getCurrentLanguage() {
      return this._currentLanguage;
    }

    t(key) {
      const keys = key.split('.');
      let value = this._translations;

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = value[k];
        } else {
          console.warn('Translation key not found:', key);
          return key;
        }
      }

      return value || key;
    }

    getAvailableLanguages() {
      return Object.keys(LANGUAGES).map(code => ({
        code,
        name: LANGUAGES[code].name
      }));
    }
  }

  // ============================================================================
  // Business Logic: Theme Management
  // ============================================================================
  class ThemeService {
    constructor(storageService) {
      this._storage = storageService;
      this._currentTheme = 'light';
      this._html = document.documentElement;
    }

    async initialize() {
      try {
        const result = await this._storage.get([CONFIG.STORAGE_KEYS.THEME]);
        const savedTheme = result[CONFIG.STORAGE_KEYS.THEME];
        if (savedTheme === 'dark') {
          this.setTheme('dark');
        } else {
          this.setTheme('light');
        }
      } catch (error) {
        console.error('Failed to load theme from storage:', error);
        this.setTheme('light');
      }
    }

    setTheme(theme) {
      this._currentTheme = theme;
      if (theme === 'dark') {
        this._html.setAttribute('data-theme', 'dark');
      } else {
        this._html.removeAttribute('data-theme');
      }
      this._storage.set({ [CONFIG.STORAGE_KEYS.THEME]: theme }).catch(error => {
        console.error('Failed to save theme to storage:', error);
      });
    }

    async toggle() {
      const newTheme = this._currentTheme === 'light' ? 'dark' : 'light';
      this.setTheme(newTheme);
    }

    isDarkMode() {
      return this._currentTheme === 'dark';
    }
  }

  // ============================================================================
  // Utility Classes
  // ============================================================================
  class DateFormatter {
    static formatTcmbDate(dateString) {
      if (!dateString) return null;

      const parts = dateString.split('.');
      if (parts.length !== 3) return dateString;

      const [day, month, year] = parts.map(p => parseInt(p, 10));
      const date = new Date(year, month - 1, day);

      if (isNaN(date.getTime())) return dateString;

      return date.toLocaleDateString('tr-TR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }

    static getTodayString() {
      return new Date().toISOString().split('T')[0];
    }

    static getPreviousDay(date) {
      const prev = new Date(date);
      prev.setDate(prev.getDate() - 1);
      return prev;
    }
  }

  class NumberFormatter {
    static format(amount) {
      if (!amount || amount === 0) return '0,0000';
      return parseFloat(amount).toFixed(CONFIG.DECIMAL_PLACES).replace('.', ',');
    }
  }

  // ============================================================================
  // Presentation Layer: UI Management
  // ============================================================================
  class UIManager {
    constructor() {
      this._elements = this._initializeElements();
    }

    _initializeElements() {
      const ids = CONFIG.UI_IDS;
      return {
        dateInput: document.getElementById(ids.DATE_INPUT),
        todayBtn: document.getElementById(ids.TODAY_BTN),
        retryBtn: document.getElementById(ids.RETRY_BTN),
        searchInput: document.getElementById(ids.SEARCH_INPUT),
        settingsBtn: document.getElementById(ids.SETTINGS_BTN),
        exportBtn: document.getElementById(ids.EXPORT_BTN),
        themeBtn: document.getElementById(ids.THEME_BTN),
        languageBtn: document.getElementById(ids.LANGUAGE_BTN),
        calculatorBtn: document.getElementById(ids.CALCULATOR_BTN),
        closeFilterBtn: document.getElementById(ids.CLOSE_FILTER_BTN),
        closeCalculatorBtn: document.getElementById(ids.CLOSE_CALCULATOR_BTN),
        calculatorModalOverlay: document.getElementById(ids.CALCULATOR_MODAL_OVERLAY),
        amountInput: document.getElementById(ids.AMOUNT_INPUT),
        fromCurrency: document.getElementById(ids.FROM_CURRENCY),
        toCurrency: document.getElementById(ids.TO_CURRENCY),
        resultInput: document.getElementById(ids.RESULT_INPUT),
        swapBtn: document.getElementById(ids.SWAP_BTN),
        filterModalOverlay: document.getElementById(ids.FILTER_MODAL_OVERLAY),
        selectAllBtn: document.getElementById(ids.SELECT_ALL_BTN),
        deselectAllBtn: document.getElementById(ids.DESELECT_ALL_BTN),
        filterCheckboxes: document.getElementById(ids.FILTER_CHECKBOXES),
        loading: document.getElementById(ids.LOADING),
        error: document.getElementById(ids.ERROR),
        lastUpdate: document.getElementById(ids.LAST_UPDATE),
        ratesTable: document.getElementById(ids.RATES_TABLE),
        currencies: document.getElementById(ids.CURRENCIES),
        searchContainer: document.getElementById(ids.SEARCH_CONTAINER),
        filterModal: document.getElementById(ids.FILTER_MODAL)
      };
    }

    get elements() {
      return this._elements;
    }

    showLoading() {
      this._elements.loading.style.display = 'flex';
      this._elements.ratesTable.style.display = 'none';
      this._elements.searchContainer.style.display = 'none';
      this._elements.error.style.display = 'none';
    }

    hideLoading() {
      this._elements.loading.style.display = 'none';
    }

    showError(message) {
      this._elements.error.style.display = 'block';
      this._elements.lastUpdate.textContent = message;
    }

    updateLastUpdate(message) {
      this._elements.lastUpdate.textContent = message;
    }

    showTable() {
      this._elements.ratesTable.style.display = 'table';
      this._elements.searchContainer.style.display = 'block';
    }

    clearSearch() {
      this._elements.searchInput.value = '';
    }

    clearTable() {
      this._elements.currencies.innerHTML = '';
    }
  }

  // ============================================================================
  // Presentation Layer: Currency Rendering
  // ============================================================================
  class CurrencyRenderer {
    static renderRow(currency, favoriteService, onFavoriteToggle, languageService) {
      const isPopular = CONFIG.POPULAR_CURRENCIES.includes(currency.code);
      const isFavorite = favoriteService ? favoriteService.isFavorite(currency.code) : false;
      const currencyDisplay = currency.getDisplayCode();
      const currencyName = currency.getTranslatedName(languageService);
      const buyingChange = currency.getBuyingChange();
      const sellingChange = currency.getSellingChange();

      const yesterdayBuyingHtml = currency.yesterdayBuying !== null
        ? `<span class="yesterday-value ${buyingChange}">(${NumberFormatter.format(currency.yesterdayBuying)})</span>`
        : '';

      const yesterdaySellingHtml = currency.yesterdaySelling !== null
        ? `<span class="yesterday-value ${sellingChange}">(${NumberFormatter.format(currency.yesterdaySelling)})</span>`
        : '';

      const favoriteIcon = isFavorite ? '★' : '☆';
      const favoriteClass = isFavorite ? 'favorite' : '';
      const favoriteTitle = languageService
        ? (isFavorite ? languageService.t('removeFromFavorites') : languageService.t('addToFavorites'))
        : (isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle');

      const row = document.createElement('tr');
      if (isPopular) {
        row.classList.add('popular');
      }
      if (isFavorite) {
        row.classList.add('favorite-row');
      }

      row.innerHTML = `
        <td class="currency-cell">
          <div class="currency-header">
            <div class="currency-info">
          <span class="currency-code">${currencyDisplay}</span>
          <span class="currency-name">${currencyName}</span>
            </div>
            ${favoriteService ? `<button class="favorite-btn ${favoriteClass}" data-currency="${currency.code}" title="${favoriteTitle}">${favoriteIcon}</button>` : ''}
          </div>
        </td>
        <td class="rate-cell buying ${buyingChange}">
          ${NumberFormatter.format(currency.buying)}
          ${yesterdayBuyingHtml}
        </td>
        <td class="rate-cell selling ${sellingChange}">
          ${NumberFormatter.format(currency.selling)}
          ${yesterdaySellingHtml}
        </td>
      `;

      // Favori butonuna event listener ekle
      if (favoriteService && onFavoriteToggle) {
        const favoriteBtn = row.querySelector('.favorite-btn');
        if (favoriteBtn) {
          favoriteBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await favoriteService.toggle(currency.code);
            onFavoriteToggle();
          });
        }
      }

      return row;
    }

    static renderTable(currencies, container, favoriteService = null, onFavoriteToggle = null, languageService = null) {
      container.innerHTML = '';

      if (currencies.length === 0) {
        const noDataText = languageService ? languageService.t('noData') : 'Döviz kuru bulunamadı.';
        container.innerHTML = `<tr><td colspan="3" class="no-data">${noDataText}</td></tr>`;
        return;
      }

      // Favori dövizleri önce göster
      const favorites = favoriteService ? favoriteService.getFavorites() : new Set();
      const favoriteCurrencies = currencies.filter(c => favorites.has(c.code));
      const otherCurrencies = currencies.filter(c => !favorites.has(c.code));

      // Önce favoriler, sonra diğerleri
      const sortedCurrencies = [...favoriteCurrencies, ...otherCurrencies];

      sortedCurrencies.forEach(currency => {
        container.appendChild(this.renderRow(currency, favoriteService, onFavoriteToggle, languageService));
      });
    }
  }

  // ============================================================================
  // Presentation Layer: Filter Rendering
  // ============================================================================
  class FilterRenderer {
    static renderCheckboxes(currencies, filterService, onToggle) {
      const container = document.getElementById(CONFIG.UI_IDS.FILTER_CHECKBOXES);
      container.innerHTML = '';

      currencies.forEach(currency => {
        const label = document.createElement('label');
        label.className = 'filter-checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = currency.code;
        checkbox.checked = filterService.isSelected(currency.code);
        checkbox.addEventListener('change', async () => {
          await filterService.toggle(currency.code);
          onToggle();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${currency.code}`));
        container.appendChild(label);
      });
    }

    static updateCheckboxes(filterService) {
      const checkboxes = document.querySelectorAll(`#${CONFIG.UI_IDS.FILTER_CHECKBOXES} input[type="checkbox"]`);
      checkboxes.forEach(checkbox => {
        checkbox.checked = filterService.isSelected(checkbox.value);
      });
    }
  }

  // ============================================================================
  // Business Logic: Currency Converter
  // ============================================================================
  class ConverterService {
    constructor() {
      this._currencies = [];
      this._tryRate = 1;
    }

    setCurrencies(currencies) {
      this._currencies = currencies;
    }

    convert(amount, fromCode, toCode) {
      if (fromCode === 'TRY' && toCode === 'TRY') {
        return amount;
      }

      const fromCurrency = fromCode === 'TRY' ? null : this._currencies.find(c => c.code === fromCode);
      const toCurrency = toCode === 'TRY' ? null : this._currencies.find(c => c.code === toCode);

      if (fromCode !== 'TRY' && !fromCurrency) {
        throw new Error(`Currency not found: ${fromCode}`);
      }
      if (toCode !== 'TRY' && !toCurrency) {
        throw new Error(`Currency not found: ${toCode}`);
      }

      let tryAmount = amount;

      if (fromCode !== 'TRY') {
        const fromRate = fromCurrency.selling;
        const fromUnit = fromCurrency.unit;
        tryAmount = (amount * fromRate) / fromUnit;
      }

      if (toCode === 'TRY') {
        return tryAmount;
      }

      const toRate = toCurrency.buying;
      const toUnit = toCurrency.unit;
      return (tryAmount * toUnit) / toRate;
    }

    getAvailableCurrencies() {
      return [
        { code: 'TRY', name: 'Türk Lirası', unit: 1 },
        ...this._currencies.map(c => ({ code: c.code, name: c.originalName, unit: c.unit }))
      ];
    }
  }

  // ============================================================================
  // Presentation Layer: Modal Management
  // ============================================================================
  class ModalManager {
    static open() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'block';
    }

    static close() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'none';
    }

    static openCalculator() {
      document.getElementById('calculatorModal').style.display = 'block';
    }

    static closeCalculator() {
      document.getElementById('calculatorModal').style.display = 'none';
    }
  }

  // ============================================================================
  // Application Layer: Main Application
  // ============================================================================
  class ExchangeRateApp {
    constructor() {
      // Dependency Injection
      const storageService = new StorageService();
      const filterRepository = new FilterRepository(storageService);
      const filterService = new FilterService(filterRepository);
      const favoriteRepository = new FavoriteRepository(storageService);
      const favoriteService = new FavoriteService(favoriteRepository);
      const themeService = new ThemeService(storageService);
      const languageService = new LanguageService(storageService);
      const converterService = new ConverterService();

      this._ui = new UIManager();
      this._filterService = filterService;
      this._favoriteService = favoriteService;
      this._themeService = themeService;
      this._languageService = languageService;
      this._converterService = converterService;
      this._lastUpdateData = null;

      this._initialize();
    }

    async _initialize() {
      this._initializeDateInput();
      await this._languageService.initialize();
      await this._themeService.initialize();
      await this._favoriteService.initialize();
      this._updateUITexts();
      this._initializeEventListeners();
      this._loadRates();
    }

    _initializeDateInput() {
      const today = DateFormatter.getTodayString();
      this._ui.elements.dateInput.value = today;
      this._ui.elements.dateInput.max = today;
    }

    _updateUITexts() {
      const t = (key) => this._languageService.t(key);

      // Header
      document.querySelector('h1').textContent = t('title');
      document.querySelector('.date-label').textContent = t('dateLabel');
      this._ui.elements.todayBtn.textContent = t('todayBtn');

      // Last Update (mevcut tarih varsa yeniden çevir)
      if (this._lastUpdateData) {
        const { dateString, isToday } = this._lastUpdateData;
        const displayMessage = isToday
          ? `${t('lastUpdate')} ${dateString}`
          : `${t('lastUpdate')} ${dateString} ${t('ratesNotPublished')}`;
        this._ui.updateLastUpdate(displayMessage);
      }

      // Buttons
      if (this._ui.elements.themeBtn) {
        this._ui.elements.themeBtn.setAttribute('title', t('themeToggle'));
      }
      if (this._ui.elements.exportBtn) {
        this._ui.elements.exportBtn.setAttribute('title', t('exportBtn'));
        const exportText = this._ui.elements.exportBtn.querySelector('.export-text');
        if (exportText) {
          exportText.textContent = t('exportBtnShort');
        }
      }
      if (this._ui.elements.settingsBtn) {
        this._ui.elements.settingsBtn.setAttribute('title', t('settingsBtn'));
      }
      if (this._ui.elements.calculatorBtn) {
        this._ui.elements.calculatorBtn.setAttribute('title', t('calculatorBtn'));
      }
      if (this._ui.elements.languageBtn) {
        const langFlag = this._ui.elements.languageBtn.querySelector('.language-flag');
        if (langFlag) {
          const getFlagSvg = (lang) => {
            const style = 'width: 24px; height: 16px; border-radius: 2px; display: block;';
            switch (lang) {
              case 'tr':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" style="${style}"><rect width="1200" height="800" fill="#E30A17"/><circle cx="444" cy="400" r="240" fill="#ffffff"/><circle cx="472" cy="400" r="192" fill="#E30A17"/><path fill="#ffffff" d="M583.334 400l183.333 59.574-113.334-155.992v192.836l113.334-155.992z"/></svg>`;
              case 'en':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 30" style="${style}"><clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath><clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath><g clip-path="url(#s)"><path d="M0,0 v30 h60 v-30 z" fill="#012169"/><path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0 L60,30 M60,0 L0,30" clip-path="url(#t)" stroke="#C8102E" stroke-width="4"/><path d="M30,0 v30 M0,15 h60" stroke="#fff" stroke-width="10"/><path d="M30,0 v30 M0,15 h60" stroke="#C8102E" stroke-width="6"/></g></svg>`;
              case 'de':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 5 3" style="${style}"><rect width="5" height="3" y="0" x="0" fill="#000"/><rect width="5" height="2" y="1" x="0" fill="#D00"/><rect width="5" height="1" y="2" x="0" fill="#FFCE00"/></svg>`;
              case 'fr':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 3 2" style="${style}"><rect width="1" height="2" x="0" fill="#0055A4"/><rect width="1" height="2" x="1" fill="#FFF"/><rect width="1" height="2" x="2" fill="#EF4135"/></svg>`;
              case 'es':
                return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 750 500" style="${style}"><rect width="750" height="500" fill="#AA151B"/><rect width="750" height="250" y="125" fill="#F1BF00"/></svg>`;
              default:
                return '🇹🇷';
            }
          };
          langFlag.innerHTML = getFlagSvg(this._languageService.getCurrentLanguage());
        }
        this._ui.elements.languageBtn.setAttribute('title', t('languageToggle'));
      }

      // Calculator Modal
      const calculatorTitle = document.getElementById('calculatorTitle');
      const amountLabel = document.getElementById('amountLabel');
      const fromCurrencyLabel = document.getElementById('fromCurrencyLabel');
      const toCurrencyLabel = document.getElementById('toCurrencyLabel');
      const resultLabel = document.getElementById('resultLabel');
      const calculatorNote = document.getElementById('calculatorNote');
      if (calculatorTitle) calculatorTitle.textContent = t('calculatorTitle');
      if (amountLabel) amountLabel.textContent = t('amountLabel');
      if (fromCurrencyLabel) fromCurrencyLabel.textContent = t('fromCurrencyLabel');
      if (toCurrencyLabel) toCurrencyLabel.textContent = t('toCurrencyLabel');
      if (resultLabel) resultLabel.textContent = t('resultLabel');
      if (calculatorNote) calculatorNote.textContent = t('calculatorNote');
      if (this._ui.elements.swapBtn) {
        this._ui.elements.swapBtn.setAttribute('title', t('swapCurrencies'));
      }

      // Update calculator date if modal is open
      if (document.getElementById('calculatorModal').style.display === 'block') {
        this._updateCalculatorDate();
      }

      // Search
      this._ui.elements.searchInput.setAttribute('placeholder', t('searchPlaceholder'));

      // Filter Modal
      document.querySelector('.filter-modal-header h2').textContent = t('filterModalTitle');
      this._ui.elements.selectAllBtn.textContent = t('selectAllBtn');
      this._ui.elements.deselectAllBtn.textContent = t('deselectAllBtn');

      // Table Headers
      const headers = document.querySelectorAll('.rates-table th');
      if (headers[0]) headers[0].textContent = t('currencyHeader');
      if (headers[1]) headers[1].textContent = t('buyingHeader');
      if (headers[2]) headers[2].textContent = t('sellingHeader');

      // Error
      const errorP = document.querySelector('.error p');
      if (errorP) errorP.textContent = t('errorMessage');
      this._ui.elements.retryBtn.textContent = t('retryBtn');

      // Loading
      const loadingP = document.querySelector('.loading p');
      if (loadingP) loadingP.textContent = t('loading');

      // Footer
      const footerBy = document.getElementById('footerBy');
      const footerDeveloped = document.getElementById('footerDeveloped');
      if (footerBy) footerBy.textContent = t('footerBy');
      if (footerDeveloped) footerDeveloped.textContent = t('footerDeveloped');
    }

    _initializeEventListeners() {
      this._ui.elements.dateInput.addEventListener('change', (e) => {
        const date = e.target.value ? new Date(e.target.value) : null;
        this._loadRates(date);
      });

      this._ui.elements.todayBtn.addEventListener('click', () => {
        const today = DateFormatter.getTodayString();
        this._ui.elements.dateInput.value = today;
        this._loadRates(null);
      });

      this._ui.elements.retryBtn.addEventListener('click', () => {
        const date = this._ui.elements.dateInput.value ? new Date(this._ui.elements.dateInput.value) : null;
        this._loadRates(date);
      });

      this._ui.elements.searchInput.addEventListener('input', () => {
        this._applyFilters();
      });

      this._ui.elements.settingsBtn.addEventListener('click', () => {
        ModalManager.open();
      });

      if (this._ui.elements.exportBtn) {
        this._ui.elements.exportBtn.addEventListener('click', () => {
          this._exportData();
        });
      }

      if (this._ui.elements.themeBtn) {
        this._ui.elements.themeBtn.addEventListener('click', async () => {
          await this._themeService.toggle();
        });
      }

      if (this._ui.elements.languageBtn) {
        this._ui.elements.languageBtn.addEventListener('click', async () => {
          await this._languageService.toggle();
          this._updateUITexts();
          this._applyFilters();
        });
      }

      if (this._ui.elements.calculatorBtn) {
        this._ui.elements.calculatorBtn.addEventListener('click', () => {
          this._openCalculator();
        });
      }

      this._ui.elements.closeFilterBtn.addEventListener('click', () => {
        ModalManager.close();
      });

      if (this._ui.elements.closeCalculatorBtn) {
        this._ui.elements.closeCalculatorBtn.addEventListener('click', () => {
          ModalManager.closeCalculator();
        });
      }

      if (this._ui.elements.calculatorModalOverlay) {
        this._ui.elements.calculatorModalOverlay.addEventListener('click', () => {
          ModalManager.closeCalculator();
        });
      }

      if (this._ui.elements.swapBtn) {
        this._ui.elements.swapBtn.addEventListener('click', () => {
          this._swapCurrencies();
        });
      }

      if (this._ui.elements.amountInput) {
        this._ui.elements.amountInput.addEventListener('input', () => {
          this._calculate();
        });
      }

      if (this._ui.elements.fromCurrency) {
        this._ui.elements.fromCurrency.addEventListener('change', () => {
          this._calculate();
        });
      }

      if (this._ui.elements.toCurrency) {
        this._ui.elements.toCurrency.addEventListener('change', () => {
          this._calculate();
        });
      }

      this._ui.elements.filterModalOverlay.addEventListener('click', () => {
        ModalManager.close();
      });

      this._ui.elements.selectAllBtn.addEventListener('click', async () => {
        await this._filterService.selectAll();
        FilterRenderer.updateCheckboxes(this._filterService);
        this._applyFilters();
      });

      this._ui.elements.deselectAllBtn.addEventListener('click', async () => {
        await this._filterService.deselectAll();
        FilterRenderer.updateCheckboxes(this._filterService);
        this._applyFilters();
      });
    }

    async _loadRates(selectedDate = null) {
      const t = (key) => this._languageService.t(key);
      this._ui.showLoading();
      this._ui.updateLastUpdate(t('loading'));
      this._ui.clearSearch();
      this._ui.clearTable();

      try {
        const today = selectedDate || new Date();
        const yesterday = DateFormatter.getPreviousDay(today);

        const [todayResponse, yesterdayResponse] = await Promise.all([
          fetch(CurrencyApiService.buildApiUrl(selectedDate ? today : null)),
          fetch(CurrencyApiService.buildApiUrl(yesterday))
        ]);

        if (!todayResponse.ok) {
          throw new Error(`HTTP ${todayResponse.status}`);
        }

        const todayXml = CurrencyApiService.parseXmlResponse(await todayResponse.text());
        const todayData = CurrencyApiService.extractCurrencyData(todayXml);

        let yesterdayData = [];
        if (yesterdayResponse.ok) {
          try {
            const yesterdayXml = CurrencyApiService.parseXmlResponse(await yesterdayResponse.text());
            yesterdayData = CurrencyApiService.extractCurrencyData(yesterdayXml);
          } catch (e) {
            console.warn('Previous day data unavailable', e);
          }
        }

        const mergedData = CurrencyApiService.mergeWithPreviousDay(todayData, yesterdayData);
        const sortedData = CurrencyApiService.sortByPopularity(mergedData);

        this._converterService.setCurrencies(sortedData);

        await this._filterService.initialize(sortedData);
        FilterRenderer.renderCheckboxes(sortedData, this._filterService, () => this._applyFilters());

        const dateAttr = todayXml.querySelector('Tarih_Date')?.getAttribute('Tarih') ||
          todayXml.querySelector('Tarih_Date')?.getAttribute('Date');
        const formattedDate = DateFormatter.formatTcmbDate(dateAttr) ||
          new Date().toLocaleDateString('tr-TR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric'
          });

        const isToday = this._isToday(dateAttr);
        const t = (key) => this._languageService.t(key);

        // Tarih verisini sakla (dil değiştirirken kullanmak için)
        this._lastUpdateData = { dateString: formattedDate, isToday };

        const displayMessage = isToday
          ? `${t('lastUpdate')} ${formattedDate}`
          : `${t('lastUpdate')} ${formattedDate} ${t('ratesNotPublished')}`;

        this._ui.updateLastUpdate(displayMessage);
        this._applyFilters();
        this._ui.showTable();
        this._ui.hideLoading();

      } catch (error) {
        console.error('Failed to load exchange rates:', error);
        this._ui.hideLoading();
        const t = (key) => this._languageService.t(key);
        this._ui.showError(`${t('errorTitle')}: ${error.message || t('errorMessage')}`);
      }
    }

    _applyFilters() {
      const searchTerm = this._ui.elements.searchInput.value;
      const allCurrencies = this._filterService.getAllCurrencies();
      const filtered = this._filterService.filter(allCurrencies, searchTerm);
      CurrencyRenderer.renderTable(
        filtered,
        this._ui.elements.currencies,
        this._favoriteService,
        () => this._applyFilters(),
        this._languageService
      );
      this._ui.showTable();
    }

    _isToday(tcmbDate) {
      if (!tcmbDate) return false;

      const parts = tcmbDate.split('.');
      if (parts.length !== 3) return false;

      const [day, month, year] = parts.map(p => parseInt(p, 10));
      const today = new Date();

      return day === today.getDate() &&
        month === (today.getMonth() + 1) &&
        year === today.getFullYear();
    }

    _exportData() {
      try {
        const searchTerm = this._ui.elements.searchInput.value;
        const allCurrencies = this._filterService.getAllCurrencies();
        const filtered = this._filterService.filter(allCurrencies, searchTerm);
        const t = (key) => this._languageService.t(key);

        if (filtered.length === 0) {
          alert(t('exportNoData'));
          return;
        }

        const dateString = this._ui.elements.dateInput.value;
        ExportService.exportToExcel(filtered, dateString, this._languageService);
      } catch (error) {
        console.error('Export hatası:', error);
        alert(`${t('exportError')} ${error.message}`);
      }
    }

    _openCalculator() {
      this._populateCurrencySelects();
      this._updateCalculatorDate();
      ModalManager.openCalculator();
      this._calculate();
    }

    _updateCalculatorDate() {
      const t = (key) => this._languageService.t(key);
      const calculatorDateEl = document.getElementById('calculatorDate');

      if (calculatorDateEl && this._lastUpdateData && this._lastUpdateData.dateString) {
        calculatorDateEl.textContent = `${t('cbrtRateDate')} ${this._lastUpdateData.dateString}`;
      }
    }

    _populateCurrencySelects() {
      const currencies = this._converterService.getAvailableCurrencies();
      const t = (key) => this._languageService.t('currencyNames.' + key) || key;

      const fromSelect = this._ui.elements.fromCurrency;
      const toSelect = this._ui.elements.toCurrency;

      fromSelect.innerHTML = '';
      toSelect.innerHTML = '';

      currencies.forEach(currency => {
        const displayName = currency.code === 'TRY'
          ? currency.name
          : this._languageService.getCurrentLanguage() === 'en'
            ? t(currency.name) || currency.name
            : currency.name;

        const option1 = document.createElement('option');
        option1.value = currency.code;
        option1.textContent = `${currency.code}${currency.unit > 1 ? ` (${currency.unit})` : ''} - ${displayName}`;

        const option2 = document.createElement('option');
        option2.value = currency.code;
        option2.textContent = `${currency.code}${currency.unit > 1 ? ` (${currency.unit})` : ''} - ${displayName}`;

        fromSelect.appendChild(option1);
        toSelect.appendChild(option2);
      });

      fromSelect.value = 'TRY';
      toSelect.value = 'USD';
    }

    _calculate() {
      try {
        const amount = parseFloat(this._ui.elements.amountInput.value) || 0;
        const fromCode = this._ui.elements.fromCurrency.value;
        const toCode = this._ui.elements.toCurrency.value;

        const result = this._converterService.convert(amount, fromCode, toCode);
        this._ui.elements.resultInput.value = result.toFixed(4).replace('.', ',');
      } catch (error) {
        console.error('Conversion error:', error);
        this._ui.elements.resultInput.value = 'Hata';
      }
    }

    _swapCurrencies() {
      const fromValue = this._ui.elements.fromCurrency.value;
      const toValue = this._ui.elements.toCurrency.value;

      this._ui.elements.fromCurrency.value = toValue;
      this._ui.elements.toCurrency.value = fromValue;

      this._calculate();
    }
  }

  // ============================================================================
  // Application Bootstrap
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    new ExchangeRateApp();
  });

})();

(function() {
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
    STORAGE_KEYS: {
      SELECTED_CURRENCIES: 'selectedCurrencies',
      IS_INITIALIZED: 'isInitialized',
      FAVORITE_CURRENCIES: 'favoriteCurrencies'
    },
    UI_IDS: {
      DATE_INPUT: 'dateInput',
      TODAY_BTN: 'todayBtn',
      RETRY_BTN: 'retryBtn',
      SEARCH_INPUT: 'searchInput',
      SETTINGS_BTN: 'settingsBtn',
      EXPORT_BTN: 'exportBtn',
      CLOSE_FILTER_BTN: 'closeFilterBtn',
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
      this.buying = parseFloat(data.buying);
      this.selling = parseFloat(data.selling);
      this.banknoteBuying = parseFloat(data.banknoteBuying);
      this.banknoteSelling = parseFloat(data.banknoteSelling);
      this.unit = parseInt(data.unit, 10);
      this.yesterdayBuying = data.yesterdayBuying ?? null;
      this.yesterdaySelling = data.yesterdaySelling ?? null;
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
    static exportToExcel(currencies, dateString = null) {
      if (!currencies || currencies.length === 0) {
        throw new Error('Export için döviz verisi bulunamadı');
      }

      if (typeof XLSX === 'undefined') {
        throw new Error('Excel kütüphanesi yüklenemedi');
      }

      const date = dateString || new Date().toISOString().split('T')[0];

      const headers = ['Döviz Kodu', 'Döviz Adı', 'Birim', 'Alış', 'Satış', 'Banknot Alış', 'Banknot Satış'];
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
      XLSX.utils.book_append_sheet(wb, ws, 'TCMB Döviz Kurları');

      const fileName = `tcmb-doviz-kurlari-${date}.xlsx`;
      XLSX.writeFile(wb, fileName);
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
        closeFilterBtn: document.getElementById(ids.CLOSE_FILTER_BTN),
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
      this._elements.lastUpdate.textContent = 'Yükleniyor...';
    }

    hideLoading() {
      this._elements.loading.style.display = 'none';
    }

    showError(message) {
      this._elements.error.style.display = 'block';
      this._elements.lastUpdate.textContent = message;
    }

    updateLastUpdate(dateString) {
      this._elements.lastUpdate.textContent = `Son güncelleme: ${dateString}`;
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
    static renderRow(currency, favoriteService, onFavoriteToggle) {
      const isPopular = CONFIG.POPULAR_CURRENCIES.includes(currency.code);
      const isFavorite = favoriteService ? favoriteService.isFavorite(currency.code) : false;
      const currencyDisplay = currency.getDisplayCode();
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
      const favoriteTitle = isFavorite ? 'Favorilerden çıkar' : 'Favorilere ekle';

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
          <span class="currency-name">${currency.name}</span>
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

    static renderTable(currencies, container, favoriteService = null, onFavoriteToggle = null) {
      container.innerHTML = '';

      if (currencies.length === 0) {
        container.innerHTML = '<tr><td colspan="3" class="no-data">Döviz kuru bulunamadı.</td></tr>';
        return;
      }

      // Favori dövizleri önce göster
      const favorites = favoriteService ? favoriteService.getFavorites() : new Set();
      const favoriteCurrencies = currencies.filter(c => favorites.has(c.code));
      const otherCurrencies = currencies.filter(c => !favorites.has(c.code));

      // Önce favoriler, sonra diğerleri
      const sortedCurrencies = [...favoriteCurrencies, ...otherCurrencies];

      sortedCurrencies.forEach(currency => {
        container.appendChild(this.renderRow(currency, favoriteService, onFavoriteToggle));
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
  // Presentation Layer: Modal Management
  // ============================================================================
  class ModalManager {
    static open() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'block';
    }

    static close() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'none';
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
      
      this._ui = new UIManager();
      this._filterService = filterService;
      this._favoriteService = favoriteService;
      
      this._initialize();
    }

    async _initialize() {
      this._initializeDateInput();
      this._initializeEventListeners();
      await this._favoriteService.initialize();
      this._loadRates();
    }

    _initializeDateInput() {
      const today = DateFormatter.getTodayString();
      this._ui.elements.dateInput.value = today;
      this._ui.elements.dateInput.max = today;
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

      this._ui.elements.closeFilterBtn.addEventListener('click', () => {
        ModalManager.close();
      });

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
      this._ui.showLoading();
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

        this._ui.updateLastUpdate(formattedDate);
        this._applyFilters();
        this._ui.showTable();
        this._ui.hideLoading();

      } catch (error) {
        console.error('Failed to load exchange rates:', error);
        this._ui.hideLoading();
        this._ui.showError('Hata oluştu: ' + (error.message || 'Bilinmeyen hata'));
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
        () => this._applyFilters()
      );
      this._ui.showTable();
    }

    _exportData() {
      try {
        const searchTerm = this._ui.elements.searchInput.value;
        const allCurrencies = this._filterService.getAllCurrencies();
        const filtered = this._filterService.filter(allCurrencies, searchTerm);
        
        if (filtered.length === 0) {
          alert('Export için görüntülenecek döviz bulunamadı.');
          return;
        }

        const dateString = this._ui.elements.dateInput.value;
        ExportService.exportToExcel(filtered, dateString);
      } catch (error) {
        console.error('Export hatası:', error);
        alert('Export sırasında bir hata oluştu: ' + error.message);
      }
    }
  }

  // ============================================================================
  // Application Bootstrap
  // ============================================================================
  document.addEventListener('DOMContentLoaded', () => {
    new ExchangeRateApp();
  });

})();

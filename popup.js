(function() {
  'use strict';

  const CONFIG = {
    API_BASE_URL: 'https://www.tcmb.gov.tr/kurlar',
    POPULAR_CURRENCIES: ['USD', 'EUR', 'GBP', 'JPY', 'CHF', 'AUD', 'CAD', 'RUB', 'CNY', 'SAR', 'AED'],
    DATE_FORMAT: {
      INPUT: 'YYYY-MM-DD',
      TCMB: 'DD.MM.YYYY',
      API_PATH: 'YYYYMM/DDMMYYYY'
    },
    DECIMAL_PLACES: 4,
    UI_IDS: {
      DATE_INPUT: 'dateInput',
      TODAY_BTN: 'todayBtn',
      RETRY_BTN: 'retryBtn',
      SEARCH_INPUT: 'searchInput',
      SETTINGS_BTN: 'settingsBtn',
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

  class CurrencyService {
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
          currencies.push({
            code,
            name,
            buying: parseFloat(buying),
            selling: parseFloat(selling),
            banknoteBuying: parseFloat(banknoteBuying),
            banknoteSelling: parseFloat(banknoteSelling),
            unit: parseInt(unit, 10)
          });
        }
      });

      return currencies;
    }

    static mergeWithPreviousDay(todayData, yesterdayData) {
      return todayData.map(today => {
        const yesterday = yesterdayData.find(y => y.code === today.code);
        return {
          ...today,
          yesterdayBuying: yesterday?.buying ?? null,
          yesterdaySelling: yesterday?.selling ?? null
        };
      });
    }

    static sortByPopularity(currencies) {
      const popular = currencies.filter(c => CONFIG.POPULAR_CURRENCIES.includes(c.code));
      const others = currencies.filter(c => !CONFIG.POPULAR_CURRENCIES.includes(c.code));
      return [...popular, ...others];
    }
  }

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

  class UIManager {
    constructor() {
      this.elements = this.initializeElements();
    }

    initializeElements() {
      const ids = CONFIG.UI_IDS;
      return {
        dateInput: document.getElementById(ids.DATE_INPUT),
        todayBtn: document.getElementById(ids.TODAY_BTN),
        retryBtn: document.getElementById(ids.RETRY_BTN),
        searchInput: document.getElementById(ids.SEARCH_INPUT),
        settingsBtn: document.getElementById(ids.SETTINGS_BTN),
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

    showLoading() {
      this.elements.loading.style.display = 'flex';
      this.elements.ratesTable.style.display = 'none';
      this.elements.searchContainer.style.display = 'none';
      this.elements.error.style.display = 'none';
      this.elements.lastUpdate.textContent = 'Yükleniyor...';
    }

    hideLoading() {
      this.elements.loading.style.display = 'none';
    }

    showError(message) {
      this.elements.error.style.display = 'block';
      this.elements.lastUpdate.textContent = message;
    }

    updateLastUpdate(dateString) {
      this.elements.lastUpdate.textContent = `Son güncelleme: ${dateString}`;
    }

    showTable() {
      this.elements.ratesTable.style.display = 'table';
      this.elements.searchContainer.style.display = 'block';
    }

    clearSearch() {
      this.elements.searchInput.value = '';
    }

    clearTable() {
      this.elements.currencies.innerHTML = '';
    }
  }

  class FilterManager {
    constructor() {
      this.selectedCurrencies = new Set();
      this.allCurrencies = [];
    }

    initialize(currencies) {
      this.allCurrencies = currencies;
      if (this.selectedCurrencies.size === 0) {
        currencies.forEach(c => this.selectedCurrencies.add(c.code));
      }
    }

    selectAll() {
      this.allCurrencies.forEach(c => this.selectedCurrencies.add(c.code));
    }

    deselectAll() {
      this.selectedCurrencies.clear();
    }

    toggle(currencyCode) {
      if (this.selectedCurrencies.has(currencyCode)) {
        this.selectedCurrencies.delete(currencyCode);
      } else {
        this.selectedCurrencies.add(currencyCode);
      }
    }

    isSelected(currencyCode) {
      return this.selectedCurrencies.has(currencyCode);
    }

    filter(currencies, searchTerm = '') {
      const term = searchTerm.toLowerCase().trim();
      
      return currencies.filter(currency => {
        if (this.selectedCurrencies.size > 0 && !this.selectedCurrencies.has(currency.code)) {
          return false;
        }

        if (term) {
          const code = currency.code.toLowerCase();
          const name = currency.name.toLowerCase();
          return code.includes(term) || name.includes(term);
        }

        return true;
      });
    }
  }

  class CurrencyRenderer {
    static getChangeIndicator(today, yesterday) {
      if (!yesterday || yesterday === 0) return '';
      if (today > yesterday) return 'increase';
      if (today < yesterday) return 'decrease';
      return '';
    }

    static formatCurrencyDisplay(currency) {
      return currency.unit > 1 ? `${currency.code} (${currency.unit})` : currency.code;
    }

    static renderRow(currency) {
      const isPopular = CONFIG.POPULAR_CURRENCIES.includes(currency.code);
      const currencyDisplay = this.formatCurrencyDisplay(currency);
      const buyingChange = this.getChangeIndicator(currency.buying, currency.yesterdayBuying);
      const sellingChange = this.getChangeIndicator(currency.selling, currency.yesterdaySelling);

      const yesterdayBuyingHtml = currency.yesterdayBuying !== null
        ? `<span class="yesterday-value ${buyingChange}">(${NumberFormatter.format(currency.yesterdayBuying)})</span>`
        : '';

      const yesterdaySellingHtml = currency.yesterdaySelling !== null
        ? `<span class="yesterday-value ${sellingChange}">(${NumberFormatter.format(currency.yesterdaySelling)})</span>`
        : '';

      const row = document.createElement('tr');
      if (isPopular) {
        row.classList.add('popular');
      }

      row.innerHTML = `
        <td class="currency-cell">
          <span class="currency-code">${currencyDisplay}</span>
          <span class="currency-name">${currency.name}</span>
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

      return row;
    }

    static renderTable(currencies, container) {
      container.innerHTML = '';

      if (currencies.length === 0) {
        container.innerHTML = '<tr><td colspan="3" class="no-data">Döviz kuru bulunamadı.</td></tr>';
        return;
      }

      currencies.forEach(currency => {
        container.appendChild(this.renderRow(currency));
      });
    }
  }

  class FilterRenderer {
    static renderCheckboxes(currencies, filterManager, onToggle) {
      const container = document.getElementById(CONFIG.UI_IDS.FILTER_CHECKBOXES);
      container.innerHTML = '';

      currencies.forEach(currency => {
        const label = document.createElement('label');
        label.className = 'filter-checkbox-label';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = currency.code;
        checkbox.checked = filterManager.isSelected(currency.code);
        checkbox.addEventListener('change', () => {
          filterManager.toggle(currency.code);
          onToggle();
        });

        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(` ${currency.code}`));
        container.appendChild(label);
      });
    }

    static updateCheckboxes(filterManager) {
      const checkboxes = document.querySelectorAll(`#${CONFIG.UI_IDS.FILTER_CHECKBOXES} input[type="checkbox"]`);
      checkboxes.forEach(checkbox => {
        checkbox.checked = filterManager.isSelected(checkbox.value);
      });
    }
  }

  class ModalManager {
    static open() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'block';
    }

    static close() {
      document.getElementById(CONFIG.UI_IDS.FILTER_MODAL).style.display = 'none';
    }
  }

  class ExchangeRateApp {
    constructor() {
      this.ui = new UIManager();
      this.filterManager = new FilterManager();
      this.initializeEventListeners();
      this.initializeDateInput();
      this.loadRates();
    }

    initializeDateInput() {
      const today = DateFormatter.getTodayString();
      this.ui.elements.dateInput.value = today;
      this.ui.elements.dateInput.max = today;
    }

    initializeEventListeners() {
      this.ui.elements.dateInput.addEventListener('change', (e) => {
        const date = e.target.value ? new Date(e.target.value) : null;
        this.loadRates(date);
      });

      this.ui.elements.todayBtn.addEventListener('click', () => {
        const today = DateFormatter.getTodayString();
        this.ui.elements.dateInput.value = today;
        this.loadRates(null);
      });

      this.ui.elements.retryBtn.addEventListener('click', () => {
        const date = this.ui.elements.dateInput.value ? new Date(this.ui.elements.dateInput.value) : null;
        this.loadRates(date);
      });

      this.ui.elements.searchInput.addEventListener('input', () => {
        this.applyFilters();
      });

      this.ui.elements.settingsBtn.addEventListener('click', () => {
        ModalManager.open();
      });

      this.ui.elements.closeFilterBtn.addEventListener('click', () => {
        ModalManager.close();
      });

      this.ui.elements.filterModalOverlay.addEventListener('click', () => {
        ModalManager.close();
      });

      this.ui.elements.selectAllBtn.addEventListener('click', () => {
        this.filterManager.selectAll();
        FilterRenderer.updateCheckboxes(this.filterManager);
        this.applyFilters();
      });

      this.ui.elements.deselectAllBtn.addEventListener('click', () => {
        this.filterManager.deselectAll();
        FilterRenderer.updateCheckboxes(this.filterManager);
        this.applyFilters();
      });
    }

    async loadRates(selectedDate = null) {
      this.ui.showLoading();
      this.ui.clearSearch();
      this.ui.clearTable();

      try {
        const today = selectedDate || new Date();
        const yesterday = DateFormatter.getPreviousDay(today);

        const [todayResponse, yesterdayResponse] = await Promise.all([
          fetch(CurrencyService.buildApiUrl(selectedDate ? today : null)),
          fetch(CurrencyService.buildApiUrl(yesterday))
        ]);

        if (!todayResponse.ok) {
          throw new Error(`HTTP ${todayResponse.status}`);
        }

        const todayXml = CurrencyService.parseXmlResponse(await todayResponse.text());
        const todayData = CurrencyService.extractCurrencyData(todayXml);

        let yesterdayData = [];
        if (yesterdayResponse.ok) {
          try {
            const yesterdayXml = CurrencyService.parseXmlResponse(await yesterdayResponse.text());
            yesterdayData = CurrencyService.extractCurrencyData(yesterdayXml);
          } catch (e) {
            console.warn('Previous day data unavailable', e);
          }
        }

        const mergedData = CurrencyService.mergeWithPreviousDay(todayData, yesterdayData);
        const sortedData = CurrencyService.sortByPopularity(mergedData);

        this.filterManager.initialize(sortedData);
        FilterRenderer.renderCheckboxes(sortedData, this.filterManager, () => this.applyFilters());

        const dateAttr = todayXml.querySelector('Tarih_Date')?.getAttribute('Tarih') || 
                         todayXml.querySelector('Tarih_Date')?.getAttribute('Date');
        const formattedDate = DateFormatter.formatTcmbDate(dateAttr) || 
                             new Date().toLocaleDateString('tr-TR', {
                               day: '2-digit',
                               month: 'long',
                               year: 'numeric'
                             });

        this.ui.updateLastUpdate(formattedDate);
        this.applyFilters();
        this.ui.showTable();
        this.ui.hideLoading();

      } catch (error) {
        console.error('Failed to load exchange rates:', error);
        this.ui.hideLoading();
        this.ui.showError('Hata oluştu');
      }
    }

    applyFilters() {
      const searchTerm = this.ui.elements.searchInput.value;
      const filtered = this.filterManager.filter(this.filterManager.allCurrencies, searchTerm);
      CurrencyRenderer.renderTable(filtered, this.ui.elements.currencies);
      this.ui.showTable();
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    new ExchangeRateApp();
  });

})();

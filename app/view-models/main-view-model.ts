import { Observable } from '@nativescript/core';
import { ExchangeRateService } from '../services/exchange-rate.service';
import { currencies, Currency } from '../models/currency';

export class MainViewModel extends Observable {
    private exchangeRateService: ExchangeRateService;
    private _fromCurrency: Currency;
    private _toCurrency: Currency;
    private _currentRate: number = 0;
    private _lastScannedAmount: number = 0;
    private _convertedAmount: number = 0;

    constructor() {
        super();
        this.exchangeRateService = new ExchangeRateService();
        this._fromCurrency = currencies[0]; // デフォルトで日本円
        this._toCurrency = currencies[1];   // デフォルトで米ドル
        this.updateCurrentRate();
    }

    async updateCurrentRate() {
        this.currentRate = await this.exchangeRateService.getExchangeRate(
            this.fromCurrency.code,
            this.toCurrency.code
        );
    }

    async convertScannedAmount(amount: number) {
        this.lastScannedAmount = amount;
        this.convertedAmount = await this.exchangeRateService.convertCurrency(
            amount,
            this.fromCurrency.code,
            this.toCurrency.code
        );
    }

    // ゲッターとセッター
    get availableCurrencies(): Currency[] {
        return currencies;
    }

    get fromCurrency(): Currency {
        return this._fromCurrency;
    }

    set fromCurrency(value: Currency) {
        this._fromCurrency = value;
        this.notifyPropertyChange('fromCurrency', value);
        this.updateCurrentRate();
    }

    get toCurrency(): Currency {
        return this._toCurrency;
    }

    set toCurrency(value: Currency) {
        this._toCurrency = value;
        this.notifyPropertyChange('toCurrency', value);
        this.updateCurrentRate();
    }

    get currentRate(): number {
        return this._currentRate;
    }

    set currentRate(value: number) {
        this._currentRate = value;
        this.notifyPropertyChange('currentRate', value);
    }

    get lastScannedAmount(): number {
        return this._lastScannedAmount;
    }

    set lastScannedAmount(value: number) {
        this._lastScannedAmount = value;
        this.notifyPropertyChange('lastScannedAmount', value);
    }

    get convertedAmount(): number {
        return this._convertedAmount;
    }

    set convertedAmount(value: number) {
        this._convertedAmount = value;
        this.notifyPropertyChange('convertedAmount', value);
    }
}
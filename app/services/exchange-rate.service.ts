import { Observable } from '@nativescript/core';

export class ExchangeRateService extends Observable {
    async getExchangeRate(from: string, to: string): Promise<number> {
        try {
            // 無料のAPIを使用
            const response = await fetch(
                `https://open.er-api.com/v6/latest/${from}`
            );
            const data = await response.json();
            return data.rates[to];
        } catch (error) {
            console.error('為替レートの取得に失敗しました:', error);
            return 0;
        }
    }

    async convertCurrency(amount: number, from: string, to: string): Promise<number> {
        const rate = await this.getExchangeRate(from, to);
        return amount * rate;
    }
}
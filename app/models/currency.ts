export interface Currency {
    code: string;
    name: string;
    symbol: string;
}

export const currencies: Currency[] = [
    { code: 'JPY', name: '日本円', symbol: '¥' },
    { code: 'USD', name: '米ドル', symbol: '$' },
    { code: 'EUR', name: 'ユーロ', symbol: '€' },
    { code: 'MXN', name: 'メキシコペソ', symbol: 'Mex$' },
    { code: 'GBP', name: 'イギリスポンド', symbol: '£' },
    { code: 'AUD', name: 'オーストラリアドル', symbol: 'A$' },
    { code: 'CNY', name: '中国人民元', symbol: '元' }
];
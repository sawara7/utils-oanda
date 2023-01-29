export declare const MAX_POSITION_SIZE = 1000;
export declare const MAX_ORDER_SIZE = 1000;
export declare type OrderID = string;
export declare type DateTime = string;
export declare type TradeID = string;
export declare type ClientID = string;
export declare type PriceValue = string;
export declare type TransactionID = string;
export declare type DecimalNumber = string;
export declare const InstrumentNames: readonly ["AUD_CHF", "CAD_SGD", "USD_INR", "GBP_SGD", "USD_SEK", "NZD_HKD", "EUR_SEK", "USD_SGD", "SGD_CHF", "EUR_CHF", "TRY_JPY", "USD_JPY", "EUR_TRY", "USD_HUF", "AUD_SGD", "AUD_CAD", "CAD_HKD", "NZD_SGD", "USD_CZK", "AUD_NZD", "SGD_JPY", "SGD_HKD", "HKD_JPY", "CHF_ZAR", "NZD_USD", "EUR_USD", "USD_DKK", "USD_PLN", "GBP_AUD", "USD_MXN", "GBP_USD", "CHF_HKD", "NZD_CAD", "GBP_CHF", "USD_THB", "USD_NOK", "USD_TRY", "GBP_JPY", "USD_CHF", "EUR_NOK", "EUR_ZAR", "EUR_CAD", "USD_HKD", "NZD_CHF", "EUR_DKK", "EUR_PLN", "EUR_NZD", "GBP_PLN", "ZAR_JPY", "EUR_HKD", "CAD_CHF", "CHF_JPY", "USD_CNH", "GBP_ZAR", "EUR_SGD", "AUD_USD", "CAD_JPY", "USD_ZAR", "NZD_JPY", "EUR_CZK", "EUR_AUD", "AUD_JPY", "GBP_NZD", "GBP_HKD", "GBP_CAD", "USD_SAR", "AUD_HKD", "EUR_HUF", "USD_CAD", "EUR_JPY", "EUR_GBP"];
export declare type InstrumentName = typeof InstrumentNames[number];
export declare const InstrumentTypes: readonly ["CURRENCY", "CFD", "METAL"];
export declare type InstrumentType = typeof InstrumentTypes[number];
export interface ApiConfig {
    endPoint?: string;
    keepAlive?: boolean;
    timeout?: number;
}
export interface OANDAApiConfig extends ApiConfig {
    apiToken: string;
    accountID: string;
    minOrderInterval?: number;
}
export declare const TimeInForces: string[];
export declare type TimeInForce = typeof TimeInForces[number];
export declare const OrderTypes: readonly ["MARKET", "LIMIT", "STOP", "MARKET_IF_TOUCHED", "TAKE_PROFIT", "STOP_LOSS", "GUARANTEED_STOP_LOSS", "TRAILING_STOP_LOSS", "FIXED_PRICE"];
export declare type OrderType = typeof OrderTypes[number];
export declare const orderTriggerConditions: readonly ["DEFAULT", "INVERSE", "BID", "ASK", "MID"];
export declare type OrderTriggerCondition = typeof orderTriggerConditions[number];
export declare const OrderStates: readonly ["PENDING", "FILLED", "TRIGGERED", "CANCELLED"];
export declare type OrderState = typeof OrderStates[number];
export declare const TransactionTypes: readonly ["ORDER", "FUNDING", "ADMIN", "CREATE", "CLOSE", "REOPEN", "ORDER_FILL", "DAILY_FINANCING", "RESET_RESETTAB"];
export declare type TransactionType = typeof TransactionTypes[number];
export declare type OrderFillReason = string;
export interface wsTrade {
    id: number;
    time: string;
    side: string;
    size: number;
    price: number;
    liquidation: boolean;
}
export interface wsTicker {
    time: string;
    bid: number;
    ask: number;
    last: number;
}
export interface wsFill {
    fee: number;
    feeRate: number;
    future: string;
    id: number;
    liquidity: string;
    market: string;
    orderId: number;
    tradeId: number;
    price: number;
    side: string;
    size: number;
    time: string;
    type: string;
}
export interface wsOrder {
    id: string;
    market: string;
    type: string;
    side: string;
    size: number;
    price: number;
    status: string;
    filledSize: number;
    remainingSize: number;
    avgFillPrice: number;
}

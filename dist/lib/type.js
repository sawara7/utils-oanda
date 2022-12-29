"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypes = exports.oandaPairs = exports.oaOrderStates = exports.orderTriggerConditions = exports.oandaOrderTypes = exports.MAX_ORDER_SIZE = exports.MAX_POSITION_SIZE = void 0;
exports.MAX_POSITION_SIZE = 1000;
exports.MAX_ORDER_SIZE = 1000;
exports.oandaOrderTypes = [
    "MARKET",
    "LIMIT",
    "STOP",
    "MARKET_IF_TOUCHED",
    "TAKE_PROFIT",
    "STOP_LOSS",
    "GUARANTEED_STOP_LOSS",
    "TRAILING_STOP_LOSS",
    "FIXED_PRICE" //A Fixed Price Order
];
exports.orderTriggerConditions = [
    "DEFAULT",
    "INVERSE",
    "BID",
    "ASK",
    "MID" //Trigger an Order by comparing its price to the midpoint regardless of whether it is long or short.
];
exports.oaOrderStates = [
    "PENDING",
    "FILLED",
    "TRIGGERED",
    "CANCELLED"
];
exports.oandaPairs = [
    'AUD_CHF',
    'CAD_SGD',
    'USD_INR',
    'GBP_SGD',
    'USD_SEK',
    'NZD_HKD',
    'EUR_SEK',
    'USD_SGD',
    'SGD_CHF',
    'EUR_CHF',
    'TRY_JPY',
    'USD_JPY',
    'EUR_TRY',
    'USD_HUF',
    'AUD_SGD',
    'AUD_CAD',
    'CAD_HKD',
    'NZD_SGD',
    'USD_CZK',
    'AUD_NZD',
    'SGD_JPY',
    'SGD_HKD',
    'HKD_JPY',
    'CHF_ZAR',
    'NZD_USD',
    'EUR_USD',
    'USD_DKK',
    'USD_PLN',
    'GBP_AUD',
    'USD_MXN',
    'GBP_USD',
    'CHF_HKD',
    'NZD_CAD',
    'GBP_CHF',
    'USD_THB',
    'USD_NOK',
    'USD_TRY',
    'GBP_JPY',
    'USD_CHF',
    'EUR_NOK',
    'EUR_ZAR',
    'EUR_CAD',
    'USD_HKD',
    'NZD_CHF',
    'EUR_DKK',
    'EUR_PLN',
    'EUR_NZD',
    'GBP_PLN',
    'ZAR_JPY',
    'EUR_HKD',
    'CAD_CHF',
    'CHF_JPY',
    'USD_CNH',
    'GBP_ZAR',
    'EUR_SGD',
    'AUD_USD',
    'CAD_JPY',
    'USD_ZAR',
    'NZD_JPY',
    'EUR_CZK',
    'EUR_AUD',
    'AUD_JPY',
    'GBP_NZD',
    'GBP_HKD',
    'GBP_CAD',
    'USD_SAR',
    'AUD_HKD',
    'EUR_HUF',
    'USD_CAD',
    'EUR_JPY',
    'EUR_GBP'
];
exports.TransactionTypes = [
    'ORDER',
    'FUNDING',
    'ADMIN',
    'CREATE',
    'CLOSE',
    'REOPEN',
    // 'CLIENT_CONFIGURE	Client Configuration Transaction
    // 'CLIENT_CONFIGURE_REJECT	Client Configuration Reject Transaction
    // 'TRANSFER_FUNDS	Transfer Funds Transaction
    // 'TRANSFER_FUNDS_REJECT	Transfer Funds Reject Transaction
    // 'MARKET_ORDER	Market Order Transaction
    // 'MARKET_ORDER_REJECT	Market Order Reject Transaction
    // 'LIMIT_ORDER	Limit Order Transaction
    // 'LIMIT_ORDER_REJECT	Limit Order Reject Transaction
    // 'STOP_ORDER	Stop Order Transaction
    // 'STOP_ORDER_REJECT	Stop Order Reject Transaction
    // 'MARKET_IF_TOUCHED_ORDER	Market if Touched Order Transaction
    // 'MARKET_IF_TOUCHED_ORDER_REJECT	Market if Touched Order Reject Transaction
    // 'TAKE_PROFIT_ORDER	Take Profit Order Transaction
    // 'TAKE_PROFIT_ORDER_REJECT	Take Profit Order Reject Transaction
    // 'STOP_LOSS_ORDER	Stop Loss Order Transaction
    // 'STOP_LOSS_ORDER_REJECT	Stop Loss Order Reject Transaction
    // 'GUARANTEED_STOP_LOSS_ORDER	Guaranteed Stop Loss Order Transaction
    // 'GUARANTEED_STOP_LOSS_ORDER_REJECT	Guaranteed Stop Loss Order Reject // 'Transaction
    // 'TRAILING_STOP_LOSS_ORDER	Trailing Stop Loss Order Transaction
    // 'TRAILING_STOP_LOSS_ORDER_REJECT	Trailing Stop Loss Order Reject Transaction
    // 'ONE_CANCELS_ALL_ORDER	One Cancels All Order Transaction
    // 'ONE_CANCELS_ALL_ORDER_REJECT	One Cancels All Order Reject Transaction
    // 'ONE_CANCELS_ALL_ORDER_TRIGGERED	One Cancels All Order Trigger Transaction
    'ORDER_FILL',
    // 'ORDER_CANCEL	Order Cancel Transaction
    // 'ORDER_CANCEL_REJECT	Order Cancel Reject Transaction
    // 'ORDER_CLIENT_EXTENSIONS_MODIFY	Order Client Extensions Modify Transaction
    // 'ORDER_CLIENT_EXTENSIONS_MODIFY_REJECT	Order Client Extensions Modify // 'Reject Transaction
    // 'TRADE_CLIENT_EXTENSIONS_MODIFY	Trade Client Extensions Modify Transaction
    // 'TRADE_CLIENT_EXTENSIONS_MODIFY_REJECT	Trade Client Extensions Modify // 'Reject Transaction
    // 'MARGIN_CALL_ENTER	Margin Call Enter Transaction
    // 'MARGIN_CALL_EXTEND	Margin Call Extend Transaction
    // 'MARGIN_CALL_EXIT	Margin Call Exit Transaction
    // 'DELAYED_TRADE_CLOSURE	Delayed Trade Closure Transaction
    'DAILY_FINANCING',
    'RESET_RESETTAB'
];

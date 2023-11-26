"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionTypes = exports.CandlestickGranularities = exports.OrderStates = exports.orderTriggerConditions = exports.OrderTypes = exports.TimeInForces = exports.InstrumentTypes = exports.InstrumentNames = exports.TradeStateTypes = exports.MAX_ORDER_SIZE = exports.MAX_POSITION_SIZE = void 0;
exports.MAX_POSITION_SIZE = 1000;
exports.MAX_ORDER_SIZE = 1000;
exports.TradeStateTypes = [
    'OPEN',
    'CLOSED',
    'CLOSE_WHEN_TRADEABLE'
];
exports.InstrumentNames = [
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
exports.InstrumentTypes = [
    'CURRENCY', //Currency
    'CFD', //Contract For Difference
    'METAL', //Metal
];
exports.TimeInForces = [
    "GTC", //The Order is “Good unTil Cancelled”
    "GTD", //The Order is “Good unTil Date” and will be cancelled at the provided time
    "GFD", //The Order is “Good For Day” and will be cancelled at 5pm New York time
    "FOK", //The Order must be immediately “Filled Or Killed”
    "IOC" //The Order must be “Immediately partially filled Or Cancelled”
];
exports.OrderTypes = [
    "MARKET", //A Market Order
    "LIMIT", //A Limit Order
    "STOP", //A Stop Order
    "MARKET_IF_TOUCHED", //A Market-if-touched Order
    "TAKE_PROFIT", //A Take Profit Order
    "STOP_LOSS", //A Stop Loss Order
    "GUARANTEED_STOP_LOSS", //A Guaranteed Stop Loss Order
    "TRAILING_STOP_LOSS", //A Trailing Stop Loss Order
    "FIXED_PRICE" //A Fixed Price Order
];
exports.orderTriggerConditions = [
    "DEFAULT", //Trigger an Order the “natural” way: compare its price to the ask for long Orders and bid for short Orders.
    "INVERSE", //Trigger an Order the opposite of the “natural” way: compare its price the bid for long Orders and ask for short Orders.
    "BID", //Trigger an Order by comparing its price to the bid regardless of whether it is long or short.
    "ASK", //Trigger an Order by comparing its price to the ask regardless of whether it is long or short.
    "MID" //Trigger an Order by comparing its price to the midpoint regardless of whether it is long or short.
];
exports.OrderStates = [
    "PENDING",
    "FILLED",
    "TRIGGERED",
    "CANCELLED"
];
exports.CandlestickGranularities = [
    "S5", //	5 second candlesticks, minute alignment
    "S10", //	10 second candlesticks, minute alignment
    "S15", //	15 second candlesticks, minute alignment
    "S30", //	30 second candlesticks, minute alignment
    "M1", //	1 minute candlesticks, minute alignment
    "M2", //	2 minute candlesticks, hour alignment
    "M4", //	4 minute candlesticks, hour alignment
    "M5", //	5 minute candlesticks, hour alignment
    "M10", //	10 minute candlesticks, hour alignment
    "M15", //	15 minute candlesticks, hour alignment
    "M30", //	30 minute candlesticks, hour alignment
    "H1", //	1 hour candlesticks, hour alignment
    "H2", //	2 hour candlesticks, day alignment
    "H3", //	3 hour candlesticks, day alignment
    "H4", //	4 hour candlesticks, day alignment
    "H6", //	6 hour candlesticks, day alignment
    "H8", //	8 hour candlesticks, day alignment
    "H12", //	12 hour candlesticks, day alignment
    "D", //	1 day candlesticks, day alignment
    "W", //	1 week candlesticks, aligned to start of week
    "M" //	1 month candlesticks, aligned to first day of the month
];
exports.TransactionTypes = [
    'ORDER', //Order-related Transactions. These are the Transactions that create, // 'cancel, fill or trigger Orders
    'FUNDING', //Funding-related Transactions
    'ADMIN', //Administrative Transactions
    'CREATE', //Account Create Transaction
    'CLOSE', //Account Close Transaction
    'REOPEN', //Account Reopen Transaction
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
    'ORDER_FILL', //Order Fill Transaction
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
    'DAILY_FINANCING', //Daily Financing Transaction
    'RESET_RESETTAB'
];

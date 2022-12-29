export const MAX_POSITION_SIZE = 1000
export const MAX_ORDER_SIZE = 1000
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

export const oandaOrderTypes = [
  "MARKET",	//A Market Order
  "LIMIT", //A Limit Order
  "STOP",	//A Stop Order
  "MARKET_IF_TOUCHED",	//A Market-if-touched Order
  "TAKE_PROFIT",	//A Take Profit Order
  "STOP_LOSS",	//A Stop Loss Order
  "GUARANTEED_STOP_LOSS",	//A Guaranteed Stop Loss Order
  "TRAILING_STOP_LOSS",	//A Trailing Stop Loss Order
  "FIXED_PRICE"	//A Fixed Price Order
] as const;
export type oandaOrderType = typeof oandaOrderTypes[number];

export const orderTriggerConditions = [
  "DEFAULT",	//Trigger an Order the “natural” way: compare its price to the ask for long Orders and bid for short Orders.
  "INVERSE",	//Trigger an Order the opposite of the “natural” way: compare its price the bid for long Orders and ask for short Orders.
  "BID",	//Trigger an Order by comparing its price to the bid regardless of whether it is long or short.
  "ASK",	//Trigger an Order by comparing its price to the ask regardless of whether it is long or short.
  "MID"	//Trigger an Order by comparing its price to the midpoint regardless of whether it is long or short.
] as const;
export type OrderTriggerCondition = typeof orderTriggerConditions[number];

export const oaOrderStates = [
  "PENDING",
  "FILLED",
  "TRIGGERED",
  "CANCELLED"
] as const;
export type oaOrderState = typeof oaOrderStates[number];

export const oandaPairs = [
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
] as const;
export type oandaPair = typeof oandaPairs[number];

export const TransactionTypes = [
'ORDER',	//Order-related Transactions. These are the Transactions that create, // 'cancel, fill or trigger Orders
'FUNDING',	//Funding-related Transactions
'ADMIN', //Administrative Transactions
'CREATE',  //Account Create Transaction
'CLOSE',	//Account Close Transaction
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
'DAILY_FINANCING',	//Daily Financing Transaction
'RESET_RESETTAB'
] as const;

export type TransactionType = typeof TransactionTypes[number];

export type OrderFillReason = string;

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
  fee: number //78.05799225,
  feeRate: number //0.0014,
  future: string //BTC-PERP,
  id: number //7828307,
  liquidity: string //taker,
  market: string //BTC-PERP,
  orderId: number //38065410,
  tradeId: number //19129310,
  price: number //3723.75,
  side: string //buy,
  size: number //14.973,
  time: string //2019-05-07T16:40:58.358438+00:00,
  type: string //order
}

export interface wsOrder {
  id: string //24852229,
  market: string //XRP-PERP,
  type: string //limit,
  side: string //buy,
  size: number //42353.0,
  price: number //0.2977,
  status: string //closed,
  filledSize: number //0.0,
  remainingSize: number //0.0,
  avgFillPrice: number //0.2978
}
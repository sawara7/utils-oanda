import { ClientExtensions } from "./requestType";
import { TransactionType, OrderFillReason, oandaPair } from "./type";
export interface InstrumentsResponse {
    instruments: Instrument[];
    lastTransactionID: number;
}
export interface Instrument {
    name: string;
    type: string;
    displayName: string;
    pipLocation: number;
    displayPrecision: number;
    tradeUnitsPrecision: number;
    minimumTradeSize: number;
    maximumTrailingStopDistance: number;
    minimumGuaranteedStopLossDistance: number;
    minimumTrailingStopDistance: number;
    maximumPositionSize: number;
    maximumOrderUnits: number;
    marginRate: number;
    commission: string;
    guaranteedStopLossOrderMode: string;
    guaranteedStopLossOrderExecutionPremium: number;
}
export interface oaOrderResponse {
    orderCreateTransaction: Transaction;
    orderFillTransaction?: OrderFillTransaction;
    orderCancelTransaction?: OrderCancelTransaction;
    orderReissueTransaction?: Transaction;
    orderReissueRejectTransaction?: Transaction;
    relatedTransactionIDs: string[];
    lastTransactionID: string;
}
export interface oaCancelOrderResponse {
    orderCancelTransaction: OrderCancelTransaction;
    relatedTransactionIDs: string[];
    lastTransactionID: string;
}
export interface OrderResponse {
    orders: oaBaseOrder[];
    lastTransactionID: string;
}
export interface PendingOrderResponse {
    orders: oaBaseOrder[];
    lastTransactionID: string;
}
export interface oaBaseOrder {
    id: string;
    createTime: string;
    state: string;
    type: string;
}
export interface oaBasicOrder extends oaBaseOrder {
    instrument: string;
    price: string;
    units: string;
    state: string;
}
export interface GetTransactionsSinceIDResponse {
    transactions: Transaction[];
    lastTransactionID: string;
}
export interface Transaction {
    type: string;
    id: string;
    time: number;
    userID: string;
    accountID: string;
    batchID: string;
    requestID: string;
}
export interface OrderFillTransaction extends Transaction {
    type: TransactionType;
    orderID: string;
    clientOrderID: string;
    instrument: string;
    units: string;
    gainQuoteHomeConversionFactor: string;
    lossQuoteHomeConversionFactor: string;
    price: string;
    fullVWAP: string;
    reason: OrderFillReason;
    pl: string;
    financing: number;
    commission: number;
    guaranteedExecutionFee: number;
    accountBalance: number;
}
export interface OrderCancelTransaction extends Transaction {
    orderID: string;
    reason: string;
}
export interface GetTradeResponse {
    trades: Trade[];
    lastTransactionID: string;
}
export interface Trade {
    id: string;
    instrument: string;
    price: string;
    openTime: string;
    state: TradeState;
    initialUnits: string;
    initialMarginRequired: number;
    currentUnits: string;
    realizedPL: string;
    unrealizedPL: string;
    marginUsed: string;
    averageClosePrice: string;
    closingTransactionIDs: string[];
    financing: string;
    dividendAdjustment: string;
    closeTime?: string;
    clientExtensions: ClientExtensions;
}
export type TradeState = "OPEN" | "CLOSED" | "CLOSE_WHEN_TRADEABLE";
export interface PricingResponse {
    prices: ClientPrice[];
    time: number;
}
export interface ClientPrice {
    type: string;
    instrument: string;
    time: number;
    status: string;
    tradeable: boolean;
    bids: PriceBucket[];
    asks: PriceBucket[];
    closeoutBid: number;
    closeoutAsk: number;
}
export interface PriceBucket {
    price: number;
    liquidity: number;
}
export interface DepthResponse {
    asks: [string, string][];
    bids: [string, string][];
}
export interface PositionSide {
    units: string;
    averagePrice: string;
    tradeIDs: string[];
    pl: string;
    unrealizedPL: string;
    resettablePL: string;
    financing: string;
    dividendAdjustment: string;
    guaranteedExecutionFees: string;
}
export interface Position {
    instrument: oandaPair;
    pl: string;
    unrealizedPL: string;
    marginUsed: string;
    resettablePL: string;
    financing: string;
    commission: string;
    dividendAdjustment: string;
    guaranteedExecutionFees: string;
    long: PositionSide;
    short: PositionSide;
}
export interface SingleInstrumentPositionResponse {
    position: Position;
    lastTransactionID: string;
}
export interface AccountSummary {
    id: string;
    alias: string;
    currency: string;
    createdByUserID: number;
    createdTime: string;
    resettablePLTime: string;
    marginRate: number;
    openTradeCount: number;
    openPositionCount: number;
    pendingOrderCount: number;
    hedgingEnabled: number;
    unrealizedPL: string;
    NAV: string;
    marginUsed: string;
    marginAvailable: string;
    positionValue: string;
    marginCloseoutUnrealizedPL: string;
    marginCloseoutNAV: string;
    marginCloseoutMarginUsed: string;
    marginCloseoutPercent: number;
    marginCloseoutPositionValue: number;
    withdrawalLimit: string;
    marginCallMarginUsed: string;
    marginCallPercent: number;
    balance: string;
    pl: string;
    resettablePL: string;
    financing: string;
    commission: string;
    dividendAdjustment: string;
    guaranteedExecutionFees: string;
    marginCallEnterTime: number;
    marginCallExtensionCount: number;
    lastMarginCallExtensionTime: number;
    lastTransactionID: number;
}
export interface AccountSummaryResponse {
    account: AccountSummary;
    lastTransactionID: string;
}

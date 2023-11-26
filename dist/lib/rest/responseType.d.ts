import { ClientExtensions } from "./requestType";
import { TransactionType, OrderFillReason, InstrumentName, OrderTriggerCondition, OrderID, DateTime, OrderState, TradeID, ClientID, PriceValue, OrderType, TransactionID, TimeInForce, DecimalNumber, InstrumentType, TradeStateType, CandlestickGranularity } from "./type";
export interface InstrumentsResponse {
    instruments: Instrument[];
    lastTransactionID: number;
}
export interface InstrumentCommission {
    commission: DecimalNumber;
    unitsTraded: DecimalNumber;
    minimumCommission: DecimalNumber;
}
export declare const DayOfWeeks: readonly ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
export type DayOfWeek = typeof DayOfWeeks[number];
export interface FinancingDayOfWeek {
    dayOfWeek: DayOfWeek;
    daysCharged: number;
}
export interface InstrumentCommission {
    longRate: DecimalNumber;
    shortRate: DecimalNumber;
    financingDaysOfWeek: FinancingDayOfWeek[];
}
export interface Tag {
    type: string;
    name: string;
}
export interface GuaranteedStopLossOrderLevelRestriction {
    volume: DecimalNumber;
    priceRange: DecimalNumber;
}
export declare const guaranteedStopLossOrderModeForInstruments: readonly ["DISABLED", "ALLOWED", "REQUIRED"];
export type guaranteedStopLossOrderModeForInstrument = typeof guaranteedStopLossOrderModeForInstruments[number];
export interface Instrument {
    name: InstrumentName;
    type: InstrumentType;
    displayName: string;
    pipLocation: number;
    displayPrecision: number;
    tradeUnitsPrecision: number;
    minimumTradeSize: DecimalNumber;
    maximumTrailingStopDistance: DecimalNumber;
    minimumGuaranteedStopLossDistance: DecimalNumber;
    minimumTrailingStopDistance: DecimalNumber;
    maximumPositionSize: DecimalNumber;
    maximumOrderUnits: DecimalNumber;
    marginRate: DecimalNumber;
    commission: InstrumentCommission;
    guaranteedStopLossOrderMode: guaranteedStopLossOrderModeForInstrument;
    guaranteedStopLossOrderExecutionPremium: DecimalNumber;
    guaranteedStopLossOrderLevelRestriction: GuaranteedStopLossOrderLevelRestriction;
    financing: InstrumentCommission;
    tags: Tag[];
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
    instrument: InstrumentName;
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
    instrument: InstrumentName;
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
    instrument: InstrumentName;
    price: string;
    openTime: string;
    state: TradeStateType;
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
    takeProfitOrder?: TakeProfitOrder;
    stopLossOrder?: StopLossOrder;
    trailingStopLossOrder?: TrailingStopLossOrder;
}
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
    instrument: InstrumentName;
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
export interface PutTradeOrdersResponse {
    takeProfitOrderCancelTransaction?: OrderCancelTransaction;
    takeProfitOrderFillTransaction?: OrderFillTransaction;
    takeProfitOrderCreatedCancelTransaction?: OrderCancelTransaction;
    stopLossOrderCancelTransaction?: OrderCancelTransaction;
    stopLossOrderFillTransaction?: OrderFillTransaction;
    stopLossOrderCreatedCancelTransaction?: OrderCancelTransaction;
    trailingStopLossOrderCancelTransaction?: OrderCancelTransaction;
    guaranteedStopLossOrderCancelTransaction?: OrderCancelTransaction;
    relatedTransactionIDs: string[];
    lastTransactionID: string;
}
export interface TakeProfitOrder {
    id: OrderID;
    createTime: DateTime;
    state: OrderState;
    clientExtensions: ClientExtensions;
    type: OrderType;
    tradeID: TradeID;
    clientTradeID: ClientID;
    price: PriceValue;
    timeInForce: TimeInForce;
    gtdTime: DateTime;
    triggerCondition: OrderTriggerCondition;
    fillingTransactionID: TransactionID;
    filledTime: DateTime;
    tradeOpenedID: TradeID;
    tradeReducedID: TradeID;
    tradeClosedIDs: TradeID[];
    cancellingTransactionID: TransactionID;
    cancelledTime: DateTime;
    replacesOrderID: OrderID;
    replacedByOrderID: OrderID;
}
export interface StopLossOrder {
    id: OrderID;
    createTime: DateTime;
    state: OrderState;
    clientExtensions: ClientExtensions;
    type: OrderType;
    guaranteedExecutionPremium: DecimalNumber;
    tradeID: TradeID;
    clientTradeID: ClientID;
    price: PriceValue;
    distance: DecimalNumber;
    timeInForce: TimeInForce;
    gtdTime: DateTime;
    triggerCondition: OrderTriggerCondition;
    guaranteed: boolean;
    fillingTransactionID: TransactionID;
    filledTime: DateTime;
    tradeOpenedID: TradeID;
    tradeReducedID: TradeID;
    tradeClosedIDs: TradeID[];
    cancellingTransactionID: TransactionID;
    cancelledTime: DateTime;
    replacesOrderID: OrderID;
    replacedByOrderID: OrderID;
}
export interface TrailingStopLossOrder {
    type: OrderType;
    tradeID: TradeID;
    clientTradeID: ClientID;
    distance: DecimalNumber;
    timeInForce: TimeInForce;
    gtdTime: DateTime;
    triggerCondition: OrderTriggerCondition;
    clientExtensions: ClientExtensions;
}
export interface CandlesResponse {
    instrument: InstrumentName;
    granularity: CandlestickGranularity;
    candles: CandleStick[];
}
export interface CandlestickData {
    o: PriceValue;
    h: PriceValue;
    l: PriceValue;
    c: PriceValue;
}
export interface CandleStick {
    time: DateTime;
    bid: CandlestickData;
    ask: CandlestickData;
    mid: CandlestickData;
    volume: number;
    complete: boolean;
}
export interface ClosePositionsResponse {
    longUnits: string;
    longClientExtensions: ClientExtensions;
    shortUnits: string;
    shortClientExtensions: ClientExtensions;
}

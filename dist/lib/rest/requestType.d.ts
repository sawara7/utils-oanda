import { OrderType, OrderTriggerCondition, TransactionType, TimeInForce, InstrumentName, DecimalNumber, PriceValue, DateTime, TradeStateType, CandlestickGranularity } from "./type";
export type AcceptDateTimeFormat = 'UNIX' | 'RFC3339';
export type OrderPositionFill = 'DEFAULT';
export interface GetTransactionsSinceIDRequest {
    id: string;
    type?: TransactionType;
}
export interface GetTransactionsStreamRequest {
}
export interface GetTradeRequest {
    ids?: string;
    state?: TradeStateType;
    instrument?: InstrumentName;
    count?: number;
    beforeID?: string;
}
export interface ClientExtensions {
    id: string;
    tag: string;
    comment: string;
}
export interface BaseOrderRequest {
    type: OrderType;
    instrument: InstrumentName;
    units: DecimalNumber;
    positionFill: OrderPositionFill;
    takeProfitOnFill?: TakeProfitDetails;
    stopLossOnFill?: StopLossDetails;
    guaranteedStopLossOnFill?: GuaranteedStopLossDetails;
    trailingStopLossOnFill?: TrailingStopLossDetails;
    clientExtensions?: ClientExtensions;
}
export interface GetOrderRequest {
    ids?: string;
    state?: string;
    instrument?: string;
    count?: number;
    beforeID?: string;
}
export interface MarketOrderRequest extends BaseOrderRequest {
    timeInForce?: TimeInForce;
    priceBound?: PriceValue;
}
export interface LimitOrderRequest extends BaseOrderRequest {
    price: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime?: DateTime;
    triggerCondition: OrderTriggerCondition;
}
export interface StopOrderRequest extends BaseOrderRequest {
    price: PriceValue;
    priceBound?: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime: DateTime;
    triggerCondition: OrderTriggerCondition;
}
export interface MarketIfTouchedOrderRequest extends BaseOrderRequest {
    price: PriceValue;
    priceBound?: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime: DateTime;
    triggerCondition: OrderTriggerCondition;
}
export interface TakeProfitDetails {
    price: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime?: DateTime;
}
export interface StopLossDetails {
    price?: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime?: DateTime;
    distance?: number;
}
export interface GuaranteedStopLossDetails {
    price?: PriceValue;
    timeInForce?: TimeInForce;
    gtdTime?: DateTime;
    distance?: number;
}
export interface TrailingStopLossDetails {
    timeInForce: TimeInForce;
    gtdTime?: DateTime;
    distance: number;
}
export interface GetPricingRequest {
    instruments: InstrumentName;
    since?: number;
}
export interface GetCandlesRequest {
    price?: "M" | "B" | "A";
    granularity?: CandlestickGranularity;
    count?: number;
    from?: DateTime;
    to?: DateTime;
    smooth?: boolean;
    includeFirst?: boolean;
    dailyAlignment?: number;
    alignmentTimezone?: string;
    weeklyAlignment?: string;
    units?: number;
}
export interface PutTradeOrdersRequest {
    takeProfit?: TakeProfitDetails;
    stopLoss?: StopLossDetails;
    trailingStopLoss?: TrailingStopLossDetails;
    guaranteedStopLoss?: GuaranteedStopLossDetails;
}

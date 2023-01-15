import { TradeState } from "./responseType";
import { oandaOrderType, oaOrderState, OrderTriggerCondition, TransactionType } from "./type";

// Ticker
export type AcceptDateTimeFormat = 'UNIX' | 'RFC3339';
export type TimeInForce = 'FOK' | 'GTC' | 'GTD' | 'GFD';
export type OrderPositionFill = 'DEFAULT';

export interface GetTransactionsSinceIDRequest {
  id: string,
  type?: TransactionType
}

export interface GetTransactionsStreamRequest {
  
}
export interface GetTradeRequest {
  ids?: string, // query	List of TradeID (csv)
  state?: TradeState,
  instrument?: string,
  count?: number, // [default=50, maximum=500]
  beforeID?: string,
}

export interface ClientExtensions {
  id: string,
  tag: string,
  comment: string
}
export interface BaseOrderRequest {
  type: oandaOrderType,
  instrument: string,
  units: number,
  positionFill : OrderPositionFill,
  takeProfitOnFill?: TakeProfitDetails,
  stopLossOnFill?: StopLossDetails,
  guaranteedStopLossOnFill?: GuaranteedStopLossDetails,
  trailingStopLossOnFill?: TrailingStopLossDetails
  clientExtensions?: ClientExtensions
}
export interface GetOrderRequest {
  ids?: string //query	List of OrderID (csv)	List of Order IDs to retrieve
  state?: string //query	OrderStateFilter	The state to filter the requested Orders by [default=PENDING]
  instrument?: string	//query	InstrumentName	The instrument to filter the requested orders by
  count?: number //query	integer	The maximum number of Orders to return [default=50, maximum=500]
  beforeID?: string	//query	OrderID	The maximum Order ID to return. If not provided the most recent Orders in the Account are returned
}
export interface MarketOrderRequest extends BaseOrderRequest{
  timeInForce?: TimeInForce,
  priceBound?: number,
}
export interface LimitOrderRequest extends BaseOrderRequest{
  price: string,
  timeInForce?: TimeInForce,
  gtdTime?: string,
  triggerCondition: OrderTriggerCondition,
}
export interface StopOrderRequest extends BaseOrderRequest{
  price: string,
  priceBound?: number,
  timeInForce?: TimeInForce,
  gtdTime: number,
  triggerCondition: OrderTriggerCondition
}
export interface MarketIfTouchedOrderRequest extends BaseOrderRequest{
  price: string,
  priceBound?: number,
  timeInForce?: TimeInForce,
  gtdTime: number,
  triggerCondition: OrderTriggerCondition
}
export interface TakeProfitDetails {
  price: string,
  timeInForce?: TimeInForce,
  gtdTime?: number,
}
export interface StopLossDetails {
  price?: string,
  timeInForce?: TimeInForce,
  gtdTime?: number,
  distance?: number,
}

export interface GuaranteedStopLossDetails {
  price: string,
  timeInForce: TimeInForce,
  gtdTime?: number,
  distance: number,
}

export interface TrailingStopLossDetails {
  timeInForce: TimeInForce,
  gtdTime?: number,
  distance: number
}

export interface GetPricingRequest {
  instruments: string;
  since?: number;
}

export interface PutTradeOrdersRequest {
  takeProfit?: TakeProfitDetails;
  stopLoss?: StopLossDetails;
  trailingStopLoss?: TrailingStopLossDetails;
  guaranteedStopLoss?: GuaranteedStopLossDetails;
}
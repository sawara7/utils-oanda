import { TradeState } from "./responseType";
import { OrderType, OrderState, OrderTriggerCondition, TransactionType, TimeInForce, InstrumentName, DecimalNumber, PriceValue, DateTime } from "./type";

// Ticker
export type AcceptDateTimeFormat = 'UNIX' | 'RFC3339';
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
  instrument?: InstrumentName,
  count?: number, // [default=50, maximum=500]
  beforeID?: string,
}

export interface ClientExtensions {
  id: string,
  tag: string,
  comment: string
}
export interface BaseOrderRequest {
  type: OrderType,
  instrument: InstrumentName,
  units: DecimalNumber,
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
  priceBound?: PriceValue,
}
export interface LimitOrderRequest extends BaseOrderRequest{
  price: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime?: DateTime,
  triggerCondition: OrderTriggerCondition,
}
export interface StopOrderRequest extends BaseOrderRequest{
  price: PriceValue,
  priceBound?: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime: DateTime,
  triggerCondition: OrderTriggerCondition
}
export interface MarketIfTouchedOrderRequest extends BaseOrderRequest{
  price: PriceValue,
  priceBound?: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime: DateTime,
  triggerCondition: OrderTriggerCondition
}
export interface TakeProfitDetails {
  price: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime?: DateTime,
}
export interface StopLossDetails {
  price?: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime?: DateTime,
  distance?: number,
}

export interface GuaranteedStopLossDetails {
  price: PriceValue,
  timeInForce: TimeInForce,
  gtdTime?: DateTime,
  distance: number,
}

export interface TrailingStopLossDetails {
  timeInForce: TimeInForce,
  gtdTime?: DateTime,
  distance: number
}

export interface GetPricingRequest {
  instruments: InstrumentName;
  since?: number;
}

export interface PutTradeOrdersRequest {
  takeProfit?: TakeProfitDetails;
  stopLoss?: StopLossDetails;
  trailingStopLoss?: TrailingStopLossDetails;
  guaranteedStopLoss?: GuaranteedStopLossDetails;
}
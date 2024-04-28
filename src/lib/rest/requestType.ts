import {
  OrderType,
  OrderTriggerCondition,
  TransactionType,
  TimeInForce,
  InstrumentName,
  DecimalNumber,
  PriceValue,
  DateTime,
  TradeStateType,
  CandlestickGranularity
} from "./type";

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
  state?: TradeStateType,
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
  price?: PriceValue,
  timeInForce?: TimeInForce,
  gtdTime?: DateTime,
  distance?: number,
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

export interface GetCandlesRequest {
  price?:	"M" | "B" | "A"; //The Price component(s) to get candlestick data for. [default=M]
  granularity?: CandlestickGranularity;	//The granularity of the candlesticks to fetch [default=S5]
  count?: number;	// The number of candlesticks to return in the response. Count should not be specified if both the start and end parameters are provided, as the time range combined with the granularity will determine the number of candlesticks to return. [default=500, maximum=5000]
  from?: DateTime;	//	The start of the time range to fetch candlesticks for.
  to?: DateTime;	//The end of the time range to fetch candlesticks for.
  smooth?: boolean;	//A flag that controls whether the candlestick is “smoothed” or not. A smoothed candlestick uses the previous candle’s close price as its open price, while an unsmoothed candlestick uses the first price from its time range as its open price. [default=False]
  includeFirst?: boolean	//A flag that controls whether the candlestick that is covered by the from time should be included in the results. This flag enables clients to use the timestamp of the last completed candlestick received to poll for future candlesticks but avoid receiving the previous candlestick repeatedly. [default=True]
  dailyAlignment?: number //The hour of the day (in the specified timezone) to use for granularities that have daily alignments. [default=17, minimum=0, maximum=23]
  alignmentTimezone?: string	//The timezone to use for the dailyAlignment parameter. Candlesticks with daily alignment will be aligned to the dailyAlignment hour within the alignmentTimezone. Note that the returned times will still be represented in UTC. [default=America/New_York]
  weeklyAlignment?: string	//The day of the week used for granularities that have weekly alignment. [default=Friday]
  units?: number; //The number of units used to calculate the volume-weighted average bid and ask prices in the returned candles. [default=1]
}

export interface PutTradeOrdersRequest {
  takeProfit?: TakeProfitDetails;
  stopLoss?: StopLossDetails;
  trailingStopLoss?: TrailingStopLossDetails;
  guaranteedStopLoss?: GuaranteedStopLossDetails;
}

export interface ClosePositionsRequest {
  longUnits: string
  longClientExtensions: ClientExtensions
  shortUnits: string
  shortClientExtensions: ClientExtensions
}

export interface GetPositionBookRequest {
  time?: DateTime
}
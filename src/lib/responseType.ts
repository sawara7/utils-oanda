import { TransactionType, OrderFillReason } from "./type";

export interface InstrumentsResponse {
  instruments: Instrument[],
  lastTransactionID: number
}

export interface Instrument {
  name: string,
  type: string,
  displayName: string,
  pipLocation: number,
  displayPrecision: number,
  tradeUnitsPrecision: number,
  minimumTradeSize: number,
  maximumTrailingStopDistance: number,
  minimumGuaranteedStopLossDistance: number,
  minimumTrailingStopDistance: number,
  maximumPositionSize: number,
  maximumOrderUnits : number,
  marginRate: number,
  commission: string,
  guaranteedStopLossOrderMode: string,
  guaranteedStopLossOrderExecutionPremium: number,
  // guaranteedStopLossOrderLevelRestriction : (GuaranteedStopLossOrderLevelRestriction),
  // financing : (InstrumentFinancing),
  // tags : (Array[Tag]
}

export interface oaOrderResponse {
  orderCreateTransaction: Transaction,
  orderFillTransaction?: OrderFillTransaction,
  orderCancelTransaction?: OrderCancelTransaction,
  orderReissueTransaction?: Transaction,
  orderReissueRejectTransaction?: Transaction,
  relatedTransactionIDs: string[], 
  lastTransactionID: string
}

export interface oaCancelOrderResponse {
  orderCancelTransaction: OrderCancelTransaction,
  relatedTransactionIDs: string[],
  lastTransactionID: string
}

export interface OrderResponse {
  orders: oaBaseOrder[],
  lastTransactionID: string
}

export interface PendingOrderResponse {
  orders: oaBaseOrder[],
  lastTransactionID: string
}

export interface oaBaseOrder {
  id: string,
  createTime: string,
  state: string,
  type: string
}

export interface oaBasicOrder extends oaBaseOrder {
  instrument: string,
  price: string,
  units: string
  state: string
}

export interface GetTransactionsSinceIDResponse {
  transactions: Transaction[],
  lastTransactionID: string
}
export interface Transaction {
  type: string,
  id: string,
  time: number,
  userID: string,
  accountID: string,
  batchID: string,
  requestID: string
}

export interface OrderFillTransaction extends Transaction{
  type: TransactionType,
  orderID: string,
  clientOrderID: string,
  instrument: string,
  units: string,
  gainQuoteHomeConversionFactor: string,
  lossQuoteHomeConversionFactor: string,
  price: string,
  fullVWAP: string,
  // fullPrice: string,
  reason: OrderFillReason,
  pl: string,
  financing: number,
  commission: number,
  guaranteedExecutionFee: number,
  accountBalance: number,
  // tradeOpened : (TradeOpen),
  // tradesClosed : (Array[TradeReduce]),
  // tradeReduced : (TradeReduce),
  // halfSpreadCost : (AccountUnits)
}

export interface OrderCancelTransaction extends Transaction {
  orderID: string,
  reason: string
}

export interface GetTradeResponse {
  trades: Trade[],
  lastTransactionID: string
}
export interface Trade {
  id: string,
  instrument: string,
  price: number,
  openTime: number,
  state: TradeState,
  initialUnits: number,
  initialMarginRequired: number,
  currentUnits: number,
  realizedPL: number,
  unrealizedPL: number,
  marginUsed: number,
  averageClosePrice: number,
  closingTransactionIDs: string[],
  financing: number,
  dividendAdjustment: number,
  closeTime?: number,
  // takeProfitOrder : (TakeProfitOrder),
  // stopLossOrder : (StopLossOrder),
  // trailingStopLossOrder : (TrailingStopLossOrder)
}

export type TradeState = "OPEN" | "CLOSED" | "CLOSE_WHEN_TRADEABLE";

export interface PricingResponse {
  prices: ClientPrice[];
//   # The list of home currency conversion factors requested. This field will
//   # only be present if includeHomeConversions was set to true in the request.
//   # 
//   homeConversions : (Array[HomeConversions]),
  time: number;
}

// {
//   # 
//   # The string “PRICE”. Used to identify the a Price object when found in a
//   # stream.
//   # 
//   type : (string, default=PRICE),

//   # 
//   # The Price’s Instrument.
//   # 
//   instrument : (InstrumentName),

//   # 
//   # The date/time when the Price was created
//   # 
//   time : (DateTime),

//   # 
//   # The status of the Price.
//   # 
//   # 
//   # Deprecated: Will be removed in a future API update.
//   # 
//   status : (PriceStatus, deprecated),

//   # 
//   # Flag indicating if the Price is tradeable or not
//   # 
//   tradeable : (boolean),

//   # 
//   # The list of prices and liquidity available on the Instrument’s bid side.
//   # It is possible for this list to be empty if there is no bid liquidity
//   # currently available for the Instrument in the Account.
//   # 
//   bids : (Array[PriceBucket]),

//   # 
//   # The list of prices and liquidity available on the Instrument’s ask side.
//   # It is possible for this list to be empty if there is no ask liquidity
//   # currently available for the Instrument in the Account.
//   # 
//   asks : (Array[PriceBucket]),

//   # 
//   # The closeout bid Price. This Price is used when a bid is required to
//   # closeout a Position (margin closeout or manual) yet there is no bid
//   # liquidity. The closeout bid is never used to open a new position.
//   # 
//   closeoutBid : (PriceValue),

//   # 
//   # The closeout ask Price. This Price is used when a ask is required to
//   # closeout a Position (margin closeout or manual) yet there is no ask
//   # liquidity. The closeout ask is never used to open a new position.
//   # 
//   closeoutAsk : (PriceValue),

//   # 
//   # The factors used to convert quantities of this price’s Instrument’s quote
//   # currency into a quantity of the Account’s home currency. When the
//   # includeHomeConversions is present in the pricing request (regardless of
//   # its value), this field will not be present.
//   # 
//   # 
//   # Deprecated: Will be removed in a future API update.
//   # 
//   quoteHomeConversionFactors : (QuoteHomeConversionFactors, deprecated),

//   # 
//   # Representation of how many units of an Instrument are available to be
//   # traded by an Order depending on its positionFill option.
//   # 
//   # 
//   # Deprecated: Will be removed in a future API update.
//   # 
//   unitsAvailable : (UnitsAvailable, deprecated)
// }
export interface ClientPrice {
  type: string;
  instrument: string;
  time: number,
  status : string,
  tradeable: boolean,
  bids : PriceBucket[];
  asks : PriceBucket[];
  closeoutBid : number;
  closeoutAsk : number;
  // quoteHomeConversionFactors : (QuoteHomeConversionFactors, deprecated),
  // unitsAvailable : (UnitsAvailable, deprecated)
}

// {
//   # 
//   # The Price offered by the PriceBucket
//   # 
//   price : (PriceValue),

//   # 
//   # The amount of liquidity offered by the PriceBucket
//   # 
//   liquidity : (integer)
// }
export interface PriceBucket {
  price: number;
  liquidity: number;
}

// Depth
export interface DepthResponse {
  asks: [string, string][];
  bids: [string, string][];
}

import { ClientExtensions } from "./requestType";
import { TransactionType, OrderFillReason, oandaPair } from "./type";

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
  // halfSpreadCost : string
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
  clientExtensions : ClientExtensions,
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

export interface PositionSide {
  units : string; // # Number of units in the position (negative value indicates short position, // # positive indicates long position).
  averagePrice : string; // # Volume-weighted average of the underlying Trade open prices for the // # Position.
  tradeIDs : string[]; // # List of the open Trade IDs which contribute to the open Position.
  pl : string; // # Profit/loss realized by the PositionSide over the lifetime of the // # Account.
  unrealizedPL : string; // # The unrealized profit/loss of all open Trades that contribute to this // # PositionSide.
  resettablePL : string; // # Profit/loss realized by the PositionSide since the Account’s resettablePL // # was last reset by the client.
  financing : string; // # The total amount of financing paid/collected for this PositionSide over // # the lifetime of the Account.
  dividendAdjustment : string; // # The total amount of dividend adjustment paid for the PositionSide over // # the lifetime of the Account.
  guaranteedExecutionFees : string; // # The total amount of fees charged over the lifetime of the Account for the // # execution of guaranteed Stop Loss Orders attached to Trades for this // # PositionSide.
}

export interface Position {
  instrument : oandaPair; //# The Position’s Instrument.
  pl : string; //# Profit/loss realized by the Position over the lifetime of the Account.
  unrealizedPL : string; //# The unrealized profit/loss of all open Trades that contribute to this # Position.
  marginUsed : string; //# Margin currently used by the Position.
  resettablePL : string; //# Profit/loss realized by the Position since the Account’s resettablePL was # last reset by the client.
  financing : string; //# The total amount of financing paid/collected for this instrument over the # lifetime of the Account.
  commission : string; //# The total amount of commission paid for this instrument over the lifetime # of the Account.
  dividendAdjustment : string; //# The total amount of dividend adjustment paid for this instrument over the # lifetime of the Account.
  guaranteedExecutionFees : string; //# The total amount of fees charged over the lifetime of the Account for the # execution of guaranteed Stop Loss Orders for this instrument.
  long : PositionSide; //# The details of the long side of the Position.
  short : PositionSide; //# The details of the short side of the Position.
}

export interface SingleInstrumentPositionResponse {
  position: Position;
  lastTransactionID: string;
}

export interface AccountSummary {
  id : string; // # The Account’s identifier
  alias : string; // # Client-assigned alias for the Account. Only provided if the Account has # an alias set
  currency : string; //# The home currency of the Account
  createdByUserID : number; // # ID of the user that created the Account.
  createdTime : string; // # The date/time when the Account was created.
  // guaranteedStopLossOrderParameters : (GuaranteedStopLossOrderParameters);   // # The current guaranteed Stop Loss Order settings of the Account. This // # field will only be present if the guaranteedStopLossOrderMode is not // # ‘DISABLED’.
  // guaranteedStopLossOrderMode : (GuaranteedStopLossOrderMode); // # The current guaranteed Stop Loss Order mode of the Account.
  // guaranteedStopLossOrderMutability : (GuaranteedStopLossOrderMutability, deprecated); // # The current guaranteed Stop Loss Order mutability setting of the Account. # This field will only be present if the guaranteedStopLossOrderMode is not # ‘DISABLED’. # Deprecated: Will be removed in a future API update.
  resettablePLTime : string; // # The date/time that the Account’s resettablePL was last reset. # Client-provided margin rate override for the Account. The effective # margin rate of the Account is the lesser of this value and the OANDA # margin rate for the Account’s division. This value is only provided if a # margin rate override exists for the Account.
  marginRate : number;
  openTradeCount : number; // # The number of Trades currently open in the Account.
  openPositionCount : number; // # The number of Positions currently open in the Account.
  pendingOrderCount : number; // # The number of Orders currently pending in the Account.
  hedgingEnabled : number; // # Flag indicating that the Account has hedging enabled.
  unrealizedPL : string; // # The total unrealized profit/loss for all Trades currently open in the # Account.
  NAV : string; // # The net asset value of the Account. Equal to Account balance + # unrealizedPL.
  marginUsed : string; // # Margin currently used for the Account.
  marginAvailable : string; // # Margin available for Account currency.
  positionValue : string; // # The value of the Account’s open positions represented in the Account’s # home currency.
  marginCloseoutUnrealizedPL : string; // # The Account’s margin closeout unrealized PL.
  marginCloseoutNAV : string; // # The Account’s margin closeout NAV.
  marginCloseoutMarginUsed : string; // # The Account’s margin closeout margin used.
  marginCloseoutPercent : number; // # The Account’s margin closeout percentage. When this value is 1.0 or above # the Account is in a margin closeout situation.
  marginCloseoutPositionValue : number; // # The value of the Account’s open positions as used for margin closeout # calculations represented in the Account’s home currency.
  withdrawalLimit : string; // # The current WithdrawalLimit for the account which will be zero or a positive value indicating how much can be withdrawn from the account.
  marginCallMarginUsed : string; // # The Account’s margin call margin used.
  marginCallPercent : number; // # The Account’s margin call percentage. When this value is 1.0 or above the # Account is in a margin call situation.
  balance : string; // # The current balance of the account.
  pl : string; // # The total profit/loss realized over the lifetime of the Account.
  resettablePL : string; // # The total realized profit/loss for the account since it was last reset by # the client.
  financing : string; // # The total amount of financing paid/collected over the lifetime of the # account.
  commission : string; //# The total amount of commission paid over the lifetime of the Account.
  dividendAdjustment : string; // # The total amount of dividend adjustment paid over the lifetime of the # Account in the Account’s home currency.
  guaranteedExecutionFees : string; // # The total amount of fees charged over the lifetime of the Account for the # execution of guaranteed Stop Loss Orders.
  marginCallEnterTime : number; // # The date/time when the Account entered a margin call state. Only provided // # if the Account is in a margin call.
  marginCallExtensionCount : number; //# The number of times that the Account’s current margin call was extended.
  lastMarginCallExtensionTime : number; // # The date/time of the Account’s last margin call extension.
  lastTransactionID : number; // # The ID of the last Transaction created for the Account.
}

export interface AccountSummaryResponse {
  account: AccountSummary;
  lastTransactionID: string;
}
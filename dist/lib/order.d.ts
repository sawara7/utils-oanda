import { OrderSide } from "utils-trade";
import { LimitOrderRequest, MarketOrderRequest } from "./rest/requestType";
import { Instrument } from "./rest/responseType";
export declare function CreateLIMITOrder(instrument: Instrument, side: OrderSide, units: number, price: number): LimitOrderRequest;
export declare function CreateMarketOrder(instrument: Instrument, side: OrderSide, units: number): MarketOrderRequest;
export declare function CreateTakerProfitOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, takeProfitRate: number, isLimit?: boolean): LimitOrderRequest | MarketOrderRequest;
export declare function CreateStopLossOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, stopLossRate: number, isLimit?: boolean): LimitOrderRequest | MarketOrderRequest;

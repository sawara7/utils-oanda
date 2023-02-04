import { OrderSide } from "trade-utils";
import { LimitOrderRequest } from "./rest/requestType";
import { Instrument } from "./rest/responseType";
export declare function CreateLimitOrder(instrument: Instrument, side: OrderSide, units: number, price: number): LimitOrderRequest;
export declare function CreateTakerProfitOrder(instrument: Instrument, side: OrderSide, units: number, price: number, takeProfitRate: number): LimitOrderRequest;

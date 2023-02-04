import { OrderSide } from "trade-utils"
import { floor } from "my-utils"
import { LimitOrderRequest } from "./rest/requestType"
import { Instrument } from "./rest/responseType"

export function CreateLimitOrder(instrument: Instrument, side: OrderSide, units: number, price: number): LimitOrderRequest {
    const p = floor(price, instrument.displayPrecision)
    const u = floor(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell"? -1: 1)
    return {
        type: "LIMIT",
        instrument: instrument.name,
        units: u.toString(),
        price: p.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    }
}

export function CreateTakerProfitOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, takeProfitRate: number): LimitOrderRequest {
    const res = CreateLimitOrder(instrument, closeSide, units, price)
    const closeRate = closeSide === "buy"? 1 + takeProfitRate: 1 - takeProfitRate
    const closePrice = floor(price * closeRate, instrument.tradeUnitsPrecision)
    res.takeProfitOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    }
    return res
}
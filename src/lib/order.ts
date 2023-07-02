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
    const closePrice = floor(price * closeRate, instrument.displayPrecision)
    res.takeProfitOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    }
    return res
}

export function CreateStopLossOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, stopLossRate: number): LimitOrderRequest {
    const res = CreateLimitOrder(instrument, closeSide, units, price)
    const closeRate = closeSide === "sell"? 1 + stopLossRate: 1 - stopLossRate
    const closePrice = floor(price * closeRate, instrument.displayPrecision)
    const distance = floor(Math.abs(closePrice - price) * 10*instrument.displayPrecision, 0)
    res.stopLossOnFill = {
        distance: 10,
    }
    return res
}
import { OrderSide } from "trade-utils"
import { LimitOrderRequest } from "./rest/requestType"
import { Instrument } from "./rest/responseType"

export function CreateLimitOrder(instrument: Instrument, side: OrderSide, units: number, price: number): LimitOrderRequest {
    return {
        type: "LIMIT",
        instrument: instrument.name,
        units: units.toString(),
        price: price.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    }
}

export function CreateTakerProfitOrder(instrument: Instrument, side: OrderSide, units: number, price: number, takeProfitRate: number): LimitOrderRequest {
    const res = CreateLimitOrder(instrument, side, units, price)
    res.takeProfitOnFill = {
        price:(Math.round((price * (side === "buy"? 1.002: 0.998)) * (1 / 0.001)) / (1 / 0.001)).toString(),
        timeInForce: 'GTC'
    }
    return res
}
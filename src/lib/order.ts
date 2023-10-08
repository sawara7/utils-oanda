import { OrderSide } from "utils-trade"
import { floor } from "utils-general"
import { LimitOrderRequest, MarketOrderRequest } from "./rest/requestType"
import { Instrument } from "./rest/responseType"
import { OrderType } from ".."

export function CreateLIMITOrder(instrument: Instrument, side: OrderSide, units: number, price: number): LimitOrderRequest {
    const p = floor(price, instrument.displayPrecision)
    const u = floor(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell"? -1: 1)
    return {
        type: 'LIMIT',
        instrument: instrument.name,
        units: u.toString(),
        price: p.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    }
}

export function CreateMarketOrder(instrument: Instrument, side: OrderSide, units: number): MarketOrderRequest {
    const u = floor(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell"? -1: 1)
    return {
        type: 'MARKET',
        instrument: instrument.name,
        units: u.toString(),
        positionFill: 'DEFAULT'
    }
}

export function CreateTakerProfitOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, takeProfitRate: number, isLimit: boolean = true): LimitOrderRequest | MarketOrderRequest {
    const res = isLimit? CreateLIMITOrder(instrument, closeSide, units, price): CreateMarketOrder(instrument, closeSide, units)
    const closeRate = closeSide === "buy"? 1 + takeProfitRate: 1 - takeProfitRate
    const closePrice = floor(price * closeRate, instrument.displayPrecision)
    res.takeProfitOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    }
    return res
}

export function CreateStopLossOrder(instrument: Instrument, closeSide: OrderSide, units: number, price: number, stopLossRate: number, isLimit: boolean = true): LimitOrderRequest | MarketOrderRequest {
    const res = isLimit? CreateLIMITOrder(instrument, closeSide, units, price): CreateMarketOrder(instrument, closeSide, units)
    const closeRate = closeSide === "sell"? 1 + stopLossRate: 1 - stopLossRate
    const closePrice = floor(price * closeRate, instrument.displayPrecision)
    res.stopLossOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    }
    return res
}
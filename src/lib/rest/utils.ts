import { OrderSide } from "trade-utils"

export function getOrderSideFromUnit(unit: number | string): OrderSide {
    const u = typeof unit === 'string'? parseInt(unit): unit
    return u < 0? "sell": "buy"
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateStopLossOrder = exports.CreateTakerProfitOrder = exports.CreateLimitOrder = void 0;
const my_utils_1 = require("my-utils");
function CreateLimitOrder(instrument, side, units, price) {
    const p = (0, my_utils_1.floor)(price, instrument.displayPrecision);
    const u = (0, my_utils_1.floor)(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell" ? -1 : 1);
    return {
        type: "LIMIT",
        instrument: instrument.name,
        units: u.toString(),
        price: p.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    };
}
exports.CreateLimitOrder = CreateLimitOrder;
function CreateTakerProfitOrder(instrument, closeSide, units, price, takeProfitRate) {
    const res = CreateLimitOrder(instrument, closeSide, units, price);
    const closeRate = closeSide === "buy" ? 1 + takeProfitRate : 1 - takeProfitRate;
    const closePrice = (0, my_utils_1.floor)(price * closeRate, instrument.displayPrecision);
    res.takeProfitOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    };
    return res;
}
exports.CreateTakerProfitOrder = CreateTakerProfitOrder;
function CreateStopLossOrder(instrument, closeSide, units, price, stopLossRate) {
    const res = CreateLimitOrder(instrument, closeSide, units, price);
    const closeRate = closeSide === "sell" ? 1 + stopLossRate : 1 - stopLossRate;
    const closePrice = (0, my_utils_1.floor)(price * closeRate, instrument.displayPrecision);
    const distance = (0, my_utils_1.floor)(Math.abs(closePrice - price) * 10 * instrument.displayPrecision, 0);
    res.guaranteedStopLossOnFill = {
        distance: distance,
        timeInForce: 'GTC'
    };
    return res;
}
exports.CreateStopLossOrder = CreateStopLossOrder;

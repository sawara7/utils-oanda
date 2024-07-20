"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLIMITOrder = CreateLIMITOrder;
exports.CreateMarketOrder = CreateMarketOrder;
exports.CreateTakerProfitOrder = CreateTakerProfitOrder;
exports.CreateStopLossOrder = CreateStopLossOrder;
const utils_general_1 = require("utils-general");
function CreateLIMITOrder(instrument, side, units, price) {
    const p = (0, utils_general_1.floor)(price, instrument.displayPrecision);
    const u = (0, utils_general_1.floor)(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell" ? -1 : 1);
    return {
        type: 'LIMIT',
        instrument: instrument.name,
        units: u.toString(),
        price: p.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    };
}
function CreateMarketOrder(instrument, side, units) {
    const u = (0, utils_general_1.floor)(Math.abs(units), instrument.tradeUnitsPrecision) * (side === "sell" ? -1 : 1);
    return {
        type: 'MARKET',
        instrument: instrument.name,
        units: u.toString(),
        positionFill: 'DEFAULT'
    };
}
function CreateTakerProfitOrder(instrument, closeSide, units, price, takeProfitRate, isLimit = true) {
    const res = isLimit ? CreateLIMITOrder(instrument, closeSide, units, price) : CreateMarketOrder(instrument, closeSide, units);
    const closeRate = closeSide === "buy" ? 1 + takeProfitRate : 1 - takeProfitRate;
    const closePrice = (0, utils_general_1.floor)(price * closeRate, instrument.displayPrecision);
    res.takeProfitOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    };
    return res;
}
function CreateStopLossOrder(instrument, closeSide, units, price, stopLossRate, isLimit = true) {
    const res = isLimit ? CreateLIMITOrder(instrument, closeSide, units, price) : CreateMarketOrder(instrument, closeSide, units);
    const closeRate = closeSide === "sell" ? 1 + stopLossRate : 1 - stopLossRate;
    const closePrice = (0, utils_general_1.floor)(price * closeRate, instrument.displayPrecision);
    res.stopLossOnFill = {
        price: closePrice.toString(),
        timeInForce: 'GTC'
    };
    return res;
}

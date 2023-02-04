"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateTakerProfitOrder = exports.CreateLimitOrder = void 0;
function CreateLimitOrder(instrument, side, units, price) {
    return {
        type: "LIMIT",
        instrument: instrument.name,
        units: units.toString(),
        price: price.toString(),
        positionFill: 'DEFAULT',
        triggerCondition: 'DEFAULT'
    };
}
exports.CreateLimitOrder = CreateLimitOrder;
function CreateTakerProfitOrder(instrument, side, units, price, takeProfitRate) {
    const res = CreateLimitOrder(instrument, side, units, price);
    res.takeProfitOnFill = {
        price: (Math.round((price * (side === "buy" ? 1.002 : 0.998)) * (1 / 0.001)) / (1 / 0.001)).toString(),
        timeInForce: 'GTC'
    };
    return res;
}
exports.CreateTakerProfitOrder = CreateTakerProfitOrder;

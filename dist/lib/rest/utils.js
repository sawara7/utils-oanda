"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSideFromUnit = getOrderSideFromUnit;
function getOrderSideFromUnit(unit) {
    const u = typeof unit === 'string' ? parseInt(unit) : unit;
    return u < 0 ? "sell" : "buy";
}

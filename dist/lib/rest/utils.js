"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderSideFromUnit = void 0;
function getOrderSideFromUnit(unit) {
    const u = typeof unit === 'string' ? parseInt(unit) : unit;
    return u < 0 ? "sell" : "buy";
}
exports.getOrderSideFromUnit = getOrderSideFromUnit;

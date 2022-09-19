"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OANDAOrderClass = void 0;
const trade_utils_1 = require("trade-utils");
class OANDAOrderClass extends trade_utils_1.BaseOrderClass {
    constructor(params) {
        super(params);
    }
    get instrument() {
        return this.market.name;
    }
    get units() {
        return Math.abs(this.roundSize(this.size)) * (this.side === 'buy' ? 1 : -1);
    }
    get limitOrderRequest() {
        return {
            type: 'LIMIT',
            instrument: this.instrument,
            units: this.units,
            positionFill: 'DEFAULT',
            price: this.price.toString(),
            triggerCondition: 'DEFAULT'
        };
    }
    get marketOrderRequest() {
        return {
            type: 'MARKET',
            instrument: this.instrument,
            units: this.units,
            positionFill: 'DEFAULT'
        };
    }
    get request() {
        if (this.type === 'limit') {
            return this.limitOrderRequest;
        }
        if (this.type === 'market') {
            return this.marketOrderRequest;
        }
        throw new Error('failed order create.');
    }
}
exports.OANDAOrderClass = OANDAOrderClass;

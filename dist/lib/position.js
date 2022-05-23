"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OANDAPositionClass = void 0;
const trade_utils_1 = require("trade-utils");
const order_1 = require("./order");
class OANDAPositionClass extends trade_utils_1.BasePositionClass {
    constructor(params) {
        super(params);
        this._api = params.api;
    }
    placeOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._api.postOrder(order.request);
        });
    }
    doOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield this.placeOrder(this.openOrder);
            return res.orderCreateTransaction.id;
        });
    }
    doClose() {
        return __awaiter(this, void 0, void 0, function* () {
            const s = this.state.isLosscut ? "losscut" : "close";
            const res = yield this.placeOrder(s === "close" ?
                this.closeOrder :
                new order_1.OANDAOrderClass({
                    market: this.closeOrder.market,
                    type: this.closeOrder.type,
                    side: this.closeOrder.side,
                    size: this.currentSize,
                    price: this.closeOrder.side === 'buy' ? this.bestBid : this.bestAsk
                }));
            return res.orderCreateTransaction.id;
        });
    }
    doCancel() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.state.orderID) {
                yield this._api.cancelOrder(this.state.orderID);
            }
        });
    }
    get openOrder() {
        return super.openOrder;
    }
    get closeOrder() {
        return super.closeOrder;
    }
}
exports.OANDAPositionClass = OANDAPositionClass;

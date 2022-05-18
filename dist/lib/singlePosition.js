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
exports.OANDASinglePosition = void 0;
const my_utils_1 = require("my-utils");
const trade_utils_1 = require("trade-utils");
const order_1 = require("./order");
class OANDASinglePosition extends trade_utils_1.BasePositionClass {
    constructor(params) {
        super(params);
        this._initialSize = 0;
        this._currentSize = 0;
        this._openPrice = 0;
        this._closePrice = 0;
        this._openID = '';
        this._closeID = '';
        this._api = params.api;
        this._marketInfo = params.marketInfo;
        this._minOrderInterval = params.minOrderInterval || 200;
        const size = params.funds / params.openPrice;
        this._openOrder = new order_1.OANDAOrderClass({
            market: params.marketInfo,
            type: params.orderType,
            side: params.openSide,
            size: size,
            price: params.openPrice
        });
        this._closeOrder = new order_1.OANDAOrderClass({
            market: params.marketInfo,
            type: params.orderType,
            side: params.openSide === 'buy' ? 'sell' : 'buy',
            size: size,
            price: params.closePrice
        });
        this._initialSize = this._openOrder.size;
        OANDASinglePosition.initializeLastOrderTime(this._marketInfo.name);
    }
    doLosscut() {
        throw new Error("Method not implemented.");
    }
    static initializeLastOrderTime(market) {
        if (!OANDASinglePosition._lastOrderTime) {
            OANDASinglePosition._lastOrderTime = {};
        }
        if (!OANDASinglePosition._lastOrderTime[market]) {
            OANDASinglePosition._lastOrderTime[market] = Date.now();
        }
    }
    sleepWhileOrderInterval() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!OANDASinglePosition._lastOrderTime) {
                throw new Error('no last order');
            }
            if (OANDASinglePosition._lastOrderTime[this._marketInfo.name]) {
                const interval = Date.now() - OANDASinglePosition._lastOrderTime[this._marketInfo.name];
                if (interval > 0) {
                    if (interval < this._minOrderInterval) {
                        OANDASinglePosition._lastOrderTime[this._marketInfo.name] += this._minOrderInterval;
                        yield (0, my_utils_1.sleep)(this._minOrderInterval - interval);
                    }
                    else if (interval > this._minOrderInterval) {
                        OANDASinglePosition._lastOrderTime[this._marketInfo.name] = Date.now();
                    }
                }
                else if (interval < 0) {
                    OANDASinglePosition._lastOrderTime[this._marketInfo.name] += this._minOrderInterval;
                    yield (0, my_utils_1.sleep)(OANDASinglePosition._lastOrderTime[this._marketInfo.name] - Date.now());
                }
            }
        });
    }
    placeOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.sleepWhileOrderInterval();
            return yield this._api.postOrder(order.request);
        });
    }
    doOpen() {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(this._openID) > 0) {
                throw new Error('Position is already opened.');
            }
            const res = yield this.placeOrder(this._openOrder);
            this._openID = res.orderCreateTransaction.id;
        });
    }
    doClose() {
        return __awaiter(this, void 0, void 0, function* () {
            if (parseInt(this._closeID) > 0) {
                throw new Error('Position is already opened.');
            }
            const res = yield this.placeOrder(this._closeOrder);
            this._closeID = res.orderCreateTransaction.id;
        });
    }
    updateOrder(order) {
        const size = Math.abs(parseInt(order.units));
        if (order.id === this._openID) {
            if (['FILLED', 'CANCELLED'].includes(order.state)) {
                this._openID = '';
                this._initialSize = size;
                this._currentSize = size;
                this._openPrice = parseFloat(order.price);
            }
            if (order.state === 'FILLED' && this.onOpened) {
                this.onOpened(this);
            }
            if (order.state === 'CANCELLED' && this.onOpenOrderCanceled) {
                this.onOpenOrderCanceled(this);
            }
        }
        if (order.id === this._closeID) {
            if (['FILLED', 'CANCELLED'].includes(order.state)) {
                this._closeID = '';
                this._closePrice = parseFloat(order.price);
                this._currentSize -= size;
                if (this._currentSize === 0) {
                    this._cumulativeProfit +=
                        this._initialSize * (this._openOrder.side === 'buy' ?
                            this._closePrice - this._openPrice :
                            this._openPrice - this._closePrice);
                    this._initialSize = 0;
                    this._closeCount++;
                }
            }
            if (order.state === 'FILLED' && this.onClosed) {
                this.onClosed(this);
            }
            if (order.state === 'CANCELLED' && this.onCloseOrderCanceled) {
                this.onCloseOrderCanceled(this);
            }
        }
    }
    get activeID() {
        if (this._openID !== '') {
            return this._openID;
        }
        if (this._closeID !== '') {
            return this._closeID;
        }
        return '';
    }
    get enabledOpen() {
        return super.enabledOpen &&
            this.activeID === '' &&
            this._currentSize === 0;
    }
    get enabledClose() {
        return super.enabledOpen &&
            this.activeID === '' &&
            this._currentSize > 0;
    }
    get openOrder() {
        return this._openOrder;
    }
    get closeOrder() {
        return this._closeOrder;
    }
    get currentOpenPrice() {
        return this._openPrice;
    }
    get currentClosePrice() {
        return this._closePrice;
    }
}
exports.OANDASinglePosition = OANDASinglePosition;

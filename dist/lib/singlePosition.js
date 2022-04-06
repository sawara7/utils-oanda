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
exports.SinglePosition = void 0;
const my_utils_1 = require("my-utils");
class SinglePosition {
    constructor(params) {
        // Position State
        this._initialSize = 0;
        this._openPrice = 0;
        this._closePrice = 0;
        this._openSide = 'buy';
        this._openID = '0';
        this._closeID = '0';
        // Information
        this._closeCount = 0;
        this._cumulativeProfit = 0;
        if (!SinglePosition._lastOrderTime) {
            SinglePosition._lastOrderTime = {};
        }
        this._marketName = params.marketName;
        if (!SinglePosition._lastOrderTime[this._marketName]) {
            SinglePosition._lastOrderTime[this._marketName] = Date.now();
        }
        this._funds = params.funds;
        this._api = params.api;
        this._minOrderInterval = params.minOrderInterval || 200;
        this._openOrderSettings = params.openOrderSettings;
        this._closeOrderSettings = params.closeOrderSettings;
        this._sizeResolution = params.sizeResolution;
        this._priceResolution = params.priceResolution;
    }
    roundSize(size) {
        return Math.round(size * (1 / this._sizeResolution)) / (1 / this._sizeResolution);
    }
    roundPrice(price) {
        return Math.round(price * (1 / this._priceResolution)) / (1 / this._priceResolution);
    }
    placeOrder(side, size, price) {
        return __awaiter(this, void 0, void 0, function* () {
            const p = {
                type: 'LIMIT',
                instrument: this._marketName,
                units: this.roundSize(size) * (side === 'buy' ? 1 : -1),
                positionFill: 'DEFAULT',
                price: this.roundPrice(price).toString(),
                triggerCondition: 'DEFAULT'
            };
            if (SinglePosition._lastOrderTime && SinglePosition._lastOrderTime[this._marketName]) {
                const interval = Date.now() - SinglePosition._lastOrderTime[this._marketName];
                if (interval > 0) {
                    if (interval < this._minOrderInterval) {
                        SinglePosition._lastOrderTime[this._marketName] += this._minOrderInterval;
                        yield (0, my_utils_1.sleep)(this._minOrderInterval - interval);
                    }
                    else if (interval > this._minOrderInterval) {
                        SinglePosition._lastOrderTime[this._marketName] = Date.now();
                    }
                }
                else if (interval < 0) {
                    SinglePosition._lastOrderTime[this._marketName] += this._minOrderInterval;
                    yield (0, my_utils_1.sleep)(SinglePosition._lastOrderTime[this._marketName] - Date.now());
                }
            }
            return yield this._api.postOrder(p);
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._openOrderSettings || !this._closeOrderSettings) {
                return { success: false, message: 'No open order settings.' };
            }
            if (parseInt(this._openID) > 0) {
                return { success: false, message: 'Position is already opened.' };
            }
            const result = {
                success: false
            };
            this._openID = '1'; // lock
            try {
                const res = yield this.placeOrder(this._openOrderSettings.side, this._funds / this._openOrderSettings.price, this._openOrderSettings.price);
                this._openID = res.orderCreateTransaction.id;
                return { success: true };
            }
            catch (e) {
                result.message = e;
                this._openID = '0';
            }
            return { success: false, message: 'Open Failed.' };
        });
    }
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._closeOrderSettings || !this._closeOrderSettings) {
                return { success: false, message: 'No close order settings.' };
            }
            if (parseInt(this._closeID) > 0) {
                return { success: false, message: 'Position is already closed.' };
            }
            const result = {
                success: false
            };
            this._closeID = '1'; // lock
            try {
                const res = yield this.placeOrder(this._closeOrderSettings.side, this._funds / this._closeOrderSettings.price, this._closeOrderSettings.price);
                this._closeID = res.orderCreateTransaction.id;
                return { success: true };
            }
            catch (e) {
                result.message = e;
                this._closeID = '0';
            }
            return { success: false, message: 'Open Failed.' };
        });
    }
    updateOrder(order) {
        if (order.id === this._openID) {
            if (order.state === 'FILLED') {
                this._initialSize = this.roundSize(Math.abs(parseFloat(order.units)));
                this._openID = '0';
                this._openSide = parseFloat(order.units) > 0 ? "buy" : "sell";
                if (this.onOpened) {
                    this.onOpened(this);
                }
            }
            if (order.state === 'CANCELLED') {
                this._openID = '0';
                if (this.onOpenOrderCanceled) {
                    this.onOpenOrderCanceled(this);
                }
            }
        }
        if (order.id === this._closeID) {
            if (order.state === 'FILLED') {
                const size = this.roundSize(Math.abs(parseFloat(order.units)));
                this._cumulativeProfit +=
                    this._initialSize * (this._openSide === 'buy' ?
                        this._closePrice - this._openPrice :
                        this._openPrice - this._closePrice);
                this._closeCount++;
                this._closeID = '0';
                if (this.onClosed) {
                    this.onClosed(this);
                }
            }
            if (order.state === 'CANCELLED') {
                this._closeID = '0';
                if (this.onCloseOrderCanceled) {
                    this.onCloseOrderCanceled(this);
                }
            }
        }
    }
    get profit() {
        return this._cumulativeProfit;
    }
    get enabledOpen() {
        return this._openID === '0' && this._closeID === '0';
    }
    get openOrderSettings() {
        return this._openOrderSettings;
    }
    get closeOrderSettings() {
        return this._closeOrderSettings;
    }
    get openSide() {
        return this._openSide;
    }
    get currentOpenPrice() {
        return this._openPrice;
    }
    get currentClosePrice() {
        return this._closePrice;
    }
    get closeCount() {
        return this._closeCount;
    }
    get activeID() {
        if (!['0', '1'].includes(this._openID)) {
            return this._openID;
        }
        if (!['0', '1'].includes(this._closeID)) {
            return this._closeID;
        }
        return '';
    }
}
exports.SinglePosition = SinglePosition;

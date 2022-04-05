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
        this._ID = '0';
        this._openTime = 0;
        this._closeTime = 0;
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
    placeTakeProfitOrder(side, size, openPrice, closePrice) {
        return __awaiter(this, void 0, void 0, function* () {
            this._openSide = side;
            this._initialSize = this.roundSize(size);
            this._openPrice = this.roundPrice(openPrice);
            this._closePrice = this.roundPrice(closePrice);
            const p = {
                type: 'LIMIT',
                instrument: this._marketName,
                units: this._initialSize * (side === 'buy' ? 1 : -1),
                positionFill: 'DEFAULT',
                takeProfitOnFill: {
                    price: this._closePrice.toString(),
                    timeInForce: 'GTC'
                },
                price: this._openPrice.toString(),
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
            const res = yield this._api.postOrder(p);
            this._ID = res.lastTransactionID;
            console.log(this._ID);
        });
    }
    open() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this._openOrderSettings || !this._closeOrderSettings) {
                return { success: false, message: 'No open order settings.' };
            }
            if (parseInt(this._ID) > 0) {
                return { success: false, message: 'Position is already opened.' };
            }
            const result = {
                success: false
            };
            this._ID = '1'; // lock
            try {
                yield this.placeTakeProfitOrder(this._openOrderSettings.side, this._funds / this._openOrderSettings.price, this._openOrderSettings.price, this._closeOrderSettings.price);
                return { success: true };
            }
            catch (e) {
                result.message = e;
                this._ID = '0';
            }
            return { success: false, message: 'Open Failed.' };
        });
    }
    close() {
        this._ID = '0';
        this._cumulativeProfit +=
            this._initialSize * (this._openSide === 'buy' ?
                this._closePrice - this._openPrice :
                this._openPrice - this._closePrice);
        this._closeCount++;
    }
    get profit() {
        return this._cumulativeProfit;
    }
    get enabledOpen() {
        return this._ID === '0';
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
    get id() {
        return this._ID;
    }
}
exports.SinglePosition = SinglePosition;

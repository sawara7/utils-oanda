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
exports.oaAPIClass = void 0;
const base_1 = require("./base");
const utils_general_1 = require("utils-general");
const URL_API_OANDA = 'https://api-fxtrade.oanda.com';
const URL_STREAM_OANDA = 'https://stream-fxtrade.oanda.com';
class oaAPIClass extends base_1.baseApiClass {
    constructor(config, options) {
        config.endPoint = config.endPoint || URL_API_OANDA;
        super(config, options);
        this.apiToken = config.apiToken;
        this.accountID = config.accountID;
        this.dateFormat = 'UNIX';
        this._minOrderInterval = config.minOrderInterval || 200;
        if (!oaAPIClass._lastOrderTime) {
            oaAPIClass._lastOrderTime = {};
        }
    }
    getPathPrivate(endPoint) {
        return '/v3/accounts/'.concat(this.accountID, '/', endPoint);
    }
    getPathPublic(endPoint) {
        return '/v3/'.concat(endPoint);
    }
    //=================
    // ORDER 
    //=================
    postOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getPathPrivate('orders');
            yield this.sleepWhileOrderInterval(request.instrument);
            return this.post(path, { order: request });
        });
    }
    cancelOrder(orderID) {
        const path = this.getPathPrivate('orders').concat('/', orderID, '/cancel');
        return this.put(path, {});
    }
    getOrders(request) {
        const path = this.getPathPrivate('orders');
        return this.get(path, request);
    }
    getPendingOrders() {
        const path = this.getPathPrivate('pendingOrders');
        return this.get(path, {});
    }
    //=================
    // TRANSACTIONS
    //=================
    // public getTransaction(request: GetTransactionsRequest): Promise<Transaction> {
    //   const path = this.getPath('transactions');
    //   return this.get(path, request);
    // }
    getTransactionByID(id) {
        const path = this.getPathPrivate('transactions/' + id);
        return this.get(path, {});
    }
    getTransactionsSinceID(request) {
        const path = this.getPathPrivate('transactions/sinceid');
        return this.get(path, request);
    }
    // public getTransactionsStream(): Promise<any> {
    //   const path = this.getPath('transactions/stream');
    //   return this.get(path);
    // }
    //=================
    // TRADES
    //=================
    getTrade(request) {
        const path = this.getPathPrivate('trades');
        return this.get(path, request);
    }
    getOpenTrade() {
        const path = this.getPathPrivate('openTrades');
        return this.get(path, {});
    }
    putTradeOrders(tradeID, request) {
        const path = this.getPathPrivate('trades/' + tradeID + '/orders');
        return this.put(path, request);
    }
    //=================
    // POSITIONS
    //=================
    closePositions(instrument, request) {
        const path = this.getPathPrivate('positions/' + instrument + '/close');
        return this.put(path, request);
    }
    //=================
    // PRICING
    //=================
    getPricing(params) {
        const path = this.getPathPrivate('pricing');
        return this.get(path, params);
    }
    getCandles(instrument, params) {
        const path = this.getPathPublic('instruments/' + instrument + '/candles');
        return this.get(path, params);
    }
    getPositionBook(instrument, params) {
        const path = this.getPathPublic('instruments/' + instrument + '/positionBook');
        return this.get(path, params);
    }
    getOrderBook(instrument, params) {
        const path = this.getPathPublic('instruments/' + instrument + '/orderBook');
        return this.get(path, params);
    }
    //=================
    // INSTRUMENTS
    //=================
    getInstruments() {
        const path = this.getPathPrivate('instruments');
        return this.get(path, {});
    }
    //=================
    // Get the details of a single instruments position in an Account.
    //=================
    getSingleInstrumentPosition(instrument) {
        const path = this.getPathPrivate('positions/' + instrument);
        return this.get(path, {});
    }
    //=================
    // Get the details of a single instruments position in an Account.
    //=================
    getAccountSummary() {
        const path = this.getPathPrivate('summary');
        return this.get(path, {});
    }
    //=================
    // METHODS
    //=================
    get(path, query) {
        let params = '';
        if (query && Object.keys(query).length) {
            params += '?' + (new URLSearchParams(query)).toString();
        }
        const headers = this.makeHeader();
        return super.get(path, query, headers);
    }
    post(path, query) {
        const headers = this.makeHeader();
        return super.post(path, query, headers);
    }
    put(path, query) {
        const headers = this.makeHeader();
        return super.put(path, query, headers);
    }
    makeHeader() {
        return {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + this.apiToken,
            'Accept-Datetime-Format': this.dateFormat
        };
    }
    sleepWhileOrderInterval(market) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!oaAPIClass._lastOrderTime) {
                throw new Error('no last order');
            }
            if (oaAPIClass._lastOrderTime[market]) {
                const interval = Date.now() - oaAPIClass._lastOrderTime[market];
                if (interval > 0) {
                    if (interval < this._minOrderInterval) {
                        oaAPIClass._lastOrderTime[market] += this._minOrderInterval;
                        yield (0, utils_general_1.sleep)(this._minOrderInterval - interval);
                    }
                    else if (interval > this._minOrderInterval) {
                        oaAPIClass._lastOrderTime[market] = Date.now();
                    }
                }
                else if (interval < 0) {
                    oaAPIClass._lastOrderTime[market] += this._minOrderInterval;
                    yield (0, utils_general_1.sleep)(oaAPIClass._lastOrderTime[market] - Date.now());
                }
            }
            else {
                oaAPIClass._lastOrderTime[market] = Date.now();
            }
        });
    }
}
exports.oaAPIClass = oaAPIClass;

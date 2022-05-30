"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const querystring = __importStar(require("querystring"));
const base_1 = require("./base");
const my_utils_1 = require("my-utils");
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
    getPath(endPoint) {
        return '/v3/accounts/'.concat(this.accountID, '/', endPoint);
    }
    //=================
    // ORDER 
    //=================
    postOrder(request) {
        return __awaiter(this, void 0, void 0, function* () {
            const path = this.getPath('orders');
            yield this.sleepWhileOrderInterval(request.instrument);
            return this.post(path, { order: request });
        });
    }
    cancelOrder(orderID) {
        const path = this.getPath('orders').concat('/', orderID, '/cancel');
        return this.put(path, {});
    }
    getOrders(request) {
        const path = this.getPath('orders');
        return this.get(path, request);
    }
    getPendingOrders() {
        const path = this.getPath('pendingOrders');
        return this.get(path, {});
    }
    //=================
    // TRANSACTIONS
    //=================
    // public getTransaction(request: GetTransactionsRequest): Promise<Transaction> {
    //   const path = this.getPath('transactions');
    //   return this.get(path, request);
    // }
    getTransactionsSinceID(request) {
        const path = this.getPath('transactions/sinceid');
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
        const path = this.getPath('trades');
        return this.get(path, request);
    }
    getOpenTrade() {
        const path = this.getPath('openTrades');
        return this.get(path, {});
    }
    //=================
    // PRICING
    //=================
    getPricing(params) {
        const path = this.getPath('pricing');
        return this.get(path, params);
    }
    //=================
    // INSTRUMENTS
    //=================
    getInstruments() {
        const path = this.getPath('instruments');
        return this.get(path, {});
    }
    //=================
    // METHODS
    //=================
    get(path, query) {
        let params = '';
        if (query && Object.keys(query).length) {
            params += '?' + querystring.stringify(query);
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
                        yield (0, my_utils_1.sleep)(this._minOrderInterval - interval);
                    }
                    else if (interval > this._minOrderInterval) {
                        oaAPIClass._lastOrderTime[market] = Date.now();
                    }
                }
                else if (interval < 0) {
                    oaAPIClass._lastOrderTime[market] += this._minOrderInterval;
                    yield (0, my_utils_1.sleep)(oaAPIClass._lastOrderTime[market] - Date.now());
                }
            }
            else {
                oaAPIClass._lastOrderTime[market] = Date.now();
            }
        });
    }
}
exports.oaAPIClass = oaAPIClass;

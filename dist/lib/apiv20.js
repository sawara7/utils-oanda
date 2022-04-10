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
Object.defineProperty(exports, "__esModule", { value: true });
exports.oaAPIClass = void 0;
const querystring = __importStar(require("querystring"));
const api_1 = require("./api");
const URL_API_OANDA = 'https://api-fxtrade.oanda.com';
const URL_STREAM_OANDA = 'https://stream-fxtrade.oanda.com';
class oaAPIClass extends api_1.baseApiClass {
    constructor(config, options) {
        config.endPoint = config.endPoint || URL_API_OANDA;
        super(config, options);
        this.apiToken = config.apiToken;
        this.accountID = config.accountID;
        this.dateFormat = 'UNIX';
    }
    getPath(endPoint) {
        return '/v3/accounts/'.concat(this.accountID, '/', endPoint);
    }
    //=================
    // ORDER 
    //=================
    postOrder(request) {
        const path = this.getPath('orders');
        return this.post(path, { order: request });
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
}
exports.oaAPIClass = oaAPIClass;

import * as querystring from 'querystring';
import { baseApiClass, ApiOptions } from './api';
import {
  PricingResponse,
  oaOrderResponse,
  InstrumentsResponse,
  GetTradeResponse,
  GetTransactionsSinceIDResponse,
  PendingOrderResponse, oaCancelOrderResponse
} from './responseType';
import {
  GetPricingRequest,
  AcceptDateTimeFormat,
  GetTradeRequest,
  GetTransactionsSinceIDRequest,
  BaseOrderRequest
} from './requestType';
import { OANDAApiConfig } from './type';

const URL_API_OANDA = 'https://api-fxtrade.oanda.com';
const URL_STREAM_OANDA = 'https://stream-fxtrade.oanda.com';

export class oaAPIClass extends baseApiClass {
  private readonly apiToken: string;
  private readonly accountID: string;
  private readonly dateFormat: AcceptDateTimeFormat;

  constructor(config: OANDAApiConfig, options?: ApiOptions) {
    config.endPoint = config.endPoint || URL_API_OANDA;
    super(config, options);
    this.apiToken = config.apiToken;
    this.accountID = config.accountID;
    this.dateFormat = 'UNIX';
  }

  private getPath(endPoint: string): string{
    return '/v3/accounts/'.concat(this.accountID, '/', endPoint);
  }

  //=================
  // ORDER 
  //=================
  public postOrder(request: BaseOrderRequest): Promise<oaOrderResponse> {
    const path = this.getPath('orders');
    return this.post(path, {order: request});
  }

  public cancelOrder(orderID: string): Promise<oaCancelOrderResponse> {
    const path = this.getPath('orders').concat('/', orderID, '/cancel');
    return this.put(path, {});
  }

  public getPendingOrders(): Promise<PendingOrderResponse> {
    const path = this.getPath('pendingOrders');
    return this.get(path, {})
  }

  //=================
  // TRANSACTIONS
  //=================
  // public getTransaction(request: GetTransactionsRequest): Promise<Transaction> {
  //   const path = this.getPath('transactions');
  //   return this.get(path, request);
  // }

  public getTransactionsSinceID(request: GetTransactionsSinceIDRequest): Promise<GetTransactionsSinceIDResponse> {
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
  public getTrade(request: GetTradeRequest): Promise<GetTradeResponse> {
    const path = this.getPath('trades');
    return this.get(path, request);
  }

  public getOpenTrade(): Promise<GetTradeResponse> {
    const path = this.getPath('openTrades');
    return this.get(path, {});
  }

  //=================
  // PRICING
  //=================
  public getPricing(params: GetPricingRequest): Promise<PricingResponse> {
    const path = this.getPath('pricing');
    return this.get(path, params);
  }

  //=================
  // INSTRUMENTS
  //=================
  public getInstruments(): Promise<InstrumentsResponse> {
    const path = this.getPath('instruments');
    return this.get(path, {});
  }

  //=================
  // METHODS
  //=================
  get<T>(path: string, query?: {}) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += '?' + querystring.stringify(query);
    }
    const headers = this.makeHeader();
    return super.get(path, query, headers);
  }

  post<T>(path: string, query: {}) {
    const headers = this.makeHeader();
    return super.post(path, query, headers);
  }

  put<T>(path: string, query: {}) {
    const headers = this.makeHeader();
    return super.put(path, query, headers);
  }

  private makeHeader(): any {
    return {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.apiToken,
      'Accept-Datetime-Format': this.dateFormat
    };
  }
}
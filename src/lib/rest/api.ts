import { baseApiClass, ApiOptions } from './base';
import {
  PricingResponse,
  oaOrderResponse,
  InstrumentsResponse,
  GetTradeResponse,
  GetTransactionsSinceIDResponse,
  PendingOrderResponse,
  oaCancelOrderResponse,
  OrderResponse,
  SingleInstrumentPositionResponse,
  AccountSummary,
  AccountSummaryResponse,
  PutTradeOrdersResponse,
  CandlesResponse,
  ClosePositionsResponse,
  Transaction,
  GetTransactionByIDResponse,
  PositionBookResponse,
  OrderBookResponse
} from './responseType';
import {
  GetPricingRequest,
  AcceptDateTimeFormat,
  GetTradeRequest,
  GetTransactionsSinceIDRequest,
  BaseOrderRequest,
  GetOrderRequest,
  PutTradeOrdersRequest,
  GetCandlesRequest,
  ClosePositionsRequest,
  GetPositionBookRequest,
  GetOrderBookRequest
} from './requestType';
import { OANDAApiConfig, InstrumentName, DateTime } from './type';
import { sleep } from 'utils-general';

const URL_API_OANDA = 'https://api-fxtrade.oanda.com';
const URL_STREAM_OANDA = 'https://stream-fxtrade.oanda.com';

export class oaAPIClass extends baseApiClass {
  private readonly apiToken: string;
  private readonly accountID: string;
  private readonly dateFormat: AcceptDateTimeFormat;

  private static _lastOrderTime?: {[marketName: string]: number}
  private _minOrderInterval: number

  constructor(config: OANDAApiConfig, options?: ApiOptions) {
    config.endPoint = config.endPoint || URL_API_OANDA;
    super(config, options);
    this.apiToken = config.apiToken;
    this.accountID = config.accountID;
    this.dateFormat = 'UNIX';
    this._minOrderInterval = config.minOrderInterval || 200
    if (!oaAPIClass._lastOrderTime){
      oaAPIClass._lastOrderTime = {}
    }
  }

  private getPathPrivate(endPoint: string): string{
    return '/v3/accounts/'.concat(this.accountID, '/', endPoint);
  }

  private getPathPublic(endPoint: string): string{
    return '/v3/'.concat(endPoint);
  }

  //=================
  // ORDER 
  //=================
  public async postOrder(request: BaseOrderRequest): Promise<oaOrderResponse> {
    const path = this.getPathPrivate('orders');
    await this.sleepWhileOrderInterval(request.instrument)
    return this.post(path, {order: request});
  }

  public cancelOrder(orderID: string): Promise<oaCancelOrderResponse> {
    const path = this.getPathPrivate('orders').concat('/', orderID, '/cancel');
    return this.put(path, {});
  }

  public getOrders(request: GetOrderRequest): Promise<OrderResponse> {
    const path = this.getPathPrivate('orders');
    return this.get(path, request)
  }

  public getPendingOrders(): Promise<PendingOrderResponse> {
    const path = this.getPathPrivate('pendingOrders');
    return this.get(path, {})
  }

  //=================
  // TRANSACTIONS
  //=================
  // public getTransaction(request: GetTransactionsRequest): Promise<Transaction> {
  //   const path = this.getPath('transactions');
  //   return this.get(path, request);
  // }

  public getTransactionByID(id: string): Promise<GetTransactionByIDResponse> {
    const path = this.getPathPrivate('transactions/' + id);
    return this.get(path, {});
  }

  public getTransactionsSinceID(request: GetTransactionsSinceIDRequest): Promise<GetTransactionsSinceIDResponse> {
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
  public getTrade(request: GetTradeRequest): Promise<GetTradeResponse> {
    const path = this.getPathPrivate('trades');
    return this.get(path, request);
  }

  public getOpenTrade(): Promise<GetTradeResponse> {
    const path = this.getPathPrivate('openTrades');
    return this.get(path, {});
  }

  public putTradeOrders(tradeID: string, request: PutTradeOrdersRequest): Promise<PutTradeOrdersResponse> {
    const path = this.getPathPrivate('trades/' + tradeID + '/orders');
    return this.put(path, request)
  }

  //=================
  // POSITIONS
  //=================
  public closePositions(instrument: InstrumentName, request: ClosePositionsRequest): Promise<ClosePositionsResponse> {
    const path = this.getPathPrivate('positions/' + instrument + '/close');
    return this.put(path, request)
  }

  //=================
  // PRICING
  //=================
  public getPricing(params: GetPricingRequest): Promise<PricingResponse> {
    const path = this.getPathPrivate('pricing');
    return this.get(path, params);
  }

  public getCandles(instrument: InstrumentName, params: GetCandlesRequest): Promise<CandlesResponse> {
    const path = this.getPathPublic('instruments/' + instrument + '/candles');
    return this.get(path, params);
  }

  public getPositionBook(instrument: InstrumentName, params: GetPositionBookRequest): Promise<PositionBookResponse> {
    const path = this.getPathPublic('instruments/' + instrument + '/positionBook')
    return this.get(path, params)
  }

  public getOrderBook(instrument: InstrumentName, params: GetOrderBookRequest): Promise<OrderBookResponse> {
    const path = this.getPathPublic('instruments/' + instrument + '/orderBook')
    return this.get(path, params)
  }

  //=================
  // INSTRUMENTS
  //=================
  public getInstruments(): Promise<InstrumentsResponse> {
    const path = this.getPathPrivate('instruments');
    return this.get(path, {});
  }

  //=================
  // Get the details of a single instruments position in an Account.
  //=================
  public getSingleInstrumentPosition(instrument: InstrumentName): Promise<SingleInstrumentPositionResponse> {
    const path = this.getPathPrivate('positions/' + instrument);
    return this.get(path, {});
  }

  //=================
  // Get the details of a single instruments position in an Account.
  //=================
  public getAccountSummary(): Promise<AccountSummaryResponse> {
    const path = this.getPathPrivate('summary');
    return this.get(path, {});
  }

  //=================
  // METHODS
  //=================
  get<T>(path: string, query?: {}) {
    let params = '';
    if (query && Object.keys(query).length) {
      params += '?' + (new URLSearchParams(query)).toString();
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

  private async sleepWhileOrderInterval(market: string): Promise<void> {
    if (!oaAPIClass._lastOrderTime) {
        throw new Error('no last order')
    }
    if (oaAPIClass._lastOrderTime[market]) {
        const interval = Date.now() - oaAPIClass._lastOrderTime[market]
        if (interval > 0) {
            if (interval < this._minOrderInterval) {
              oaAPIClass._lastOrderTime[market] += this._minOrderInterval 
                await sleep(this._minOrderInterval - interval)
            } else if (interval > this._minOrderInterval) {
              oaAPIClass._lastOrderTime[market] = Date.now()
            }
        } else if (interval < 0) {
          oaAPIClass._lastOrderTime[market] += this._minOrderInterval
            await sleep(oaAPIClass._lastOrderTime[market] - Date.now())
        }
    } else {
      oaAPIClass._lastOrderTime[market] = Date.now()
    }
  }
}
import { baseApiClass, ApiOptions } from './base';
import { PricingResponse, oaOrderResponse, InstrumentsResponse, GetTradeResponse, GetTransactionsSinceIDResponse, PendingOrderResponse, oaCancelOrderResponse, OrderResponse, SingleInstrumentPositionResponse, AccountSummaryResponse } from './responseType';
import { GetPricingRequest, GetTradeRequest, GetTransactionsSinceIDRequest, BaseOrderRequest, GetOrderRequest } from './requestType';
import { OANDAApiConfig, oandaPair } from './type';
export declare class oaAPIClass extends baseApiClass {
    private readonly apiToken;
    private readonly accountID;
    private readonly dateFormat;
    private static _lastOrderTime?;
    private _minOrderInterval;
    constructor(config: OANDAApiConfig, options?: ApiOptions);
    private getPath;
    postOrder(request: BaseOrderRequest): Promise<oaOrderResponse>;
    cancelOrder(orderID: string): Promise<oaCancelOrderResponse>;
    getOrders(request: GetOrderRequest): Promise<OrderResponse>;
    getPendingOrders(): Promise<PendingOrderResponse>;
    getTransactionsSinceID(request: GetTransactionsSinceIDRequest): Promise<GetTransactionsSinceIDResponse>;
    getTrade(request: GetTradeRequest): Promise<GetTradeResponse>;
    getOpenTrade(): Promise<GetTradeResponse>;
    getPricing(params: GetPricingRequest): Promise<PricingResponse>;
    getInstruments(): Promise<InstrumentsResponse>;
    getSingleInstrumentPosition(instrument: oandaPair): Promise<SingleInstrumentPositionResponse>;
    getAccountSummary(): Promise<AccountSummaryResponse>;
    get<T>(path: string, query?: {}): Promise<any>;
    post<T>(path: string, query: {}): Promise<any>;
    put<T>(path: string, query: {}): Promise<any>;
    private makeHeader;
    private sleepWhileOrderInterval;
}

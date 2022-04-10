import { BasePositionClass, MarketInfo, OrderSide, OrderType } from "trade-utils";
import { oaAPIClass, oaBasicOrder } from "..";
export interface OANDASinglePositionParameters {
    marketInfo: MarketInfo;
    openSide: OrderSide;
    orderType: OrderType;
    funds: number;
    api: oaAPIClass;
    openPrice: number;
    closePrice: number;
    minOrderInterval?: number;
}
export declare class OANDASinglePosition extends BasePositionClass {
    private static _lastOrderTime?;
    private _api;
    private _minOrderInterval;
    private _marketInfo;
    private _initialSize;
    private _currentSize;
    private _openPrice;
    private _closePrice;
    private _openOrder;
    private _closeOrder;
    private _openID;
    private _closeID;
    onOpened?: (pos: OANDASinglePosition) => void;
    onClosed?: (pos: OANDASinglePosition) => void;
    onOpenOrderCanceled?: (pos: OANDASinglePosition) => void;
    onCloseOrderCanceled?: (pos: OANDASinglePosition) => void;
    constructor(params: OANDASinglePositionParameters);
    private placeOrder;
    doOpen(): Promise<void>;
    doClose(): Promise<void>;
    updateOrder(order: oaBasicOrder): void;
    get enabledOpen(): boolean;
    get enabledClose(): boolean;
    get currentOpenPrice(): number;
    get currentClosePrice(): number;
    get activeID(): string;
}

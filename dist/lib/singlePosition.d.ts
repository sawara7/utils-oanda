import { OrderSide, OrderType } from "my-utils";
import { oaAPIClass } from "..";
export interface SinglePositionParameters {
    marketName: string;
    funds: number;
    api: oaAPIClass;
    sizeResolution: number;
    priceResolution: number;
    minOrderInterval?: number;
    openOrderSettings?: OrderSettings;
    closeOrderSettings?: OrderSettings;
}
export interface SinglePositionResponse {
    success: boolean;
    message?: any;
}
export interface OrderSettings {
    side: OrderSide;
    type: OrderType;
    price: number;
    size?: number;
    postOnly?: boolean;
    cancelSec?: number;
}
export declare class SinglePosition {
    private static _lastOrderTime?;
    private _api;
    private _marketName;
    private _funds;
    private _minOrderInterval;
    private _openOrderSettings?;
    private _closeOrderSettings?;
    private _initialSize;
    private _openPrice;
    private _closePrice;
    private _openSide;
    private _ID;
    private _openTime;
    private _closeTime;
    private _sizeResolution;
    private _priceResolution;
    private _closeCount;
    private _cumulativeProfit;
    onOpened?: (pos: SinglePosition) => void;
    onClosed?: (pos: SinglePosition) => void;
    onOpenOrderCanceled?: (pos: SinglePosition) => void;
    onCloseOrderCanceled?: (pos: SinglePosition) => void;
    constructor(params: SinglePositionParameters);
    private roundSize;
    private roundPrice;
    private placeTakeProfitOrder;
    open(): Promise<SinglePositionResponse>;
    close(): void;
    get profit(): number;
    get enabledOpen(): Boolean;
    get openOrderSettings(): OrderSettings | undefined;
    get closeOrderSettings(): OrderSettings | undefined;
    get openSide(): OrderSide;
    get currentOpenPrice(): number;
    get currentClosePrice(): number;
    get closeCount(): number;
    get id(): string;
}

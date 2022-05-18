import {
    sleep
} from "my-utils"

import {
    BasePositionClass,
    BasePositionParameters,
    MarketInfo,
    OrderSide,
    OrderType
} from "trade-utils"

import {
    oaAPIClass,
    oaOrderResponse,
    oaBasicOrder
} from ".."
import { OANDAOrderClass } from "./order"

export interface OANDASinglePositionParameters extends BasePositionParameters {
    marketInfo: MarketInfo
    openSide: OrderSide
    orderType: OrderType
    funds: number
    api: oaAPIClass
    openPrice: number
    closePrice: number
    minOrderInterval?: number
}

export class OANDASinglePosition extends BasePositionClass {
    doLosscut(): Promise<void> {
        throw new Error("Method not implemented.")
    }
    // Global State
    private static _lastOrderTime?: {[marketName: string]: number}

    // Parameters
    private _api: oaAPIClass
    private _minOrderInterval: number

    // Position State
    private _marketInfo: MarketInfo
    private _initialSize: number = 0
    private _currentSize: number = 0
    private _openPrice: number = 0
    private _closePrice: number = 0
    private _openOrder: OANDAOrderClass
    private _closeOrder: OANDAOrderClass

    private _openID: string = ''
    private _closeID: string = ''

    constructor(params: OANDASinglePositionParameters){
        super(params)
        this._api = params.api
        this._marketInfo = params.marketInfo
        this._minOrderInterval = params.minOrderInterval || 200
        const size = params.funds/params.openPrice
        this._openOrder = new OANDAOrderClass({
            market: params.marketInfo,
            type: params.orderType,
            side: params.openSide,
            size: size,
            price: params.openPrice
        })
        this._closeOrder = new OANDAOrderClass({
            market: params.marketInfo,
            type: params.orderType,
            side: params.openSide === 'buy'? 'sell': 'buy',
            size: size,
            price: params.closePrice
        })
        this._initialSize = this._openOrder.size
        OANDASinglePosition.initializeLastOrderTime(this._marketInfo.name)
    }

    private static initializeLastOrderTime(market: string) {
        if (!OANDASinglePosition._lastOrderTime){
            OANDASinglePosition._lastOrderTime = {}
        }
        if (!OANDASinglePosition._lastOrderTime[market]){
            OANDASinglePosition._lastOrderTime[market] = Date.now()
        }
    }

    private async sleepWhileOrderInterval(): Promise<void> {
        if (!OANDASinglePosition._lastOrderTime) {
            throw new Error('no last order')
        }
        if (OANDASinglePosition._lastOrderTime[this._marketInfo.name]) {
            const interval = Date.now() - OANDASinglePosition._lastOrderTime[this._marketInfo.name]
            if (interval > 0) {
                if (interval < this._minOrderInterval) {
                    OANDASinglePosition._lastOrderTime[this._marketInfo.name] += this._minOrderInterval 
                    await sleep(this._minOrderInterval - interval)
                } else if (interval > this._minOrderInterval) {
                    OANDASinglePosition._lastOrderTime[this._marketInfo.name] = Date.now()
                }
            } else if (interval < 0) {
                OANDASinglePosition._lastOrderTime[this._marketInfo.name] += this._minOrderInterval
                await sleep(OANDASinglePosition._lastOrderTime[this._marketInfo.name] - Date.now())
            }
        }
    }

    private async placeOrder(order: OANDAOrderClass): Promise<oaOrderResponse> {
        await this.sleepWhileOrderInterval()
        return await this._api.postOrder(order.request)
    }

    public async doOpen(): Promise<void> {
        if (parseInt(this._openID) > 0) {
            throw new Error('Position is already opened.')
        }
        const res = await this.placeOrder(this._openOrder)
        this._openID = res.orderCreateTransaction.id
    }
    
    public async doClose(): Promise<void> {
        if (parseInt(this._closeID) > 0) {
            throw new Error('Position is already opened.')
        }
        const res = await this.placeOrder(this._closeOrder)
        this._closeID = res.orderCreateTransaction.id
    }

    public updateOrder(order: oaBasicOrder) {
        const size = Math.abs(parseInt(order.units))
        if (order.id === this._openID) {
            if (['FILLED', 'CANCELLED'].includes(order.state)) {
                this._openID = ''
                this._initialSize = size
                this._currentSize = size
                this._openPrice = parseFloat(order.price)
            }
            if (order.state === 'FILLED' && this.onOpened) {
                this.onOpened(this)
            }
            if (order.state === 'CANCELLED' && this.onOpenOrderCanceled) {
                this.onOpenOrderCanceled(this)
            }
        }
        if (order.id === this._closeID) {
            if (['FILLED', 'CANCELLED'].includes(order.state)) {
                this._closeID = ''
                this._closePrice = parseFloat(order.price)
                this._currentSize -= size
                if (this._currentSize === 0){
                    this._cumulativeProfit +=
                        this._initialSize * (this._openOrder.side === 'buy'?
                        this._closePrice - this._openPrice:
                        this._openPrice - this._closePrice)
                    this._initialSize = 0
                    this._closeCount++
                }
            }
            if (order.state === 'FILLED' && this.onClosed) {
                this.onClosed(this)
            }
            if (order.state === 'CANCELLED' && this.onCloseOrderCanceled) {
                this.onCloseOrderCanceled(this)
            }
        }
    }

    get activeID(): string {
        if (this._openID !== ''){
            return this._openID
        }
        if (this._closeID !== ''){
            return this._closeID
        }
        return ''
    }

    get enabledOpen(): boolean {
        return super.enabledOpen &&
            this.activeID === '' &&
            this._currentSize === 0
    }

    get enabledClose(): boolean {
        return super.enabledOpen &&
            this.activeID === '' &&
            this._currentSize > 0
    }

    get openOrder(): OANDAOrderClass {
        return this._openOrder
    }

    get closeOrder(): OANDAOrderClass {
        return this._closeOrder
    }

    get currentOpenPrice(): number {
        return this._openPrice
    }

    get currentClosePrice(): number {
        return this._closePrice
    }
}
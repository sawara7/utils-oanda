import {
    sleep
} from "my-utils"

import {
    BasePositionClass,
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

export interface OANDASinglePositionParameters {
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

    private _openID: string = '0'
    private _closeID: string = '0'

    // Events
    public onOpened?: (pos: OANDASinglePosition) => void
    public onClosed?: (pos: OANDASinglePosition) => void
    public onOpenOrderCanceled?: (pos: OANDASinglePosition) => void
    public onCloseOrderCanceled?: (pos: OANDASinglePosition) => void

    constructor(params: OANDASinglePositionParameters){
        super(params)
        if (!OANDASinglePosition._lastOrderTime){
            OANDASinglePosition._lastOrderTime = {}
        }
        this._marketInfo = params.marketInfo
        if (!OANDASinglePosition._lastOrderTime[this._marketInfo.name]){
            OANDASinglePosition._lastOrderTime[this._marketInfo.name] = Date.now()
        }
        this._api = params.api
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
    }

    private async placeOrder(order: OANDAOrderClass): Promise<oaOrderResponse> {
        if (OANDASinglePosition._lastOrderTime && OANDASinglePosition._lastOrderTime[this._marketInfo.name]) {
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
        return await this._api.postOrder(order.request)
    }

    public async doOpen(): Promise<void> {
        await super.doOpen()
        if (parseInt(this._openID) > 0) {
            throw new Error('Position is already opened.')
        }
        const res = await this.placeOrder(this._openOrder)
        this._openID = res.orderCreateTransaction.id
    }
    
    public async doClose(): Promise<void> {
        await super.doClose()
        if (parseInt(this._closeID) > 0) {
            throw new Error('Position is already opened.')
        }
        const res = await this.placeOrder(this._closeOrder)
        this._closeID = res.orderCreateTransaction.id
    }

    public updateOrder(order: oaBasicOrder) {
        if (order.id === this._openID) {
            const size = Math.abs(parseFloat(order.units))
            if (order.state === 'FILLED') {
                this._openID = '0'
                this._initialSize = size
                this._currentSize = size
                this._openPrice = parseFloat(order.price)
                if (this.onOpened){
                    this.onOpened(this)
                }
            }
            if (order.state === 'CANCELLED') {
                this._openID = '0'
                this._initialSize = size
                this._currentSize = size
                this._openPrice = parseFloat(order.price)
                if (this.onOpenOrderCanceled) {
                    this.onOpenOrderCanceled(this)
                }
            }
        }
        if (order.id === this._closeID) {
            const size = Math.abs(parseFloat(order.units))
            if (order.state === 'FILLED') {
                this._cumulativeProfit +=
                    this._initialSize * (this._openOrder.side === 'buy'?
                    this._closePrice - this._openPrice:
                    this._openPrice - this._closePrice)
                this._currentSize -= size
                this._initialSize = 0
                this._closeCount++
                this._closeID = '0'
                if (this.onClosed){
                    this.onClosed(this)
                }
            }
            if (order.state === 'CANCELLED') {
                this._cumulativeProfit +=
                    this._initialSize * (this._openOrder.side === 'buy'?
                    this._closePrice - this._openPrice:
                    this._openPrice - this._closePrice)
                this._currentSize -= size
                this._initialSize = 0
                this._closeID = '0'
                if (this.onCloseOrderCanceled) {
                    this.onCloseOrderCanceled(this)
                }
            }
        }
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

    get currentOpenPrice(): number {
        return this._openPrice
    }

    get currentClosePrice(): number {
        return this._closePrice
    }

    get activeID(): string {
        if (!['0', '1'].includes(this._openID)){
            return this._openID
        }
        if (!['0', '1'].includes(this._closeID)){
            return this._closeID
        }
        return ''
    }
}
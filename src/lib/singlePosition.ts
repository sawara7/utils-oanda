import {
    OrderSide,
    OrderType,
    sleep
} from "my-utils"

import {
    oaAPIClass,
    LimitOrderRequest,
    oaOrderResponse,
    oaBasicOrder
} from ".."

export interface SinglePositionParameters {
    marketName: string
    funds: number
    api: oaAPIClass
    sizeResolution: number
    priceResolution: number
    minOrderInterval?: number
    openOrderSettings?: OrderSettings
    closeOrderSettings?: OrderSettings
}

export interface SinglePositionResponse {
    success: boolean
    message?: any 
}
export interface OrderSettings {
    side: OrderSide
    type: OrderType
    price: number
    size?: number
    postOnly?: boolean
    cancelSec?: number
}
export class SinglePosition {
    // Global State
    private static _lastOrderTime?: {[marketName: string]: number}

    // Parameters
    private _api: oaAPIClass
    private _marketName: string
    private _funds: number 
    private _minOrderInterval: number
    private _openOrderSettings?: OrderSettings
    private _closeOrderSettings?: OrderSettings

    // Position State
    private _initialSize: number = 0
    private _openPrice: number = 0
    private _closePrice: number = 0
    private _openSide: OrderSide = 'buy'

    private _openID: string = '0'
    private _closeID: string = '0'
    private _sizeResolution: number
    private _priceResolution: number

    // Information
    private _closeCount: number = 0
    private _cumulativeProfit: number = 0

    // Events
    public onOpened?: (pos: SinglePosition) => void
    public onClosed?: (pos: SinglePosition) => void
    public onOpenOrderCanceled?: (pos: SinglePosition) => void
    public onCloseOrderCanceled?: (pos: SinglePosition) => void

    constructor(params: SinglePositionParameters){
        if (!SinglePosition._lastOrderTime){
            SinglePosition._lastOrderTime = {}
        }
        this._marketName = params.marketName
        if (!SinglePosition._lastOrderTime[this._marketName]){
            SinglePosition._lastOrderTime[this._marketName] = Date.now()
        }
        this._funds = params.funds
        this._api = params.api
        this._minOrderInterval = params.minOrderInterval || 200
        this._openOrderSettings = params.openOrderSettings
        this._closeOrderSettings = params.closeOrderSettings
        this._sizeResolution = params.sizeResolution
        this._priceResolution = params.priceResolution
    }

    private roundSize(size: number): number {
        return Math.round(size * (1/this._sizeResolution))/(1/this._sizeResolution)
    }

    private roundPrice(price: number): number {
        return Math.round(price * (1/this._priceResolution))/(1/this._priceResolution)
    }

    private async placeOrder(
        side: OrderSide,
        size: number,
        price: number): Promise<oaOrderResponse> {
        const p: LimitOrderRequest = {
            type: 'LIMIT',
            instrument: this._marketName,
            units: this.roundSize(size) * (side === 'buy'? 1: -1),
            positionFill : 'DEFAULT',
            price: this.roundPrice(price).toString(),
            triggerCondition: 'DEFAULT'
        }
        if (SinglePosition._lastOrderTime && SinglePosition._lastOrderTime[this._marketName]) {
            const interval = Date.now() - SinglePosition._lastOrderTime[this._marketName]
            if (interval > 0) {
                if (interval < this._minOrderInterval) {
                    SinglePosition._lastOrderTime[this._marketName] += this._minOrderInterval 
                    await sleep(this._minOrderInterval - interval)
                } else if (interval > this._minOrderInterval) {
                    SinglePosition._lastOrderTime[this._marketName] = Date.now()
                }
            } else if (interval < 0) {
                SinglePosition._lastOrderTime[this._marketName] += this._minOrderInterval
                await sleep(SinglePosition._lastOrderTime[this._marketName] - Date.now())
            }
        }
        return await this._api.postOrder(p)
    }

    public async open(): Promise<SinglePositionResponse> {
        if (!this._openOrderSettings || !this._closeOrderSettings) {
            return {success: false, message:'No open order settings.'}
        }
        if (parseInt(this._openID) > 0) {
            return {success: false, message:'Position is already opened.'}
        }
        const result: SinglePositionResponse = {
            success: false
        }
        this._openID = '1' // lock
        try { 
            const res = await this.placeOrder(
                this._openOrderSettings.side,
                this._funds/this._openOrderSettings.price,
                this._openOrderSettings.price)
            this._openID = res.orderCreateTransaction.id
            return {success: true}
        } catch(e) {
            result.message = e
            this._openID = '0'
        }
        return {success: false, message:'Open Failed.'}
    }
    
    public async close(): Promise<SinglePositionResponse> {
        if (!this._closeOrderSettings || !this._closeOrderSettings) {
            return {success: false, message:'No close order settings.'}
        }
        if (parseInt(this._closeID) > 0) {
            return {success: false, message:'Position is already closed.'}
        }
        const result: SinglePositionResponse = {
            success: false
        }
        this._closeID = '1' // lock
        try { 
            const res = await this.placeOrder(
                this._closeOrderSettings.side,
                this._funds/this._closeOrderSettings.price,
                this._closeOrderSettings.price)
            this._closeID = res.orderCreateTransaction.id
            return {success: true}
        } catch(e) {
            result.message = e
            this._closeID = '0'
        }
        return {success: false, message:'Open Failed.'}
    }

    public updateOrder(order: oaBasicOrder) {
        if (order.id === this._openID) {
            if (order.state === 'FILLED') {
                this._initialSize = this.roundSize(Math.abs(parseFloat(order.units)))
                this._openID = '0'
                this._openSide = parseFloat(order.units)>0 ? "buy": "sell"
                if (this.onOpened){
                    this.onOpened(this)
                }
            }
            if (order.state === 'CANCELLED') {
                this._openID = '0'
                if (this.onOpenOrderCanceled) {
                    this.onOpenOrderCanceled(this)
                }
            }
        }
        if (order.id === this._closeID) {
            if (order.state === 'FILLED') {
                const size = this.roundSize(Math.abs(parseFloat(order.units)))
                this._cumulativeProfit +=
                    this._initialSize * (this._openSide === 'buy'?
                    this._closePrice - this._openPrice:
                    this._openPrice - this._closePrice)
                this._closeCount++
                this._closeID = '0'
                if (this.onClosed){
                    this.onClosed(this)
                }
            }
            if (order.state === 'CANCELLED') {
                this._closeID = '0'
                if (this.onCloseOrderCanceled) {
                    this.onCloseOrderCanceled(this)
                }
            }
        }
    }

    get profit(): number {
        return this._cumulativeProfit
    }

    get enabledOpen(): Boolean {
        return this._openID === '0' && this._closeID === '0'
    }

    get openOrderSettings(): OrderSettings | undefined {
        return this._openOrderSettings
    }

    get closeOrderSettings(): OrderSettings | undefined {
        return this._closeOrderSettings
    }

    get openSide(): OrderSide {
        return this._openSide
    }

    get currentOpenPrice(): number {
        return this._openPrice
    }

    get currentClosePrice(): number {
        return this._closePrice
    }

    get closeCount(): number {
        return this._closeCount
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
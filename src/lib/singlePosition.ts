import {
    OrderSide,
    OrderType,
    sleep
} from "my-utils"

import {
    oaAPIClass,
    LimitOrderRequest
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

    private _ID: string = '0'
    private _openTime: number = 0
    private _closeTime: number = 0
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

    private async placeTakeProfitOrder(
        side: OrderSide,
        size: number,
        openPrice: number,
        closePrice: number) {
        this._openSide = side
        this._initialSize = this.roundSize(size)
        this._openPrice = this.roundPrice(openPrice)
        this._closePrice = this.roundPrice(closePrice)
        const p: LimitOrderRequest = {
            type: 'LIMIT',
            instrument: this._marketName,
            units: this._initialSize * (side === 'buy'? 1: -1),
            positionFill : 'DEFAULT',
            takeProfitOnFill: {
                price: this._closePrice.toString(),
                timeInForce: 'GTC'
            },
            price: this._openPrice.toString(),
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
        const res = await this._api.postOrder(p)
        this._ID = res.lastTransactionID
    }

    public async open(): Promise<SinglePositionResponse> {
        if (!this._openOrderSettings || !this._closeOrderSettings) {
            return {success: false, message:'No open order settings.'}
        }
        if (parseInt(this._ID) > 0) {
            return {success: false, message:'Position is already opened.'}
        }
        const result: SinglePositionResponse = {
            success: false
        }
        this._ID = '1' // lock
        try { 
            await this.placeTakeProfitOrder(
                this._openOrderSettings.side,
                this._funds/this._openOrderSettings.price,
                this._openOrderSettings.price,
                this._closeOrderSettings.price)
            return {success: true}
        } catch(e) {
            result.message = e
            this._ID = '0'
        }
        return {success: false, message:'Open Failed.'}
    }
    
    public close() {
        this._ID = '0'
        this._cumulativeProfit +=
            this._initialSize * (this._openSide === 'buy'?
            this._closePrice - this._openPrice:
            this._openPrice - this._closePrice)
        this._closeCount++
    }

    get profit(): number {
        return this._cumulativeProfit
    }

    get enabledOpen(): Boolean {
        return  this._ID === '0'
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

    get id(): string {
        return this._ID
    }
}
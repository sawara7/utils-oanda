import {
    BasePositionClass,
    BasePositionParameters,
} from "trade-utils"

import {
    oaAPIClass,
    oaOrderResponse
} from ".."

import { OANDAOrderClass } from "./order"

export interface OANDAPositionParameters extends BasePositionParameters {
    api: oaAPIClass
}

export class OANDAPositionClass extends BasePositionClass {
    private _api: oaAPIClass
    
    constructor(params: OANDAPositionParameters){
        super(params)
        this._api = params.api
    }

    private async placeOrder(order: OANDAOrderClass): Promise<oaOrderResponse> {
        if (this._backtestMode) {
            // return 
        }
        return await this._api.postOrder(order.request)
    }

    public async doOpen() {
        const res = await this.placeOrder(this.openOrder)
        return res.orderCreateTransaction.id
    }

    public async doClose() {
        const s = this.state.isLosscut? "losscut": "close"
        const res = await this.placeOrder(
            s === "close"? 
            this.closeOrder:
            new OANDAOrderClass({
                market: this.closeOrder.market,
                type: this.closeOrder.type,
                side: this.closeOrder.side,
                size: this.currentSize,
                price: this.closeOrder.side==='buy'? this.bestBid: this.bestAsk
            }))
        return res.orderCreateTransaction.id
    }
   
    public async doCancel() {
        if (this.state.orderID) {
            await this._api.cancelOrder(this.state.orderID)
        }
    }

    get openOrder(): OANDAOrderClass {
        return super.openOrder as OANDAOrderClass
    }
    
    get closeOrder(): OANDAOrderClass {
        return super.closeOrder as OANDAOrderClass
    }

    get losscutOrder(): OANDAOrderClass {
        return super.losscutOrder as OANDAOrderClass
    }
}
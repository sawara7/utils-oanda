import {
    BaseOrderSettings,
    BaseOrderClass
} from "trade-utils"

import {
    BaseOrderRequest,
    LimitOrderRequest
} from ".."

export interface OANDAOrderSettings extends BaseOrderSettings {
}

export class OANDAOrderClass extends BaseOrderClass {
    constructor (params: OANDAOrderSettings) {
        super(params)
    }

    get instrument(): string {
        return this.market.name
    }

    get units(): number {
        return this.roundSize(this.size) * (this.side === 'buy'? 1: -1)
    }

    get limitOrderRequest(): LimitOrderRequest {
        return {
            type: 'LIMIT',
            instrument: this.instrument,
            units: this.units,
            positionFill : 'DEFAULT',
            price: this.price.toString(),
            triggerCondition: 'DEFAULT'
        }
    }

    get request(): BaseOrderRequest {
        if (this.type === 'limit') {
            return this.limitOrderRequest
        }
        throw new Error('failed order create.')
    }
}
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const pair = 'USD_JPY';
    const api = yield (0, __1.getOandaAPI)("Primary");
    try {
        // const res1 = await api.getPricing({instruments: pair});
        // console.log(res1);
        // const res2 = await api.getOpenTrade();
        // console.log(res2);
        const res = yield api.getOrders({
            ids: "406314",
            state: "FILLED"
        });
        console.log(res);
        // const ids: string[] = []
        // for (const o of res.orders){
        //     api.cancelOrder(o.id)
        // }
        // const req: LimitOrderRequest = {
        //     type: 'LIMIT',
        //     instrument: pair,
        //     units: 1,
        //     positionFill : 'DEFAULT',
        //     takeProfitOnFill: {
        //         price: '121',
        //         timeInForce: 'GTC'
        //         // gtdTime?: number
        //     },
        //     price: '120',
        //     // gtdTime: Date.now() + 24*60*60*1000,
        //     triggerCondition: 'DEFAULT'
        // }
        // const res3 = await api.postOrder(req)
        // const pos = new SinglePosition({
        //     marketName: 'USD_JPY',
        //     funds: 1000,
        //     api: api,
        //     minOrderInterval: 200,
        //     sizeResolution: 1,
        //     priceResolution: 0.001,
        //     openOrderSettings: {
        //         side: 'buy',
        //         type: 'limit',
        //         price: 123.875
        //     },
        //     closeOrderSettings: {
        //         side: 'sell',
        //         type: 'limit',
        //         price: 124.5
        //     }
        // })
        // await pos.open()
        // console.log(pos.id)
        // const res2 = await api.cancelOrder('27519');
        // console.log(res2);
        // const res = await api.getInstruments();
        // // const price = await
        // res.instruments.forEach(element => {
        //     console.log(element.name); 
        // });
        // const price = await api.getPricing({
        //     instruments: 'USD_JPY,TRY_JPY'
        // })
        // console.log(price);
        // console.log(res);
    }
    catch (e) {
        console.log("error");
        console.log(e.message, e.data);
    }
}))();

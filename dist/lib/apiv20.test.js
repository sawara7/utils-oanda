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
const apiv20_1 = require("./apiv20");
const api = new apiv20_1.oaAPIClass({
    apiToken: "",
    accountID: ""
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res3 = yield api.getPricing({ instruments: 'USD_JPY' });
        console.log(res3);
        const res = yield api.getPendingOrders();
        console.log(res);
        const res2 = yield api.cancelOrder('27519');
        console.log(res2);
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
        // console.log((e as ApiError).message, (e as ApiError).data)
    }
}))();

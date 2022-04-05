import {
    getOandaAPI, LimitOrderRequest, oandaPair
} from ".."
import { ApiError } from "./api";

(async()=>{
    const pair: oandaPair = 'USD_JPY'
    const api = await getOandaAPI("Primary")
    try{
        const res1 = await api.getPricing({instruments: pair});
        console.log(res1);
        
        const res2 = await api.getOpenTrade();
        console.log(res2);

        const req: LimitOrderRequest = {
            type: 'LIMIT',
            instrument: pair,
            units: 1,
            positionFill : 'DEFAULT',
            takeProfitOnFill: {
                price: '121',
                timeInForce: 'GTC'
                // gtdTime?: number
            },
            price: '120',
            // gtdTime: Date.now() + 24*60*60*1000,
            triggerCondition: 'DEFAULT'
        }
        const res3 = await api.postOrder(req)

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
    }catch(e){
        console.log((e as ApiError).message, (e as ApiError).data)
    }
    
})()
import {
    oaAPIClass
} from "./apiv20"

const api = new oaAPIClass({
    apiToken: "",
    accountID: ""
});

(async()=>{
    try{
        const res3 = await api.getPricing({instruments: 'USD_JPY'});
        console.log(res3);
        
        const res = await api.getPendingOrders();
        console.log(res);

        const res2 = await api.cancelOrder('27519');
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
    }catch(e){
        // console.log((e as ApiError).message, (e as ApiError).data)
    }
    
})()
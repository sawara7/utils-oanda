import { oandaPair, oandaPairs } from "./type"

test('Instrument', async () => {
    expect(oandaPairs.includes("USD_JPY")).toBeTruthy()
})
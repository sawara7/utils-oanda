import { InstrumentName, InstrumentNames } from "./type"

test('Instrument', async () => {
    expect(InstrumentNames.includes("USD_JPY")).toBeTruthy()
})
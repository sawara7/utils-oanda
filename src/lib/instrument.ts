import { Instrument } from "./rest/responseType"
import { InstrumentName } from "./rest/type"
import { oaAPIClass } from "./rest/api"

export async function getInstrument(api: oaAPIClass, name: InstrumentName): Promise<Instrument> {
    const res = await api.getInstruments()
    for (const instrument of res.instruments) {
        if (instrument.name === name) {
            return instrument
        }
    }
    throw new Error("not found: " + name)
}
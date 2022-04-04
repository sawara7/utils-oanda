import { getRealTimeDatabase } from "my-utils";
import { oaAPIClass } from "..";

export async function getOandaAPI(label: string): Promise<oaAPIClass> {
    const rdb = await getRealTimeDatabase()
    const id = await rdb.get(await rdb.getReference('settings/oanda/accounts/' + label)) as string
    const token = await rdb.get(await rdb.getReference('settings/oanda/apiToken')) as string
    return new oaAPIClass({
        apiToken: token,
        accountID: id,
    })
}
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
exports.getOandaAPI = void 0;
const my_utils_1 = require("my-utils");
const __1 = require("..");
function getOandaAPI(label) {
    return __awaiter(this, void 0, void 0, function* () {
        const rdb = yield (0, my_utils_1.getRealTimeDatabase)();
        const id = yield rdb.get(yield rdb.getReference('settings/oanda/accounts/' + label));
        const token = yield rdb.get(yield rdb.getReference('settings/oanda/apiToken'));
        return new __1.oaAPIClass({
            apiToken: token,
            accountID: id,
        });
    });
}
exports.getOandaAPI = getOandaAPI;

"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseApiClass = exports.ApiError = void 0;
const http = __importStar(require("http"));
const https = __importStar(require("https"));
const axios_1 = __importDefault(require("axios"));
class ApiError extends Error {
    constructor(code, message, data) {
        super('API_ERROR');
        this.code = 0;
        this.message = '';
        this.code = code;
        this.message = message;
        this.data = data;
    }
}
exports.ApiError = ApiError;
class baseApiClass {
    constructor(config, options) {
        this.endPoint = config.endPoint || "";
        this.keepAlive = config.keepAlive || false;
        this.timeout = config.timeout || 3000;
        if (options) {
            this.optionsCallback = options.optionsCallback;
            this.responseCallback = options.responseCallback;
        }
    }
    get(path, params, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('GET', path, params, undefined, headers);
        });
    }
    post(path, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('POST', path, undefined, data, headers);
        });
    }
    put(path, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.request('PUT', path, undefined, data, headers);
        });
    }
    request(method, path, params, data, headers) {
        return __awaiter(this, void 0, void 0, function* () {
            const options = {
                method: method,
                baseURL: this.endPoint,
                url: path,
                timeout: this.timeout,
                httpAgent: new http.Agent({ keepAlive: this.keepAlive }),
                httpsAgent: new https.Agent({ keepAlive: this.keepAlive }),
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            if (params && Object.keys(params).length > 0) {
                Object.assign(options, { params });
            }
            if (data && Object.keys(data).length >= 0) {
                Object.assign(options, { data });
            }
            if (headers && Object.keys(headers).length > 0) {
                Object.assign(options, { headers });
            }
            if (this.optionsCallback) {
                yield this.optionsCallback(options);
            }
            try {
                const res = yield axios_1.default.request(options);
                if (this.responseCallback) {
                    this.responseCallback(res.data);
                }
                return res.data;
            }
            catch (e) {
                const err = e;
                let code = 0;
                let message = err.message;
                let data;
                if (err.response) {
                    code = err.response.status;
                    data = err.response.data;
                }
                throw new ApiError(code, message, data);
            }
            // return axios.request(options).then((res) => {
            //   if (this.responseCallback) {
            //     this.responseCallback(res.data);
            //   }
            //   return res.data;
            // }).catch((e: AxiosError) => {
            //   let code = 0;
            //   let message = e.message;
            //   let data;
            //   if (e.response) {
            //     code = e.response.status;
            //     data = e.response.data;
            //   }
            //   throw new ApiError(code, message, data);
            // });
        });
    }
}
exports.baseApiClass = baseApiClass;

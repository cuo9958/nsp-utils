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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("../request"));
class default_1 {
    constructor(opts) {
        this.domain = "http://127.0.0.1:18900/api_user";
        if (opts.baseUrl) {
            this.domain = opts.baseUrl + "/api_user";
        }
    }
    Auth(username, token) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = this.domain + "/pub/auth";
            try {
                const data = yield request_1.default.get(url, null, { username, token });
                return data;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = default_1;

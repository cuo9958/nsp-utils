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
const axios_1 = __importDefault(require("axios"));
const query_string_1 = __importDefault(require("query-string"));
axios_1.default.defaults.timeout = 5000;
const server = axios_1.default.create();
function _fetch(url, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let res;
        try {
            opts.url = url;
            res = yield server(opts);
        }
        catch (e) {
            throw new Error("网络连接失败，请检查网络权限");
        }
        return res;
    });
}
function _request(url, opts) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield _fetch(url, opts);
        if (res.status !== 200) {
            throw new Error("网络连接失败，请检查网络");
        }
        let json = res.data;
        if (json.code !== 1) {
            throw new Error(json.msg);
        }
        return json.data;
    });
}
function get(url, data = {}, headers = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = query_string_1.default.parseUrl(url);
        obj = Object.assign(obj, data);
        const params = query_string_1.default.stringify(obj.query, {
            skipNull: true,
        });
        if (params) {
            url = obj.url + "?" + params;
        }
        return _request(url, {
            method: "GET",
            credentials: "include",
            headers,
        });
    });
}
function post(url, data = {}, headers = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return _request(url, {
            method: "POST",
            data,
            credentials: "include",
            headers,
        });
    });
}
function del(url, data = {}, headers = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        let obj = query_string_1.default.parseUrl(url);
        obj = Object.assign(obj, data);
        const params = query_string_1.default.stringify(obj.query, {
            skipNull: true,
        });
        if (params) {
            url = obj.url + "?" + params;
        }
        return _request(url, {
            method: "DELETE",
            credentials: "include",
            headers,
        });
    });
}
function put(url, data = {}, headers = {}) {
    return __awaiter(this, void 0, void 0, function* () {
        return _request(url, {
            method: "PUT",
            data,
            credentials: "include",
            headers,
        });
    });
}
exports.default = { get, post, del, put };

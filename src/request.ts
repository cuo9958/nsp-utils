import Axios from "axios";
import QS from "query-string";

Axios.defaults.timeout = 5000;

const server = Axios.create();

async function _fetch(url: string, opts: any) {
    let res;
    try {
        opts.url = url;
        res = await server(opts);
    } catch (e) {
        throw new Error("网络连接失败，请检查网络权限");
    }
    return res;
}
async function _request(url: string, opts: any) {
    let res = await _fetch(url, opts);
    if (res.status !== 200) {
        throw new Error("网络连接失败，请检查网络");
    }
    let json = res.data;
    if (json.code !== 1) {
        throw new Error(json.msg);
    }
    return json.data;
}

async function get(url: string, data: any = {}, headers: any = {}) {
    let obj = QS.parseUrl(url);
    obj = Object.assign(obj, data);
    const params = QS.stringify(obj.query, {
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
}

async function post(url: string, data: any = {}, headers: any = {}) {
    return _request(url, {
        method: "POST",
        data,
        credentials: "include",
        headers,
    });
}
async function del(url: string, data: any = {}, headers: any = {}) {
    let obj = QS.parseUrl(url);
    obj = Object.assign(obj, data);
    const params = QS.stringify(obj.query, {
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
}

async function put(url: string, data: any = {}, headers: any = {}) {
    return _request(url, {
        method: "PUT",
        data,
        credentials: "include",
        headers,
    });
}

export default { get, post, del, put };

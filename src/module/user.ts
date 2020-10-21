import request from "../request";
import config from "config";

const pass_check = config.get("pass_check");
interface iOpts {
    /**
     * 用户模块的地址，默认:http://127.0.0.1:18900
     */
    baseUrl?: string;
}


/**
 * 用户模块提供的可使用方法
 */
export default class  {
    domain = "http://127.0.0.1:18900/api_user";

    constructor(opts: iOpts) {
        if (opts.baseUrl) {
            this.domain = opts.baseUrl + "/api_user";
        }
    }
    /**
     * 通过用户名和token校验当前用户的身份
     * @param username 用户名
     * @param token token
     */
    async Auth(username: string, token: string) {
        const url = this.domain + "/pub/auth";
        try {
            const data = await request.get(url, null, { username, token, pass_check });
            return data;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}

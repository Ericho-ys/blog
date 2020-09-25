/* eslint-disable no-empty */
import axios from "axios";
import {
    storage
} from "../utils/index";
import router from "../router/index";


export default function http(Vue) {
    const service = axios.create({
        baseURL: "http://127.0.0.1:3001",
        method: "POST",
        dataType: "json",
        timeout: 10000, // request timeout
        responseType: "json",
    });
    service.interceptors.request.use((config) => {
        const url = config.url;
        if (url) {
            if (url.indexOf("login") == -1) {
                const token = storage.get("token");
                if (token) {
                    config.headers["token"] = token;
                } else {
                    router.push("/login");
                }
            }
        }
        return config;
    });

    service.interceptors.response.use((response) => {
        const res = response.data;
        if (res.resCode == 1) {
            return res;
        } else {
            if (res.msgCode == 10005) {
                storage.remove("token");
                router.push("/login");
            } else {
                Vue.prototype.$message.error(res.errorMsg);
                return res.errorMsg;
            }
        }
    });
    return service
}
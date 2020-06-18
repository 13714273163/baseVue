/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import axios from "axios"
import {
    getCk
} from "@/common/utils"
import Loading from "@/components/loading"
import Message from "@/components/message"
export const isDevelopment = process.env.NODE_ENV === "development"
export const isProductionTest = (process.env.NODE_ENV === "production") && (process.env.VUE_APP_FLAG === "offline")
export const isProduction = (process.env.NODE_ENV === "production") && (process.env.VUE_APP_FLAG === "online")
let baseURL, loading
if (isDevelopment) {
    baseURL = "https://pre.coinslot.com/onlineadmin/admin/"
} else if (isProductionTest) {
    baseURL = "https://pre.coinslot.com/onlineadmin/admin/"
} else {
    baseURL = "http://10.0.0.223:8001"
}
// console.log({
//     isDevelopment,
//     isProductionTest,
//     isProduction
// })
function getCommonParams () {
    const ck = getCk() || ""
    return {
        ck
    }
}

const Ajax = axios.create({
    baseURL,
    withCredentials: true, // 表示跨域请求时是否需要使用凭证
    //   headers: {
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   },
    params: {
        ID: "axios default params"
    },
    data: {
        firstName: "axios default data"
    },
    timeout: 10 * 1000
})
// 自定义参数
const customizedData = {
    isShowLoading: true // 是否显示loading
}

Ajax.interceptors.request.use(
    (config) => {
        config.otherConfig = {
            ...customizedData,
            ...config.otherConfig
        }
        console.log(config)

        if (config.otherConfig.isShowLoading) {
            loading = Loading()
        }
        if (config.method === "get") {
            config.params = {
                ...getCommonParams(),
                ...config.params
            }
        } else {
            config.data = {
                ...getCommonParams(),
                ...config.data
            }
        }
        return config
    },
    () => {
        return Promise.resolve({
            code: -1,
            msg: "网络异常，请稍后重试"
        })
    }
)
Ajax.interceptors.response.use(
    (response) => {
        loading && loading.close()
        const res = response.data
        if (res.status === "96") {
            return Message(res.message)
        }
        if (res.status === "214") {
            return Message("登录态过期请重新登录")
        }
        return res.data
    },
    () => {
        loading && loading.close()
        return Promise.resolve({
            code: -1,
            msg: "服务异常，请稍后重试"
        })
    }
)
export default Ajax

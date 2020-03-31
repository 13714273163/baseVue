import Ajax from "./Http"
// 登陆
export function login (data = {
}, otherConfig = {
}) {
    return Ajax({
        method: "post",
        url: "user/login",
        data,
        otherConfig
    })
}

// 获取登录态
export function getUserInfo (data = {
}, otherConfig = {
}) {
    return Ajax({
        method: "get",
        url: "user/info",
        params: data,
        otherConfig
    })
}

import Cookies from "js-cookie"

let ckKey = "ms-adminck"
ckKey = "ck"

export function getCk () {
    return Cookies.get(ckKey)
}

export function setCk (ck) {
    return Cookies.set(ckKey, ck)
}

export function removeCk () {
    return Cookies.remove(ckKey)
}

export function getURLParams () {
    const string = window.location.search
    const obj = {
    }
    string.slice(1).split("&").map(item => {
        if (item !== "") {
            const arr = item.split("=")
            obj[arr[0]] = decodeURIComponent(decodeURIComponent(arr[1]))
        }
    })
    return obj
}

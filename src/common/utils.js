import {
    _cookie
} from "@/plugins/Cookie"
let ckKey = "ck"

export function getCk () {
    return _cookie.get(ckKey)
}

export function setCk (ck) {
    return _cookie.set(ckKey, ck)
}

export function removeCk () {
    return _cookie.remove(ckKey)
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

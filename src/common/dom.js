
var trim = function trim (string) {
    return (string || "").replace(/^[\s\uFEFF]+|[\s\uFEFF]+$/g, "")
}

export const on = (function () {
    return function (element, event, handler) {
        if (element && event && handler) {
            element.addEventListener(event, handler, false)
        }
    }
})()

export const off = (function () {
    return function (element, event, handler) {
        if (element && event) {
            element.removeEventListener(event, handler, false)
        }
    }
})()

// todo 好像有原生api
export const once = function (el, event, fn) {
    var listener = function () {
        if (fn) {
            fn.apply(this, arguments)
        }
        off(el, event, listener)
    }
    on(el, event, listener)
}

export let hasClass = function (el, cls) {
    if (!el || !cls) {return false}
    if (cls.indexOf(" ") !== -1) {throw new Error("className should not contain space.")}
    if (el.classList) {
        return el.classList.contains(cls)
    } else {
        return (" " + el.className + " ").indexOf(" " + cls + " ") > -1
    }
}

export let addClass = function (el, cls) {
    if (!el) {return}
    var curClass = el.className
    var classes = (cls || "").split(" ")

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) {continue}

        if (el.classList) {
            el.classList.add(clsName)
        } else if (!hasClass(el, clsName)) {
            curClass += " " + clsName
        }
    }
    if (!el.classList) {
        el.className = curClass
    }
}

export let removeClass = function (el, cls) {
    if (!el || !cls) {return}
    var classes = cls.split(" ")
    var curClass = " " + el.className + " "

    for (var i = 0, j = classes.length; i < j; i++) {
        var clsName = classes[i]
        if (!clsName) {continue}

        if (el.classList) {
            el.classList.remove(clsName)
        } else if (hasClass(el, clsName)) {
            curClass = curClass.replace(" " + clsName + " ", " ")
        }
    }
    if (!el.classList) {
        el.className = trim(curClass)
    }
}

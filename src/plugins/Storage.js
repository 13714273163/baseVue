class Storage {
    set (key, data, timeout = 999999999999) {
        var time = parseInt(Date.now() / 1000)
        var json = {
            t: time + timeout,
            c: data
        }
        try {
            localStorage.setItem(key, JSON.stringify(json))
        } catch (e) {
            // 缓存满，清空
            console.warn("本地缓存满，全部清空")
            localStorage.clear()
        }
    }

    get (key) {
        var time = parseInt(Date.now() / 1000)
        const data = localStorage.getItem(key)
        if (data) {
            const json = JSON.parse(data)
            if (json.t && json.t > time) {
                console.debug("本地缓存获取成功 key:[" + key + "] 还有过期" + (json.t - time) + "秒过期")
                return json.c
            }
            localStorage.removeItem(key)
            console.warn("本地缓存获取超时 key:[" + key + "]")
        }
        return null
    }

    del (key) {
        localStorage.removeItem(key)
    }
}

export default function (Vue, options) {
    Vue.Storage = new Storage(options)
    Object.defineProperties(Vue.prototype, {
        $Storage: {
            get () {
                return Vue.Storage
            }
        }
    })
}

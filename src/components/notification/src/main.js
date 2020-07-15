import Vue from "vue"
import Main from "./main.vue"

const NotificationConstructor = Vue.extend(Main)

let instance
let instances = []
let seed = 1

const Notification = function (options = {

}) {
    const userOnClose = options.onClose
    const id = "notification" + seed++
    options.onClose = function () {
        Notification.close(id, userOnClose)
    }
    instance = new NotificationConstructor({
        data:options
    })

    instance.id = id
    instance.$mount()
    document.body.appendChild(instance.$el)
    instances.push(instance)
    instance.visible = true
    let verticalOffset = options.offset || 0
    instances.forEach(item => {
        // 第一个为0?
        verticalOffset += item.$el.offsetHeight + 16
    })
    instance.verticalOffset = verticalOffset
    return instance
}

Notification.close = function (id, userOnClose) {
    let index = -1
    let len = instances.length
    let instance = instances.find((item, i) => {
        if (item.id === id) {
            index = i
            return true
        }
        return false
    })
    if (len < 1 || !instance) {return}
    if (typeof userOnClose === "function") {
        userOnClose(instance)
    }
    instances.splice(index, 1)
    let removedHeight = instance.$el.offsetHeight

    for (let i = index; i < len-1; i++) {
        instances[i].$el.style[instance.verticalProperty] =
            parseInt(instances[i].$el.style[instance.verticalProperty], 10) - removedHeight - 16 + "px"
    }
}

Notification.closeAll = function () {
    for (let i = instances.length - 1; i >= 0; i--) {
        instances[i].close()
    }
}
export default Notification

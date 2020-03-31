import Vue from "vue"
import Main from "./main.vue"

const MessageConstructor = Vue.extend(Main)

let instance
const Message = function (options = {
}) {
    if (typeof options === "string") {
        options = {
            message: options
        }
    }

    instance = new MessageConstructor({
        data: options
    })

    instance.$mount()
    document.body.appendChild(instance.$el)

    instance.visible = true
    return instance
}

export default Message

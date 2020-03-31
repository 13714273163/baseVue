const timer = setInterval(() => {
    console.log(1)
}, 1000)
// 通过$once来监听定时器，在beforeDestroy钩子可以被清除。
this.$once('hook:beforeDestroy', () => {
    clearInterval(timer)
})

this.$router.push({
    path: '/ccc',
    query: {
        page: 1
    }
})

import Vue from 'vue'
import Main from './main.vue'

const MessageConstructor = Vue.extend(Main)
let instance
const Message = function () {
  instance = new MessageConstructor()
  instance.$mount()
  document.body.appendChild(instance.$el)
}
export default Message


// cross-env NODE_ENV=preRelease PART=true

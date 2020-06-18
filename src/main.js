import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import plugins from "@/plugins"
import "./style/lib-reset.less"
import "./style/el-base.css"
// import Vant from 'vant'
// import 'vant/lib/index.css'
// Vue.use(Vant)
// import ElementUI from 'element-ui'
// Vue.use(ElementUI)
// import 'element-ui/lib/theme-chalk/index.css'

// todo 自动引入
import message from "@/components/message/src/main.js"
import loading from "@/components/loading/src/main.js"
const install = function (Vue) {
    Vue.prototype.$message = message
    Vue.prototype.$loading = loading
}
Vue.use(install)
Vue.config.productionTip = false
Vue.use(plugins)

Vue.directive("focus", {
    inserted (el) {
        // TODO v-clickOutside
        el.focus()
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")

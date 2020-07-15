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
import ElementUI from "element-ui"
Vue.use(ElementUI)
import "element-ui/lib/theme-chalk/index.css"

// 奇怪的引入方式
// import NutUI from "@nutui/nutui"
// import "@nutui/nutui/dist/nutui.css"
// NutUI.install(Vue)

// todo 自动引入
import message from "@/components/message/src/main.js"
import loading from "@/components/loading/src/main.js"
import Alert from "@/components/alert/index.js"
import Backtop from "@/components/backtop/index.js"
import Badge from "@/components/badge/index.js"
import Notification from "@/components/notification/index.js"
// import InfiniteScroll from "@/components/infinitescroll/index.js"
// import Icon from "@/components/icon/index.js"
Vue.component(Alert.name, Alert)
Vue.component(Backtop.name, Backtop)
Vue.component(Badge.name, Badge)
// Vue.component(Icon.name, Icon)
// Vue.component(Notification.name, Notification)
const install = function (Vue) {
    // Vue.use(InfiniteScroll)
    Vue.prototype.$message = message
    Vue.prototype.$loading = loading
    Vue.prototype.$notify = Notification
}
Vue.use(install)
Vue.config.productionTip = false
Vue.use(plugins)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app")

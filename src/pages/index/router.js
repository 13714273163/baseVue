import Vue from "vue"
import VueRouter from "vue-router"
// import store from "@/store/index.js"
import Home from "./views/Home.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/home",
        name: "Home",
        component: Home,
        meta: {
            title: "首页",
            needLogin: false // 必须要登录才能访问
        }
    },
    // {
    //     path: "/about",
    //     name: "About",
    //     // route level code-splitting
    //     // this generates a separate chunk (about.[hash].js) for this route
    //     // which is lazy-loaded when the route is visited.
    //     component: () => import(/* webpackChunkName: "about" */ "./views/About.vue"),
    //     meta: {
    //         title: "about",
    //         needLogin: false
    //     }
    // },
    {
        path: "/login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "./views/Login.vue"),
        meta: {
            title: "登录"
        }
    },
    {
        path: "/user/:id",
        name: "user",
        component: () => import(/* webpackChunkName: "user" */ "./views/User.vue")
    },
    {
        path: "/directory",
        name: "Directory",
        component: () => import(/* webpackChunkName: "Directory" */ "./views/Directory.vue")
    },
    {
        path: "*",
        redirect: "/home"
    }
]

const router = new VueRouter({
    mode: "history",
    linkActiveClass: "on",
    scrollBehavior: () => ({
        y: 0
    }),
    routes
})

router.beforeEach(async (to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    // if (to.meta.needLogin) {
    //     const info = await store.dispatch("user/checkLogin")
    //     if (!info.ck) {
    //         next({
    //             path: "/login",
    //             query: {
    //                 back: from.path
    //             }
    //         })
    //     } else {
    //         next()
    //     }
    // } else {
    //     next()
    // }
    next()
})
export default router

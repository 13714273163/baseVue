<template>
    <div class="login-wrapper">
        <div class="form-wrapper">
            <div class="field">
                <div class="form-item user-item">
                    <input
                        v-model="username"
                        type="text"
                        class="field-ipt"
                        placeholder="请输入会员名"
                        autocomplete="off"
                    >
                </div>
                <div class="form-item pwd-item">
                    <input
                        v-model="password"
                        type="password"
                        class="field-ipt"
                        placeholder="请输入登录密码"
                        autocomplete="off"
                    >
                </div>
                <div class="form-item">
                    <button
                        type="button"
                        class="field-btn"
                        :class="{'disable': username === '' || password === ''}"
                        @click="onSubmit"
                    >
                        登录
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    login
} from "@/api/login"
export default {
    data () {
        return {
            username: "madsports_xiezg",
            password: "hzi*JQJx4W"
        }
    },
    watch: {

    },
    created () {
    },
    methods: {
        async onSubmit () {
            //   debugger
            const vm = this
            if (vm.username === "") {
                return vm.$Toast("请输入用户名")
            }

            if (vm.password === "") {
                return vm.$Toast("请输入密码")
            }
            const ret = await login({
                username: vm.username,
                password: vm.password
            })
            vm.$store.dispatch("user/setInfo", ret)
            vm.$router.push("/home")
        }
    }
}
</script>
<style lang="less" scoped>
</style>

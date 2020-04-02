<template>
    <div id="app">
        <input
            v-focus
            type="text"
        >
        <div class="header">
            <ul class="nav">
                <router-link
                    v-for="(item, index) in nav"
                    :key="item.path"
                    :to="{path:item.path, query:{index}}"
                    tag="li"
                >
                    <a href="javascript:;">
                        {{ item.label }}
                    </a>
                </router-link>
            </ul>
        </div>
        <router-view />
    </div>
</template>

<script>
export default {
    name: "",
    directives: {
    },
    components: {
    },
    mixins: [],
    props: {
    },
    data () {
        return {
            nav:[
                {
                    label:"首页",
                    path:"/home"
                },
                {
                    label:"关于我们",
                    path:"/about"
                },
                {
                    label:"登录",
                    path:"/login"
                },
                {
                    label:"用户1",
                    path:"/user/1"
                },
                {
                    label:"用户2",
                    path:"/user/2"
                }
            ]
        }
    },
    computed: {
    },
    mounted () {

    },
    beforeDestroy () {
    },
    methods: {
    }
}
</script>

<style lang="less"  type="text/less" scope>
.nav {
  display: flex;
  li {
    margin: 10px;
  }
  li.on {
    color: #666;
  }
}
</style>

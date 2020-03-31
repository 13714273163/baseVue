<template>
    <div id="app">
        about
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

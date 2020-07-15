<template>
    <div v-if="scrollTop>visibilityHeight" @click="handleClick" :style="{
        'right':styleRight,
        'bottom':styleBottom
    }" class="el-backtop"
    >

    </div>
</template>

<script>
import throttle from "throttle-debounce/throttle"
export default {
    name:"Backtop",
    directives:{

    },
    components: {
    },
    mixins:[],
    props:{
        visibilityHeight:{
            type:Number,
            default:200
        },
        right:{
            type:Number,
            default:40
        },
        bottom:{
            type:Number,
            default:40
        }
    },
    data () {
        return {
            scrollTop: 0
        }
    },
    computed: {
        styleBottom () {
            return `${this.bottom}px`
        },
        styleRight () {
            return `${this.right}px`
        }
    },
    mounted () {
        window.addEventListener("scroll",this.handleScroll)
    },
    destroyed () {
        window.removeEventListener("scroll",throttle(5,this.handleScroll))
    },
    methods: {
        handleClick () {
            this.scroll()
            this.$emit("click")
        },
        handleScroll () {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        },
        scroll () {
            const c = this.scrollTop
            if (c > 0) {
                window.requestAnimationFrame(this.scroll)
                window.scrollTo(0, c - c / 8)
            }
        }
    }
}
</script>

<style lang="less" scoped type="text/less">
.el-backtop{
    background: #666;
}
</style>

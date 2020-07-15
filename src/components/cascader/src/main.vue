<template>
    <div v-click-outside="close">
        <div class="trigger" @click="toggle">
            <slot></slot>
        </div>
        <CascaderItem :options="options" @change="change" :value="value"></CascaderItem>
    </div>
</template>

<script>
export default {
    name:"Cascader",
    directives:{
        clickOutside:{
            inserted (el, bindings) {
                document.addEventListener("click",e => {
                    if (e.target === el || el.contains(e.target)) {
                        return
                    }
                    bindings.value()
                })
            }
        }
    },
    components: {},
    mixins:[],
    props:{
        options:{
            type:Array,
            default:() => []
        },
        value:{ // 用户选择的值
            type:Array,
            default:() => []
        }
    },
    data () {
        return {
            isVisible:true,
            currentSelect:null
        }
    },
    computed: {
        lists () {
            return this.currentSelect && this.currentSelect.children
        }
    },
    mounted () {},
    beforeDestroy () {},
    methods: {
        close () {
            this.isVisible = false
        },
        toggle () {
            this.isVisible = !this.isVisible
        },
        change (value) {

        }
    }
}
</script>

<style lang="less" scoped type="text/less">
.trigger{
    width: 150px;
    height:25px;
    border: 1px solid #ccc
}
.content{
    display:flex
}
</style>

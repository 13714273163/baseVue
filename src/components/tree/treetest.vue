<template>
    <div class="guowf-tree">
        <tree-node-test v-for="child in 5" :key="child">
        </tree-node-test>
    </div>
</template>

<script>
import treeNodeTest from "./tree-node-test.vue"
export default {
    name:"",
    directives:{
    },
    components: {
        treeNodeTest
    },
    mixins:[],
    props:{
    },
    data () {
        return {

        }
    },
    computed: {
    },
    mounted () {},
    beforeDestroy () {},
    methods: {
    }
}
</script>

<style lang="less" scoped type="text/less">

</style>

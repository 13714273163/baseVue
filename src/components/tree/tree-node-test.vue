<template>
    <div class="tree-node">
        <div class="tree-content">
            <span class="tree-expand-icon icon-caret-right"></span>
            <span class="tree-label">
                一级
            </span>
        </div>
        <div class="tree-children">
            <!-- <tree-node></tree-node> -->
        </div>
    </div>
</template>

<script>
export default {
    name:"TreeNode",
    components: {
    },
    mixins:[],
    props:{
    },
    data () {
        return {
            root:""
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

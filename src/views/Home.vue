<template>
    <div class="home">
        <tree
            :data="data"
            :props="defaultProps"
            highlight-current="true"
            @node-click="handleNodeClick"
            indent="50"
        >
        </tree>
        <treetest :data="data"></treetest>
    </div>
</template>

<script>
import tree from "@/components/tree/tree"

import treetest from "@/components/tree/treetest"
export default {
    components: {
        tree,
        treetest
    },
    data () {
        return {
            data: [{
                label: "一级 3",
                children: [{
                    label: "二级 3-1",
                    children: [{
                        label: "三级 3-1-1"
                    }]
                }, {
                    label: "二级 3-2",
                    children: [{
                        label: "三级 3-2-1"
                    }]
                }]
            }],
            defaultProps: {
                children: "children",
                label: "label"
            }
        }
    },
    methods: {
        handleNodeClick (data) {
            console.log(data)
        }
    }
}
</script>

<style lang="less" scoped type="text/less">
</style>

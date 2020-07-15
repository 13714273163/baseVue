<template>
    <div class="guowf-tree">
        <tree-node-test>
        </tree-node-test>
    </div>
</template>

<script>
import treeNodeTest from "./tree-node-test.vue"
import TreeStore from "./model/tree-store"
export default {
    name:"",
    directives:{
    },
    components: {
        treeNodeTest
    },
    mixins:[],
    props: {
        data: {
            type: Array
        },
        emptyText: {
            type: String,
            default () {
                return "数据为空"
            }
        },
        renderAfterExpand: {
            type: Boolean,
            default: true
        },
        nodeKey: String,
        checkStrictly: Boolean,
        defaultExpandAll: Boolean,
        expandOnClickNode: {
            type: Boolean,
            default: true
        },
        checkOnClickNode: Boolean,
        checkDescendants: {
            type: Boolean,
            default: false
        },
        autoExpandParent: {
            type: Boolean,
            default: true
        },
        defaultCheckedKeys: Array,
        defaultExpandedKeys: Array,
        currentNodeKey: [String, Number],
        renderContent: Function,
        showCheckbox: {
            type: Boolean,
            default: false
        },
        draggable: {
            type: Boolean,
            default: false
        },
        allowDrag: Function,
        allowDrop: Function,
        props: {
            default () {
                return {
                    children: "children",
                    label: "label",
                    disabled: "disabled"
                }
            }
        },
        lazy: {
            type: Boolean,
            default: false
        },
        highlightCurrent: String,
        load: Function,
        filterNodeMethod: Function,
        accordion: Boolean,
        indent: {
            type: String,
            default: "18"
        },
        iconClass: String
    },
    data () {
        return {
            store: null,
            root: null,
            currentNode: null,
            treeItems: null,
            checkboxItems: [],
            dragState: {
                showDropIndicator: false,
                draggingNode: null,
                dropNode: null,
                allowDrop: true
            }
        }
    },
    computed: {
    },
    created () {
        this.store = new TreeStore({
            key: this.nodeKey,
            data: this.data,
            lazy: this.lazy,
            props: this.props,
            load: this.load,
            currentNodeKey: this.currentNodeKey,
            checkStrictly: this.checkStrictly,
            checkDescendants: this.checkDescendants,
            defaultCheckedKeys: this.defaultCheckedKeys,
            defaultExpandedKeys: this.defaultExpandedKeys,
            autoExpandParent: this.autoExpandParent,
            defaultExpandAll: this.defaultExpandAll,
            filterNodeMethod: this.filterNodeMethod
        })
        this.root = this.store.root
        console.log(this.root)

    },
    mounted () {

    },
    beforeDestroy () {

    },
    methods: {
    }
}
</script>

<style lang="less" scoped type="text/less">

</style>

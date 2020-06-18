<template>
    <div
        class="el-tree"
        :class="{
            'el-tree--highlight-current': !!highlightCurrent,
            'is-dragging': !!dragState.draggingNode,
            'is-drop-not-allow': !dragState.allowDrop,
            'is-drop-inner': dragState.dropType === 'inner'
        }"
    >
        <el-tree-node
            v-for="child in root.childNodes"
            :key="getNodeKey(child)"
            :node="child"
            :props="props"
            :render-after-expand="renderAfterExpand"
            :show-checkbox="showCheckbox"
            :render-content="renderContent"
            @node-expand="handleNodeExpand"
        >
        </el-tree-node>
        <div
            v-if="isEmpty"
            class="el-tree__empty-block"
        >
            <span class="el-tree__empty-text">{{ emptyText }}</span>
        </div>
    </div>
</template>

<script>
import TreeStore from "./model/tree-store"
import {
    getNodeKey, findNearestComponent
} from "./model/util"
import ElTreeNode from "./tree-node.vue"
import emitter from "@/mixins/emitter"
import {
    addClass, removeClass
} from "@/common/dom"
export default {
    name:"Tree",
    directives:{
    },
    components: {
        ElTreeNode
    },
    mixins: [emitter],
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
        children: {
            set (value) {
                this.data = value
            },
            get () {
                return this.data
            }
        },

        treeItemArray () {
            return Array.prototype.slice.call(this.treeItems)
        },

        isEmpty () {
            const {
                childNodes
            } = this.root
            return !childNodes || childNodes.length === 0 || childNodes.every(({
                visible
            }) => !visible)
        }
    },
    watch: {
        defaultCheckedKeys (newVal) {
            this.store.setDefaultCheckedKey(newVal)
        },

        defaultExpandedKeys (newVal) {
            this.store.defaultExpandedKeys = newVal
            this.store.setDefaultExpandedKeys(newVal)
        },

        data (newVal) {
            this.store.setData(newVal)
        },

        checkboxItems (val) {
            Array.prototype.forEach.call(val, (checkbox) => {
                checkbox.setAttribute("tabindex", -1)
            })
        },

        checkStrictly (newVal) {
            this.store.checkStrictly = newVal
        }
    },
    created () {
        this.isTree = true

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

        let dragState = this.dragState
        this.$on("tree-node-drag-start", (event, treeNode) => {
            if (typeof this.allowDrag === "function" && !this.allowDrag(treeNode.node)) {
                event.preventDefault()
                return false
            }
            event.dataTransfer.effectAllowed = "move"

            // wrap in try catch to address IE's error when first param is 'text/plain'
            try {
                // setData is required for draggable to work in FireFox
                // the content has to be '' so dragging a node out of the tree won't open a new tab in FireFox
                event.dataTransfer.setData("text/plain", "")
            } catch (e) {
                console.log("222")

            }
            dragState.draggingNode = treeNode
            this.$emit("node-drag-start", treeNode.node, event)
        })

        this.$on("tree-node-drag-over", (event, treeNode) => {
            const dropNode = findNearestComponent(event.target, "ElTreeNode")
            const oldDropNode = dragState.dropNode
            if (oldDropNode && oldDropNode !== dropNode) {
                removeClass(oldDropNode.$el, "is-drop-inner")
            }
            const draggingNode = dragState.draggingNode
            if (!draggingNode || !dropNode) {return}

            let dropPrev = true
            let dropInner = true
            let dropNext = true
            let userAllowDropInner = true
            if (typeof this.allowDrop === "function") {
                dropPrev = this.allowDrop(draggingNode.node, dropNode.node, "prev")
                userAllowDropInner = dropInner = this.allowDrop(draggingNode.node, dropNode.node, "inner")
                dropNext = this.allowDrop(draggingNode.node, dropNode.node, "next")
            }
            event.dataTransfer.dropEffect = dropInner ? "move" : "none"
            if ((dropPrev || dropInner || dropNext) && oldDropNode !== dropNode) {
                if (oldDropNode) {
                    this.$emit("node-drag-leave", draggingNode.node, oldDropNode.node, event)
                }
                this.$emit("node-drag-enter", draggingNode.node, dropNode.node, event)
            }

            if (dropPrev || dropInner || dropNext) {
                dragState.dropNode = dropNode
            }

            if (dropNode.node.nextSibling === draggingNode.node) {
                dropNext = false
            }
            if (dropNode.node.previousSibling === draggingNode.node) {
                dropPrev = false
            }
            if (dropNode.node.contains(draggingNode.node, false)) {
                dropInner = false
            }
            if (draggingNode.node === dropNode.node || draggingNode.node.contains(dropNode.node)) {
                dropPrev = false
                dropInner = false
                dropNext = false
            }

            const targetPosition = dropNode.$el.getBoundingClientRect()
            const treePosition = this.$el.getBoundingClientRect()

            let dropType
            const prevPercent = dropPrev ? (dropInner ? 0.25 : (dropNext ? 0.45 : 1)) : -1
            const nextPercent = dropNext ? (dropInner ? 0.75 : (dropPrev ? 0.55 : 0)) : 1

            let indicatorTop = -9999
            const distance = event.clientY - targetPosition.top
            if (distance < targetPosition.height * prevPercent) {
                dropType = "before"
            } else if (distance > targetPosition.height * nextPercent) {
                dropType = "after"
            } else if (dropInner) {
                dropType = "inner"
            } else {
                dropType = "none"
            }

            const iconPosition = dropNode.$el.querySelector(".el-tree-node__expand-icon").getBoundingClientRect()
            const dropIndicator = this.$refs.dropIndicator
            if (dropType === "before") {
                indicatorTop = iconPosition.top - treePosition.top
            } else if (dropType === "after") {
                indicatorTop = iconPosition.bottom - treePosition.top
            }
            dropIndicator.style.top = indicatorTop + "px"
            dropIndicator.style.left = (iconPosition.right - treePosition.left) + "px"

            if (dropType === "inner") {
                addClass(dropNode.$el, "is-drop-inner")
            } else {
                removeClass(dropNode.$el, "is-drop-inner")
            }

            dragState.showDropIndicator = dropType === "before" || dropType === "after"
            dragState.allowDrop = dragState.showDropIndicator || userAllowDropInner
            dragState.dropType = dropType
            this.$emit("node-drag-over", draggingNode.node, dropNode.node, event)
        })

        this.$on("tree-node-drag-end", (event) => {
            const {
                draggingNode, dropType, dropNode
            } = dragState
            event.preventDefault()
            event.dataTransfer.dropEffect = "move"

            if (draggingNode && dropNode) {
                const draggingNodeCopy = {
                    data: draggingNode.node.data
                }
                if (dropType !== "none") {
                    draggingNode.node.remove()
                }
                if (dropType === "before") {
                    dropNode.node.parent.insertBefore(draggingNodeCopy, dropNode.node)
                } else if (dropType === "after") {
                    dropNode.node.parent.insertAfter(draggingNodeCopy, dropNode.node)
                } else if (dropType === "inner") {
                    dropNode.node.insertChild(draggingNodeCopy)
                }
                if (dropType !== "none") {
                    this.store.registerNode(draggingNodeCopy)
                }

                removeClass(dropNode.$el, "is-drop-inner")

                this.$emit("node-drag-end", draggingNode.node, dropNode.node, dropType, event)
                if (dropType !== "none") {
                    this.$emit("node-drop", draggingNode.node, dropNode.node, dropType, event)
                }
            }
            if (draggingNode && !dropNode) {
                this.$emit("node-drag-end", draggingNode.node, null, dropType, event)
            }

            dragState.showDropIndicator = false
            dragState.draggingNode = null
            dragState.dropNode = null
            dragState.allowDrop = true
        })
    },

    mounted () {
        this.initTabIndex()
        this.$el.addEventListener("keydown", this.handleKeydown)
    },

    updated () {
        this.treeItems = this.$el.querySelectorAll("[role=treeitem]")
        this.checkboxItems = this.$el.querySelectorAll("input[type=checkbox]")
    },

    methods: {
        filter (value) {
            if (!this.filterNodeMethod) {throw new Error("[Tree] filterNodeMethod is required when filter")}
            this.store.filter(value)
        },

        getNodeKey (node) {
            return getNodeKey(this.nodeKey, node.data)
        },

        getNodePath (data) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in getNodePath")}
            const node = this.store.getNode(data)
            if (!node) {return []}
            const path = [node.data]
            let parent = node.parent
            while (parent && parent !== this.root) {
                path.push(parent.data)
                parent = parent.parent
            }
            return path.reverse()
        },

        getCheckedNodes (leafOnly, includeHalfChecked) {
            return this.store.getCheckedNodes(leafOnly, includeHalfChecked)
        },

        getCheckedKeys (leafOnly) {
            return this.store.getCheckedKeys(leafOnly)
        },

        getCurrentNode () {
            const currentNode = this.store.getCurrentNode()
            return currentNode ? currentNode.data : null
        },

        getCurrentKey () {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in getCurrentKey")}
            const currentNode = this.getCurrentNode()
            return currentNode ? currentNode[this.nodeKey] : null
        },

        setCheckedNodes (nodes, leafOnly) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in setCheckedNodes")}
            this.store.setCheckedNodes(nodes, leafOnly)
        },

        setCheckedKeys (keys, leafOnly) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in setCheckedKeys")}
            this.store.setCheckedKeys(keys, leafOnly)
        },

        setChecked (data, checked, deep) {
            this.store.setChecked(data, checked, deep)
        },

        getHalfCheckedNodes () {
            return this.store.getHalfCheckedNodes()
        },

        getHalfCheckedKeys () {
            return this.store.getHalfCheckedKeys()
        },

        setCurrentNode (node) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in setCurrentNode")}
            this.store.setUserCurrentNode(node)
        },

        setCurrentKey (key) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in setCurrentKey")}
            this.store.setCurrentNodeKey(key)
        },

        getNode (data) {
            return this.store.getNode(data)
        },

        remove (data) {
            this.store.remove(data)
        },

        append (data, parentNode) {
            this.store.append(data, parentNode)
        },

        insertBefore (data, refNode) {
            this.store.insertBefore(data, refNode)
        },

        insertAfter (data, refNode) {
            this.store.insertAfter(data, refNode)
        },

        handleNodeExpand (nodeData, node, instance) {
            this.broadcast("ElTreeNode", "tree-node-expand", node)
            this.$emit("node-expand", nodeData, node, instance)
        },

        updateKeyChildren (key, data) {
            if (!this.nodeKey) {throw new Error("[Tree] nodeKey is required in updateKeyChild")}
            this.store.updateChildren(key, data)
        },

        initTabIndex () {
            this.treeItems = this.$el.querySelectorAll(".is-focusable[role=treeitem]")
            this.checkboxItems = this.$el.querySelectorAll("input[type=checkbox]")
            const checkedItem = this.$el.querySelectorAll(".is-checked[role=treeitem]")
            if (checkedItem.length) {
                checkedItem[0].setAttribute("tabindex", 0)
                return
            }
            this.treeItems[0] && this.treeItems[0].setAttribute("tabindex", 0)
        },

        handleKeydown (ev) {
            const currentItem = ev.target
            if (currentItem.className.indexOf("el-tree-node") === -1) {return}
            const keyCode = ev.keyCode
            this.treeItems = this.$el.querySelectorAll(".is-focusable[role=treeitem]")
            const currentIndex = this.treeItemArray.indexOf(currentItem)
            let nextIndex
            if ([38, 40].indexOf(keyCode) > -1) { // up、down
                ev.preventDefault()
                if (keyCode === 38) { // up
                    nextIndex = currentIndex !== 0 ? currentIndex - 1 : 0
                } else {
                    nextIndex = (currentIndex < this.treeItemArray.length - 1) ? currentIndex + 1 : 0
                }
                this.treeItemArray[nextIndex].focus() // 选中
            }
            if ([37, 39].indexOf(keyCode) > -1) { // left、right 展开
                ev.preventDefault()
                currentItem.click() // 选中
            }
            const hasInput = currentItem.querySelector("[type=\"checkbox\"]")
            if ([13, 32].indexOf(keyCode) > -1 && hasInput) { // space enter选中checkbox
                ev.preventDefault()
                hasInput.click()
            }
        }
    }
}
</script>

<style lang="less" type="text/less">
@charset "UTF-8";.el-fade-in-enter,.el-fade-in-leave-active,.el-fade-in-linear-enter,.el-fade-in-linear-leave,.el-fade-in-linear-leave-active,.fade-in-linear-enter,.fade-in-linear-leave,.fade-in-linear-leave-active{opacity:0}.el-checkbox,.el-checkbox__input{display:inline-block;position:relative}.fade-in-linear-enter-active,.fade-in-linear-leave-active{-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.el-fade-in-linear-enter-active,.el-fade-in-linear-leave-active{-webkit-transition:opacity .2s linear;transition:opacity .2s linear}.el-fade-in-enter-active,.el-fade-in-leave-active{-webkit-transition:all .3s cubic-bezier(.55,0,.1,1);transition:all .3s cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter-active,.el-zoom-in-center-leave-active{-webkit-transition:all .3s cubic-bezier(.55,0,.1,1);transition:all .3s cubic-bezier(.55,0,.1,1)}.el-zoom-in-center-enter,.el-zoom-in-center-leave-active{opacity:0;-webkit-transform:scaleX(0);transform:scaleX(0)}.el-zoom-in-top-enter-active,.el-zoom-in-top-leave-active{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center top;transform-origin:center top}.el-zoom-in-top-enter,.el-zoom-in-top-leave-active{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0)}.el-zoom-in-bottom-enter-active,.el-zoom-in-bottom-leave-active{opacity:1;-webkit-transform:scaleY(1);transform:scaleY(1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:center bottom;transform-origin:center bottom}.el-zoom-in-bottom-enter,.el-zoom-in-bottom-leave-active{opacity:0;-webkit-transform:scaleY(0);transform:scaleY(0)}.el-zoom-in-left-enter-active,.el-zoom-in-left-leave-active{opacity:1;-webkit-transform:scale(1,1);transform:scale(1,1);-webkit-transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1);transition:transform .3s cubic-bezier(.23,1,.32,1),opacity .3s cubic-bezier(.23,1,.32,1),-webkit-transform .3s cubic-bezier(.23,1,.32,1);-webkit-transform-origin:top left;transform-origin:top left}.el-zoom-in-left-enter,.el-zoom-in-left-leave-active{opacity:0;-webkit-transform:scale(.45,.45);transform:scale(.45,.45)}.collapse-transition{-webkit-transition:.3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out;transition:.3s height ease-in-out,.3s padding-top ease-in-out,.3s padding-bottom ease-in-out}.horizontal-collapse-transition{-webkit-transition:.3s width ease-in-out,.3s padding-left ease-in-out,.3s padding-right ease-in-out;transition:.3s width ease-in-out,.3s padding-left ease-in-out,.3s padding-right ease-in-out}.el-list-enter-active,.el-list-leave-active{-webkit-transition:all 1s;transition:all 1s}.el-list-enter,.el-list-leave-active{opacity:0;-webkit-transform:translateY(-30px);transform:translateY(-30px)}.el-opacity-transition{-webkit-transition:opacity .3s cubic-bezier(.55,0,.1,1);transition:opacity .3s cubic-bezier(.55,0,.1,1)}.el-checkbox{color:#606266;font-weight:500;font-size:14px;cursor:pointer;white-space:nowrap;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;margin-right:30px}.el-checkbox.is-bordered{padding:9px 20px 9px 10px;border-radius:4px;border:1px solid #DCDFE6;-webkit-box-sizing:border-box;box-sizing:border-box;line-height:normal;height:40px}.el-checkbox.is-bordered.is-checked{border-color:#409EFF}.el-checkbox.is-bordered.is-disabled{border-color:#EBEEF5;cursor:not-allowed}.el-checkbox.is-bordered+.el-checkbox.is-bordered{margin-left:10px}.el-checkbox.is-bordered.el-checkbox--medium{padding:7px 20px 7px 10px;border-radius:4px;height:36px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__label{line-height:17px;font-size:14px}.el-checkbox.is-bordered.el-checkbox--medium .el-checkbox__inner{height:14px;width:14px}.el-checkbox.is-bordered.el-checkbox--small{padding:5px 15px 5px 10px;border-radius:3px;height:32px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__label{line-height:15px;font-size:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--small .el-checkbox__inner::after{height:6px;width:2px}.el-checkbox.is-bordered.el-checkbox--mini{padding:3px 15px 3px 10px;border-radius:3px;height:28px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__label{line-height:12px;font-size:12px}.el-checkbox-button__inner,.el-checkbox__input{line-height:1;vertical-align:middle;white-space:nowrap;outline:0}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner{height:12px;width:12px}.el-checkbox.is-bordered.el-checkbox--mini .el-checkbox__inner::after{height:6px;width:2px}.el-checkbox__input{cursor:pointer}.el-checkbox__input.is-disabled .el-checkbox__inner{background-color:#edf2fc;border-color:#DCDFE6;cursor:not-allowed}.el-checkbox__input.is-disabled .el-checkbox__inner::after{cursor:not-allowed;border-color:#C0C4CC}.el-checkbox__input.is-disabled .el-checkbox__inner+.el-checkbox__label{cursor:not-allowed}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner{background-color:#F2F6FC;border-color:#DCDFE6}.el-checkbox__input.is-disabled.is-checked .el-checkbox__inner::after{border-color:#C0C4CC}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner{background-color:#F2F6FC;border-color:#DCDFE6}.el-checkbox__input.is-disabled.is-indeterminate .el-checkbox__inner::before{background-color:#C0C4CC;border-color:#C0C4CC}.el-checkbox__input.is-checked .el-checkbox__inner,.el-checkbox__input.is-indeterminate .el-checkbox__inner{background-color:#409EFF;border-color:#409EFF}.el-checkbox__input.is-disabled+span.el-checkbox__label{color:#C0C4CC;cursor:not-allowed}.el-checkbox__input.is-checked .el-checkbox__inner::after{-webkit-transform:rotate(45deg) scaleY(1);transform:rotate(45deg) scaleY(1)}.el-checkbox__input.is-checked+.el-checkbox__label{color:#409EFF}.el-checkbox__input.is-focus .el-checkbox__inner{border-color:#409EFF}.el-checkbox__input.is-indeterminate .el-checkbox__inner::before{content:'';position:absolute;display:block;background-color:#FFF;height:2px;-webkit-transform:scale(.5);transform:scale(.5);left:0;right:0;top:5px}.el-checkbox__input.is-indeterminate .el-checkbox__inner::after{display:none}.el-checkbox__inner{display:inline-block;position:relative;border:1px solid #DCDFE6;border-radius:2px;-webkit-box-sizing:border-box;box-sizing:border-box;width:14px;height:14px;background-color:#FFF;z-index:1;-webkit-transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46);transition:border-color .25s cubic-bezier(.71,-.46,.29,1.46),background-color .25s cubic-bezier(.71,-.46,.29,1.46)}.el-checkbox__inner:hover{border-color:#409EFF}.el-checkbox__inner::after{-webkit-box-sizing:content-box;box-sizing:content-box;content:"";border:1px solid #FFF;border-left:0;border-top:0;height:7px;left:4px;position:absolute;top:1px;-webkit-transform:rotate(45deg) scaleY(0);transform:rotate(45deg) scaleY(0);width:3px;-webkit-transition:-webkit-transform .15s ease-in .05s;transition:-webkit-transform .15s ease-in .05s;transition:transform .15s ease-in .05s;transition:transform .15s ease-in .05s,-webkit-transform .15s ease-in .05s;-webkit-transform-origin:center;transform-origin:center}.el-checkbox__original{opacity:0;outline:0;position:absolute;margin:0;width:0;height:0;z-index:-1}.el-checkbox-button,.el-checkbox-button__inner{display:inline-block;position:relative}.el-checkbox__label{display:inline-block;padding-left:10px;line-height:19px;font-size:14px}.el-checkbox:last-of-type{margin-right:0}.el-checkbox-button__inner{font-weight:500;cursor:pointer;background:#FFF;border:1px solid #DCDFE6;border-left:0;color:#606266;-webkit-appearance:none;text-align:center;-webkit-box-sizing:border-box;box-sizing:border-box;margin:0;-webkit-transition:all .3s cubic-bezier(.645,.045,.355,1);transition:all .3s cubic-bezier(.645,.045,.355,1);-moz-user-select:none;-webkit-user-select:none;-ms-user-select:none;padding:12px 20px;font-size:14px;border-radius:0}.el-checkbox-button__inner.is-round{padding:12px 20px}.el-checkbox-button__inner:hover{color:#409EFF}.el-checkbox-button__inner [class*=el-icon-]{line-height:.9}.el-checkbox-button__inner [class*=el-icon-]+span{margin-left:5px}.el-checkbox-button__original{opacity:0;outline:0;position:absolute;margin:0;z-index:-1}.el-checkbox-button.is-checked .el-checkbox-button__inner{color:#FFF;background-color:#409EFF;border-color:#409EFF;-webkit-box-shadow:-1px 0 0 0 #8cc5ff;box-shadow:-1px 0 0 0 #8cc5ff}.el-checkbox-button.is-checked:first-child .el-checkbox-button__inner{border-left-color:#409EFF}.el-checkbox-button.is-disabled .el-checkbox-button__inner{color:#C0C4CC;cursor:not-allowed;background-image:none;background-color:#FFF;border-color:#EBEEF5;-webkit-box-shadow:none;box-shadow:none}.el-checkbox-button.is-disabled:first-child .el-checkbox-button__inner{border-left-color:#EBEEF5}.el-checkbox-button:first-child .el-checkbox-button__inner{border-left:1px solid #DCDFE6;border-radius:4px 0 0 4px;-webkit-box-shadow:none!important;box-shadow:none!important}.el-checkbox-button.is-focus .el-checkbox-button__inner{border-color:#409EFF}.el-checkbox-button:last-child .el-checkbox-button__inner{border-radius:0 4px 4px 0}.el-checkbox-button--medium .el-checkbox-button__inner{padding:10px 20px;font-size:14px;border-radius:0}.el-checkbox-button--medium .el-checkbox-button__inner.is-round{padding:10px 20px}.el-checkbox-button--small .el-checkbox-button__inner{padding:9px 15px;font-size:12px;border-radius:0}.el-checkbox-button--small .el-checkbox-button__inner.is-round{padding:9px 15px}.el-checkbox-button--mini .el-checkbox-button__inner{padding:7px 15px;font-size:12px;border-radius:0}.el-checkbox-button--mini .el-checkbox-button__inner.is-round{padding:7px 15px}.el-checkbox-group{font-size:0}.el-tree{position:relative;cursor:default;background:#FFF;color:#606266}.el-tree__empty-block{position:relative;min-height:60px;text-align:center;width:100%;height:100%}.el-tree__empty-text{position:absolute;left:50%;top:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);color:#909399}.el-tree__drop-indicator{position:absolute;left:0;right:0;height:1px;background-color:#409EFF}.el-tree-node{white-space:nowrap;outline:0}.el-tree-node:focus>.el-tree-node__content{background-color:#F5F7FA}.el-tree-node.is-drop-inner>.el-tree-node__content .el-tree-node__label{background-color:#409EFF;color:#fff}.el-tree-node__content{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:26px;cursor:pointer}.el-tree-node__content>.el-tree-node__expand-icon{padding:6px}.el-tree-node__content>.el-checkbox{margin-right:8px}.el-tree-node__content:hover{background-color:#F5F7FA}.el-tree.is-dragging .el-tree-node__content{cursor:move}.el-tree.is-dragging .el-tree-node__content *{pointer-events:none}.el-tree.is-dragging.is-drop-not-allow .el-tree-node__content{cursor:not-allowed}.el-tree-node__expand-icon{cursor:pointer;color:#C0C4CC;font-size:12px;-webkit-transform:rotate(0);transform:rotate(0);-webkit-transition:-webkit-transform .3s ease-in-out;transition:-webkit-transform .3s ease-in-out;transition:transform .3s ease-in-out;transition:transform .3s ease-in-out,-webkit-transform .3s ease-in-out}.el-tree-node__expand-icon.expanded{-webkit-transform:rotate(90deg);transform:rotate(90deg)}.el-tree-node__expand-icon.is-leaf{color:transparent;cursor:default}.el-tree-node__label{font-size:14px}.el-tree-node__loading-icon{margin-right:8px;font-size:14px;color:#C0C4CC}.el-tree-node>.el-tree-node__children{overflow:hidden;background-color:transparent}.el-tree-node.is-expanded>.el-tree-node__children{display:block}.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content{background-color:#f0f7ff}
</style>

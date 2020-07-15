<template>
    <div class="el-alert" v-show="visible" :class="[typeClass, center? 'is-center':'','is-'+effect]">
        <i class="el-alert__icon" :class="[iconClass, isBigIcon]" v-if="showIcon"></i>
        <div class="el-alert__content">
            <span class="el-alert__title" v-if="title" :class="[isBoldTitle]">
                {{ title }}
            </span>
            <p class="el-alert__description" v-if="$slots.default">
                <slot></slot>
            </p>
            <i class="el-alert__closebtn" :class="[ closeText === '' ? 'el-icon-close':'is-customed']" v-show="closeable" @click="close">
                {{ closeText }}
            </i>
        </div>

    </div>
</template>

<script>
const TYPE_CLASSES_MAP = {
    "success":"el-icon-success",
    "warning":"el-icon-warning",
    "error":"el-icon-error"
}
export default {
    name:"GuowfAlert",
    directives:{
    },
    components: {
    },
    mixins:[],
    props:{
        title:{
            type: String,
            default:""
        },
        type:{
            type: String,
            default:"info"
        },
        closeable:{
            type:Boolean,
            default:true
        },
        closeText:{
            type:String,
            default:""
        },
        showIcon:{
            type:Boolean,
            default:true
        },
        center:{
            type:Boolean,
            default:false
        },
        effect: {
            type: String,
            default: "light",
            validator: function (value) {
                return ["light", "dark"].indexOf(value) !== -1
            }
        }

    },
    data () {
        return {
            visible:true
        }
    },
    computed: {
        typeClass () {
            return `el-alert--${ this.type }`
        },
        iconClass () {
            return TYPE_CLASSES_MAP[this.type] || "el-icon-info"
        },
        isBigIcon () {
            return this.$slots.default ? "is-big" :""
        },
        isBoldTitle () {
            return this.$slots.default ? "is-bold" :""
        }
    },
    mounted () {
    },
    beforeDestroy () {},
    methods: {
        close () {
            this.visible = false
            this.$emit("close")
        }
    }
}
</script>

<style lang="less"  type="text/less">

</style>

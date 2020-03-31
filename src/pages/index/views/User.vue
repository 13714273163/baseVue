<template>
    <div class="home">
        {{ $route.params.id }}
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

        }
    },
    computed: {
    },
    beforeRouteUpdate (to, from, next) {
        next()
    },
    mounted () {

    },
    beforeDestroy () {},
    methods: {

    }
}
</script>

<style lang="less" scoped type="text/less">
</style>

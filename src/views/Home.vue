<template>
   <div>
       <button class="btn" @click="btn">btn</button>
   </div>
</template>

<script>
export default {
  name: '',
  mixins: [],
  props: {},
  directives: {},
  data () {
    return {

    }
  },
  components: {
  },
  computed: {},
  methods: {
    btn () {
      this.$message({
        message: 'test'
      })
    }
  },
  mounted () {

  },
  beforeDestroy () {}
}
</script>

<style lang="less" scoped type="text/less">

</style>

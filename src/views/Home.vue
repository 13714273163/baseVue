<template>
   <div>
        <form action="http://localhost:8080/about" method="POST">
            <input name="file" type="file" id="file">
            <input type="submit" value="提交">
        </form>
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
        message: 'asdddddddddddddddddddddddddddddddd'
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

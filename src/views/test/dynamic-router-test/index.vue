<template>
  <base-card
    id="dynamic-router-test"
    class="y-page">
    <el-button
      @click.native="openTag"
      class="mini"
      type="primary">
      打开动态标签页
    </el-button>
  </base-card>
</template>

<script>
export default {
  name: 'DynamicRouterTest',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    openTag() {
      this.$router.push({
        name: 'IndependentTagviewTest',
        params: { id: Date.now() },
      })
    },
  },
}
</script>

<style lang="scss">
#dynamic-router-test {
}
</style>

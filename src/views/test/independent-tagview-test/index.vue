<template>
  <base-card
    id="independent-tagview-test"
    class="y-page">
    <h2>{{ title }}</h2>
    <el-input v-model="inputVal"></el-input>
  </base-card>
</template>

<script>
export default {
  name: 'IndependentTagviewTest',
  components: {},
  props: {},
  data() {
    return {
      title: '',
      inputVal: '',
    }
  },
  computed: {},
  watch: {},
  created() {
    this.title = this.$route.params.id
  },
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
#independent-tagview-test {
}
</style>

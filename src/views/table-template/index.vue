<template>
  <base-card
    id="table-template"
    class="y-page">
    列表模板
    <el-input v-model="input"></el-input>
  </base-card>
</template>

<script>
export default {
  name: 'TableTemplate',
  components: {},
  props: {},
  data() {
    return {
      input: '',
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss">
#table-template {
}
</style>

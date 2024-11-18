<template>
  <base-card
    id="inner-link"
    class="y-page"
    v-loading="loading">
    <iframe
      ref="iframe"
      :src="src"
      frameborder="0"></iframe>
  </base-card>
</template>

<script>
export default {
  name: 'InnerLink',
  components: {},
  props: {
    route: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    src() {
      let query = new URLSearchParams(this.route.query)
      return `${this.route.meta?.link}?${query.toString()}`
    },
  },
  watch: {},
  mounted() {
    this.$refs.iframe &&
      (this.$refs.iframe.onload = () => {
        this.loading = false
      })
  },
  methods: {},
}
</script>

<style lang="scss">
#inner-link {
  background-color: transparent;
  overflow: hidden;

  > iframe {
    @include full;
  }
}
</style>

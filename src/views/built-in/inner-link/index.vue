<template>
  <base-card
    id="inner-link"
    class="y-page"
    v-loading="loading">
    <iframe
      ref="iframe"
      :src="link"
      frameborder="0"></iframe>
  </base-card>
</template>

<script>
export default {
  name: 'InnerLink',
  components: {},
  props: {},
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    link() {
      return this.$route?.meta?.link
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

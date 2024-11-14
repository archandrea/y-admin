<template>
  <base-card
    id="inner-link"
    class="y-page">
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
    return {}
  },
  computed: {
    link() {
      return this.$route?.meta?.link
    },
  },
  watch: {},
  created() {},
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

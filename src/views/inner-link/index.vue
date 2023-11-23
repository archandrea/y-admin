<template>
  <y-card
    id="inner-link"
    class="y-page">
    <iframe
      :src="link"
      frameborder="0"></iframe>
  </y-card>
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
  mounted() {},
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

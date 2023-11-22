<template>
  <div>
    <span>主题色</span>
    <theme-picker
      style="height: 26px"
      @change="themeChange" />
  </div>
</template>

<script>
export default {
  components: {
    'theme-picker': () => import('@/components/ThemePicker'),
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  methods: {
    themeChange(val) {
      this.$store.dispatch('setting/changeSetting', {
        key: 'themeColor',
        value: val,
      })
    },
  },
}
</script>

<style lang="scss"></style>

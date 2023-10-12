<template>
  <i
    v-if="isEl"
    class="sub-el-icon"
    :class="icon"
    v-on="$listeners"></i>
  <svg
    v-else
    class="svg-icon"
    aria-hidden="true"
    v-on="$listeners">
    <use :href="iconName"></use>
  </svg>
</template>

<script>
export default {
  name: 'SvgIcon',
  components: {},
  props: {
    icon: {
      type: String,
      required: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    iconName() {
      return `#icon-${this.icon}`
    },
    isEl() {
      return /^el\-.*/.test(this.icon)
    },
  },
  methods: {},
}
</script>

<style>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.12em;
  fill: currentColor;
  overflow: hidden;
}
</style>

<template>
  <component
    :is="type"
    v-bind="linkProps(to)">
    <slot></slot>
  </component>
</template>

<script>
import { isExternal } from '@/utils/validate'

export default {
  props: {
    to: {
      type: String,
      required: true,
    },
    target: {
      type: String, // blank | self | inner
      default: 'blank',
    },
  },
  computed: {
    isExternal() {
      return isExternal(this.to)
    },
    type() {
      if (this.isExternal) {
        return 'a'
      }
      return 'router-link'
    },
  },
  methods: {
    linkProps(to) {
      if (this.isExternal && this.target !== 'inner') {
        return {
          href: to,
          target: '_' + this.target,
          rel: 'noopener',
        }
      }
      return {
        to: to,
      }
    },
  },
}
</script>

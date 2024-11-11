<script>
export default {
  functional: true,
  props: {
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  render(h, context) {
    const { icon, title } = context.props
    const vnodes = []
    if (icon) {
      vnodes.push(<svg-icon icon={icon} />)
    }

    if (title) {
      vnodes.push(
        <span
          slot="title"
          class="title">
          {title}
        </span>
      )
    }
    return vnodes
  },
}
</script>

<style scoped>
.sub-el-icon {
  color: currentColor;
  width: 1em;
  height: 1em;
}

.title {
  flex: 1;
  -webkit-line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: justify;
  word-break: break-all;
}
</style>

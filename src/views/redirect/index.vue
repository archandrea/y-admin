<script>
export default {
  created() {
    const { params, query } = this.$route
    let { path } = params
    this.$router.replace({ path: '/' + encodeURI(decodeURI(path)), query })
  },
  render: function (h) {
    return h() // avoid warning message
  },
}
</script>

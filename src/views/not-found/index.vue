<template>
  <div id="not-found">
    <div class="wrapper">
      <el-image
        style="width: auto; height: 100%"
        :src="require('@/assets/images/404.png')"
        fit="contain"></el-image>
      <h4>抱歉，页面走丢了</h4>
      <el-button
        type="primary"
        plain
        @click.native="$router.push('/')"
        >返回首页</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss">
#not-found {
  @include full;
  @include flex-center;

  .wrapper {
    @include flex-col;
    width: 100%;
    height: 40%;

    h4 {
      font-size: 20px;
      color: $txtColor-light;
    }
  }
}
</style>

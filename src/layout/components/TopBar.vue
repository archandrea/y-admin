<template>
  <div class="y-layout_bar flex-row">
    <div class="y-layout_logo">
      <router-link to="/">
        <h1 style="color: #fff">LOGO</h1>
      </router-link>
    </div>
    <div class="container flex-row">
      <div class="y-layout_tools flex-row">
        <svg-icon icon="notification"></svg-icon>
        <svg-icon icon="tag"></svg-icon>
        <full-screen></full-screen>
      </div>
      <shortcut-menu></shortcut-menu>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    'shortcut-menu': () => import('./ShortcutMenu'),
    'full-screen': () => import('@/components/FullScreen'),
  },
  data() {
    return {
    }
  },
  computed: {},
}
</script>

<style lang="scss">
.y-layout_bar {
  align-items: center;
  padding: 0 16px;
  width: 100%;
  height: 64px;
  background-color: $themeColor;

  & > .container {
    flex: 0;
    justify-content: flex-end;
  }
}

.y-layout_user {
  align-items: center;
  color: $txtColor-reverse;
  cursor: pointer;

  .username {
    padding: 0 8px;
    font-size: 18px;
  }
}

.y-layout_tools {
  align-items: center;
  font-size: 14px;
  color: $txtColor-reverse;

  svg {
    margin-right: 24px;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>

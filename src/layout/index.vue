<template>
  <div
    id="y-layout"
    class="clearfix">
    <top-bar></top-bar>
    <div class="container flex-row">
      <aside-bar></aside-bar>
      <div class="container flex-col">
        <tag-bar></tag-bar>
        <div class="y-layout_main">
          <transition
            appear
            name="fade-transform"
            mode="out-in">
            <keep-alive :include="cachedViews">
              <router-view :key="routeKey"></router-view>
            </keep-alive>
          </transition>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  name: 'layout',
  components: {
    // 框架组件
    'top-bar': () => import('./components/TopBar.vue'),
    'aside-bar': () => import('./components/AsideBar.vue'),
    'tag-bar': () => import('./components/TagBar.vue'),
  },
  data() {
    return {}
  },
  computed: {
    cachedViews() {
      return this.$store.state.tagBar.cachedViews
    },
    routeKey() {
      return this.$route.path
    },
  },
  created() {
    this.verifySession = debounce(
      () => {
        this.$store.dispatch('user/getUserInfo')
      },
      800,
      true
    )
    // document.addEventListener('visibilitychange', this.verifySession)
  },
  beforeDestroy() {
    // document.removeEventListener('visibilitychange', this.verifySession)
  },
  methods: {},
}
</script>

<style lang="scss">
#y-layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: $bgColor-dark;

  & > .container {
    flex: 1;
    overflow: hidden;

    & > .container {
      flex: 1;
      overflow: hidden;
    }
  }

  .y-layout_main {
    flex: 1;
    margin: 16px 0 0 16px;
    padding: 0 16px 16px 0;
    height: calc(100vh - 64px);
    overflow: auto;
  }

  .flex-col {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .flex-row {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

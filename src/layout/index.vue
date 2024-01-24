<template>
  <div
    :id="`${namespace}-layout`"
    class="clearfix">
    <top-bar v-if="showTopBar"></top-bar>
    <div class="container layout-flex-row">
      <aside-bar v-if="showAsideBar"></aside-bar>
      <div class="container layout-flex-col">
        <tag-bar v-if="showTagBar"></tag-bar>
        <div :class="`${namespace}-layout_main`">
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
      <right-panel v-if="showSettings">
        <setting></setting>
      </right-panel>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'Layout',
  components: {
    // 框架组件
    'top-bar': () => import('./components/TopBar'),
    'aside-bar': () => import('./components/AsideBar'),
    'tag-bar': () => import('./components/TagBar'),
    setting: () => import('./components/Setting'),
    'right-panel': () => import('@/components/RightPanel'),
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
    ...mapState({
      namespace: (state) => state.setting.namespace,
      showSettings: (state) => state.setting.showSettings,
      showTagBar: (state) => state.setting.showTagBar,
      showAsideBar: (state) => state.setting.showAsideBar,
      showTopBar: (state) => state.setting.showTopBar,
    }),
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
##{$namespace}-layout {
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

  .#{$namespace}-layout_main {
    flex: 1;
    margin: 16px 0 0 16px;
    padding: 0 16px 16px 0;
    height: calc(100vh - 64px);
    overflow: auto;
  }

  .layout-flex-col {
    display: flex;
    flex-direction: column;
  }

  .layout-flex-row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
}
</style>

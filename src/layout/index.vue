<!-- TODO: 
 1. 优化iframe页面首次加载（不应该一次性加载所有） 
 2. 优化iframe页面缓存逻辑
 3. 测试noCache对iframe页面是否有效
 -->
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
          <transition-group
            appear
            name="fade-transform"
            mode="out-in">
            <inner-link
              v-for="view in iframeViews"
              :key="view.name"
              :route="view"
              v-show="view.fullPath === routeKey"></inner-link>
          </transition-group>
          <transition
            appear
            name="fade-transform"
            mode="out-in">
            <keep-alive :include="noIframeCachedViews">
              <router-view
                :key="routeKey"
                v-if="noIframeCachedViews.includes(routeName)"></router-view>
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
import TopBar from './components/TopBar'
import AsideBar from './components/AsideBar'
import TagBar from './components/TagBar'
import TrafficBar from './components/TrafficBar'
import Setting from './components/Setting'
import RightPanel from '@/components/RightPanel'
import InnerLink from '@/views/built-in/inner-link'
import { mapState } from 'vuex'
import { debounce } from '@/utils'

export default {
  name: 'Layout',
  components: {
    TopBar,
    AsideBar,
    TagBar,
    TrafficBar,
    Setting,
    RightPanel,
    InnerLink,
  },
  data() {
    return {}
  },
  computed: {
    visitedViews() {
      return this.$store.state.tagBar.visitedViews
    },
    cachedViews() {
      return this.$store.state.tagBar.cachedViews
    },
    iframeViews() {
      return this.visitedViews.filter((view) => this.isIframePage(view))
    },
    iframeViewNames() {
      return this.iframeViews.map((view) => view.name)
    },
    noIframeCachedViews() {
      return this.cachedViews.filter((view) => !this.iframeViewNames.includes(view))
    },
    routeName() {
      return this.$route.name
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
  methods: {
    methods: {
      isIframePage(route) {
        return route.meta?.target === 'inner' && route.meta?.link
      },
    },
  },
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

    &:has(> div[class*='fade-transform']) {
      margin: 16px;
      padding: 0;
      overflow: hidden;
    }
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

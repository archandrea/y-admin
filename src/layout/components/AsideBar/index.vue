<template>
  <div class="y-layout_nav flex-col">
    <el-scrollbar>
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :collapse-transition="true">
        <MenuItem
          v-for="route in $store.getters.permissionRoutes"
          :item="route"
          :key="route.path"
          :base-path="route.path"
          :default-icon="true"
          :is-nest="true"></MenuItem>
      </el-menu>
    </el-scrollbar>
    <div class="bottom-bar">
      <svg-icon
        class="btn-collapse"
        :icon="isCollapse ? 'unfold' : 'fold'"
        @click="isCollapse = !isCollapse"></svg-icon>
    </div>
  </div>
</template>

<script>
import { debounce } from '@/utils'

export default {
  components: {
    MenuItem: () => import('./components//MenuItem.vue'),
  },
  data() {
    return {
      isCollapse: false,
    }
  },
  computed: {
    activeMenu() {
      const { meta, path } = this.$route
      if (meta?.activeMenu) {
        return meta.activeMenu
      } else {
        return path
      }
    },
  },
  created() {
    // this.resizeHandler = debounce(() => this.collapseHandler(), 500)
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  mounted() {
    const isMobile = this.isMobile()
    if (isMobile) {
      this.isCollapse = true
    }
  },
  methods: {
    isMobile() {
      const rect = document.body.getBoundingClientRect()
      return rect.width - 1 < 992
    },
    resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.isMobile()
        if (isMobile) {
          this.isCollapse = true
        }
      }
    },
  },
}
</script>

<style lang="scss">
.y-layout_nav {
  flex: 0;
  height: calc(100vh - 64px);
  background-color: $bgColor;
  box-shadow: 0px 3px 16px 0px rgba(38, 38, 38, 0.12);

  .el-scrollbar {
    flex: 1;
    overflow: hidden;

    .el-scrollbar__wrap {
      height: calc(100% + 16px);
    }
  }

  .el-menu {
    border: none;

    .el-menu-item,
    .el-submenu__title {
      font-size: 16px;
      line-height: 56px;
    }

    .sub-el-icon,
    .svg-icon {
      vertical-align: baseline;
      margin-left: 2px;
      margin-right: 16px;
      text-align: center;
      font-size: 16px;
      color: $txtColor;
    }

    &.el-menu--collapse {
      .sub-el-icon,
      .svg-icon {
        margin-right: 0;
      }
    }

    .nest-menu {
      padding: 0 16px;
      width: 100%;

      .el-menu-item {
        padding: 0 38px !important;
        width: calc(100% - 32px);
        min-width: 168px;
        line-height: 50px;
        border-radius: 4px;
      }
    }
  }

  .el-menu:not(.el-menu--collapse) {
    width: 200px;
  }

  .bottom-bar {
    padding: 0 22px;
    height: 40px;
    border-top: 1px solid $borderColor;

    .btn-collapse {
      height: 100%;
      vertical-align: middle;
      font-size: 20px;
      color: #868686;
      cursor: pointer;

      &:hover {
        color: $themeColor;
      }
    }
  }
}

.el-menu--popup {
  .svg-icon {
    display: none;
  }
}
</style>

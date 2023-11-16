<template>
  <div
    ref="virtualList"
    class="virtual-list virtual-list-container"
    @scroll="handleScroll"
    :style="[variables]">
    <div
      class="virtual-list-phantom"
      :style="{ height: listHeight + 'px' }"></div>
    <div
      :class="['virtual-list-wrapper', wrapperClass]"
      :style="[offsetStyle, layoutStyle]">
      <div
        ref="items"
        class="virtual-list-item"
        v-for="item in visibleList"
        :key="item?.[keyName]">
        <slot
          name="item"
          :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { throttle } from '@/utils'

export default {
  name: 'VirtualList',
  components: {},
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 布局，grid需要额外传gridStyle
    layout: {
      type: String,
      default: 'vertical', // vertical | horizontal(TODO) | grid
    },
    gridStyle: {
      type: Object,
      default: () => null,
    },
    // 列表项高度
    itemHeight: {
      type: Number,
      default: 100,
    },
    // 列表项之间的间隔，在普通布局时用数字，grid布局用字符串也可以
    gap: {
      type: [Number, String],
      default: 0,
    },
    // 列表数据的唯一key值的键名
    keyName: {
      type: String,
      default: 'id',
    },
    bufferSize: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      //可视区域高度
      screenHeight: 0,
      //偏移量
      startOffset: 0,
      //起始索引
      start: 0,
      //结束索引
      end: null,
      // 每行个数，在非grid模式下为1
      lineItemCount: 1,
    }
  },
  computed: {
    lineCount() {
      return Math.ceil(this.list.length / this.lineItemCount)
    },
    listHeight() {
      return this.lineCount * this.itemHeight + (this.lineCount - 1) * this.gap
    },
    visibleCount() {
      return (Math.ceil(this.screenHeight / this.itemSize) + 1) * this.lineItemCount
    },
    visibleList() {
      return this.list.slice(Math.max(0, this.start), Math.min(this.end, this.list.length))
    },
    offsetStyle() {
      return {
        transform: `translateY(${this.startOffset}px)`,
      }
    },
    itemSize() {
      return this.itemHeight + this.gap
    },
    variables() {
      return {
        '--item-height': `${this.itemHeight}px`,
        '--gap': typeof this.gap === 'number' ? `${this.gap}px` : this.gap,
      }
    },
    layoutStyle() {
      if (this.layout === 'grid') {
        return {
          ...this.gridStyle,
        }
      } else {
        return null
      }
    },
    wrapperClass() {
      return `virtual-list-wrapper--${this.layout}`
    },
  },
  watch: {
    'list.length': {
      handler(length) {
        // 初始化
        this.$nextTick(() => {
          this.$refs.virtualList.scrollTop = 0
          if (this.layout === 'grid') {
            this.getLineItemCount()
          }
        })
      },
      immediate: true,
    },
  },
  created() {
    // this.throttleHandleScroll = throttle(this.handleScroll, 100)
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
  },
  methods: {
    handleScroll() {
      if (this.layout === 'grid') {
        this.getLineItemCount()
      }

      let scrollTop = this.$refs.virtualList.scrollTop
      this.start = this.getStartIndex(scrollTop)
      this.end = this.start + this.visibleCount
      this.setStartOffset(scrollTop)
    },
    getLineItemCount() {
      const screenWidth = this.$el.clientWidth
      const itemWidth = this.$refs.items[0].clientWidth
      this.lineItemCount = Math.floor(screenWidth / itemWidth)
    },
    setStartOffset(scrollTop) {
      this.startOffset = scrollTop - (scrollTop % this.itemSize)
    },
    getStartIndex(scrollTop) {
      return Math.floor(scrollTop / this.itemSize) * this.lineItemCount
    },
  },
}
</script>

<style lang="scss" scoped>
.virtual-list {
  position: relative;
  overflow: auto;

  .virtual-list-wrapper {
    @include full;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;

    &--vertical {
      .virtual-list-item {
        margin-top: var(--gap);
        height: var(--item-height);

        &:nth-child(1) {
          margin-top: 0;
        }
      }
    }

    &--grid {
      display: grid;
      justify-content: space-around;
      flex-wrap: wrap;
      gap: var(--gap);
    }
  }

  .virtual-list-item {
    box-sizing: border-box;
  }
}
</style>

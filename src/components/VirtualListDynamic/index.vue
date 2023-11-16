<template>
  <div
    ref="virtualList"
    class="virtual-list-plus virtual-list-plus-container"
    @scroll="handleScroll">
    <div
      ref="phantom"
      class="virtual-list-plus-phantom"></div>
    <div
      class="virtual-list-plus-wrapper"
      ref="wrapper">
      <div
        ref="items"
        class="virtual-list-plus-item"
        v-for="item in renderList"
        :key="item?.[keyName]">
        <slot
          name="item"
          :data="item"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { binarySearch } from '@/utils'

export default {
  name: 'VirtualListDynamic',
  components: {},
  props: {
    // 列表数据
    list: {
      type: Array,
      default: () => [],
    },
    // 列表项之间的间隔
    gap: {
      type: Number,
      default: 0,
    },
    // 列表数据的唯一key值的键名
    keyName: {
      type: String,
      default: 'id',
    },
    // 列表项的预估平均高度
    estimateHeight: {
      type: Number,
      default: 30,
    },
    bufferScale: {
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
      // 位置列表
      positions: null,
    }
  },
  computed: {
    _list() {
      return this.list.map((item, idx) => {
        return {
          ...item,
          $index: idx,
        }
      })
    },
    visibleCount() {
      return Math.ceil(this.screenHeight / this.estimateHeight)
    },
    renderList() {
      return this._list.slice(Math.max(0, this.start), Math.min(this.end, this.list.length))
    },
    offsetStyle() {
      return {
        transform: `translateY(${this.startOffset}px)`,
      }
    },
    bufferSize() {
      return Math.floor(this.bufferScale * this.list.length)
    },
  },
  watch: {
    list: {
      handler(length) {
        // 初始化
        this.$nextTick(() => {
          this.$refs.virtualList.scrollTop = 0
          this.initPositions()
        })
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.initPositions()
  },
  mounted() {
    this.screenHeight = this.$el.clientHeight
    this.start = 0
    this.end = this.start + this.visibleCount
  },
  beforeUpdate() {
    this.$nextTick(() => {
      if (!this.$refs.items || !this.$refs.items.length) {
        return false
      }

      this.updateItemSize()
      this.updatePhantomHeight()
      this.setStartOffset()
    })
  },
  methods: {
    handleScroll() {
      let scrollTop = this.$refs.virtualList.scrollTop
      this.start = this.getStartIndex(scrollTop)
      this.end = this.start + this.visibleCount
      this.setStartOffset()
    },
    initPositions() {
      this.positions = this.list.map((item, idx) => {
        let top = idx * this.estimateHeight
        return {
          index: idx,
          offset: this.estimateHeight * idx,
          height: this.estimateHeight,
          top,
          bottom: top + this.estimateHeight,
        }
      })
    },
    setStartOffset() {
      this.startOffset = this.start >= 1 ? this.positions[this.start - 1].bottom : 0
      this.$refs.wrapper.style.transform = `translate3d(0,${this.startOffset}px,0)`
    },
    getStartIndex(scrollTop) {
      return binarySearch(this.positions, scrollTop, 'top')
    },
    updateItemSize() {
      let nodes = this.$refs.items
      nodes.forEach((node, index) => {
        let rect = node.getBoundingClientRect()
        let height = rect.height
        let idx = this.start + index
        let oldHeight = this.positions[idx].height
        let dValue = oldHeight - height
        if (dValue) {
          this.positions[idx].bottom = this.positions[idx].bottom - dValue
          this.positions[idx].height = height

          for (let k = idx + 1; k < this.positions.length; k++) {
            this.positions[k].top = this.positions[k - 1].bottom
            this.positions[k].bottom = this.positions[k].bottom - dValue
          }
        }
      })
    },
    updatePhantomHeight() {
      let height = this.positions[this.positions.length - 1].bottom
      this.$refs.phantom.style.height = height + 'px'
    },
  },
}
</script>

<style lang="scss" scoped>
.virtual-list-plus {
  position: relative;
  overflow: auto;

  .virtual-list-plus-wrapper {
    @include full;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }

  .virtual-list-plus-item {
    box-sizing: border-box;
  }
}
</style>

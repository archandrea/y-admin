<script>
export default {
  name: 'CardSelector',
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    grid: {
      type: Object,
      default: () => {
        return {
          row: 'auto',
          column: '30%',
        }
      },
    },
    beforeRemove: {
      type: Function,
    },
  },
  render(h) {
    const children = this.list.map((item, idx) => {
      // 删除按钮
      const removeBtn = h(
        'div',
        {
          class: ['card-selector_remove'],
          on: {
            click: (e) => {
              this.removeItem(idx)
            },
          },
        },
        [<i class="el-icon-close"></i>]
      )
      return h(
        'div',
        {
          class: ['card-selector_item'],
        },
        [this.$slots.default[idx], removeBtn]
      )
    })

    return h(
      'div',
      {
        class: ['card-selector', 'y-card-wrapper'],
        style: [this.gridStyle],
      },
      // 卡片列表
      children
    )
  },
  data() {
    return {}
  },
  computed: {
    gridStyle() {
      return {
        'grid-auto-rows': `${this.grid.row}`,
        'grid-template-columns': `repeat(auto-fill, ${this.grid.column})`,
      }
    },
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {
    removeItem(idx) {
      if (this.beforeRemove && typeof this.beforeRemove === 'function') {
        this.beforeRemove()
      }
      const vList = [...this.list]
      vList.splice(idx, 1)
      this.$emit('update:list', vList)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-selector {
  @include full;
  overflow-x: hidden;
  justify-content: flex-start;
  padding: 16px;
  border-radius: 4px;
  background-color: $bgColor-dark;

  .card-selector_item {
    position: relative;
    display: inline-block;
    width: max-content;
    height: max-content;
  }

  .card-selector_remove {
    @include flex-center;
    position: absolute;
    top: 0;
    right: 0;
    width: 22px;
    height: 22px;
    font-size: 10px;
    color: #fff;
    border: 1px solid #fff;
    border-radius: 50%;
    background-color: $color-danger;
    transform: translate(50%, -50%);
    z-index: 99;
    cursor: pointer;
  }
}
</style>

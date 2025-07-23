<template>
  <base-card class="card-container">
    <div class="info">
      <h4 class="y-title">{{ data.userId }}</h4>
      <div class="body">
        <p class="y-item">
          <span class="label">号码：</span><span class="value">{{ data.number || '暂无数据' }}</span>
        </p>
        <p class="y-item">
          <span class="label">号码来源：</span><span class="value">{{ data.numberSource || '暂无数据' }}</span>
        </p>
        <p class="y-item">
          <span class="label">号码来源：</span><span class="value">{{ data.numberSource || '暂无数据' }}</span>
        </p>
      </div>
    </div>
    <div class="btn-set">
      <el-button
        type="danger"
        plain
        size="small"
        @click="$emit('delete')"
        >删除</el-button
      >
      <el-button
        type="primary"
        plain
        size="small"
        @click="$emit('edit')"
        >配置</el-button
      >
    </div>
  </base-card>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {},
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/modules/info-card.scss';

// 自定义
.card-container {
}
</style>

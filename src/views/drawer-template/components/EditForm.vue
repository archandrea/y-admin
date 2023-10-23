<template>
  <div class="edit-form y-container--tight no-padding">
    <el-form
      ref="editForm"
      class="y-container--tight"
      :model="formData"
      :rules="rules"
      label-position="right"
      label-width="90px">
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="标签名称"
            prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入标签名称"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item
            label="类别"
            prop="class">
            <el-select
              v-model="formData.class"
              placeholder="请选择类别">
              <el-option
                :label="1"
                :value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <div class="footer y-bar">
      <el-button
        type="text"
        class="btn-reset"
        @click.native="initPage">
        <svg-icon icon="reset"></svg-icon>
        重置
      </el-button>
      <el-button
        type="primary"
        plain
        size="small"
        @click.native="$emit('close-edit')"
        >取消</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="submitForm"
        >保存</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    data: {
      type: Object,
      default() {
        return null
      },
    },
  },
  data() {
    return {
      formData: {
        name: null,
        class: null,
      },
      rules: {
        name: [{ required: true, message: '请输入标签名称', trigger: 'blur' }],
        class: [{ required: true, message: '请选择类别', trigger: 'blur' }],
      },
    }
  },
  computed: {},
  watch: {
    data: {
      handler() {
        this.initPage()
      },
      deep: true,
    },
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage() {
      if (this.data && JSON.stringify(this.data) != '{}') {
        Object.assign(this.formData, this.data)
      }
    },
    submitForm() {
      this.$refs.editForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        // 调用接口
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.edit-form {
  position: relative;

  .footer {
    justify-content: flex-end;
    border-top: 1px solid $borderColor;
  }

  .btn-reset {
    position: absolute;
    left: 0;
  }
}
</style>

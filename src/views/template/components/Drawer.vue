<template>
  <el-drawer
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
    size="680px"
    append-to-body>
    <div class="y-container no-padding">
      <el-form
        class="y-container--tight"
        ref="form"
        :model="form"
        :rules="rules"
        size="large"
        label-width="100px">
        <el-form-item
          label="用户名称"
          prop="nickName">
          <el-input
            v-model="form.nickName"
            placeholder="请输入用户名称"
            clearable />
        </el-form-item>

        <el-form-item
          label="登录账号"
          prop="userName">
          <el-input
            v-model="form.userName"
            placeholder="请输入登录账号"
            :disabled="!isEdit"
            clearable />
        </el-form-item>

        <el-form-item
          label="密码"
          prop="password"
          v-if="!isEdit">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="请输入密码"
            show-password
            clearable />
        </el-form-item>

        <el-form-item
          label="用户类型"
          prop="userType">
          <el-input
            v-model="form.userType"
            placeholder="请输入用户类型"
            clearable />
        </el-form-item>

        <el-form-item
          label="性别"
          prop="sex">
          <el-radio-group v-model="form.sex">
            <el-radio value="0">男</el-radio>
            <el-radio value="1">女</el-radio>
            <el-radio value="2">未知</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="手机号码"
          prop="phonenumber">
          <el-input
            v-model="form.phonenumber"
            placeholder="请输入手机号码"
            clearable />
        </el-form-item>

        <el-form-item
          label="邮箱"
          prop="email">
          <el-input
            v-model="form.email"
            placeholder="请输入邮箱"
            clearable />
        </el-form-item>

        <el-form-item
          label="用户角色"
          prop="roleIds">
          <el-select
            v-model="form.roleIds"
            multiple
            placeholder="请选择用户角色"
            style="width: 100%">
            <el-option
              v-for="item in roleOptions"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item
          label="状态"
          prop="status">
          <el-radio-group v-model="form.status">
            <el-radio :label="'0'">正常</el-radio>
            <el-radio :label="'1'">停用</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item
          label="备注"
          prop="remark">
          <el-input
            v-model="form.remark"
            type="textarea"
            placeholder="请输入备注"
            :rows="5" />
        </el-form-item>
      </el-form>
      <div class="y-footer">
        <el-link
          type="primary"
          :underline="false"
          @click="handleReset">
          <svg-icon icon="reset"></svg-icon>
          重置
        </el-link>
        <div style="flex: 1"></div>
        <el-button
          type="primary"
          plain
          @click="handleClose"
          >取消</el-button
        >
        <el-button
          type="primary"
          :loading="loading"
          @click="handleSubmit">
          确定
        </el-button>
      </div>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: 'UserDrawer',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: [String, Number],
      default: null,
    },
  },
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        const reg = /^1[3-9]\d{9}$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的手机号码'))
        }
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value) {
        callback()
      } else {
        const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
        if (!reg.test(value)) {
          callback(new Error('请输入正确的邮箱地址'))
        }
        callback()
      }
    }
    return {
      loading: false,
      roleOptions: [],
      form: {
        userId: null,
        userName: '',
        nickName: '',
        userType: '',
        sex: '2',
        password: '',
        phonenumber: '',
        email: '',
        roleIds: [],
        status: '0',
        remark: '',
      },
      rules: {
        nickName: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
        userName: [
          { required: true, message: '请输入登录账号', trigger: 'blur' },
          { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        phonenumber: [{ validator: validatePhone, trigger: 'blur' }],
        email: [{ validator: validateEmail, trigger: 'blur' }],
        roleIds: [{ required: true, message: '请选择用户角色', trigger: 'change' }],
      },
    }
  },
  computed: {
    isEdit() {
      return !!this.userId
    },
    title() {
      return this.isEdit ? '编辑用户' : '新增用户'
    },
  },
  watch: {
    visible: {
      handler(val) {
        if (val) {
          if (this.userId) {
            this.getUserDetail()
          }
        }
      },
      immediate: true,
    },
  },
  methods: {
    reset() {
      this.form = {
        userId: null,
        deptId: null,
        userName: '',
        nickName: '',
        userType: '',
        sex: '2',
        password: '',
        phonenumber: '',
        email: '',
        roleIds: [],
        status: '0',
        remark: '',
      }
      this.$refs.form && this.$refs.form.resetFields()
    },
    handleReset() {
      if (this.userId) {
        this.getUserDetail()
      } else {
        this.reset()
      }
    },
    async getUserDetail() {
      if (!this.userId) return
      // api ...
    },
    handleClose() {
      this.reset()
      this.$emit('update:visible', false)
    },
    async handleSubmit() {
      try {
        await this.$refs.form.validate()
      } catch (e) {
        return
      }

      this.loading = true
      // api ...
      this.loading = false

      // if (!err) {
      //   this.$message({
      //     message: '操作成功',
      //     type: 'success',
      //     duration: 1000,
      //     onClose: () => {
      //       this.handleClose()
      //       this.$emit('success')
      //     },
      //   })
      // }
    },
  },
}
</script>

<style lang="scss" scoped></style>

<template>
  <el-dialog
    title="修改密码"
    width="500px"
    :visible.sync="updatePwdDialog">
    <el-form
      ref="updatePwdForm"
      class="clearfix"
      :model="updatePwdForm"
      :rules="updatePwdRules"
      label-position="right"
      label-width="120px">
      <el-col :span="24">
        <el-form-item
          label="旧密码"
          prop="oldpwd">
          <el-input
            v-model="updatePwdForm.oldpwd"
            placeholder="请输入旧密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="新密码"
          prop="newpwd">
          <el-input
            v-model="updatePwdForm.newpwd"
            placeholder="请输入新密码"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="24">
        <el-form-item
          label="新密码（验证）"
          prop="confirmpwd">
          <el-input
            v-model="updatePwdForm.confirmpwd"
            placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-col>
    </el-form>
    <div
      slot="footer"
      class="dialog-footer">
      <el-button @click.native="updatePwdDialog = false">取消</el-button>
      <el-button
        type="primary"
        @click.native="updatePwd"
        >确定</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
export default {
  components: {},
  data() {
    const ValidatePwd = (rule, value, callback) => {
      if (value.trim() === '') {
        callback(new Error('请再次输入新密码'))
      } else if (value !== this.updatePwdForm.newpwd) {
        callback(new Error('新旧密码不一致'))
      } else {
        callback()
      }
    }

    return {
      updatePwdDialog: false,
      updatePwdForm: {
        oldpwd: '',
        newpwd: '',
        confirmpwd: '',
      },
      updatePwdRules: {
        oldpwd: [{ required: true, message: '请输入旧密码', trigger: 'blur' }],
        newpwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmpwd: [{ required: true, validator: ValidatePwd, trigger: 'blur' }],
      },
    }
  },
  computed: {},
  methods: {
    async updatePwd() {
      this.$refs.updatePwdForm.validate(async (valid) => {
        if (!valid) {
          return false
        }

        const payload = {
          oldpwd: this.updatePwdForm.oldpwd,
          newpwd: this.updatePwdForm.newpwd,
        }

        // const [err, res] = await updatePwd(payload)
        // if (!err) {
          this.$message({
            message: '修改成功！',
            type: 'success',
            duration: 800,
            onClose: () => {
              this.updatePwdDialog = false
              this.$refs.updatePwdForm.resetFields()
            },
          })
        // }
      })
    },
  },
}
</script>

<style lang="scss"></style>

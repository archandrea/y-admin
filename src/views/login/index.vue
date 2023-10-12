<template>
  <div class="y-login">
    <el-image
      class="y-login_logo"
      style="width: 176px; height: 65px"
      src=""></el-image>
    <el-form
      class="y-login_form"
      ref="loginForm"
      label-width="0"
      :model="formData"
      :rules="rules">
      <el-row>
        <el-col :span="24">
          <h2 class="y-login_title">用户登陆</h2>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="account">
            <el-input
              class="has-prefix"
              v-model="formData.account"
              name="account"
              autofocus
              autocomplete="on"
              placeholder="请输入账号">
              <svg-icon
                slot="prefix"
                icon="user"></svg-icon>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item prop="password">
            <el-input
              class="has-prefix"
              v-model="formData.password"
              name="password"
              :type="pwdType"
              autocomplete="on"
              placeholder="请输入密码">
              <svg-icon
                slot="prefix"
                icon="lock"></svg-icon>
              <svg-icon
                class="btn-show-pwd"
                slot="suffix"
                :icon="pwdType === 'password' ? 'no-view' : 'view'"
                @click.native="showPwd"></svg-icon>
            </el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="17">
          <el-form-item prop="code">
            <el-input
              v-model="formData.code"
              name="code"
              placeholder="请输入验证码">
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="7">
          <el-image
            class="y-login_code"
            :src="authCodeSrc"
            @click="getAuthCode"></el-image>
        </el-col>
      </el-row>
      <el-button
        class="y-login_btn"
        type="primary"
        @click.native="login"
        >登陆</el-button
      >
    </el-form>
  </div>
</template>

<script>
import { getCodeSrc } from '@/api/auth'
// import { resolve } from 'path-browserify'

export default {
  name: 'Login',
  components: {},
  data() {
    return {
      authCodeSrc: '',
      pwdType: 'password',
      formData: {
        account: '',
        password: '',
        code: '',
      },
      rules: {
        account: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
      },
    }
  },
  computed: {},
  created() {
    this.getAuthCode()
    this.enterAgent = (e) => {
      if (e.code === 'Enter') {
        this.login()
      }
    }
    window.addEventListener('keyup', this.enterAgent)
  },
  beforeDestroy() {
    window.removeEventListener('keyup', this.enterAgent)
  },
  methods: {
    handleClick() {},
    getMsgCode() {},
    getAuthCode() {
      const src = getCodeSrc()
      this.authCodeSrc = src
    },
    login() {
      this.$refs.loginForm.validate(async (valid) => {
        if (!valid) {
          return false
        }
        try {
          // await this.$store.dispatch('user/login', this.formData)
          this.$router.push({ path: '/login' })
        } catch (err) {
          this.getAuthCode()
          this.formData.code = ''
        }
      })
    },
    showPwd() {
      if (this.pwdType === '') {
        this.pwdType = 'password'
      } else {
        this.pwdType = ''
      }
    },
  },
}
</script>

<style lang="scss">
.y-login {
  position: relative;
  width: 100%;
  min-width: 650px;
  height: 100%;
  overflow: auto;
  // background: url('') no-repeat center/cover;
}

.y-login_logo {
  position: absolute;
  top: 2.8%;
  left: 2.6%;
}

.y-login_form {
  
  overflow: auto;
  position: absolute;
  top: 50%;
  right: 8.2%;
  padding: 30px 62px 72px;
  width: 540px;
  max-height: 100vh;
  border-radius: 12px;
  background: $bgColor;
  box-shadow: 0px 8px 32px 0px rgba(5, 85, 206, 0.15);
  transform: translate(0, -50%);

  .el-row {
    &:nth-child(2) {
      margin-bottom: 8px;
    }

    &:nth-child(3) {
      margin-bottom: 28px;
    }

    &:nth-child(4) {
      margin-bottom: 48px;
    }
  }

  .el-form-item {
    height: 58px;

    .el-form-item__error {
      font-size: 16px;
    }
  }

  .el-input {
    input {
      font-size: 16px;
    }

    .el-input__inner {
      padding: 15px 24px;
      height: 58px;

      &:focus {
        background-color: $bgColor;
      }
    }

    &.has-prefix {
      .el-input__inner {
        padding-left: 100px;
      }
    }

    .el-input__suffix {
      
      padding: 15px 24px;
    }

    .el-input__prefix {
      
      padding: 15px 18px;

      &:after {
        content: '';
        position: absolute;
        top: 50%;
        right: 0;
        width: 1px;
        height: 21px;
        background-color: #d8d8d8;
        transform: translateY(-50%);
      }
    }
  }

  .svg-icon {
    font-size: 28px;
    font-weight: 500;
  }

  .btn-show-pwd {
    cursor: pointer;

    &:hover {
      color: $themeColor;
    }
  }
}

.y-login_title {
  margin-bottom: 48px;
  font-size: 28px;
  font-weight: 500;
  line-height: 42px;
  letter-spacing: 0em;
  color: $txtColor;
}

.y-login_btn {
  padding: 18px 0;
  width: 100%;
  text-align: center;
  font-size: 20px;
  font-weight: normal;
  line-height: normal;
  cursor: pointer;
}

.y-login_code {
  float: right;
  margin-left: 15px;
  width: auto;
  height: 58px;
  vertical-align: middle;
  cursor: pointer;
}
</style>

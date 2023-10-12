<template>
  <div
    id="btn-logout"
    @click="logout">
    logout
  </div>
</template>

<script>
import { getCodeSrc, getSmsCode, msgLogin, pwdLogin, chooseCompany, getUserInfo, logout } from '@/api/auth'

export default {
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    logout() {
      console.log('log-out')
      logout()
    },
  },
}
</script>

<style lang="scss">
#btn-logout {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 50px;
  height: 20px;
  background-color: #ccc;
  border: 1px solid black;
  transform: translate(-50%, -50%);
  cursor: pointer;
  z-index: 99999;
}
</style>

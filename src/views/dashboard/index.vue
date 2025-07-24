<template>
  <base-card
    id="dashboard"
    class="y-page">
    <div class="welcome-container">
      <h1 class="welcome-title">欢迎登录</h1>
      <div class="decoration-line"></div>
    </div>
  </base-card>
</template>

<script>
export default {
  name: 'Dashboard',
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
#dashboard {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.welcome-container {
  text-align: center;
  animation: fadeIn 1.5s ease-out;
}

.welcome-title {
  font-size: 2.5rem;
  color: #2c3e50;
  margin-bottom: 1rem;
  animation: scaleIn 1s ease-out;
}

.decoration-line {
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #4facfe 0%, #00f2fe 100%);
  margin: 0 auto;
  animation: lineGrow 1.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleIn {
  from {
    transform: scale(0.8);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes lineGrow {
  from {
    width: 0;
  }
  to {
    width: 100px;
  }
}
</style>

<template>
  <base-card
    id="composition-api"
    class="y-page">
    <h2 class="y-title">{{ vPlus }}</h2>
    <input
      type="text"
      v-model="v" />
    <p
      v-for="p in phrases"
      v-html="p"></p>
    <p>phrases-length{{ object.count }}</p>
  </base-card>
</template>

<script setup>
import { ref, reactive, computed, watchEffect, onBeforeMount, onMounted, onBeforeUpdate, onUpdated, onBeforeUnmount, onUnmounted } from 'vue'

const v = ref(123)

onUpdated(() => {
  console.log('onUpdated', v.value)
})
onMounted(() => {
  console.log('onMounted')
  v.value = 321
})
onMounted(() => {
  console.log('onMounted2')
  v.value = 567
})

const phrases = ref(new Array(10).fill(0))
const object = reactive({ count: phrases.value.length })
const pCopy = ref(phrases)
console.log(pCopy === phrases)
const vPlus = computed(() => v.value + 1)

const stop = watchEffect(
  (onCleanup) => {
    if (v.value > 500) {
      console.log('over 500')
    }
    if (v.value > 10000) {
      console.log('over 10000')
      stop()
    }
  },
  {
    flush: 'post',
    onTrack(e) {
      console.log('onTrack', e)
    },
    onTrigger(e) {
      console.log('onTrigger', e)
    },
  }
)
</script>

<style lang="scss">
#composition-api {
}
</style>

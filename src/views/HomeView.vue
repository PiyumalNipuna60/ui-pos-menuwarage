<template>
  <div class="homepage-main-container">
    <section class="navigation-panel-home-container">
      <NavigationPanel />
    </section>
    <section class="col-6 main-area-container"><h1>This is home page</h1></section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import NavigationPanel from '../components/NavigationPanel.vue'
import { useUserAuthStore } from '@/stores/userAuth'

const userAuthStore = useUserAuthStore()

onMounted(() => {})
</script>

<style lang="scss">
.homepage-main-container {
  display: flex;

  .navigation-panel-home-container {
    width: 15%;
  }
}
</style>

<template>
  <section class="navigation-panel-container">
    <div class="navigation-panel__top-area">
      <div class="navigation-panel__user-image">
        <img src="/src/assets/images/user.jpg" alt="user-logo" />
      </div>
      <div>Hi User</div>
    </div>
    <div class="navigation-panel__route-list-container">
      <div
        v-for="(routeItem, index) in routesList"
        :key="index"
        class="navigation-panel__route-container"
        :class="{ 'slected-route': route.path === routeItem.path }"
      >
        <div class="flex" @click="routeChange(routeItem)">
          <div class="icon-container">
            <i :class="`pi ${routeItem.icon}`"></i>
          </div>
          <div>
            {{ routeItem.name }}
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoutesStore } from '@/stores/routes'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const routesStore = useRoutesStore()
const routesList = ref(routesStore.getRoutesList)

const props = defineProps(['routes'])
defineEmits(['enlarge-text'])

onMounted(() => {
  console.log('nav panel log__________', route.path)
})

const routeChange = (route) => {
  router.push(route.path)
}
</script>
<style lang="scss">
.navigation-panel-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #aae39e;
  color: #352f2f;
  font-size: 18px;

  .navigation-panel__route-list-container {
    width: 80%;
    display: grid;
    height: 100%;
    grid-template-rows: auto 1fr auto;
  }

  .navigation-panel__route-list-container :nth-last-child(1) {
    align-self: flex-end;
  }

  .navigation-panel__route-container {
    padding: 5px;
    align-self: start;

    .icon-container {
      margin: 0 10px;
    }
  }

  .navigation-panel__route-container:hover,
  .slected-route {
    cursor: pointer;
    color: #059669;
    background: darkseagreen;
    border-radius: 8px;
  }

  .navigation-panel__user-image {
    img {
      width: 5rem;
      border-radius: 20px;
    }
  }

  .navigation-panel__top-area {
    padding: 20px;
  }
}
</style>

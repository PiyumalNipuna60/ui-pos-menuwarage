<template>
  <!-- <section v-if="isLogin" class="navigation-panel-home-container">
    <NavigationPanel />
  </section> -->
  <RouterView />
</template>
<script setup>
import { useUserAuthStore } from '@/stores/userAuth'
import { onErrorCaptured, onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
const userAuthStore = useUserAuthStore()

const isLogin = ref(userAuthStore.isAuthenticated)
const router = useRouter() // Get the router instance

onMounted(() => {
  // console.log('log_____________', isLogin.value)
})

onErrorCaptured((err) => {
  console.error('Global Error in app.js:', err)
  // Optionally, show a toast or redirect to a generic error page
})
</script>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.button {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  text-align: center;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 1rem;
}

.button:hover {
  background-color: #0056b3;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

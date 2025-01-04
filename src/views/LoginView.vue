<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Password" required />
      <Button type="submit">Login</Button>
    </form>
  </div>
</template>

<script setup>
import { useUserAuthStore } from '@/stores/userAuth'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const userAuthStore = useUserAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  try {
    // Mock API call (replace with actual API call)
    const response = {
      token: 'mock_token',
      user: { name: 'John Doe', email },
    }

    userAuthStore.setToken(response.token)
    userAuthStore.setUser(response.user)
    router.push('/')
  } catch (error) {
    console.error('Login failed', error)
  }
}
</script>

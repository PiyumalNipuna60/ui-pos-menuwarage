import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'

export const useUserAuthStore = defineStore('userAuth', () => {
  const initialUser = {
    userName: null,
    password: null,
    userType: null,
    token: null,
  }

  const user = ref(cloneDeep(initialUser))

  const isAuthenticated = computed(() => !!user.value.token)

  const setUser = (userData) => {
    user.value = userData
  }

  const setToken = (newToken) => {
    user.value.token = newToken
    localStorage.setItem('auth_token', newToken)
  }

  const logout = () => {
    user.value = cloneDeep(initialUser)
    localStorage.removeItem('auth_token')
  }

  const initializeAuth = () => {
    const storedToken = localStorage.getItem('auth_token')
    if (storedToken) {
      user.value.token = storedToken
    }
  }

  return {
    user,
    isAuthenticated,
    setUser,
    setToken,
    logout,
    initializeAuth,
  }
})

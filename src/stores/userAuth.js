import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import { useRoutesStore } from '@/stores/routes'
import { ApiStatus } from '@/consts/const'

export const useUserAuthStore = defineStore('userAuth', () => {
  const routesStore = useRoutesStore()
  const initialUser = {
    userName: 'Kasun',
    password: null,
    userType: 'user',
    token: null,
  }

  const userDetails = ref({
    data: cloneDeep(initialUser),
    status: ApiStatus.INIT,
    error: null,
  })

  const isAuthenticated = computed(() => !!userDetails.value.data.token)

  const userLogin = (data) => {
    console.log('store log userLogin______________', data)
    setUser()
  }

  const setUser = () => {
    console.log('set user log_________', userDetails.value.data)
    userDetails.value.data.token = 'sample token'
    localStorage.setItem('user_details', JSON.stringify(userDetails.value.data))
    routesStore.initializeRoutes()
  }

  const getUser = () => {
    return userDetails.value
  }

  const setToken = (newToken) => {
    localStorage.setItem('auth_token', newToken)
  }

  const logout = () => {
    localStorage.removeItem('user_details')
    userDetails.value = {
      data: cloneDeep(initialUser),
      status: ApiStatus.INIT,
      error: null,
    }
  }

  const initializeAuth = () => {
    const storedUser = localStorage.getItem('user_details')
    if (storedUser) {
      userDetails.value.data = JSON.parse(storedUser)
      routesStore.initializeRoutes()
      console.log(
        'storeUser initializeAuth_______',
        storedUser,
        userDetails.value.data,
        userDetails.value.status,
      )
    }
  }

  return {
    isAuthenticated,
    userLogin,
    setUser,
    setToken,
    logout,
    initializeAuth,
    getUser,
  }
})

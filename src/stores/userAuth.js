import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import { useRoutesStore } from '@/stores/routes'
import { ApiStatus } from '@/consts/const'
import { userLogIn } from '@/service/UserService'

export const useUserAuthStore = defineStore('userAuth', () => {
  const routesStore = useRoutesStore()
  const initialUser = {
    userName: null,
    password: null,
    userType: null,
    token: null,
  }

  const userDetails = ref({
    data: cloneDeep(initialUser),
    status: ApiStatus.INIT,
    error: null,
  })

  const isAuthenticated = computed(() => !!userDetails.value.data.token)

  const userLogin = async () => {
    try {
      userDetails.value.status = ApiStatus.LOADING
      const response = await userLogIn(userDetails.value.data)
      userDetails.value.data = response
      setUser()
      userDetails.value.status = ApiStatus.SUCCESS
    } catch (error) {
      userDetails.value.status = ApiStatus.FAILED
      throw error
    }
  }

  const setUser = () => {
    localStorage.setItem('user_details', JSON.stringify(userDetails.value.data))
    routesStore.initializeRoutes()
  }

  const getUser = () => {
    return userDetails.value
  }

  const logout = () => {
    console.log('user login out')
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
      console.log('storeUser initializeAuth_______', storedUser, userDetails.value)
    }
  }

  return {
    isAuthenticated,
    userLogin,
    setUser,
    logout,
    initializeAuth,
    getUser,
    userDetails,
  }
})

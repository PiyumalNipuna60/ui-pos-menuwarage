import { ApiStatus, Messages } from '@/consts/const'
import { userLogIn } from '@/service/UserService'
import { useRoutesStore } from '@/stores/routes'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserAuthStore = defineStore('userAuth', () => {
  const routesStore = useRoutesStore()
  const initialUser = {
    userName: null,
    password: null,
    role: null,
    token: null,
    address: null,
    contact: null,
    nic: null,
    demarcationId: null,
  }

  const userDetails = ref({
    data: cloneDeep(initialUser),
    status: ApiStatus.INIT,
    error: null,
  })

  const isAuthenticated = computed(() => !!userDetails.value.data.token)
  const hasError = computed(
    () => userDetails.value.status === ApiStatus.FAILED || userDetails.value.error,
  )

  const userLogin = async () => {
    try {
      userDetails.value.status = ApiStatus.LOADING
      userDetails.value.error = null
      const response = await userLogIn(userDetails.value.data)
      if (response?.status && response.status === Messages.API_RESPONSE.SUCCESS) {
        userDetails.value.data = response.data.user
        userDetails.value.data.token = response.data.token
        setUser()
        userDetails.value.status = ApiStatus.SUCCESS
      } else {
        userDetails.value.status = ApiStatus.FAILED
        userDetails.value.error = response
      }
    } catch (error) {
      let customError = {
        type: 'unexpected_error',
        title: 'Unexpected Error',
        description: 'An unexpected error occurred. Please try again...',
        details: 'An unexpected error occurred at store -> userLogIn.',
      }
      userDetails.value.status = ApiStatus.FAILED
      userDetails.value.error = customError
      console.error('Error: ', error)
      throw {
        customError,
      }
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
    hasError,
  }
})

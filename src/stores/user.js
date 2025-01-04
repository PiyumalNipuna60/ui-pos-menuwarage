import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', () => {
  const userDetails = ref({
    userName: null,
    password: null,
    isLoggedUser: false,
    userType: null,
    token: null,
  })

  const isLoggedUser = computed(() => userDetails.value.isLoggedUser)

  function logIn(data) {
    console.log('store data log_________', data)
  }

  return { logIn, isLoggedUser }
})

import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { mapRoutesByRole } from '@/utils/utils'
import { ROUTES } from '@/consts/routes'
import { useUserAuthStore } from '@/stores/userAuth'

export const useRoutesStore = defineStore('routes', () => {
  const routesList = ref([])
  const authStore = useUserAuthStore()
  const userRole = computed(() => authStore.user?.userType || 'user')

  const initializeRoutes = () => {
    routesList.value = userRole.value ? mapRoutesByRole(ROUTES, userRole.value) : []
  }

  const getRoutesList = computed(() => routesList.value)

  return { getRoutesList, initializeRoutes }
})

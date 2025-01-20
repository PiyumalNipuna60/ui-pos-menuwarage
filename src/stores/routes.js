import { ROUTES } from '@/consts/routes'
import { useUserAuthStore } from '@/stores/userAuth'
import { mapRoutesByRole } from '@/utils/utils'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useRoutesStore = defineStore('routes', () => {
  const routesList = ref([])
  const authStore = useUserAuthStore()
  const userRole = computed(() => authStore.user?.role || 'user')

  const initializeRoutes = () => {
    routesList.value = userRole.value ? mapRoutesByRole(ROUTES, userRole.value) : []
  }

  const getRoutesList = computed(() => routesList.value)

  return { getRoutesList, initializeRoutes }
})

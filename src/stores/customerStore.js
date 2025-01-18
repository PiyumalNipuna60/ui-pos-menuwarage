import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import cloneDeep from 'lodash/cloneDeep'
import { ApiStatus } from '@/consts/const'
import {
  addCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
} from '@/service/CustomerService'

export const useCustomerStore = defineStore('customerStore', () => {
  const initialCustomer = {
    id: null,
    name: null,
    contact: null,
    nic: null,
    address: null,
  }

  const customerList = ref({
    data: [],
    selectedCustomer: cloneDeep(initialCustomer),
    status: ApiStatus.INIT,
    error: null,
  })

  const getCustomerList = computed(() => customerList.value)

  const loadCustomers = async () => {
    try {
      customerList.value.status = ApiStatus.LOADING
      customerList.value.data = await getAllCustomers()
      clearSelectedCustomer()
      customerList.value.status = ApiStatus.SUCCESS
    } catch (error) {}
  }

  const saveCustomer = async () => {
    customerList.value.status = ApiStatus.LOADING
    await addCustomer(customerList.value.selectedCustomer)
    customerList.value.data = await loadCustomers()
    customerList.value.status = ApiStatus.SUCCESS
  }

  const updateCustomerDetails = async () => {
    customerList.value.status = ApiStatus.LOADING
    await updateCustomer(customerList.value.selectedCustomer)
    customerList.value.data = await loadCustomers()
    customerList.value.status = ApiStatus.SUCCESS
  }

  const removeCustomer = async (cusId) => {
    customerList.value.status = ApiStatus.LOADING
    await deleteCustomer(cusId)
    customerList.value.data = await loadCustomers()
    customerList.value.status = ApiStatus.SUCCESS
  }

  const clearSelectedCustomer = () => {
    customerList.value.selectedCustomer = cloneDeep(initialCustomer)
  }

  return {
    loadCustomers,
    saveCustomer,
    updateCustomerDetails,
    removeCustomer,
    customerList,
    getCustomerList,
    clearSelectedCustomer,
  }
})

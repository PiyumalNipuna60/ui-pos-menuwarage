import { ApiStatus } from '@/consts/const'
import { addStock, deleteStock, getAllStocks, updateStock } from '@/service/StockService'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStockStore = defineStore('stockStore', () => {
  const initialStock = {
    stockId: null,
    subTotal: null,
    createdAt: null,
    products: [],
  }
  const initialProduct = {
    productId: null,
    quantity: null,
    total: null,
    freeItems: null,
    unitPrice: null,
  }

  const stockList = ref({
    data: [],
    selectedStock: cloneDeep(initialStock),
    selectedProduct: cloneDeep(initialProduct),
    status: ApiStatus.INIT,
    error: null,
  })

  const getInitialStock = computed(() => cloneDeep(initialStock))

  const getStockList = computed(() => stockList.value)

  const loadStocks = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      stockList.value.data = await getAllStocks()
      clearSelectedStock()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to load stocks.'
      console.error('Error loading stocks:', error)
    }
  }

  const saveStock = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      await addStock(stockList.value.selectedStock)
      await loadStocks()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to save stock.'
      console.error('Error saving stock:', error)
    }
  }

  const updateStockDetails = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      await updateStock(stockList.value.selectedStock.stockId, stockList.value.selectedStock)
      await loadStocks()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to update stock.'
      console.error('Error updating stock:', error)
    }
  }

  const removeStock = async (stockId) => {
    try {
      stockList.value.status = ApiStatus.LOADING
      await deleteStock(stockId)
      await loadStocks()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to delete stock.'
      console.error('Error deleting stock:', error)
    }
  }

  const clearSelectedStock = () => {
    stockList.value.selectedStock = cloneDeep(initialStock)
  }

  const resetSelectedProduct = () => {
    stockList.value.selectedProduct = cloneDeep(initialProduct)
  }

  return {
    loadStocks,
    saveStock,
    updateStockDetails,
    removeStock,
    stockList,
    getStockList,
    getInitialStock,
    clearSelectedStock,
    resetSelectedProduct,
  }
})

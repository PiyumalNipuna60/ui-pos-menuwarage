import { ApiStatus } from '@/consts/const'
import { addStock, deleteStock, getAllStocks, updateStock } from '@/service/StockService'
import { find, flatMap, omit } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useStockStore = defineStore('stockStore', () => {
  const initialStock = {
    stockId: null,
    subTotal: null,
    createdDate: null,
    invoiceNumber: null,
    productList: [],
    status: 'active',
  }

  const stockData = ref({
    stockList: [],
    mappedStockList: [],
    selectedStock: cloneDeep(initialStock),
    status: ApiStatus.INIT,
    error: null,
  })

  const getStockList = computed(() => stockData.value.stockList)

  const getmappedStockList = computed(() => stockData.value.mappedStockList)

  const getSelectedStock = computed(() => stockData.value.selectedStock)

  const setSelectedStock = (stockId) => {
    stockData.value.selectedStock = find(stockData.value.stockList, { stockId })
    console.log('store selected stock', stockData.value.selectedStock)
  }

  const loadStocks = async () => {
    try {
      stockData.value.status = ApiStatus.LOADING
      stockData.value.stockList = await getAllStocks()
      await mapStockList()
      stockData.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockData.value.status = ApiStatus.ERROR
      stockData.value.error = error.message || 'Failed to load stocks!'
      console.error('Error loading stocks:', error)
    }
  }

  const mapStockList = async () => {
    stockData.value.mappedStockList = flatMap(stockData.value.stockList, (entry) =>
      entry.products.map((product) => ({
        ...omit(entry, 'products'),
        ...product,
      })),
    )
  }

  const saveStock = async () => {
    try {
      stockData.value.status = ApiStatus.LOADING
      await addStock(stockData.value.selectedStock)
      await loadStocks()
      stockData.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockData.value.status = ApiStatus.ERROR
      stockData.value.error = error.message || 'Failed to save stock!'
      console.error('Error saving stock:', error)
    }
  }

  const updateStockDetails = async () => {
    try {
      stockData.value.status = ApiStatus.LOADING
      await updateStock(stockData.value.selectedStock)
      await loadStocks()
      stockData.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockData.value.status = ApiStatus.ERROR
      stockData.value.error = error.message || 'Failed to update stock!'
      console.error('Error updating stock:', error)
    }
  }

  const removeStock = async (stockId) => {
    try {
      stockData.value.status = ApiStatus.LOADING
      await deleteStock(stockId)
      await loadStocks()
      stockData.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockData.value.status = ApiStatus.ERROR
      stockData.value.error = error.message || 'Failed to delete stock.'
      console.error('Error deleting stock:', error)
    }
  }

  const resetSelectedStock = () => {
    stockData.value.selectedStock = cloneDeep(initialStock)
  }

  return {
    getStockList,
    getSelectedStock,
    loadStocks,
    saveStock,
    updateStockDetails,
    removeStock,
    setSelectedStock,
    resetSelectedStock,
    getmappedStockList,
  }
})

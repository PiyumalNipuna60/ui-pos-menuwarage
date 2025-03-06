import { ApiStatus } from '@/consts/const'
import { addStock, deleteStock, getAllStocks, updateStock } from '@/service/StockService'
import { flatMap, omit } from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { useProductStore } from './productStore'
const { productList, getInitialProduct, loadProducts } = useProductStore()

export const useStockStore = defineStore('stockStore', () => {
  const initialStock = {
    stockId: null,
    subTotal: null,
    createdDate: null,
    invoiceNumber: null,
    productList: [],
    status: 'active',
  }

  const initialProduct = {
    id: null,
    productId: null,
    name: null,
    unitPrice: null,
    initialQty: null,
    availableQty: null,
    freeItems: null,
    total: null,
    demarcation: null,
    sataus: 'active',
  }

  const stockList = ref({
    data: [],
    status: ApiStatus.INIT,
    error: null,
  })

  const stockStoreDataSet = ref({
    selectedProduct: cloneDeep(initialProduct),
    selectedStock: cloneDeep(initialStock),
  })

  const getInitialStock = computed(() => cloneDeep(initialStock))

  const getStockList = computed(() => stockList.value)

  const loadStocks = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      stockList.value.data = await getAllStocks()
      mapStockList()
      clearStockStoreDataSet()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to load stocks!'
      console.error('Error loading stocks:', error)
    }
  }

  const mapStockList = async () => {
    stockList.value.mappedStocks = flatMap(stockList.value.data, (entry) =>
      entry.products.map((product) => ({
        ...omit(entry, 'products'),
        ...product,
      })),
    )
  }

  const saveStock = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      await addStock(stockStoreDataSet.value.selectedStock)
      await loadStocks()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to save stock!'
      console.error('Error saving stock:', error)
    }
  }

  const updateStockDetails = async () => {
    try {
      stockList.value.status = ApiStatus.LOADING
      await updateStock(stockStoreDataSet.value.selectedStock)
      await loadStocks()
      stockList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      stockList.value.status = ApiStatus.ERROR
      stockList.value.error = error.message || 'Failed to update stock!'
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

  const clearStockStoreDataSet = () => {
    stockStoreDataSet.value = {
      selectedProduct: cloneDeep(initialProduct),
      selectedStock: cloneDeep(initialStock),
    }
  }

  const resetSelectedProduct = () => {
    stockStoreDataSet.value.selectedProduct = cloneDeep(initialProduct)
  }

  const resetSelectedStock = () => {
    stockStoreDataSet.value.selectedStock = cloneDeep(initialStock)
  }

  return {
    stockStoreDataSet,
    stockList,
    getStockList,
    getInitialStock,
    loadStocks,
    saveStock,
    updateStockDetails,
    removeStock,
    clearStockStoreDataSet,
    resetSelectedProduct,
    resetSelectedStock,
  }
})

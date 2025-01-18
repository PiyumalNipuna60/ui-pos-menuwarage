import { ApiStatus } from '@/consts/const'
import { addProduct, deleteProduct, getAllProducts, updateProduct } from '@/service/ProductService'
import cloneDeep from 'lodash/cloneDeep'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useProductStore = defineStore('productStore', () => {
  const initialProduct = {
    id: null,
    image: null,
    name: null,
    createdAt: null,
  }

  const productList = ref({
    data: [],
    selectedProduct: cloneDeep(initialProduct),
    status: ApiStatus.INIT,
    error: null,
  })

  const getProductList = computed(() => productList.value)

  const getInitialProduct = computed(() => cloneDeep(initialProduct))

  const loadProducts = async () => {
    try {
      productList.value.status = ApiStatus.LOADING
      productList.value.data = await getAllProducts()
      clearSelectedProduct()
      productList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      productList.value.status = ApiStatus.ERROR
      productList.value.error = error.message || 'Failed to load products.'
      console.error('Error loading products:', error)
    }
  }

  const saveProduct = async () => {
    try {
      productList.value.status = ApiStatus.LOADING
      await addProduct(productList.value.selectedProduct)
      await loadProducts()
      productList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      productList.value.status = ApiStatus.ERROR
      productList.value.error = error.message || 'Failed to save product.'
      console.error('Error saving product:', error)
    }
  }

  const updateProductDetails = async () => {
    try {
      productList.value.status = ApiStatus.LOADING
      await updateProduct(productList.value.selectedProduct.id, productList.value.selectedProduct)
      await loadProducts()
      productList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      productList.value.status = ApiStatus.ERROR
      productList.value.error = error.message || 'Failed to update product.'
      console.error('Error updating product:', error)
    }
  }

  const removeProduct = async (productId) => {
    try {
      productList.value.status = ApiStatus.LOADING
      await deleteProduct(productId)
      await loadProducts()
      productList.value.status = ApiStatus.SUCCESS
    } catch (error) {
      productList.value.status = ApiStatus.ERROR
      productList.value.error = error.message || 'Failed to delete product.'
      console.error('Error deleting product:', error)
    }
  }

  const clearSelectedProduct = () => {
    productList.value.selectedProduct = cloneDeep(initialProduct)
  }

  return {
    loadProducts,
    saveProduct,
    updateProductDetails,
    removeProduct,
    productList,
    getProductList,
    clearSelectedProduct,
    getInitialProduct,
  }
})

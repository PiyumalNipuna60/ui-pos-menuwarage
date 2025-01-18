import axios from 'axios'
import { BASEURL } from '../consts/const'

export async function addProduct(productData) {
  try {
    const response = await axios.post(`${BASEURL}/product`, productData)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Product added successfully!'
    } else {
      throw new Error('Failed to add product')
    }
  } catch (error) {
    console.error('API Error at addProduct:', error)
    throw error
  }
}

export async function getAllProducts() {
  try {
    const response = {
      status: 200,
      data: {
        products: [
          { id: 1, name: 'Product 1', image: '', createdAt: '2025/01/02' },
          { id: 2, name: 'Product 2', image: '', createdAt: '2025/01/02' },
          { id: 3, name: 'Product 3', image: '', createdAt: '2025/01/02' },
          { id: 4, name: 'Product 4', image: '', createdAt: '2025/01/02' },
        ],
      },
    }

    if (response.status === 201 || response.status === 200) {
      return response.data.products
    } else {
      throw new Error('Failed to fetch products')
    }
  } catch (error) {
    console.error('API Error at getAllProducts:', error)
    throw error
  }
}

export async function updateProduct(productId, productData) {
  try {
    const response = await axios.put(`${BASEURL}/product/${productId}`, productData)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Product updated successfully!'
    } else {
      throw new Error('Failed to update product')
    }
  } catch (error) {
    console.error('API Error at updateProduct:', error)
    throw error
  }
}

export async function deleteProduct(productId) {
  try {
    const response = await axios.delete(`${BASEURL}/product/${productId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Product deleted successfully!'
    } else {
      throw new Error('Failed to delete product')
    }
  } catch (error) {
    console.error('API Error at deleteProduct:', error)
    throw error
  }
}

export async function searchProduct(productId) {
  try {
    const response = await axios.get(`${BASEURL}/product/search/${productId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data
    } else {
      throw new Error('Product not found')
    }
  } catch (error) {
    console.error('API Error at searchProduct:', error)
    throw error
  }
}

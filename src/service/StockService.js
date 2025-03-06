import axios from 'axios'
import { BASEURL } from '../consts/const'

export async function addStock(stockData) {
  try {
    // const response = await axios.post(`${BASEURL}/stock`, stockData)
    const response = {
      status: 201,
      data: {
        message: 'stock added success',
      },
    }
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Stock added successfully!'
    } else {
      throw new Error('Failed to add stock')
    }
  } catch (error) {
    console.error('API Error at addStock:', error)
    throw error
  }
}
export async function getAllStocks() {
  try {
    // Simulated API response with mock data
    const mockStocks = [
      {
        stockId: 2,
        createdAt: '11/01/2025',
        invoiceNumber: '0001',
        subTotal: 5000,
        products: [
          {
            productId: 4,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 3000,
            freeItems: 2,
            unitPrice: 100,
          },
          {
            productId: 5,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 2000,
            freeItems: 1,
            unitPrice: 100,
          },
          {
            productId: 6,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 4000,
            freeItems: 3,
            unitPrice: 100,
          },
        ],
      },
      {
        stockId: 3,
        createdAt: '12/01/2025',
        subTotal: 5000,
        invoiceNumber: '0002',
        products: [
          {
            productId: 7,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 2500,
            freeItems: 2,
            unitPrice: 100,
          },
          {
            productId: 8,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 3500,
            freeItems: 3,
            unitPrice: 100,
          },
          {
            productId: 9,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 4500,
            freeItems: 4,
            unitPrice: 100,
          },
        ],
      },
      {
        stockId: 4,
        createdAt: '13/01/2025',
        invoiceNumber: '0003',
        subTotal: 5000,
        products: [
          {
            productId: 10,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 6000,
            freeItems: 5,
            unitPrice: 100,
          },
          {
            productId: 11,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 7000,
            freeItems: 6,
            unitPrice: 100,
          },
          {
            productId: 12,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 8000,
            freeItems: 7,
            unitPrice: 100,
          },
        ],
      },
      {
        stockId: 5,
        createdAt: '14/01/2025',
        invoiceNumber: '0004',
        subTotal: 5000,
        products: [
          {
            productId: 13,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 1500,
            freeItems: 1,
            unitPrice: 100,
          },
          {
            productId: 14,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 2500,
            freeItems: 2,
            unitPrice: 100,
          },
          {
            productId: 15,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 3500,
            freeItems: 3,
            unitPrice: 100,
          },
        ],
      },
      {
        stockId: 6,
        createdAt: '15/01/2025',
        invoiceNumber: '0005',
        subTotal: 5000,
        products: [
          {
            productId: 16,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 1000,
            freeItems: 1,
            unitPrice: 100,
          },
          {
            productId: 17,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 2000,
            freeItems: 2,
            unitPrice: 100,
          },
          {
            productId: 18,
            sataus: 'active',
            initialQuantity: 30,
            availableQuantity: 30,
            name: 'sample product',
            total: 3000,
            freeItems: 3,
            unitPrice: 100,
          },
        ],
      },
    ]
    return mockStocks
  } catch (error) {
    console.error('API Error at getAllStocks:', error)
    throw error
  }
}

export async function updateStock(stockData) {
  try {
    const response = await axios.put(`${BASEURL}/stock/${stockData.stockId}`, stockData)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Stock updated successfully!'
    } else {
      throw new Error('Failed to update stock')
    }
  } catch (error) {
    console.error('API Error at updateStock:', error)
    throw error
  }
}

export async function deleteStock(stockId) {
  try {
    const response = await axios.delete(`${BASEURL}/stock/${stockId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Stock deleted successfully!'
    } else {
      throw new Error('Failed to delete stock')
    }
  } catch (error) {
    console.error('API Error at deleteStock:', error)
    throw error
  }
}

export async function searchStock(stockId) {
  try {
    const response = await axios.get(`${BASEURL}/stock/search/${stockId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data
    } else {
      throw new Error('Stock not found')
    }
  } catch (error) {
    console.error('API Error at searchStock:', error)
    throw error
  }
}

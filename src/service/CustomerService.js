import axios from 'axios'
import { BASEURL } from '../consts/const'

export async function addCustomer(customerData) {
  try {
    const response = await axios.post(`${BASEURL}/customer`, customerData)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Customer added successfully!'
    } else {
      throw new Error('Failed to add customer')
    }
  } catch (error) {
    console.error('API Error at addCustomer:', error)
    throw error
  }
}

export async function getAllCustomers() {
  try {
    // const response = await axios.get(`${BASEURL}/customer`);
    const response = {
      status: 200,
      data: {
        customers: [
          {
            id: 1,
            name: 'Kasun Vithanage',
            contact: '0705045099',
            nic: '971781440V',
            address: 'Isusu mv, Galle',
          },
          {
            id: 2,
            name: 'Nimal Nishantha',
            contact: '0705045099',
            nic: '971781440V',
            address: 'Isusu mv, Galle',
          },
          {
            id: 3,
            name: 'Mithuranga Kalhara',
            contact: '0705045099',
            nic: '971781440V',
            address: 'Isusu mv, Galle',
          },
        ],
      },
    }
    if (response.status === 201 || response.status === 200) {
      return response.data.customers
    } else {
      throw new Error('Failed to fetch customers')
    }
  } catch (error) {
    console.error('API Error at getAllCustomers:', error)
    throw error
  }
}

export async function updateCustomer(customerId, customerData) {
  try {
    const response = await axios.put(`${BASEURL}/customer/${customerId}`, customerData)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Customer updated successfully!'
    } else {
      throw new Error('Failed to update customer')
    }
  } catch (error) {
    console.error('API Error at updateCustomer:', error)
    throw error
  }
}

export async function deleteCustomer(customerId) {
  try {
    const response = await axios.delete(`${BASEURL}/customer/${customerId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data.message || 'Customer deleted successfully!'
    } else {
      throw new Error('Failed to delete customer')
    }
  } catch (error) {
    console.error('API Error at deleteCustomer:', error)
    throw error
  }
}

export async function searchCustomer(customerId) {
  try {
    const response = await axios.get(`${BASEURL}/customer/search/${customerId}`)
    if (response.status === 201 || response.status === 200) {
      return response.data
    } else {
      throw new Error('Customer not found')
    }
  } catch (error) {
    console.error('API Error at searchCustomer:', error)
    throw error
  }
}

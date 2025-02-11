import axios from '@/utils/axios'
import { omit } from 'lodash'
import { BASEURL } from '../consts/const'

export async function userLogIn(payload) {
  try {
    const response = await axios.post(`${BASEURL}/user/login`, omit(payload, ['token']))
    return response
  } catch (error) {
    if (!error.customError) {
      throw {
        customError: {
          type: 'unexpected_error',
          title: 'Unexpected Error',
          description: 'An unexpected error occurred. Please try again...',
          details: 'An unexpected error occurred at service -> userLogIn.',
        },
      }
    }
    console.error(
      'Error: ',
      error.customError.details
        ? omit(error.customError, ['type', 'description'])
        : omit(error.customError, ['type', 'details']),
    )
    throw error
  }
}

export async function userRegister(userData) {
  try {
    const response = await axios.post(`${BASEURL}/user/register`, userData)
    if (response.status === 201) {
      return response.data.message || 'Registration successful!'
    } else {
      throw new Error('Registration failed')
    }
  } catch (error) {
    console.error('API Error at userRegister:', error)
    throw error
  }
}

export async function getAllUsers() {
  try {
    const response = await axios.get(`${BASEURL}/user/get_all_user`)
    if (response.status === 200) {
      return response.data.users
    } else {
      throw new Error('Failed to fetch users')
    }
  } catch (error) {
    console.error('API Error at getAllUsers:', error)
    throw error
  }
}

export async function updateUser(userId, userData) {
  try {
    const response = await axios.put(`${BASEURL}/user/update/${userId}`, userData)
    if (response.status === 201) {
      return response.data.message || 'User updated successfully!'
    } else {
      throw new Error('Failed to update user')
    }
  } catch (error) {
    console.error('API Error at updateUser:', error)
    throw error
  }
}

export async function searchUser(userId) {
  try {
    const response = await axios.get(`${BASEURL}/user/search_user/${userId}`)
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('User not found')
    }
  } catch (error) {
    console.error('API Error at searchUser:', error)
    throw error
  }
}

export async function getUserInfoByToken(token) {
  try {
    const response = await axios.post(`${BASEURL}/user/get_user_info_by_token`, { token })
    if (response.status === 200) {
      return response.data.user
    } else {
      throw new Error('Failed to fetch user info')
    }
  } catch (error) {
    console.error('API Error at getUserInfoByToken:', error)
    throw error
  }
}

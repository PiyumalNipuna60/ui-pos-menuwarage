import { BASEURL } from '@/consts/const' // Import your base URL
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 10000, // Set a timeout for requests
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response

      switch (status) {
        case 401:
          return {
            status: 401,
            type: 'unauthorized',
            title: 'Unauthorized',
            description: 'Invalid credentials! Please check your username and password.',
          }
        case 403:
          return {
            status: 403,
            type: 'access_denied',
            title: 'Access Denied',
            description: 'You do not have permission to access this resource.',
          }
        default:
          return {
            type: 'api_error',
            title: 'API Error',
            description: 'Something went wrong. Please try again later.',
          }
      }
    } else if (error.request) {
      error.customError = {
        type: 'network_error',
        title: 'Network Error',
        description: 'Unable to connect to the server. Please check your internet connection.',
      }
    } else {
      error.customError = {
        type: 'unexpected_error',
        title: 'Unexpected Error',
        description: 'An unknown error occurred. Please try again later.',
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance

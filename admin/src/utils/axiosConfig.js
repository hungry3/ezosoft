import axios from 'axios'

const baseURL = `${import.meta.env.VITE_API_BASE_URL}/api`

export const axiosConfig  =  axios.create({
    baseURL,
   headers: { 'Content-Type': 'application/json' },
   withCredentials: true
})
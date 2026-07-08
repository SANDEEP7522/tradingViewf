import axios from 'axios'

// baseURL .env se (VITE_API_URL), warna localhost fallback
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api',
  timeout: 15000,
})

// response interceptor — errors ko readable banao
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message ??
      error.message ??
      'Something went wrong'
    return Promise.reject(new Error(message))
  },
)

export default api

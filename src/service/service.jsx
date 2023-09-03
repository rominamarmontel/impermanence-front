import axios from 'axios'

axios.interceptors.request.use((config) => {
  console.log('Request:', config);
  return config;
});

axios.interceptors.response.use((response) => {
  console.log('Response:', response);
  return response;
});

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const myApi = axios.create({
  baseURL: BACKEND_URL,
})

myApi.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem('token')
    if (token) {
      request.headers.Authorization = `Bearer ${token}`
    }
    if (request.data instanceof FormData) {
      request.headers['Content-Type'] = 'multipart/form-data'
    } else {
      request.headers['Content-Type'] = 'application/json'
    }
    return request
  },
  (error) => console.error(error)
)
export default myApi
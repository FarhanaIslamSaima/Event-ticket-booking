import axios from "axios"
import { getTokenFromLocal } from "@/utils/FormData/localStorage"

const instance = axios.create()
instance.defaults.headers.post["Content-Type"] = "application/json"
instance.defaults.headers["Accept"] = "application/json"
instance.defaults.timeout = 60000 // Increased timeout

instance.interceptors.request.use(
  (config) => {
    const accessToken = getTokenFromLocal("accessToken")
    if (accessToken) {
      config.headers.Authorization = `Token ${accessToken}`
    }
    console.log("Request config:", config)
    return config
  },
  (error) => {
    console.error("Request error:", error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response) => {
    // Return the full axios response object, don't transform it here
    // Let axiosBaseQuery handle the transformation
    console.log("Response received:", response)
    return response
  },
  (error) => {
    console.error("Response error:", error)
    // Always reject the promise so it gets caught in axiosBaseQuery
    return Promise.reject(error)
  },
)

export { instance }

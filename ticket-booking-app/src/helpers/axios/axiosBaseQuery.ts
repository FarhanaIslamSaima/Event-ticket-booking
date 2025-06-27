import type { Tmeta } from "@/type/common"
import type { BaseQueryFn } from "@reduxjs/toolkit/query/react"
import type { AxiosError, AxiosRequestConfig } from "axios"
import { instance as axiosInstance } from "./axiosInstance"

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" },
  ): BaseQueryFn<
    {
      url: string
      method?: AxiosRequestConfig["method"]
      data?: AxiosRequestConfig["data"]
      params?: AxiosRequestConfig["params"]
      headers?: AxiosRequestConfig["headers"]
      metha?: Tmeta
      contentType?: string
    },
    unknown,
    unknown
  > =>
  async ({ url, method , data, params, headers, contentType }) => {
    

    try {
      // FIXED: Proper axios configuration for GET requests
      const axiosConfig: AxiosRequestConfig = {
        url: baseUrl + url,
        method: method || "GET",
        headers: {
          "Content-Type": contentType || "application/json",
          ...headers,
        },
      }

      // Only add data for non-GET requests
      if (method && method.toUpperCase() !== "GET" && data) {
        axiosConfig.data = data
      }

      // Only add params for GET requests or when explicitly provided
      if (params) {
        axiosConfig.params = params
      }

      console.log("📤 Final axios config:", axiosConfig)

      const result = await axiosInstance(axiosConfig)

   

      return {
        data: result.data,
        meta: {
          status: result.status,
          statusText: result.statusText,
        },
      }
    } catch (axiosError) {
      const err = axiosError as AxiosError
      console.error("❌ Axios request failed!")
      console.error("  💥 Error:", err.message)
      console.error("  📊 Status:", err.response?.status)
      console.error("  📦 Response data:", err.response?.data)

      return {
        error: {
          status: err.response?.status || 500,
          data: err.response?.data || { message: err.message || "Something went wrong!!!" },
        },
      }
    }
  }

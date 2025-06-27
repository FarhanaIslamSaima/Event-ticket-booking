import { Tmeta } from "@/type/common";
import type {BaseQueryFn} from "@reduxjs/toolkit/query/react";
import type {AxiosError,AxiosRequestConfig} from "axios";
import {instance as axiosInstance} from "./axiosInstance";

export const axiosBaseQuery=(
    {baseurl}:{baseurl:string} ={baseurl:''},
): BaseQueryFn<
 {
    url: string;
    method?: AxiosRequestConfig['method'];
    data?: AxiosRequestConfig['data'];
    params?: AxiosRequestConfig['params'];
    headers?: AxiosRequestConfig['headers'];
    metha?: Tmeta;
    contentType?: string;
 },
 unknown,
 unknown
>=> async({url, method, data, params, headers,contentType})=> {
    try{
        const result=await axiosInstance({
            url:baseurl+url,
            method,
            data,
            params,
            headers: {
                        "Content-Type": contentType || "application/json"
                    },

        })
        return {data:result}

    }
    catch(axiosError){
        const err=axiosError as AxiosError;
        return {
            error:{
                status: err.response?.status || 500,
                data: err.response?.data || {message: "Something went wrong!!!"},
               
            }
        }
    }
}
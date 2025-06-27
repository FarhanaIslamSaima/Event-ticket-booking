import { ResponseSuccessType } from "@/type/common";
import axios from "axios";
import { getTokenFromLocal } from "@/utils/FormData/localStorage";

const instance=axios.create();
instance.defaults.headers.post['Content-Type'] = 'application/json';
instance.defaults.headers['Accepts'] = 'application/json';
instance.defaults.timeout=6000

instance.interceptors.request.use(
    function (config) {
        const accessToken = getTokenFromLocal('accessToken')
        if (accessToken) {
            config.headers.Authorization = `Token ${accessToken}`
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });
    
    instance.interceptors.response.use(
    //@ts-ignore
    function (response) {

        const responseObject: ResponseSuccessType = {
            data: response?.data
           
        }
       console.log("Response object:", responseObject);
        return responseObject;
    }, function (error) {

        const responseObject = {
            statusCode: error?.response?.data?.statusCode || 500,
            message: error?.response?.data?.message || "Something went wrong!!!",
            errorMessage: error?.response?.data?.message
        }
        return responseObject;
    })

export { instance }
import { login } from "../interface";
import axiosClient from "./axiosClient";

const loginAPI = {
    genToken(data: login){
        const url = '/api/login-gen-token'
        return axiosClient.post(url,data)
    },
    verifyToken(token: string){
        const url = `/api/login-verify-token/${token}`
        return axiosClient.get(url)
    }
}

export default loginAPI;    
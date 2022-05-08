import axios from 'axios'

const axiosClient = axios.create({
    baseURL : 'http://127.0.0.1:8000',
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    }
})

export default axiosClient
import axios from "axios"
import { BASEURL } from "@/constants/env";

const instanceAxios = axios.create({
    baseURL: `${BASEURL}api/`,
    headers: {
        'Content-Type': 'application/json',
        'accept': '*/*'
    },
})

export default instanceAxios
import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.31.81:4000/api',
    withCredentials: true
});
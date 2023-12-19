import axios from "axios";

export default axios.create({
    baseURL: 'http://192.168.4.215:4000/api',
    withCredentials: true
});
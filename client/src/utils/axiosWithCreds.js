import axios from 'axios';

const axiosWithCreds = axios.create({
    withCredentials: true,
})

export default axiosWithCreds;